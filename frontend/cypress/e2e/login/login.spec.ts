describe('Login', () => {
  it('Should Login on QAZP successfully', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.p-8 > .ant-btn').click()

    cy.get('[id="username"]').type('admin')
    cy.get('[id="password"]').type('123')
    cy.get('[data-testid="login-button"]').click()

    cy.get('[class="ant-modal-title"]').should('not.exist')
    cy.get('[data-content=""] > div').should('be.visible').should('have.text', 'Bem-vindo, Administrador!')
    cy.url().should('equal', 'http://localhost:3000/dashboard')
  })
  it('Should visit Orçamentos Page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.p-8 > .ant-btn').click()

    cy.get('[id="username"]').type('admin')
    cy.get('[id="password"]').type('123')
    cy.get('[data-testid="login-button"]').click()

    cy.get('[class="ant-modal-title"]').should('not.exist')
    cy.get('[data-content=""] > div').should('be.visible').should('have.text', 'Bem-vindo, Administrador!')
    cy.url().should('equal', 'http://localhost:3000/dashboard')
    cy.get(':nth-child(2) > .block').click();
    cy.url().should('equal', 'http://localhost:3000/quote')
  })
  it('Should visit Clientes Page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.p-8 > .ant-btn').click()

    cy.get('[id="username"]').type('admin')
    cy.get('[id="password"]').type('123')
    cy.get('[data-testid="login-button"]').click()

    cy.get('[class="ant-modal-title"]').should('not.exist')
    cy.get('[data-content=""] > div').should('be.visible').should('have.text', 'Bem-vindo, Administrador!')
    cy.url().should('equal', 'http://localhost:3000/dashboard')
    cy.get(':nth-child(3) > .block').click();
    cy.url().should('equal', 'http://localhost:3000/clients')
  })
  it('Should logout the user', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.p-8 > .ant-btn').click()

    cy.get('[id="username"]').type('admin')
    cy.get('[id="password"]').type('123')
    cy.get('[data-testid="login-button"]').click()
    cy.get('.fixed > .text-white').click();

    cy.url().should('equal', 'http://localhost:3000/');
  })
})