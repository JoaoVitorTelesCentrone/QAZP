export class LoginPage{
    visitForm(): void{
        cy.visit('http://localhost:3000/')
        cy.get('.p-8 > .ant-btn').click()
    }

    submit(user: string, password: string): void {
        cy.get('[id="username"]').type(user)
        cy.get('[id="password"]').type(password)
        cy.get('[data-testid="login-button"]').click()
        
    }

    alertHaveText(message: string): void{
        
    }
}
