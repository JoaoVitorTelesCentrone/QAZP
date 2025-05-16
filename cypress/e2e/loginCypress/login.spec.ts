describe('Login', () => 
{
  it('Should login on QAZP successfully', () => 
  {
    //act
    cy.visit('http://localhost:3000/');
    cy.clickOn('login-button');
    cy.writeInputText('username-loginInput-form', 'admin');
    cy.writeInputText('password-loginInput-form', '123');
    cy.clickOn('enter-login-form-btn');

    //assert
    cy.getByTestId('login-modal').should('not.exist');
    cy.get('[data-content=""] > div').should('be.visible').should('have.text', 'Bem-vindo, Administrador!');
    cy.url().should('equal', 'http://localhost:3000/dashboard');
  })

  it('Should display validations for empty mandatory fields', () => 
  {
    cy.visit('http://localhost:3000/')
    cy.getByTestId('login-button').click()

    // // cy.get('[class="ant-input css-dev-only-do-not-override-zg0ahe ant-input-outlined p-2 mb-4 border rounded w-full border-red-500"]').should('have.css', 'color', 'rgb(239, 68, 68)');
    // cy.get('.flex-col > :nth-child(2) > div').should('exist').should('have.color', 'Campo obrigatório *');
    // cy.get('#password')
    // cy.get(':nth-child(3) > [style="color: red; position: absolute; top: 100%; left: 0px; margin-top: -15px;"]')
    //   .should('exist')
    //   .should('have.text', 'Campo obrigatório *');
  })

})