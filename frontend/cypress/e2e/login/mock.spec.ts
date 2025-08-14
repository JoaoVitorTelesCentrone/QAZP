describe('Teste com mock de usuário', () => {

  const fazerLogin = () => {
    cy.visit('http://localhost:3000/')
    cy.get('.p-8 > .ant-btn').click()
    cy.get('[id="username"]').type('admin')
    cy.get('[id="password"]').type('123')
    cy.get('[data-testid="login-button"]').click()
  }

  beforeEach(() => {
    fazerLogin()
  })

  it('deve mockar o POST corretamente', () => {
    cy.fixture('post-user').as('usuarioMockado')
    
    cy.intercept('POST', '**/api/User*', (req) => {
      req.reply({ statusCode: 201, body: { name: 'Maria Teste' } })
    }).as('postUser')

    cy.get(':nth-child(6) > .block').click()
    cy.get('[data-testid="modal-button-user-creation"]').click()

    cy.get(':nth-child(1) > .ant-input').type("Maria")
    cy.get('form > :nth-child(2) > .ant-input').type("Maria")
    cy.get(':nth-child(3) > :nth-child(2) > .ant-input').type("123")
    cy.get('.relative.mt-3 > :nth-child(2) > .ant-input').type("123")

    cy.get('.justify-end > .ant-btn').click()

    cy.wait('@postUser').then((interception) => {
      expect(interception.response.statusCode).to.eq(201)
      expect(interception.response.body.name).to.eq('Maria Teste')
    })

    cy.contains('Usuário criado com sucesso').should('be.visible')
  })
})
