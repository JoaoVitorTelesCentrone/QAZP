beforeEach(() => {
    //When
    cy.visit("http://localhost:3000/");
});

describe('Given user is on Login Page test', {defaultCommandTimeout: 10000}, () => {
    it('Should Login on QAZP successfully', () => {
      //When
      cy.getByTestId('login-button').click()
     
      cy.visit('http://localhost:3000/')
      cy.get('.p-8 > .ant-btn').click()
      cy.get('[id="username"]').type('admin')
      cy.get('[id="password"]').type('123')
      cy.get('[data-testid="login-button"]').click()

      //Then
      cy.get('[class="ant-modal-title"]').should('not.exist')
      cy.get('[data-content=""] > div').should('be.visible').should('have.text', 'Bem-vindo, Administrador!')
      cy.url().should('equal', 'http://localhost:3000/dashboard')
    })
})

