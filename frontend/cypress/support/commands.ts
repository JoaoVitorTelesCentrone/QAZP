Cypress.Commands.add('getByTestId', (testId: string) => {
    cy.get(`[data-testid="${testId}"]`)
})

Cypress.Commands.add('writeInputText', (testId: string, value: string) => {
    cy.getByTestId(testId).type(value)
})

Cypress.Commands.add('clickOn', (testId: string) => {
    cy.getByTestId(testId).click()
})

Cypress.Commands.add('login', (username: string, password: string) => {
    cy.visit('http://localhost:3000/')
        .clickOn('header-login-button')
        .writeInputText('login-modal-username-field', username)
        .writeInputText('login-modal-password-field', password)
        .clickOn('data-testid="login-button')
})
