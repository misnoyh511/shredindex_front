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

    it('Toggles show more/less text on button click', () => {
      let button = cy.get('#showMoreRatings');
      button.should('contain.text', 'Show more ratings +');
      button.click();
      button.should('contain.text', 'Show less ratings -');
      button.click();
      button.should('contain.text', 'Show more ratings +');
    });
  });

  context('All devices', () => {
    it('Verifies if Score Filter Toggles are present', () => {
      cy.get('.filters__scores').should('have.length.gt', 0);
    });

    it('Verifies if Stats Filter Toggles are present', () => {
      cy.get('.filters__stats').should('have.length.gt', 0);
    });

    it('Verifies if Features Filter Toggles are present', () => {
      cy.get('.filters__features').should('have.length.gt', 0);
    });

    it('Verifies if Show More Ratings Button toggles more content', () => {
      cy.get('#showMoreRatings').click();
      cy.get('#showMoreRatings').should('contain.text','Show less ratings -');
    });

    it('Verifies if Show More Stats Button toggles more content', () => {
      cy.get('#showMoreNumeric').click();
      cy.get('#showMoreNumeric').should('contain.text','Show less stats -');
    });
  });
});
