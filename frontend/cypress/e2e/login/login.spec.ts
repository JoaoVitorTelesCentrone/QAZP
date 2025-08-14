describe('Login', () => {

it('should login with alias', () => {
  cy.visit('http://localhost:3000/')
  cy.get('[data-testid="login-button-sidebar"]').click()
  cy.intercept('POST', '/api/User/login', {
    fixture: 'login-success.json'
  }).as('postLogin');
  cy.get('[data-testid="username-input-field"]').type('maria.souza');
  cy.get('[data-testid="password-input-field"]').type('Maria');
  cy.get('[data-testid="login-button"]').click()

  cy.wait('@postLogin');
  cy.get('[data-testid="toast-login-success"]').eq(0).should('have.text', 'Bem-vindo, Maria Souza!');
  })
})
it('should not login with wrong user', () => {
  cy.visit('http://localhost:3000/')
  cy.get('[data-testid="login-button-sidebar"]').click()
  cy.get('[data-testid="username-input-field"]').type('admin');
  cy.get('[data-testid="password-input-field"]').type('1234');
  cy.get('[data-testid="login-button"]').click()

  cy.wait(2000)
  cy.get('[data-testid="toast-login-error"]').eq(0).should('have.text', 'Usuário ou senha incorretos. Verifique as informações e tente novamente');
})
it('should not login with correct user', () => {
  cy.visit('http://localhost:3000/')
  cy.get('[data-testid="login-button-sidebar"]').click()
  cy.get('[data-testid="username-input-field"]').type('admin');
  cy.get('[data-testid="password-input-field"]').type('123');
  cy.get('[data-testid="login-button"]').click()

  cy.wait(2000)
  cy.get('[data-testid="toast-login-error"]').eq(0).should('have.text', 'Bem-vindo, Administrador!');
})