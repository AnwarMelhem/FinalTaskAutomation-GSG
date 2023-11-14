// This file for shared helper in system 
export default class SharedHelper {

  static extractIDFromURL() {
    return new Promise((resolve, reject) => {
      cy.url().then((url) => {
        const id = url.split("/").pop();
        cy.log(`The ID from redirected URL is: ${id}`);
        resolve(id); // Resolve the promise with the extracted ID
      });
    });
  }

  static checkLoadingSpinnerIsExist(isExist: boolean) {
    cy.get(".oxd-loading-spinner-container").should(
      isExist ? "exist" : "not.exist"
    );
  }
}
