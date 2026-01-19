const {test, expect} = require('@playwright/test');

test.describe('My first test suite', () => {

  test('register on page', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/' );


    //const Name = page.getByRole('textbox', { name: 'Name', exact: true });
    //const Email = page.getByRole('textbox', { name: 'Email', exact: true });
    const CheckBox = page.getByRole('checkbox');
    const Password = page.getByPlaceholder('Password');
    const employeeStatus = page.getByLabel('Student');
    const gender = page.getByLabel('Gender');



    //await Name.fill('Skandar Swayah');
    //await expect(Name).toHaveValue('Skandar Swayah');

    //await Email.fill('skandarswayah@gmail.com');
    await Password.fill('Learning124578');
    await CheckBox.check();
    await employeeStatus.check();
    await gender.selectOption('Male');

  });

});