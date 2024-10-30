describe('template spec', () => {
  it('login', () => {
    cy.visit('localhost:3000/')
    cy.get('[href="/"]').click()
    cy.get('#email').type('admin')
    cy.get('#password').type('123')
    cy.get('[data-testid="login-button"]').click()

    //then 
    cy.url().should('be.equal' , 'http://localhost:3000/dashboard')
  })
})