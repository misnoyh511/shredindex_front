// eslint-disable-next-line no-unused-vars
const dataProvider = {
  title: 'Pipe Dream',
  url_segment: 'pipedream',
  description: 'Perpendicular curves to the ceiling for maximum air time',
  location: {
    country: {
      name: 'Antarctica',
    },
    state: {
      name: 'Dont have a State ey bro',
    },
  },
  ratings: [
    {
      title: 'Total Shred Score',
      value: 76,
    },
  ],
  numerics: [
    {
      title: 'Average Annual Snowfall',
      value: 10,
    },
  ],
  generics: [
    {
      title: 'Snow Making',
      value: 'true',
    },
  ],
};

describe('Resort', () => {
  beforeEach(() => {
    context('All devices', () => {
      cy.visit('/iframe.html?id=shred-index-components-resort--resort');
    });
  });

  it('Has a resort title', () => {
    cy.get('.resort-header__title').should('be.visible');
  });

  it('Has a resort country', () => {
    cy.get('.resort-header__country-name').should('contain.text', 'Antarctica');
  });

  it('Has a resort state', () => {
    cy.get('.resort-header__state-name').should('contain.text', 'Dont have a State ey bro');
  });

  it('Has a description', () => {
    cy.get('.resort__description-content').should('contain.text', 'Perpendicular curves to the ceiling for maximum air time');
  });

  it('Should render a rating Total Shred Score', () => {
    cy.get('.resort-rating__label')
      .should('contain', 'Total Shred Score');
  });

  it('Rating should have a value', () => {
    cy.get('.rating__value').within(($rating) => {
      cy.get('.progress-bar').should('have.attr', 'aria-valuenow', '76');
    });
  });

  it('Should render a numeric "Average Annual Snowfall"', () => {
    cy.get('.statistic__label')
      .should('contain', 'Average Annual Snowfall');
  });

  it('Should render a numeric value "Average Annual Snowfall"', () => {
    cy.get('.statistic__value').within(($statistic) => {
      cy.get('.progress-bar').should('have.attr', 'aria-valuenow', '10');
    });
  });

  it('Should render a generic "Snow Making"', () => {
    cy.get('.generic__label')
      .should('contain', 'Snow Making');
  });

  it('Should render a generic', () => {
    cy.get('.generic__value')
      .should('contain.text', 'true');
  });
});
