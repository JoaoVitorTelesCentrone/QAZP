export class LoginPage {
    
    private get username() {
        return cy.getByTestId('login-modal-username-field')
    }

    private get password() {
        return cy.getByTestId('login-modal-password-field')
    }

    visitForm(): void {
        cy.visit('http://localhost:3000/')
        cy.getByTestId('header-login-button').click()
    }

    submit(user: string, password: string): void {

        if (user) {
            this.username.type(user)
        }

        if (password) {
           this.password.type(password)
        }

        cy.getByTestId('login-button').click()
    }

    requiredFieldsError(testId: string, message: string): void {
        cy.getByTestId(testId).should('contain.text', message)
    }
}
