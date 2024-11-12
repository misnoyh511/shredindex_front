describe('RankedResortFilters', () => {
  beforeEach(() => {
    // Visit the Storybook iframe URL for the filters component
    cy.visit('/iframe.html?id=shred-index-components-rankedresortfilter--filters')
    // Wait for Apollo mock data to load
    cy.wait(500) // Give time for Apollo mock data to resolve
  })

  describe('Filter Types from GraphQL', () => {
    it('renders filters based on mock data', () => {
      // Check for specific filters from the mock data
      cy.contains('Average Annual Snowfall').should('exist')
      cy.contains('Number of Runs').should('exist')
      cy.contains('Base Elevation').should('exist')
      cy.contains('Night Skiing Available').should('exist')
    })
  })
})
