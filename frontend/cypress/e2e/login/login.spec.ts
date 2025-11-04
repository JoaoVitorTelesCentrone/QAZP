import { LoginPage } from '../../support/pageObjects/LoginPage';
import { Toast } from '../../support/pageObjects/Components';
import { DashboardPage } from '../../support/pageObjects/user-pages/DashboardsPage';

const dashboardPage: DashboardPage = new DashboardPage();
const loginPage: LoginPage = new LoginPage();
const toast: Toast = new Toast();

beforeEach(() => {
  loginPage.visitForm()
})

describe('Login', () => {
  it('Should login on QAZP successfully', () => {
    loginPage.submit('admin', '123')
    dashboardPage.isLoggedIn()
  })

  it('Should not login in with incorrect username', () => {

    const message: string = 'Usuário ou senha incorretos. Verifique as informações e tente novamente'
    loginPage.submit('adminn', '123')
    toast.haveText(message)
  })

  it('Should not login in with incorrect password', () => {

    const message: string = 'Usuário ou senha incorretos. Verifique as informações e tente novamente'
    loginPage.submit('admin', '12345')
    toast.haveText(message)
  })

  it('Should not login on QAZP when the user and password is not filled in', () => {

    const message: string = 'Campo obrigatório *'
    loginPage.submit('', '')
    loginPage.requiredFieldsError('required-username-field-error', message)
    loginPage.requiredFieldsError('required-password-field-error', message)
  })

  it('Should not login on QAZP when the user is not filled in', () => {

    const message: string = 'Campo obrigatório *'
    loginPage.submit('', '123')
    loginPage.requiredFieldsError('required-username-field-error', message)
  })

  it('Should not login on QAZP when the password is not filled in', () => {

    const message: string = 'Campo obrigatório *'
    loginPage.submit('admin', '')
    loginPage.requiredFieldsError('required-password-field-error', message)
  })
})


