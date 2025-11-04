export class QuotePage{

    // private get name(){
    //     return cy.getByTestId('quote-table-0_fullname')
    // }

    // private get email(){
    //     return cy.getByTestId('quote-table-0_email')
    // }

    // private get phone(){
    //     return cy.getByTestId('quote-table-0_phoneNumber')
    // }

    // private get quoteType(){
    //     return cy.getByTestId('quote-table-0_eventType')
    // }

    // private get estimatedAudience(){
    //     return cy.getByTestId('quote-table-0_estimatedAudience')
    // }

    public assertQuoteTable(): void{
        cy.get('tbody[data-testid="listTable"]').within(() => {
        cy.get('tr').eq(0).find('td').eq(0).should('contain.text', 'NewQuote');
        cy.get('tr').eq(0).find('td').eq(1).should('contain.text', 'test@gmail.com');
        cy.get('tr').eq(0).find('td').eq(2).should('contain.text', '(11) 11000-0000');
        cy.get('tr').eq(0).find('td').eq(3).should('contain.text', 'Festa');
        cy.get('tr').eq(0).find('td').eq(4).should('contain.text', '100');
    })

    }
    
}