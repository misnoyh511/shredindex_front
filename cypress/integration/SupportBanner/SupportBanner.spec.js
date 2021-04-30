describe('Header', () => {
  it('Contains supporters', () => {
    cy.get('.supporters');
  });

  context('mobile resolution', () => {
    before(() => {
      // run these tests as if in a desktop
      // browser with a 720p monitor
      cy.viewport(990, 720);
    });
    it('Full resolution shown', () => {
      cy.get('.supporters').should('be.visible');
    });
  });

  context('full resolution', () => {
    before(() => {
      // run these tests as if in a mobile browser
      // and ensure our responsive UI is correct
      cy.viewport(1280, 720);
    });
    it('Full resolution shown', () => {
      cy.get('.supporters').should('be.visible');
    });
  });
});
