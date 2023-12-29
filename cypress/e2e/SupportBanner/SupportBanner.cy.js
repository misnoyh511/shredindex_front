const dataProvider = [
  {
    name: 'TEST',
    url: 'https://freebiesupply.com/logos/test-logo-2/',
    imageName: 'test-1-logo-png-transparent',
  },
  {
    name: 'Visa',
    url: 'https://freebiesupply.com/logos/visa-logo/',
    imageName: 'visa-logo-png-transparent',
  },
  {
    name: 'The North Face',
    url: 'https://freebiesupply.com/logos/the-north-face-logo/',
    imageName: 'the-north-face-1-logo-png-transparent',
  },
  {
    name: 'Pepsi',
    url: 'https://freebiesupply.com/logos/pepsi-logo/',
    imageName: 'pepsi-logo-png-transparent',
  },
  {
    name: 'Ray Ban',
    url: 'https://freebiesupply.com/logos/ray-ban-logo/',
    imageName: 'ray-ban-logo-png-transparent',
  },
];

describe('Support Banner', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=shred-index-components-support-banner--support-banner');
  });

  context('All devices', () => {
    dataProvider.forEach((data, i) => {
      const { name, url, imageName } = data;
      const nth = i + 1;

      it(`Should render supporter "${name}"`, () => {
        cy.get(`.support-banner__supporter:nth-child(${nth}) .support-banner__supporter-link`)
          .should('have.attr', 'href', url);

        cy.get(`.support-banner__supporter:nth-child(${nth}) .support-banner__supporter-image`)
          .should('have.attr', 'src')
          .then((src) => {
            expect(src)
              .to
              .contain(imageName);
          });
      });
    });
  });
});
