const dataProvider = [
  {
    name: 'Steph_nz',
    url: 'https://localhost/one',
    imageId: '45204791',
  },
  {
    name: 'Bakhtawar',
    url: 'https://localhost/two',
    imageId: '66452927',
  },
];

describe('Footer', () => {
  beforeEach(() => {
    // cy.wait(500);
    cy.visit('iframe.html?id=shred-index-components-footer--footer');
  });

  context('All devices', () => {
    // it.skip('Should show a copyright message', () => {
    //   const d = new Date();
    //   const year = d.getFullYear();
    //   cy.get('.footer__copyright').should('contain', `Copyright ${year} Shred Index`);
    // });

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
