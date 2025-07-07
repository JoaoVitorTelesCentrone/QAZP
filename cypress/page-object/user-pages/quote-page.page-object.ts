export default class QuotePage 
{
    public get quoteTableName() 
    {
        return cy.getByTestId('quote-table-row-1_fullName')
    }

    public get quoteTableEmail() 
    {
        return cy.getByTestId('quote-table-row-1_email')
    }

    public get quoteTablePhone() 
    {
        return cy.getByTestId('quote-table-row-1_phoneNumber')
    }

    public get quoteTableType() 
    {
        return cy.getByTestId('quote-table-row-1_eventType')
    }

    public get quoteTablePublic() 
    {
        return cy.getByTestId('quote-table-row-1_estimatedAudience')
    }
}