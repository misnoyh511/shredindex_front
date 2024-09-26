describe('Header', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=shred-index-components-header--header');
  });

  context('All devices', () => {
    it('Displays the app logo for desktop', () => {
      cy.get('.header__logo.d-none.d-md-block').should('exist'); // Check the desktop logo wrapper exists
      cy.get('.header__logo-image').should('exist'); // Check that the SVG logo is rendered
      cy.get('.header__logo-image').should('have.attr', 'name', 'logo'); // Verify that the name attribute matches
    });
  });

  context('Mobile devices', () => {
    beforeEach(() => {
      cy.viewport(375, 667);
    });

    it('Displays the app logo for mobile', () => {
      cy.get('.header__logo.d-md-none').should('exist'); // Check the mobile logo wrapper exists
      cy.get('.header__logo-image').should('exist'); // Check that the SVG logo is rendered
      cy.get('.header__logo-image').should('have.attr', 'name', 'logo'); // Verify that the name attribute matches
    });

    it('Should toggle the sidebar on mobile', () => {
      cy.get('.header__toggler').should('be.visible');
      cy.get('.header__toggler').click();
      cy.get('.sidebar-nav').should('be.visible');
      cy.get('.sidebar-nav__item').should('have.length.greaterThan', 0).should('be.visible');
      cy.get('.sidebar-backdrop').click({ force: true });
      cy.get('.sidebar-nav').should('not.be.visible'); // Ensure the sidebar hides after backdrop click
      cy.get('.sidebar-nav__link').contains('Foo').should('exist');
      cy.get('.sidebar-nav__link').contains('Bar').should('exist');
    });
  });

  context('Desktop devices', () => {
    before(() => {
      cy.viewport(1280, 720);
    });

    it('Should display the desktop navigation', () => {
      cy.get('.header-nav__item').should('have.length.greaterThan', 0).should('be.visible');
      cy.get('.header-nav__link').contains('Foo').should('exist');
      cy.get('.header-nav__link').contains('Bar').should('exist');
    });
  });
});
