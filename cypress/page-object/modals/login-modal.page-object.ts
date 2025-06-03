export default class loginModalPageObject 
{
    private get username()
    {
        return cy.getByTestId('username-loginInput-form');
    }

    private get password()
    {
        return cy.getByTestId('password-loginInput-form');
    }

    public login(): loginModalPageObject 
    {
        this.username.type('admin');
        this.password.type('123');
        cy.clickOn('enter-login-form-btn');
        return this;
    }

    public loginWithParameters(username: string, password: string): loginModalPageObject 
    {
        this.username.type(username);
        this.password.type(password);
        cy.clickOn('enter-login-form-btn');
        return this;
    }
    
}