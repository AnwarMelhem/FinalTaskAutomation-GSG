import { ICreateAddJobTitlePayload } from "../apis/payload/add-job-title-payload";
import {ICreateAddJobTitleResponse } from "../apis/response/add-job-title-response"
import AddJobTitle from "../initializers/add-job-title-initializer"



const baseUrl = Cypress.config().baseUrl;
export const URLs = {
    users: `/web/index.php/api/v2/admin/job-titles`
}

class AddJobTitleHelper {
    static addJobTitle() {

        return cy.addJobTitle(URLs.users, AddJobTitle.initAddJobTitle()).then((response) => {
            response.data
        })

    }

    // export default class PimHelper {
    //     static addEmployee(employeeData: ICreateEmployeePayload) {
    //       return cy
    //         .addEmployee("POST", URLs.employees, PimInit.initEmployee(employeeData))
    //         .then((response) => response.data);
    //     }

  
   
}

export default AddJobTitleHelper;