// Final Task: Phase 1 -> Phase1: Generate an Employee report with search criteria by (Personal : First name/ Job: Job title/ Salary:Amount

import AddJobTitleHelper from "../support/helpers/add-job-title-helper";
import AddLocationHelper from "../support/helpers/add-Location-helper";
import AddEmployeeHelper from "../support/helpers/add-employee-helper";
import DeleteEmployeeHelper from "../support/helpers/delete-employee-helper";
import Phase1Apis from "../support/apis/phase1-apis";
import Dashboard from "../support/pageObjects/dashoboard";
import PimTab from "../support/pageObjects/pimTab";
import GenericHelper from "../support/helpers/generic-helper";
import SharedHelper from "../support/helpers/shared-helper"

// This variable is uesed to save values returened from the API response
let jobTitleId: any;
let locationId: any;
let firstEmployeeNumber: any;
let secondEmployeeNumber: any;
let thirdEmployeeNumber: any;
let jobTitleTitle: any;
let locationName: any;
let firstEmployeeFirsrName: any;
let secondEmployeeFirsrName: any;
let thirdEmployeeFirsrName: any;
let firstEmployeeSalary: any;
let secondEmployeeSalary: any;
let thirdEmployeeSalary: any;
let reoprtName = `QA ${GenericHelper.genericRandomNumber()}`;
let reportID: any;

describe("Phase1: Generate an Employee report)", () => {
  beforeEach(() => {
    // Admin login to HRMorange system
    cy.loginOrangeHRM();

    // Create Job Title
    AddJobTitleHelper.addJobTitle().then((addJobTitleResponse) => {
      jobTitleId = addJobTitleResponse.data.id;
      jobTitleTitle = addJobTitleResponse.data.title;
    });
    // Create Location
    AddLocationHelper.addLocation().then((addLocationResponse) => {
      locationId = addLocationResponse.data.id;
      locationName = addLocationResponse.data.name;
    });
    // Create the first employee
    AddEmployeeHelper.addEmployeeHelper().then((addEmployeeResponse:any) => {
      firstEmployeeNumber = addEmployeeResponse.data.empNumber;
      firstEmployeeFirsrName = addEmployeeResponse.data.firstName;
      // link the first employee with created job title and location
      Phase1Apis.linkEmployeeWithJobTitleAndLocation(
        jobTitleId,
        locationId,
        addEmployeeResponse.data.empNumber
      );
      // link the first employee with salary amount
      Phase1Apis.linkEmployeeWithSalaryAmount(
        addEmployeeResponse.data.empNumber
      ).then((responseSalary) => {
        firstEmployeeSalary = responseSalary.body.data.amount;
      });
    });
    // Create the second employee
    AddEmployeeHelper.addEmployeeHelper().then((addEmployeeResponse) => {
      secondEmployeeNumber = addEmployeeResponse.data.empNumber;
      secondEmployeeFirsrName = addEmployeeResponse.data.firstName;
      // link the second employee with created job title and location
      Phase1Apis.linkEmployeeWithJobTitleAndLocation(
        jobTitleId,
        locationId,
        addEmployeeResponse.data.empNumber
      );
      // link the first employee with salary amount
      Phase1Apis.linkEmployeeWithSalaryAmount(
        addEmployeeResponse.data.empNumber
      ).then((responseSalary) => {
        secondEmployeeSalary = responseSalary.body.data.amount;
      });
    });
    // Create the third employee
    AddEmployeeHelper.addEmployeeHelper().then((addEmployeeResponse) => {
      thirdEmployeeNumber = addEmployeeResponse.data.empNumber;
      thirdEmployeeFirsrName = addEmployeeResponse.data.firstName;
      console.log(
        `ThiredEmployee:${thirdEmployeeNumber} LocationId:${locationId} jobTitleId:${jobTitleId} jobTitleTitle:${jobTitleTitle} locationName:${locationName} firstName:${thirdEmployeeFirsrName}`
      );
      // link the third employee with created job title and location
      Phase1Apis.linkEmployeeWithJobTitleAndLocation(
        jobTitleId,
        locationId,
        addEmployeeResponse.data.empNumber
      );
      // link the third employee with salary amount
      Phase1Apis.linkEmployeeWithSalaryAmount(
        addEmployeeResponse.data.empNumber
      ).then((responseSalary) => {
        thirdEmployeeSalary = responseSalary.body.data.amount;
      });
    });
  });

  // Test Case: Generate an Employee report with search criteria by (Personal : First name/ Job: Job title/ Salary:Amount
  it("Phase1: Generate an Employee report with search criteria by (Personal : First name/ Job: Job title/ Salary:Amount", () => {

    Dashboard.clicksToBIMtab();
    PimTab.clicksToRebortsTabNavigation();
    PimTab.clicksToAddButton();
    PimTab.assertionForAddReport();
    SharedHelper.checkLoadingSpinnerIsExist(false);
    PimTab.fillReportName(reoprtName);
    PimTab.selectCriteria("Job Title", jobTitleTitle, 2);
    PimTab.selectCriteria("Location", locationName, 3);
    PimTab.selectPersonalDisplayFieldGroup();
    PimTab.selectPersonalDisplayField();
    PimTab.addDisplayField();
    PimTab.activatePersonalToggle();
    PimTab.selectJobDisplayFieldGroup();
    PimTab.selectJobDisplayField();
    PimTab.addDisplayField();
    PimTab.activateJobToggle();
    PimTab.selectSalaryDisplayFieldGroup();
    PimTab.selectSalaryDisplayField();
    PimTab.addDisplayField();
    PimTab.activateSalaryToggle();
    PimTab.clicksToSaveButton();
    SharedHelper.checkLoadingSpinnerIsExist(false);
    SharedHelper.extractIDFromURL().then((UrlID) => {
      reportID = UrlID;
    });
    PimTab.verifyTheReportName(reoprtName);
    PimTab.confirmTheCorrectnessOfTheHeaders();
    PimTab.assertionForNumberOfRecorsFound(3);
    PimTab.validateTheValuesForEmployeeRowReport(1, firstEmployeeFirsrName, jobTitleTitle, firstEmployeeSalary)
    PimTab.validateTheValuesForEmployeeRowReport(2, secondEmployeeFirsrName, jobTitleTitle, secondEmployeeSalary)
    PimTab.validateTheValuesForEmployeeRowReport(3, thirdEmployeeFirsrName, jobTitleTitle, thirdEmployeeSalary)

  });
// Delete all created data
  after(() => {
    DeleteEmployeeHelper.deleteEmployeeHelper(firstEmployeeNumber);
    DeleteEmployeeHelper.deleteEmployeeHelper(secondEmployeeNumber);
    DeleteEmployeeHelper.deleteEmployeeHelper(thirdEmployeeNumber);
    Phase1Apis.deleteJobTitle(jobTitleId);
    Phase1Apis.deleteLocation(jobTitleId);
    Phase1Apis.deleteReport(reportID);
  });
});
