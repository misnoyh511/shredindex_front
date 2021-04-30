describe('Footer', () => {
  before(() => {
    cy.visit('/');
  });

  it('Contains a nav link', () => {
    cy.get('.nav-link');
  });

  context('mobile resolution', () => {
    before(() => {
      // run these tests as if in a desktop
      // browser with a 720p monitor
      cy.viewport(990, 720);
    });
    it('Full resolution shown', () => {
      cy.get('.nav-link').should('be.visible');
    });
  });

  context('full resolution', () => {
    before(() => {
      // run these tests as if in a mobile browser
      // and ensure our responsive UI is correct
      cy.viewport(1280, 720);
    });
    it('Full resolution shown', () => {
      cy.get('.nav-link').should('be.visible');
    });
  });
});
