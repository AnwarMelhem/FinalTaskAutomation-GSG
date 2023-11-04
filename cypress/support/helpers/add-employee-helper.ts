import { ICreateEmployeePayload } from "../apis/payload/add-employee-payload";
import {ICreateEmployeeResponse } from "../apis/response/add-employee-response"
import AddAndDeleteEmployeeInit from "../initializers/add-Delete-employee-initializer"



const baseUrl = Cypress.config().baseUrl;
export const URLs = {
    users: `/web/index.php/api/v2/pim/employees`
}

export default class AddEmployeeHelper {
    static addEmployeeHelper() {

        return cy.addEmployee(URLs.users, AddAndDeleteEmployeeInit.initAddEmployee()).then((response) => {
            response.data
        })

    }}