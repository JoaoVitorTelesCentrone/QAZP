describe('Login', () => {

  const fazerLogin = () => {
    cy.visit('http://localhost:3000/')
    cy.get('.p-8 > .ant-btn').click()
    cy.get('[id="username"]').type('admin')
    cy.get('[id="password"]').type('123')
    cy.get('[data-testid="login-button"]').click()
  }
beforeEach(() =>{
  fazerLogin()
})

afterEach(() =>{
  cy.get('.fixed > .text-white').click();
})
  it('Should visit Orçamentos Page', () => {
    cy.get(':nth-child(2) > .block').click();
    cy.url().should('equal', 'http://localhost:3000/quote')
  })
  it('Should visit Clientes Page', () => {
    cy.get(':nth-child(3) > .block').click();
    cy.url().should('equal', 'http://localhost:3000/clients')
  })
})