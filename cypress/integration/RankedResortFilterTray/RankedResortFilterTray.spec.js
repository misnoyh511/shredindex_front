describe('RankedResortFilter Tray', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=shred-index-components-rankedresortfilter--filter-tray');
  });

  context('All devices', () => {
    it('Opens filter tray', () => {
      cy.get('.filter-menu__show-filters-tray').click().then(() => {
        cy.wait(100);
      });
      cy.get('.filter-tray').should('exist');
    });

    it('Should close filter tray when the modal header close button is hit', () => {
      cy.get('.filter-menu__show-filters-tray').click().then(() => {
        cy.wait(100);
      });
      cy.get('.filter-tray').should('exist');
      cy.get('.filter-tray .modal-content .modal-header .btn-close').click().then(() => {
        cy.wait(100);
      });
      cy.get('.filter-tray .modal-content .modal-header .btn-close').should('not.exist');
      cy.get('.filter-tray').should('not.exist');
    });

    it('Opens lifestyle tray', () => {
      cy.get('.filter-menu__show-lifestyles-tray').click().then(() => {
        cy.wait(100);
      });
      cy.get('.lifestyle-tray').should('exist');
    });

    it('Should close lifeStyles tray when the modal header close button is hit', () => {
      if (cy.get('.filter-tray').should('not.exist')) {
        cy.get('.filter-menu__show-lifestyles-tray').click().then(() => {
          cy.wait(100);
        });
        cy.get('.lifestyle-tray').should('exist');
        cy.get('.modal.lifestyle-tray .modal-content .modal-header .btn-close').click().then(() => {
          cy.wait(100);
        });
        cy.get('.lifestyle-tray').should('not.exist');
      } else {
        cy.get('.modal.lifestyle-tray .modal-content .modal-header .btn-close').click().then(() => {
          cy.wait(100);
        });
        cy.get('.lifestyle-tray').should('not.exist');
      }
    });

    it('Should close filter tray when clicking the modal backdrop', () => {
      if (cy.get('.filter-tray').should('not.exist')) {
        cy.get('.filter-menu__show-filters-tray').click().then(() => {
          cy.wait(100);
        });
        cy.get('.filter-tray').should('exist');
        cy.get('.modal').click({ force: true }).then(() => {
          cy.wait(1000);
        });
        cy.get('.filter-tray').should('not.exist');
      } else {
        cy.get('.modal').click({ force: true }).then(() => {
          cy.wait(1000);
        });
        cy.get('.filter-tray').should('not.exist');
      }
    });

    it('Should close lifeStyles tray when clicking the modal backdrop', () => {
      if (cy.get('.filter-tray').should('not.exist')) {
        cy.get('.filter-menu__show-lifestyles-tray').click().then(() => {
          cy.wait(100);
        });
        cy.get('.lifestyle-tray').should('exist');
        cy.get('.modal').click({ force: true }).then(() => {
          cy.wait(1000);
        });
        cy.get('.lifestyle-tray').should('not.exist');
      } else {
        cy.get('.modal').click({ force: true }).then(() => {
          cy.wait(1000);
        });
        cy.get('.lifestyle-tray').should('not.exist');
      }
    });
  });

  context('Mobile devices', () => {
    before(() => {
      cy.viewport(375, 667);
    });

    it('Tray should be fullscreen', () => {
      if (cy.get('.filter-tray').should('not.exist')) {
        cy.get('.filter-menu__show-filters-tray').click();
        cy.wait(100);
        cy.get('.filter-tray').should('exist');
      }
      cy.get('.modal-dialog').invoke('outerWidth').should('equal', 375);
    });
  });
});
