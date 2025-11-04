import { LoginPage } from '../../support/pageObjects/LoginPage';
import { DashboardPage } from '../../support/pageObjects/user-pages/DashboardsPage';
import { QuoteModal } from '../../support/pageObjects/QuoteModal';
import { QuotePage } from '../../support/pageObjects/user-pages/QuotePage';

const dashboardPage: DashboardPage = new DashboardPage()
const loginPage: LoginPage = new LoginPage()
const quoteModal: QuoteModal = new QuoteModal()
const quotePage: QuotePage = new QuotePage()


beforeEach(() => {
  quoteModal.visitForm()
})

describe('QuotePage', () => {

  // it('Should login on QAZP successfully and visualize the new quote', () => {
  //   quoteModal.addNewQuote()
  //   cy.getByTestId('login-button').click()
  //   loginPage.submit('admin', '123')
  //   dashboardPage.isLoggedIn()
  //   quotePage.assertQuoteTable()
  // })

})


