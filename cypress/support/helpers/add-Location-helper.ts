import { ICreateLocationPayload } from "../apis/payload/add-location-payload";
import {ICreateLocationResponse } from "../apis/response/add-location-response"
import AddLocation from "../initializers/add-Location-initializer"



const baseUrl = Cypress.config().baseUrl;
export const URLs = {
    users: `/web/index.php/api/v2/admin/locations`
}

class AddLocationHelper {
    static addLocation() {

        return cy.addLocation(URLs.users, AddLocation.initAddLocation()).then((response) => {
            response.data
        })

    }

   
  
   
}

export default AddLocationHelper;