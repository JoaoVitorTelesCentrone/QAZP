describe('Login', () => {
  it('Should Login on QAZP successfully', () => {
    cy.visit('http://localhost:3000/')
    cy.clickOn('header-login-button')

    cy.writeInputText('login-modal-username-field', 'admin')
    cy.writeInputText('login-modal-password-field', '123')
    cy.clickOn('data-testid="login-button')

    cy.get('[class="ant-modal-title"]').should('not.exist')
    cy.get('[data-content=""] > div').should('be.visible').should('have.text', 'Bem-vindo, Administrador!')
    cy.url().should('equal', 'http://localhost:3000/dashboard')
  })
})