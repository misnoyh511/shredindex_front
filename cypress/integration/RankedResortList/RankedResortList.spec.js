import resortOne from './dummyResortOne';
import resortTwo from './dummyResortTwo';

// eslint-disable-next-line no-unused-vars
const dataProvider = {
  resortPage: [
    {
      data: [
        resortOne,
        resortTwo,
        resortOne,
        resortTwo,
        resortOne,
      ],
      paginatorInfo: {
        currentPage: 1,
        lastPage: 3,
      },
    },
    {
      data: [
        resortOne,
        resortTwo,
        resortOne,
        resortTwo,
        resortOne,
      ],
      paginatorInfo: {
        currentPage: 2,
        lastPage: 3,
      },
    },
    {
      data: [
        resortOne,
        resortTwo,
      ],
      paginatorInfo: {
        currentPage: 3,
        lastPage: 3,
      },
    },
  ],
};

describe('Ranked Resort List Full', () => {
  before(() => {
    context('All devices', () => {
      cy.visit('/iframe.html?id=shred-index-components--ranked-resort-list');
    });
  });

  context('Mobile devices', () => {
    before(() => {
      cy.viewport(375, 667);
    });

    it('Should has a small pagination', () => {
      cy.get('.pagination-sm').should('be.visible');
    });
  });

  context('Greater than mobile', () => {
    after(() => {
      cy.viewport(375, 667);
    });

    it('Should has a large pagination', () => {
      cy.get('.pagination-lg').should('be.visible');
    });
  });

  it('Should have a filtering area', () => {
    cy.get('.ranked-resort-list__filters-wrap').should('exist');
  });

  dataProvider.resortPage.forEach((resort, index, i) => {
    const pageIndex = index + 1;

    resort.data.forEach((card, i) => {
      const { title } = card;
      const nth = i + 1;

      it(`Should render a list of resort cards "${title}"`, () => {
        cy.get(`.resort-card:nth-child(${nth}) .card-header`).should('contain.text', `${title}`);
      });
    });

    it('Should be able to navigate page', () => {
      cy.get('.page-link[aria-label="Next"]').then((el) => {
        if (el.hasClass('disabled')) {
          return;
        }
        cy.get('.ranked-resort-result-count__page-info-text').should('contain.text', `${`Page ${pageIndex} of ${dataProvider.resortPage.length}`}`);
        cy.wrap(el).click();
        cy.get('.ranked-resort-result-count__page-info-text').should('contain.text', `${`Page ${pageIndex + 1} of ${dataProvider.resortPage.length}`}`);
      });
    });
  });
});

describe('Ranked Resort List Error', () => {
  before(() => {
    context('All devices', () => {
      cy.visit('/iframe.html?id=shred-index-components--ranked-resort-list&args=listState:Error');
    });
  });

  it('Should render an Error Card', () => {
    cy.get('.resort-card--error').should('exist');
  });

  it('Should display an error', () => {
    cy.get('.resort-card__error-details-title').should('contain.text', 'Error');
  });
});

describe('Ranked Resort List Loading', () => {
  before(() => {
    context('All devices', () => {
      cy.visit('/iframe.html?id=shred-index-components--ranked-resort-list&args=listState:Loading');
    });
  });

  dataProvider.resortPage[0].data.forEach((card, i) => {
    const nth = i + 1;

    it('Should render a list of resort card skeletons', () => {
      cy.get(`.resort-card:nth-child(${nth}).resort-card--skeleton`).should('exist');
    });
  });
});
