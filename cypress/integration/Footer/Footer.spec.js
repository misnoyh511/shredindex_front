const dataProvider = [
  {
    name: 'Steph_nz',
    url: 'https://localhost/one',
    imageId: 'TW_z_iUD_bQ',
  },
  {
    name: 'Bakhtawar',
    url: 'https://localhost/two',
    imageId: 'W0i1N6FdCWA',
  },
];

describe('Footer', () => {
  before(() => {
    cy.visit('iframe.html?id=shred-index-components-footer--footer');
  });

  context('All devices', () => {
    it('Should show a copyright message', () => {
      cy.get('.footer__copyright').should('contain', 'Copyright 2022 Shred Index');
    });

    it('Should render a link', () => {
      cy.get('.footer__copyright').contains('a', 'Shred Index').should('have.attr', 'href', '#');
    });

    dataProvider.forEach((data, i) => {
      const { name, url, imageId } = data;
      const nth = i + 1;

      it(`Should render team member "${name}"`, () => {
        cy.get(`.team-members__member:nth-child(${nth}) .team-members__member-link`)
          .should('have.attr', 'href', url);

        cy.get(`.team-members__member:nth-child(${nth}) .team-members__member-name`)
          .should('contain', name);

        cy.get(`.team-members__member:nth-child(${nth}) .team-members__member-image`)
          .should('have.attr', 'src')
          .then((src) => {
            expect(src)
              .to
              .contain(imageId);
          });
      });
    });
  });
});
