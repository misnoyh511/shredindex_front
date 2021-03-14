describe('Test Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should see the page title', () => {
    cy.get('h1').contains('Shred Index');
  });

  it( 'Should see the page subtitle', () => {
    cy.get('#app p').first().contains('Live your best adventure lifestyle');
  });
});
