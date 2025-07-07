import loginModalPageObject from "../../page-object/modals/login-modal.page-object";

describe('Login', () => 
{
  it('Should login on QAZP successfully', () =>
  {
    //Given
    cy.visit('http://localhost:3000/');

    //When
    cy.clickOn('login-button');
    cy.writeInputText('username-loginInput-form', 'admin');
    cy.writeInputText('password-loginInput-form', '123');
    cy.clickOn('enter-login-form-btn');

    //Then
    cy.getByTestId('toast-login-success')
      .should('be.visible')
      .should('contain', 'Bem-vindo, Administrador!');
    cy.url().should('equal', 'http://localhost:3000/dashboard');
  });

  it('Should login with page object pattern on QAZP successfully', () => 
  {
    const loginModal = new loginModalPageObject();

    //Given
    cy.visit('http://localhost:3000/');

    //When
    cy.clickOn('login-button');
    loginModal.loginWithParameters('admin', '123');

    //Then
    cy.getByTestId('login-modal').should('not.exist');
    cy.getByTestId('toast-login-success')
      .should('be.visible')
      .should('contain', 'Bem-vindo, Administrador!');
    cy.url().should('equal', 'http://localhost:3000/dashboard');
  });

  it('Should  display validations for mandatory fields not filled', () => 
  {
    //Given
    cy.visit('http://localhost:3000/');

    //When
    cy.clickOn('login-button');
    cy.clickOn('enter-login-form-btn');

    //Then
    cy.getByTestId('username-loginInput-form').should('have.css', 'border', '0.8px solid rgb(239, 68, 68)');
    cy.getByTestId('login-modal-username-error').should('have.css', 'color', 'rgb(255, 0, 0)');
    cy.getByTestId('login-modal-username-error').should('have.text', 'Campo obrigatório *');
    cy.getByTestId('password-loginInput-form').should('have.css', 'border', '0.8px solid rgb(239, 68, 68)');
    cy.getByTestId('login-modal-password-error').should('have.css', 'color', 'rgb(255, 0, 0)');
    cy.getByTestId('login-modal-password-error').should('have.text', 'Campo obrigatório *');
  });

  it('Should login with invalid credentials', () =>
  {
    //Given
    cy.visit('http://localhost:3000/');

    //When
    cy.clickOn('login-button');
    cy.writeInputText('username-loginInput-form', 'invalid-user');
    cy.writeInputText('password-loginInput-form', 'invalid-password');
    cy.clickOn('enter-login-form-btn');

    //Then
    cy.getByTestId('toast-login-error')
      .should('be.visible')
      .should('contain', 'Usuário ou senha incorretos. Verifique as informações e tente novamente');
  });
});