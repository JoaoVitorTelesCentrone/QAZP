export class Toast {
    haveText(message: string): void{
        cy.get('li[data-sonner-toast] div[data-title]').should('be.visible').should('contain.text', message);
    }
}
