const dataProvider = Array.from(Array(10).keys());

describe('Ranked ResortSingle List Full', () => {
  beforeEach(() => {
    context('All devices', () => {
      cy.visit('/iframe.html?id=shred-index-components--pagination');
    });
  });

  dataProvider.forEach((page, index) => {
    const current = 1;

    it('Pagination should be showing the active page', () => {
      cy.get('.page-item.active').should('contain.text', `${current}`);
    });

    it('Should be able to navigate a page', () => {
      cy.get('.page-link[aria-label="Next"]').then((el) => {
        if (el.hasClass('disabled')) {
          return;
        }
        cy.wrap(el).click();
        cy.get('.page-item.active').should('contain.text', `${current + 1}`);
      });
    });

    it('Should show start ellipsis', () => {
      if (current >= 2) {
        cy.get('.pagination .page-item:nth-child(3)').should('contain.text', '...');
      } else if (current < 2) {
        cy.get('.pagination .page-item:nth-child(3)').should('not.contain.text', '...');
      }
    });

    it('Should show end ellipsis', () => {
      if (current < 8) {
        cy.get('.pagination .page-item:nth-last-child(3)').should('contain.text', '...');
      } else if (current >= 8) {
        cy.get('.pagination .page-item:nth-last-child(3)').should('not.contain.text', '...');
      }
    });
  });

  it('Should be able to navigate to first page', () => {
    cy.get('.page-link[aria-label="First"]').then((el) => {
      if (el.hasClass('disabled')) {
        return;
      }
      cy.wrap(el).click();
      cy.wait(500);
      cy.get('.page-item.active').should('contain.text', '1');
    });
  });

  it('Should be able to navigate to last page', () => {
    cy.get('.page-link[aria-label="Last"]').then((el) => {
      if (el.hasClass('disabled')) {
        return;
      }
      cy.wrap(el).click();
      cy.wait(500);
      cy.get('.page-item.active').should('contain.text', '10');
    });
  });
});
