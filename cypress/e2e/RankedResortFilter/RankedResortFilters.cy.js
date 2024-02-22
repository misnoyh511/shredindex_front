describe('Filters', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=shred-index-components-rankedresortfilter--filters');
  });

  context('All devices', () => {
    it('Shows a title Scores', () => {
      cy.get('.filters__scores').should('contain.text', 'Ratings');
    });

    it('Shows a title Stats', () => {
      cy.get('.filters__stats').should('contain.text', 'Stats');
    });

    it('Shows a title Features', () => {
      cy.get('.filters__features').should('contain.text', 'Must have features');
    });
  });
});
