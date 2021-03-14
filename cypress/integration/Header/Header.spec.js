describe('Header', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Contains a nav item', () => {
    cy.get('.c-header-nav-item');
  });
  it('Has a toggler button', () => {
    cy.get('.c-header-toggler').get('.c-header-toggler-icon');
  });

  context('mobile resolution', () => {
    beforeEach(() => {
      // run these tests as if in a desktop
      // browser with a 720p monitor
      cy.viewport(990, 720);
    });
    it('Mobile Hidden', () => {
      cy.get('.d-md-down-none').should('not.be.visible');
    });
    it('Full resolution shown', () => {
      cy.get('.d-lg-none').should('be.visible');
    });
  });

  context('full resolution', () => {
    beforeEach(() => {
      // run these tests as if in a mobile browser
      // and ensure our responsive UI is correct
      cy.viewport(1280, 720);
    });

    it('Mobile Hidden', () => {
      cy.get('.d-md-down-none').should('be.visible');
    });
    it('Full resolution shown', () => {
      cy.get('.d-lg-none').should('not.be.visible');
    });
  });
});
