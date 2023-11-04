import AddJobTitleHelper from "../support/helpers/add-job-title-helper";
import AddLocationHelper from "../support/helpers/add-Location-helper"
import AddEmployeeHelper from "../support/helpers/add-employee-helper"
import DeleteEmployeeHelper from "../support/helpers/delete-employee-helper"
import Phase1Apis from "../support/apis/phase1-apis"
import Dashboard from "../support/pageObjects/dashoboard"
let jobTitleId:any
let locationId:any
let firstEmployeeNumber:any
let secondEmployeeNumber:any
let thirdEmployeeNumber:any

describe("Phase1 Task", () => {
    beforeEach(() => {

      cy.loginOrangeHRM();

      AddJobTitleHelper.addJobTitle().then((addJobTitleResponse)=>{
        jobTitleId=addJobTitleResponse.data.id;
      })

      AddLocationHelper.addLocation().then((addLocationResponse)=>{
        locationId=addLocationResponse.data.id;
      })

      AddEmployeeHelper.addEmployeeHelper().then((addEmployeeResponse)=>{
        firstEmployeeNumber=addEmployeeResponse.data.empNumber
        Phase1Apis.linkEmployeeWithJobTitleAndLocation(jobTitleId,locationId,addEmployeeResponse.data.empNumber)
        Phase1Apis.linkEmployeeWithSalaryAmount(addEmployeeResponse.data.empNumber)
      })

      AddEmployeeHelper.addEmployeeHelper().then((addEmployeeResponse)=>{
        secondEmployeeNumber=addEmployeeResponse.data.empNumber
        Phase1Apis.linkEmployeeWithJobTitleAndLocation(jobTitleId,locationId,addEmployeeResponse.data.empNumber)
        Phase1Apis.linkEmployeeWithSalaryAmount(addEmployeeResponse.data.empNumber)
      })

      AddEmployeeHelper.addEmployeeHelper().then((addEmployeeResponse)=>{
        thirdEmployeeNumber=addEmployeeResponse.data.empNumber
        Phase1Apis.linkEmployeeWithJobTitleAndLocation(jobTitleId,locationId,addEmployeeResponse.data.empNumber)
        Phase1Apis.linkEmployeeWithSalaryAmount(addEmployeeResponse.data.empNumber)
      })

      
    });
      it("qa",()=>{
    
        console.log(jobTitleId)
        console.log(locationId)
        console.log(firstEmployeeNumber)
        Dashboard.clicksToBIMtab()
      });
      
      afterEach(() => {
        DeleteEmployeeHelper.deleteEmployeeHelper(firstEmployeeNumber);
        DeleteEmployeeHelper.deleteEmployeeHelper(secondEmployeeNumber);
        DeleteEmployeeHelper.deleteEmployeeHelper(thirdEmployeeNumber);
        Phase1Apis.deleteJobTitle(jobTitleId);
        Phase1Apis.deleteLocation(jobTitleId);
        
      });
    
  });

   