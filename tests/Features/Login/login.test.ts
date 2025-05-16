import { test, expect} from '@playwright/test';

test('Should login in QAZP successfully', async ({ page }) => 
{
    await page.goto('http://localhost:3000/');
    await page.getByTestId('login-button').click();
    await page.getByTestId('username-loginInput-form').fill('admin');
    await page.getByTestId('password-loginInput-form').fill('123');
    await page.getByTestId('enter-login-form-btn').click();

    // await expect

});