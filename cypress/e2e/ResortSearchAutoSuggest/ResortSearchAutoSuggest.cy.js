describe('ResortSearchAutoSuggest', () => {
  context('Default state', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=shred-index-components-search--default');
    });

    it('Displays the search input', () => {
      cy.get('input[type="text"]').should('exist');
    });
  });
});
