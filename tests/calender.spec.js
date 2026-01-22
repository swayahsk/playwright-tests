const {test, expect} = require('@playwright/test');



test.describe('Calendar Test Suite', () => {

  test('Select date from calendar', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');


    const monthNumber ="6"; // June
    const yearNumber ="2027";
    const dayNumber ="15";

    //const topDealsLink = page.getByRole('link', { name: 'Top Deals' });
    //await topDealsLink.click();

    const dateInput = page.locator('.react-date-picker__inputGroup');
    await dateInput.click();

    await page.locator('.react-calendar__navigation__label').click(); // Go to previous year
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(yearNumber).click();

    await page.locator(".react-calendar__year-view__months__month").nth(parseInt(monthNumber)-1).click();
    await page.locator(".react-calendar__month-view__days__day").filter({hasText: dayNumber}).click();


    // Verify the selected date using individual input fields
    const monthInput = page.locator('.react-date-picker__inputGroup__month');
    const dayInput = page.locator('.react-date-picker__inputGroup__day');
    const yearInput = page.locator('.react-date-picker__inputGroup__yea');

    await expect(monthInput).toHaveValue(monthNumber);
    await expect(dayInput).toHaveValue(dayNumber);
    await expect(yearInput).toHaveValue(yearNumber);
});
});



/*deuxième méthode
const {test,expect} = require("@playwright/test");
 
 
test("Calendar validations",async({page})=>
{
 
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
 
    const inputs =  page.locator('.react-date-picker__inputGroup__input')
 
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
 
    }*/