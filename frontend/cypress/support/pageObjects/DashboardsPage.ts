import { Toast } from '../../support/pageObjects/Components';


export class DashboardPage {
    private toast: Toast;
    
    constructor(){
        this.toast = new Toast();
    }
    
    isLoggedIn(){
        const message: string = 'Bem-vindo, Administrador!'

        cy.get('[class="ant-modal-title"]').should('not.exist')
        this.toast.haveText(message)
        cy.url().should('equal', 'http://localhost:3000/dashboard')
    }
}