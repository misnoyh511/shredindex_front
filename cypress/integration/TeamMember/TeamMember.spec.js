describe('Header', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Contains team members', () => {
    cy.get('.team-members-banner');
  });

  context('mobile resolution', () => {
    beforeEach(() => {
      // run these tests as if in a desktop
      // browser with a 720p monitor
      cy.viewport(990, 720);
    });
    it('Full resolution shown', () => {
      cy.get('.team-members-banner').should('be.visible');
    });
  });

  context('full resolution', () => {
    beforeEach(() => {
      // run these tests as if in a mobile browser
      // and ensure our responsive UI is correct
      cy.viewport(1280, 720);
    });
    it('Full resolution shown', () => {
      cy.get('.team-members-banner').should('be.visible');
    });
  });
});
