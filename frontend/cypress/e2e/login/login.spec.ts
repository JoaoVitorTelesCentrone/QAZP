describe('Login', () => {
  it('Should login on QAZP successfully', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.p-8 > .ant-btn').click()

    cy.get('[id="username"]').type('admin')
    cy.get('[id="password"]').type('123')
    cy.get('[data-testid="login-button"]').click()

    cy.get('[class="ant-modal-title"]').should('not.exist')
    cy.get('[data-content=""] > div').should('be.visible').should('have.text', 'Bem-vindo, Administrador!')
    cy.url().should('equal', 'http://localhost:3000/dashboard')
  })
}) 