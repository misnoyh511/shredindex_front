describe('FilterToggleButton', () => {
  beforeEach(() => {
    context('All devices', () => {
      cy.visit('/iframe.html?id=shred-index-components-filter-toggle-button--filter-toggle-button');
    });
  });

  it('Has a filter toggle button', () => {
    cy.get('.filter-toggle-button').should('be.visible');
  });

  it('Can turn on and off the filter toggle button without children', () => {
    cy.get('.filter-toggle-button.no-child').then(($frame) => {
      if ($frame.find('.no-child .filter-toggle-button__frame--filter-off')) {
        cy.get('.no-child .filter-toggle-button__frame').click();
        cy.wait(100);
        cy.get('.no-child .filter-toggle-button__frame--filter-on').should('exist');
        cy.get('.no-child .filter-toggle-button__frame-header-close').click();
        cy.wait(100);
        cy.get('no-child .filter-toggle-button__frame--filter-on').should('not.exist');
      } else {
        cy.get('.no-child .filter-toggle-button__frame-header-close').click();
        cy.wait(100);
        cy.get('.no-child .filter-toggle-button__frame--filter-on').should('not.exist');
      }
    });
  });

  it('Can turn on and off the filter toggle button without children with a keypress', () => {
    cy.get('.filter-toggle-button.no-child').then(($frame) => {
      if ($frame.find('.no-child .filter-toggle-button__frame--filter-off')) {
        cy.get('.no-child .filter-toggle-button__frame').trigger('keypress', { keyCode: 13 });
        cy.wait(100);
        cy.get('.no-child .filter-toggle-button__frame--filter-on').should('exist');
        cy.get('.no-child .filter-toggle-button__frame-header-close').trigger('keypress', { keyCode: 13 });
        cy.wait(100);
        cy.get('no-child .filter-toggle-button__frame--filter-on').should('not.exist');
      } else {
        cy.get('.no-child .filter-toggle-button__frame-header-close').trigger('keypress', { keyCode: 13 });
        cy.wait(100);
        cy.get('.no-child .filter-toggle-button__frame--filter-on').should('not.exist');
      }
    });
  });

  it('Can turn on and off the filter toggle button with children and show body content', () => {
    cy.get('.filter-toggle-button.with-child').then(($frame) => {
      if ($frame.find('.with-child .filter-toggle-button__frame--filter-off')) {
        cy.get('.with-child .filter-toggle-button__frame').click();
        cy.wait(500);
        cy.get('.with-child .filter-toggle-button__frame--filter-on').should('exist');
        cy.get('.with-child .filter-toggle-button__frame-body').should('exist');
        cy.get('.with-child .filter-toggle-button__frame-header-close').click();
        cy.wait(100);
        cy.get('with-child .filter-toggle-button__frame--filter-on').should('not.exist');
      } else {
        cy.get('.with-child .filter-toggle-button__frame-header-close').click();
        cy.wait(100);
        cy.get('.with-child .filter-toggle-button__frame--filter-on').should('not.exist');
        cy.get('.with-child .filter-toggle-button__frame-body').should('not.exist');
      }
    });
  });

  it('Can turn on and off the filter toggle button with children and show body content with keypress', () => {
    cy.get('.filter-toggle-button.with-child').then(($frame) => {
      if ($frame.find('.with-child .filter-toggle-button__frame--filter-off')) {
        cy.get('.with-child .filter-toggle-button__frame').trigger('keypress', { keyCode: 13 });
        cy.wait(500);
        cy.get('.with-child .filter-toggle-button__frame--filter-on').should('exist');
        cy.get('.with-child .filter-toggle-button__frame-body').should('exist');
        cy.get('.with-child .filter-toggle-button__frame-header-close').trigger('keypress', { keyCode: 13 });
        cy.wait(100);
        cy.get('with-child .filter-toggle-button__frame--filter-on').should('not.exist');
      } else {
        cy.get('.with-child .filter-toggle-button__frame-header-close').trigger('keypress', { keyCode: 13 });
        cy.wait(100);
        cy.get('.with-child .filter-toggle-button__frame--filter-on').should('not.exist');
        cy.get('.with-child .filter-toggle-button__frame-body').should('not.exist');
      }
    });
  });

  it('Has a label', () => {
    cy.get('.filter-toggle-button__frame-header-title').should('contain.text', 'Has a terrain park');
  });

  it('Has a tool-tip icon', () => {
    cy.get('.info-icon').should('contain.text', '?');
  });

  it('Has a tool-tip ', () => {
    cy.get('.with-child .info-tooltip').trigger('mouseover');
    cy.wait(100);
    cy.get('.tooltip').should('be.visible');
  });

  it('Ensures the tooltip has the right size and positions in the DOM', () => {
    cy.get('.info-tooltip').should('have.css', 'font-size', '16px');
    cy.get('.info-tooltip').should('have.css', 'margin-left', '8px');
    cy.get('.info-tooltip').should('have.css', 'position', 'static');
  });

  it('Ensures toggle button and tooltip works with multiple instances', () => {
    cy.get('.filter-toggle-button').should('have.length', 2);
    cy.get('.info-tooltip').should('have.length', 2);
    cy.get('.filter-toggle-button').first().click();
    cy.get('.info-tooltip').first().trigger('mouseover');
    cy.get('.tooltip').first().should('be.visible');
  });

  it('Ensures handleClose works with keypress', () => {
    cy.get('.no-child .filter-toggle-button__frame').click();
    cy.get('.no-child .filter-toggle-button__frame--filter-on').should('exist');
    cy.get('.no-child .filter-toggle-button__frame-header-close').trigger('keypress', { keyCode: 13 });
    cy.wait(2000);
    cy.get('.no-child .filter-toggle-button__frame--filter-on').should('not.exist');
  });

  it('Ensures handleToggle works with keypress', () => {
    cy.get('.no-child .filter-toggle-button__frame--filter-off').trigger('keypress', { keyCode: 13 });
    cy.wait(2000);
    cy.get('.no-child .filter-toggle-button__frame--filter-on').should('exist');
  });

  it('Has a close icon that responds to clicks', () => {
    cy.get('.no-child .filter-toggle-button__frame').click();
    cy.get('.no-child .filter-toggle-button__frame--filter-on').should('exist');
    cy.get('.no-child .filter-toggle-button__frame-header-close').click();
    cy.wait(500);
    cy.get('.no-child .filter-toggle-button__frame--filter-off').should('exist');
  });

  it('renders the correct label', () => {
    cy.get('.filter-toggle-button.no-child .filter-toggle-button__frame-header-title').then(($label) => {
      expect($label.text()).to.equal('Has a terrain park');
    });
  });

  it('Ensures the provided classname is applied', () => {
    cy.get('.filter-toggle-button.with-child').should('have.class', 'with-child');
  });
});
