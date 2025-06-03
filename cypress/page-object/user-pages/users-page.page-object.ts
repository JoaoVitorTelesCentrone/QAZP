export default class UsersPage 
{
    public get userTableName() 
    {
        return cy.getByTestId('user-index-0_name')
    }

    public get userTableUser() 
    {
        return cy.getByTestId('user-index-0_userName')
    }
}