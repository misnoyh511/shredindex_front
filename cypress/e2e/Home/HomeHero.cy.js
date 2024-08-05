describe('HomeHero', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=shred-index-components-homehero--hero-story');
  });

  context('All devices', () => {
    it('Displays the hero component with correct text and buttons', () => {
      // Check if the hero component exists
      cy.get('.hero').should('exist');

      // Check if the correct heading text is displayed
      cy.get('.hero__heading h1').should('contain.text', 'Live your best adventure lifestyle');

      // Check if the Explore resorts button exists and has correct text
      cy.get('.button-group .btn').contains('Explore resorts').should('exist');

      // Check if the Become a member button exists and has correct text (if uncommented)
      // cy.get('.button-group .btn').contains('Become a member').should('exist');
    });

    it('Displays the correct SVG based on screen size', () => {
      // Desktop
      cy.viewport(1280, 720);
      cy.get('.hero__svg--desktop').should('be.visible');
      cy.get('.hero__svg--tablet').should('not.be.visible');
      cy.get('.hero__svg--mobile').should('not.be.visible');

      // Tablet
      cy.viewport(768, 1024);
      cy.get('.hero__svg--tablet').should('be.visible');
      cy.get('.hero__svg--desktop').should('not.be.visible');
      cy.get('.hero__svg--mobile').should('not.be.visible');

      // Mobile
      cy.viewport(375, 667);
      cy.get('.hero__svg--mobile').should('be.visible');
      cy.get('.hero__svg--desktop').should('not.be.visible');
      cy.get('.hero__svg--tablet').should('not.be.visible');
    });
  });

  context('Mobile devices', () => {
    beforeEach(() => {
      cy.viewport(375, 667);
    });

    it('Should display the mobile SVG', () => {
      cy.get('.hero__svg--mobile').should('be.visible');
    });
  });

  context('Tablet devices', () => {
    beforeEach(() => {
      cy.viewport(768, 1024);
    });

    it('Should display the tablet SVG', () => {
      cy.get('.hero__svg--tablet').should('be.visible');
    });
  });

  context('Desktop devices', () => {
    before(() => {
      cy.viewport(1280, 720);
    });

    it('Should display the desktop SVG', () => {
      cy.get('.hero__svg--desktop').should('be.visible');
    });
  });
});
