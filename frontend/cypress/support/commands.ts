Cypress.Commands.add('getByTestId', (testId: string) =>{
    cy.get(`[data-testid="${testId}"]`)
     
})

Cypress.Commands.add('getByClass', (className: string) =>{
    cy.get(`[class="${className}"]`)
})

Cypress.Commands.add('selectEventType', (eventType) => {
  cy.get(`[data-radix-collection-item="${eventType}"]`)
    .click()
})