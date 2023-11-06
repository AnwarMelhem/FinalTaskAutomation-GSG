import GenericHelper from "../helpers/GenericHelper"

class Phase1Apis {
  static linkEmployeeWithJobTitleAndLocation(
    jobTitleId: number,
    locationId: number,
    empNumber: number
  ): Cypress.Chainable<any> {
    return cy.wrap(undefined).then(() => {
      cy.request({
        method: "PUT",
        url: `/web/index.php/api/v2/pim/employees/${empNumber}/job-details`,
        body: {
          jobTitleId: jobTitleId,
          locationId: locationId,
        },
      }).then((response) => {
        expect(response).property("status").to.equal(200);
      });
    });
  }


  static linkEmployeeWithSalaryAmount(
    empNumber: number
  ): Cypress.Chainable<any> {
    return cy.wrap(undefined).then(() => {
      cy.api({
        method: "POST",
        url: `/web/index.php/api/v2/pim/employees/${empNumber}/salary-components`,
        body: {
            salaryComponent:`${GenericHelper.genericRandomNumber()}`,
            salaryAmount:`${GenericHelper.genericRandomNumber()}`,
            currencyId: "EUR"
        },
      }).then((response) => {
        expect(response).property("status").to.equal(200);
      });
    });
  }


  static deleteJobTitle(
    jobTitleID: number
  ): Cypress.Chainable<any> {
    return cy.wrap(undefined).then(() => {
      cy.request({
        method: "DELETE",
        url: `/web/index.php/api/v2/admin/job-titles`,
        body: {
          ids: [
            jobTitleID
          ]
        },
      }).then((response) => {
        expect(response).property("status").to.equal(200);
      });
    });
  }

  static deleteLocation(
    LocationID: number
  ): Cypress.Chainable<any> {
    return cy.wrap(undefined).then(() => {
      cy.request({
        method: "DELETE",
        url: `/web/index.php/api/v2/admin/locations`,
        body: {
          ids: [
            LocationID
          ]
        },
      }).then((response) => {
        expect(response).property("status").to.equal(200);
      });
    });
  }

  static deleteReport(
    ReportID: number
  ): Cypress.Chainable<any> {
    return cy.wrap(undefined).then(() => {
      cy.request({
        method: "DELETE",
        url: `/web/index.php/api/v2/pim/reports/defined
        `,
        body: {
          ids: [
            ReportID
          ]
        },
      }).then((response) => {
        expect(response).property("status").to.equal(200);
      });
    });
  }

}

export default Phase1Apis;
