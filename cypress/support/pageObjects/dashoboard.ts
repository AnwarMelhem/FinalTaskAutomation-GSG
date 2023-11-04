export default class Dashboard{
    static mainMenuItems() {
        return cy.get(".oxd-sidepanel-body");
      }

    static clicksToBIMtab(){
        cy.intercept("/web/index.php/api/v2/pim/employees**").as("employees");
    cy.intercept("/web/index.php/api/v2/admin/job-titles**").as("jobTitles");
    cy.intercept("/web/index.php/api/v2/admin/employment-statuses**").as(
      "employmentStatuses"
    );
    cy.intercept("/web/index.php/api/v2/admin/subunits**").as("subunits");
    cy.intercept("/web/index.php/core/i18n/messages").as("messages");

    this.mainMenuItems().contains("PIM").click({force:true});

    cy.wait([
      "@employees",
      "@jobTitles",
      "@employmentStatuses",
      "@subunits",
      "@messages",
    ]);
    }
}

