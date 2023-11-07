import AddJobTitleHelper from "../support/helpers/add-job-title-helper";
import AddLocationHelper from "../support/helpers/add-Location-helper";
import AddEmployeeHelper from "../support/helpers/add-employee-helper";
import DeleteEmployeeHelper from "../support/helpers/delete-employee-helper";
import Phase1Apis from "../support/apis/phase1-apis";
import Dashboard from "../support/pageObjects/dashoboard";
import PimTab from "../support/pageObjects/pimTab";
import GenericHelper from "../support/helpers/generic-helper";
import SharedHelper from "../support/helpers/shared-helper";
import CreateLoginDetailsHelper from "../support/helpers/create-login-details-helper";
let userName:any
describe("Phase1: Generate an Employee report)", () => {
  beforeEach(() => {
    // Admin login to HRMorange system
    cy.fixture("empLoginDeatiles").as("EmpInfo");
  });
  it("", () => {
    cy.loginOrangeHRM();
    AddEmployeeHelper.addEmployeeHelper().then((Response) => {
      cy.get("@EmpInfo").then((data: any) => {
        userName=`${data.userName}${GenericHelper.genericRandomNumber()}`
        CreateLoginDetailsHelper.createLoginDetails(
          Response.data.empNumber,
          userName,
          data.password
        );
      });
    });
  });
});
