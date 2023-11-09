import AddEmployeeHelper from "../support/helpers/add-employee-helper";
import Dashboard from "../support/pageObjects/dashoboard";
import GenericHelper from "../support/helpers/generic-helper";
import SharedHelper from "../support/helpers/shared-helper";
import CreateLoginDetailsHelper from "../support/helpers/create-login-details-helper";
import Phase2Apis from "../support/apis/phase2-apis";
import ClaimTab from "../support/pageObjects/claimTab";
let userName: any;
let eventID: number;
let expenseTypeID: number;
let eventName: string;
let expenseTypeName: string;
let ClaimApproveID: any;
let employeeFullName: any;
let amount = (userName = `${GenericHelper.genericRandomNumber()}`);

describe("Phase2: Claims Scenarios)", () => {
  beforeEach(() => {
    cy.fixture("empLoginDeatiles").as("EmpInfo");
    // Admin login to OrangeHRM
    cy.loginOrangeHRM();
    // Create new empoloyee
    // Create employee login details
    AddEmployeeHelper.addEmployeeHelper().then((Response) => {
      employeeFullName = `${Response.data.firstName} ${Response.data.middleName} ${Response.data.lastName}`;
      cy.get("@EmpInfo").then((data: any) => {
        userName = `${data.userName}${GenericHelper.genericRandomNumber()}`;
        CreateLoginDetailsHelper.createLoginDetails(
          Response.data.empNumber,
          userName,
          data.password
        );
      });
    });
    // Add new events
    Phase2Apis.addEvents().then((response) => {
      eventID = response.body.data.id;
      eventName = response.body.data.name;
    });
    // Add new expense type
    Phase2Apis.addExpenseTypes().then((response) => {
      expenseTypeID = response.body.data.id;
      expenseTypeName = response.body.data.name;
    });
    // Admin logout from OrangeHRM
    cy.logoutOrangeHRM();
  });

  it("Claim: Employee create claim then admin approve it", () => {
    // New employee login to OrangeHRM
    cy.get("@EmpInfo").then((data: any) => {
      cy.loginOrangeHRM(userName, data.password);
    });
    // Employee clicks to cliam tab on dashboard
    Dashboard.clicksToClaimTab();
    ClaimTab.clicksToSubmitClaim();
    ClaimTab.assertionForSubmitClaimTitlePage();
    ClaimTab.clicksToSelectEventDropdown(eventName);
    ClaimTab.clicksToSelectCurrencyDropdown();
    ClaimTab.fillRemarkTextArea();
    ClaimTab.clicksToCreateButton();
    SharedHelper.checkLoadingSpinnerIsExist(false);
    SharedHelper.extractIDFromURL().then((UrlID) => {
      ClaimApproveID = UrlID;
    });
    ClaimTab.clicksToAddButton();
    ClaimTab.AddExpense(expenseTypeName, GenericHelper.currentDate(), amount);
    SharedHelper.checkLoadingSpinnerIsExist(false);
    ClaimTab.clicksToSubmitButton();
    cy.logoutOrangeHRM();
    cy.loginOrangeHRM();
    Dashboard.clicksToClaimTab();
    ClaimTab.searchForEmployeeName(employeeFullName);
    ClaimTab.clicksToViewDetailsButton();
    ClaimTab.clicksToApproveButton();
    SharedHelper.checkLoadingSpinnerIsExist(false);
    ClaimTab.clicksToBackButton();
    ClaimTab.searchForEmployeeName(employeeFullName);
    SharedHelper.validateTableRow(
      "Submitted Date",
      GenericHelper.currentDate()
    );
    SharedHelper.validateTableRow("Status", "Paid");
    SharedHelper.validateTableRow("Amount", amount);
  });

  after(() => {
    Phase2Apis.deleteEvent(eventID);
    Phase2Apis.deleteExpenseType(expenseTypeID);
  });
});
