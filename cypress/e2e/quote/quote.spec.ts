import loginModalPageObject from "../../page-object/modals/login-modal.page-object";
import quoteModalPageObject from "../../page-object/modals/quote-modal.page-object";
import QuotePage from "../../page-object/user-pages/quote-page.page-object";

describe('Quote feature', () => 
{
    beforeEach(() => 
    {
        //Given
        cy.visit('http://localhost:3000/');
    })
    
    it('Create a new quote without being logged', () => {
        //When
        const quoteModal = new quoteModalPageObject();
        const loginModal = new loginModalPageObject();
        
        cy.clickOn('quote-request-button');
        quoteModal.addNewQuote();
        cy.clickOn('login-button');
        loginModal.login();
        cy.clickOn('quote-nav-btn');

        //Then
        assertQuoteTable();
    })
})


function assertQuoteTable(): void 
{
    const quotePage = new QuotePage();
    quotePage.quoteTableName.should('have.text', 'newQuote');
    quotePage.quoteTableEmail.should('have.text', 'newEmail@gmail.com');
    quotePage.quoteTablePhone.should('have.text', '(11) 94002-8922');
    quotePage.quoteTableType.should('have.text', 'Cerimônia');
    quotePage.quoteTablePublic.should('have.text', '200');
}