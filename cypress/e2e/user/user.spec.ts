import UserCreateModal from "../../page-object/modals/users-modal.page-object";
import UsersPage from "../../page-object/user-pages/users-page.page-object";

describe ('User feature', () => 
{
    beforeEach(() => 
    {
        //Arrange
        cy.login('admin', '123');
    })

    it('Create a new user successfully', () => 
    {
        //Act
        cy.clickOn('users-nav-btn');
        const createUserModal = new UserCreateModal();
        cy.clickOn('create-user-openModal-btn');
        createUserModal.addNewUser();
        //Assert
        assertUserTable();
    });
})

function assertUserTable(): void 
{
    const userPage = new UsersPage();
    userPage.userTableName.should('have.text', 'newUser2');
    userPage.userTableUser.should('have.text', 'user2');
}