export class QuoteModal{

    public visitForm(): void {
        cy.visit('http://localhost:3000/')
        cy.contains('button', 'Solicite um orçamento').click();
        //cy.contains('span', 'Solicite um orçamento').click()
    }

    private get name(){
        return cy.getByTestId('quote-modal-name')
    }

    private get email(){
        return cy.getByTestId('quote-modal-email')
    }

    private get phone(){
        return cy.getByTestId('quote-modal-phone')
    }

    private get quoteType(){
        return cy.getByTestId('quote-modal-type')
    }

    private get estimatedAudience(){
        return cy.getByTestId('quote-modal-estimated-audiance')
    }

    public addNewQuote(): QuoteModal{
        this.name.type('NewQuote')
        this.email.type('test@gmail.com')
        this.phone.type('(11) 11000-0000')
        this.quoteType.click()
        cy.contains('[role="menuitem"]', 'Festa').click();
        this.estimatedAudience.type('100')
        cy.getByTestId('quote-modal-button').click()
        return this
    }

    
}