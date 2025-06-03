export default class QuotePage 
{
    public get quoteTableName() 
    {
        return cy.getByTestId('quote-table-row-0_fullName')
    }

    public get quoteTableEmail() 
    {
        return cy.getByTestId('quote-table-row-0_email')
    }

    public get quoteTablePhone() 
    {
        return cy.getByTestId('quote-table-row-0_phoneNumber')
    }

    public get quoteTableType() 
    {
        return cy.getByTestId('quote-table-row-0_eventType')
    }

    public get quoteTablePublic() 
    {
        return cy.getByTestId('quote-table-row-0_estimatedAudience')
    }
}