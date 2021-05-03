describe('Preloader', () => {
  before(() => {
    cy.visit('/iframe.html?id=shred-index-components-preloader--preloader');
  });

  context('All devices', () => {
    it('Show children after loading', () => {
      cy.get('.foo-bar').should('be.visible');
    });
  });
});
