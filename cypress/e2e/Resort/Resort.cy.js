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
  ratingScores: [
    {
      title: 'Digital Nomad Score',
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
  comments: [
    {
      author: 'John Doe',
      comment: 'Amazing place!',
    },
  ],
  resort_images: [
    {
      id: '1',
      name: 'Image 1',
      alt: 'Image 1 alt text',
      sort_order: 1,
      image: {
        path: '/path/to/image1.jpg',
        content_type: 'image/jpeg',
      },
    },
  ],
};

describe('Resort', () => {
  before(() => {
    context('All devices', () => {
      cy.visit('/iframe.html?id=shred-index-components-resort--resort');
    });
  });

  it('Has a resort title', () => {
    cy.get('.rating__title').should('be.visible').and('contain.text', dataProvider.title);
  });

  it('Has a resort country', () => {
    cy.get('.resort-card__location-title').should('contain.text', dataProvider.location.country.name);
  });

  it('Has a description', () => {
    cy.get('.resort-card__description-single-resort').should('contain.text', dataProvider.description);
  });

  it('Should render a rating Digital Nomad Score', () => {
    cy.get('.rating__title').should('contain', dataProvider.ratingScores[0].title);
  });

  it('Statistic should have a value', () => {
    cy.get('.rating__number-big').should('contain', dataProvider.ratingScores[0].value);
  });

  it('Should render a numeric "Average Annual Snowfall"', () => {
    cy.get('.statistic__title').should('contain', dataProvider.numerics[0].title);
  });

  it('Should render a numeric value "Average Annual Snowfall"', () => {
    cy.get('.statistic__number-big').should('contain', dataProvider.numerics[0].value);
  });

  it('Should render images in the carousel', () => {
    cy.get('.resort-single__image-carousel img').should('have.attr', 'src', dataProvider.resort_images[0].image.path);
  });

  it('Should render comments section', () => {
    cy.get('.resort-comments').should('be.visible');
  });

  it('Should render a comment author', () => {
    cy.get('.carousel__author').should('contain.text', dataProvider.comments[0].author);
  });

  it('Should render a comment text', () => {
    cy.get('.carousel__comment-text').should('contain.text', dataProvider.comments[0].comment);
  });

  it('Should render a map', () => {
    cy.get('.resort__map-card').should('be.visible');
  });

  it('Should have a back button', () => {
    cy.get('.resort.back-button').should('be.visible');
  });

  it('Back button should navigate back', () => {
    cy.get('.resort.back-button').click();
    cy.location('pathname').should('not.contain', '/resorts/pipedream');
  });
});
