describe.skip('ResortSingle', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?globals=&args=&id=shred-index-components-resortsingle--resort-story');
  });

  it('Renders the back button', () => {
    cy.get('.resort.back-button').should('exist');
  });

  it('Renders ResortHeader component', () => {
    cy.get('.resort-header').should('exist');
  });

  it('Renders ResortImageCarousel component', () => {
    cy.get('.resort-single__image-carousel').should('exist');
  });

  it('Renders ResortNumerics component', () => {
    cy.get('.numeric-list').should('exist');
  });

  it('Renders ResortGenerics component', () => {
    cy.get('.resort-single__generics').should('exist');
  });

  it('Renders ResortRatings component', () => {
    cy.get('.resort-ratings').should('exist');
  });

  it('Renders ResortComments component', () => {
    cy.get('.resort-comments').should('exist');
  });

  it('Renders Accomodation component', () => {
    cy.get('.resort-single__accomodation').should('exist');
  });

  it('Renders AdvertiseHere component', () => {
    cy.get('.resort-single__advertise').should('exist');
  });

  it('Renders Gear component', () => {
    cy.get('.resort-single__gear').should('exist');
  });

  it('Renders ResortMapCard component', () => {
    cy.get('.resort-single__map').should('exist');
  });

  it('Displays loading state correctly', () => {
    cy.visit('/iframe.html?globals=&id=shred-index-components-resortsingle--loading-story&viewMode=story');
    cy.get('.resort-card--skeleton').should('exist');
  });

  it('Displays error state correctly', () => {
    cy.visit('iframe.html?globals=&id=shred-index-components-resortsingle--error-story&viewMode=story');
    cy.get('.resort-card--error').should('exist');
  });
});
