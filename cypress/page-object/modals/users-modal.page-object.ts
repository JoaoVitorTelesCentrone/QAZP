export default class UserCreateModal
{
    public get usernameCreate () 
    {
        return cy.getByTestId('create-user-name-input');
    }

    public get userCreate () 
    {
        return cy.getByTestId('create-user-input');
    }

    public get userPasswordCreate () 
    {
        return cy.getByTestId('create-user-password-input');
    }

    public get userConfirmPasswordCreate () 
    {
        return cy.getByTestId('create-user-confirm-password-input');
    }

    public addNewUser (): UserCreateModal 
    {
        this.usernameCreate.type('newUser2');
        this.userCreate.type('user2');
        this.userPasswordCreate.type('1234');
        this.userConfirmPasswordCreate.type('1234');
        cy.clickOn('create-user-btn');
        return this;
    }

}