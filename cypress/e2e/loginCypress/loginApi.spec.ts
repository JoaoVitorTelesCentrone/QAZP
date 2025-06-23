import { loginByApi } from "../../support/login-mock";

describe('Login with app actions', () => 
{
    it('Should login on QAZP successfully via API', () => 
    {
        loginByApi('admin', '123');
        cy.visit('http://localhost:3000/dashboard');
    });
});