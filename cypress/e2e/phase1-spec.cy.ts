import AddJobTitleHelper from "../support/helpers/add-job-title-helper";
import AddLocationHelper from "../support/helpers/add-Location-helper"
import AddEmployeeHelper from "../support/helpers/add-employee-helper"
import DeleteEmployeeHelper from "../support/helpers/delete-employee-helper"
import Phase1Apis from "../support/apis/phase1-apis"
import Dashboard from "../support/pageObjects/dashoboard"
import PimTab from "../support/pageObjects/pimTab" ;
import GenericHelper from "../support/helpers/GenericHelper"

let jobTitleId:any
let locationId:any
let firstEmployeeNumber:any
let secondEmployeeNumber:any
let thirdEmployeeNumber:any
let jobTitleTitle:any
let locationName:any
let firstEmployeeFirsrName:any
let secondEmployeeFirsrName:any
let thirdEmployeeFirsrName:any
let firstEmployeeSalary:any
let secondEmployeeSalary:any
let thirdEmployeeSalary:any
let reoprtName=`QA ${GenericHelper.genericRandomNumber()}`
let ID:any

describe("Phase1: Generate an Employee report)", () => {
    beforeEach(() => {

      cy.loginOrangeHRM();

      AddJobTitleHelper.addJobTitle().then((addJobTitleResponse)=>{
        jobTitleId=addJobTitleResponse.data.id;
        jobTitleTitle=addJobTitleResponse.data.title;

      })

      AddLocationHelper.addLocation().then((addLocationResponse)=>{
        locationId=addLocationResponse.data.id;
        locationName=addLocationResponse.data.name
      })

      AddEmployeeHelper.addEmployeeHelper().then((addEmployeeResponse)=>{
        firstEmployeeNumber=addEmployeeResponse.data.empNumber
        firstEmployeeFirsrName=addEmployeeResponse.data.firstName
        console.log(`FirstEmployee:${firstEmployeeNumber} LocationId:${locationId} jobTitleId:${jobTitleId} jobTitleTitle:${jobTitleTitle} locationName:${locationName} firstName:${firstEmployeeFirsrName}`)
        Phase1Apis.linkEmployeeWithJobTitleAndLocation(jobTitleId,locationId,addEmployeeResponse.data.empNumber)
        Phase1Apis.linkEmployeeWithSalaryAmount(addEmployeeResponse.data.empNumber).then((responseSalary)=>{
          
           firstEmployeeSalary=responseSalary.body.data.amount;
        })
      })

      AddEmployeeHelper.addEmployeeHelper().then((addEmployeeResponse)=>{
        secondEmployeeNumber=addEmployeeResponse.data.empNumber
        secondEmployeeFirsrName=addEmployeeResponse.data.firstName
        console.log(`SecondEmployee:${secondEmployeeNumber} LocationId:${locationId} jobTitleId:${jobTitleId} jobTitleTitle:${jobTitleTitle} locationName:${locationName} firstName:${secondEmployeeFirsrName}`)
        Phase1Apis.linkEmployeeWithJobTitleAndLocation(jobTitleId,locationId,addEmployeeResponse.data.empNumber)
        Phase1Apis.linkEmployeeWithSalaryAmount(addEmployeeResponse.data.empNumber).then((responseSalary)=>{
         
          secondEmployeeSalary=responseSalary.body.data.amount;
       })
      })

      AddEmployeeHelper.addEmployeeHelper().then((addEmployeeResponse)=>{
        thirdEmployeeNumber=addEmployeeResponse.data.empNumber
        thirdEmployeeFirsrName=addEmployeeResponse.data.firstName
        console.log(`ThiredEmployee:${thirdEmployeeNumber} LocationId:${locationId} jobTitleId:${jobTitleId} jobTitleTitle:${jobTitleTitle} locationName:${locationName} firstName:${thirdEmployeeFirsrName}`)
        Phase1Apis.linkEmployeeWithJobTitleAndLocation(jobTitleId,locationId,addEmployeeResponse.data.empNumber)
        Phase1Apis.linkEmployeeWithSalaryAmount(addEmployeeResponse.data.empNumber).then((responseSalary)=>{
          thirdEmployeeSalary=responseSalary.body.data.amount
       })
      })

      
    });
      it("Phase1: Generate an Employee report with search criteria by (Personal : First name/ Job: Job title/ Salary:Amount",()=>{
        Dashboard.clicksToBIMtab()
        PimTab.clicksToRebortsTabNavigation()
        PimTab.clicksToAddButton()
        PimTab.assertionForAddReport()  
        PimTab.checkLoadingSpinnerIsExist(false)
        PimTab.fillReportName(reoprtName)
        PimTab.selectJobTitle(jobTitleTitle)
        PimTab.selectLocation(locationName)
        PimTab.selectPersonalDisplayFieldGroup()
        PimTab.selectPersonalDisplayField()
        PimTab.addDisplayField()
        PimTab.activatePersonalToggle() 
        PimTab.selectJobDisplayFieldGroup()
        PimTab.selectJobDisplayField()
        PimTab.addDisplayField()
        PimTab.activateJobToggle()
        PimTab.selectSalaryDisplayFieldGroup()
        PimTab.selectSalaryDisplayField()
        PimTab.addDisplayField()
        PimTab.activateSalaryToggle()
        PimTab.clicksToSaveButton()
        PimTab.checkLoadingSpinnerIsExist(false)
        PimTab.extractIDFromURL().then((UrlID) => {
          ID = UrlID;
        });
        PimTab.verifyTheReportName(reoprtName)
        PimTab.confirmTheCorrectnessOfTheHeaders()
        PimTab.assertionForNumberOfRecorsFound()
        PimTab.validateTheValuesForFirstEmoloyeeRow(firstEmployeeFirsrName, jobTitleTitle,firstEmployeeSalary)
        PimTab.validateTheValuesForSecondEmoloyeeRow(secondEmployeeFirsrName, jobTitleTitle,secondEmployeeSalary)
        PimTab.validateTheValuesForThiredEmoloyeeRow (thirdEmployeeFirsrName, jobTitleTitle,thirdEmployeeSalary)
          });
      
      after(() => {
        DeleteEmployeeHelper.deleteEmployeeHelper(firstEmployeeNumber);
        DeleteEmployeeHelper.deleteEmployeeHelper(secondEmployeeNumber);
        DeleteEmployeeHelper.deleteEmployeeHelper(thirdEmployeeNumber);
        Phase1Apis.deleteJobTitle(jobTitleId);
        Phase1Apis.deleteLocation(jobTitleId);
        Phase1Apis.deleteReport(ID)
        
      });
    
  });

   