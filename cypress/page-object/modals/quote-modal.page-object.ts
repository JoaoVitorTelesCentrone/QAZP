export default class quoteModalPageObject 
{
    private get name (){
        return cy.getByTestId('quote-inputName');
    }
    
    private get email (){
        return cy.getByTestId('quote-inputEmail');
    }

    private get phone (){
        return cy.getByTestId('quote-inputPhone');
    }

    private get quoteType (){
        return cy.getByTestId('quote-type-trigger');
    }

    private get quoteEstimatedPublic (){
        return cy.getByTestId('quote-estimated-publicInput');
    }

    public addNewQuote(): quoteModalPageObject 
    {
        this.name.type('newQuote');
        this.email.type('newEmail@gmail.com');
        this.phone.type('11940028922');
        this.quoteType.click();
        cy.getByTestId('quote-type-menu').contains("Cerimônia").click();
        // cy.clickOn('quote-type-0');
        this.quoteEstimatedPublic.type('200');
        cy.clickOn('quote-modal-button');
        return this;
    }
}