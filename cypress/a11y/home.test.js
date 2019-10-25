describe("Accessibility checks for Home page", () => {

  beforeEach(() => {
    cy.visit("http://localhost:8000/")
    cy.injectAxe()
    cy.wait(500)
  });

  it("Has no detectable a11y violations on load", () => {
    cy.checkA11y()
  });

});
