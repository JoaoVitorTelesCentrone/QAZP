Cypress.Commands.add('getByTestId', (testId: string) =>{
    cy.get(`[data-testid="${testId}"]`)
})