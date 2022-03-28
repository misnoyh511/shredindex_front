describe('Header', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=shred-index-components-header--header');
  });

  context('All devices', () => {
    it('Displays the app logo', () => {
      cy.get('.header__logo').should('exist');
      cy.get('.header__logo').should('have.attr', 'href', '/');
      cy.get('.header__logo-image').should('have.attr', 'src')
        .then((src) => {
          expect(src)
            .to
            .contain('images/logo.svg');
        });
    });
  });

  context('Mobile devices', () => {
    before(() => {
      cy.viewport(375, 667);
    });

    it('Should provide navigation', () => {
      cy.get('.header__toggler').should('be.visible');
      cy.get('.header__toggler').click();
      cy.get('.sidebar-nav').should('be.visible');
      cy.get('.sidebar-nav__item').should('have.length.greaterThan', 0).should('be.visible');
      cy.get('.sidebar-backdrop').click({ force: true });
      cy.get('.sidebar-nav').should('be.hidden');
      cy.get('.sidebar-nav__link').contains('Foo').should('exist');
      cy.get('.sidebar-nav__link').contains('Bar').should('exist');
    });
  });

  context('Desktop devices', () => {
    before(() => {
      cy.viewport(1280, 720);
    });

    it('Should provide navigation', () => {
      cy.get('.header-nav__item').should('have.length.greaterThan', 0).should('be.visible');
      cy.get('.header-nav__link').contains('Foo').should('exist');
      cy.get('.header-nav__link').contains('Bar').should('exist');
    });
  });
});
