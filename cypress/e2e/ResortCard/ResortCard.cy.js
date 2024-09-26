const dataProvider = {
  resortByUrlSegment: {
    highlights: [
      { id: '1', title: 'Drum n Bass', value: 88 },
      { id: '6', title: 'Snow Quality', value: 69 },
      { id: '7', title: 'Sexy Bitches', value: 55.3 },
    ],
    lowlights: [
      { id: '2', title: 'Family Vacation Score', value: 42 },
      { id: '4', title: 'Cannabis Friendly', value: 21.6 },
      { id: '5', title: 'Co-working Spaces', value: 7.9 },
    ],
    resort_images: [
      {
        id: '1', name: 'Fernie Bowls', alt: 'fernie-bowls', sort_order: 1,
        image: { path: 'https://www.snowseasoncentral.com/wp-content/uploads/2020/01/fernie-bowls.jpg', content_type: 'image/jpeg' },
      },
      {
        id: '2', name: 'Tokyo Elevator', alt: 'tokyo-elevator', sort_order: 1,
        image: { path: 'https://www.merqurycity.com/ssximages/tokyoinelevator.jpg', content_type: 'image/jpeg' },
      },
      {
        id: '3', name: 'Lots of Air', alt: 'lots-of-air', sort_order: 1,
        image: { path: 'https://www.mobygames.com/images/shots/l/109138-ssx-tricky-gamecube-screenshot-you-can-get-a-lot-of-air-at.png', content_type: 'image/jpeg' },
      },
    ],
    comments: [
      { id: '1', comment: 'Welcome back to Tokyo...', author: 'SSX Narrator' },
      { id: '2', comment: 'I is get flickety wickety...', author: 'Slippery G Nasty' },
    ],
  },
};

const mocksMinimalData = {
  resortByUrlSegment: {
    highlights: [
      { id: '1', title: 'Drum n Bass', value: 88 },
      { id: '6', title: 'Snow Quality', value: 69 },
    ],
    lowlights: [
      { id: '1', title: 'Drum n Bass', value: 88 },
      { id: '6', title: 'Snow Quality', value: 69 },
    ],
  },
};

describe('ResortSingle Card Full Expanded', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=shred-index-components--resort-card');
  });

  it('Card Expands or Collapses', () => {
    cy.get('.resort-card__wrap').then(($card) => {
      if ($card.hasClass('collapsed')) {
        cy.get('.resort-card__expand').click();
        cy.get('.resort-card__wrap').should('have.class', 'full-expanded');
      } else {
        cy.get('.resort-card__expand').click();
        cy.get('.resort-card__wrap').should('have.class', 'collapsed');
      }
    });
  });

  dataProvider.resortByUrlSegment.highlights.forEach((data, i) => {
    const { title, value } = data;
    const nth = i + 1;

    it(`Should render highlights "${title}"`, () => {
      cy.get(`.rating-list__rating:nth-child(${nth}) .rating__title`).should('contain.text', title);
      cy.get(`.rating-list__rating:nth-child(${nth}) .rating__bar`).should('have.attr', 'style').and('include', `width: ${value}%`);
    });
  });

  dataProvider.resortByUrlSegment.lowlights.forEach((data, i) => {
    const { title, value } = data;
    const nth = i + 1;

    it(`Should render lowlight "${title}"`, () => {
      cy.get(`.resort-card__content-2 .rating-list__rating:nth-child(${nth}) .rating__title`).should('contain.text', title);
      cy.get(`.resort-card__content-2 .rating-list__rating:nth-child(${nth}) .rating__bar`).should('have.attr', 'style').and('include', `width: ${value}%`);
    });
  });

  it('Has a card title', () => {
    cy.get('.rating__title').first().should('exist');
  });

  it('Navigates to an affiliate link when clicked', () => {
    cy.get('.resort-card__affiliate-link')
      .should('have.attr', 'href')
      .and('include', 'https://www.shredindex/resorts/');
  });

  it('Has a total rating', () => {
    cy.get('.rating--total-rating').should('exist');
  });

  it('Has a resort flag', () => {
    cy.get('.resort-card__country-flag-image').should('exist');
  });

  it('Has a location', () => {
    cy.get('.resort-card__location').should('exist');
  });

  it('Has a description', () => {
    cy.get('.resort-card__description').should('exist');
  });

  it('Has a share button', () => {
    cy.get('.resort-card__share-wrap').should('exist');
  });

  dataProvider.resortByUrlSegment.resort_images.forEach((data) => {
    const { alt, image: { path } } = data;

    it(`Should render carousel images "${alt}"`, () => {
      cy.get(`[alt="${alt}"]`).should('have.attr', 'src').and('include', path);
    });
  });

  dataProvider.resortByUrlSegment.comments.forEach((data) => {
    const { comment, author } = data;

    it(`Should render carousel comment by "${author}"`, () => {
      cy.get('.carousel__author').contains(author);
    });
  });

  it('Has a Go to ResortSingle Button', () => {
    cy.get('.resort-card__resort-link').should('exist');
  });
});

describe('ResortSingle Card Loading', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=shred-index-components--resort-card&args=cardState:Loading');
  });

  it('Has render a skeleton card', () => {
    cy.get('.resort-card--skeleton').should('exist');
  });

  it('Shows a placeholder image', () => {
    cy.get('.skeleton-content-wrap').should('exist');
  });
});

describe('ResortSingle Card Minimal Data', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=shred-index-components--resort-card&args=cardState:Minimal+Data');
  });

  it('Has "ratings" list label', () => {
    cy.get('.resort-card__sub-ratings-list .resort-card__small-label').should('contain.text', 'Ratings');
  });

  mocksMinimalData.resortByUrlSegment.highlights.forEach((data, i) => {
    const { title, value } = data;
    const nth = i + 1;

    it(`Should render rating "${title}"`, () => {
      cy.get(`.rating-list__rating:nth-child(${nth}) .rating__title`).should('contain.text', title);
      cy.get(`.rating-list__rating:nth-child(${nth}) .rating__bar`).should('have.attr', 'style').and('include', `width: ${value}%`);
    });
  });

  it('Shows a world flag', () => {
    cy.get('.resort-card__country-flag-image').should('have.attr', 'src').and('include', 'International_Flag_of_Planet_Earth');
  });

  it('Has a No Location Available prompt', () => {
    cy.get('.resort-card__location-title .resort-card__small-label').should('contain.text', 'Location unknown');
  });
});

describe('ResortSingle Card No Data', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=shred-index-components--resort-card&args=cardState:No+Data');
  });

  it('Total score shows n/a', () => {
    cy.get('.rating__number-big').should('contain.text', 'n/a');
  });

  it('Shows a world flag', () => {
    cy.get('.resort-card__country-flag-image').should('have.attr', 'src').and('include', 'International_Flag_of_Planet_Earth');
  });

  it('Has a No Location Available prompt', () => {
    cy.get('.resort-card__location-title .resort-card__small-label').should('contain.text', 'Location unknown');
  });

  it('Has an unrated resort Prompt', () => {
    cy.get('.resort-card__sub-ratings-list .resort-card__small-label').should('contain.text', 'Resort is unrated');
  });
});
