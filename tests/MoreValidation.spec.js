const {test, expect} = require('@playwright/test');


test.describe('More validation Test Suite', () => {

  test('More validation ', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //await page.goto('https://google.com');
    //await page.goBack();
    //await page.goForward();
    await expect (page.locator('#displayed-text')).toBeVisible();// assertion expected to be visible
    
    await page.locator('#hide-textbox').click();
    await expect (page.locator('#displayed-text')).toBeHidden();// assertion expected to be hidden

    
    page.on('dialog', dialog => dialog.accept());// click ok on alert popup
    await page.locator('#confirmbtn').click();

    await page.locator('#mousehover').scrollIntoViewIfNeeded();
    await page.locator('#mousehover').hover();
    


    //const framesPage = page.frameLocator('#courses-iframe');
    const frame = await page.locator('iframe[name="iframe-name"]').contentFrame();
    const mentorlink = frame.getByRole('link', { name: 'Mentorship' });
    await mentorlink.click();
    
    
    //await framesPage.locator('a[href*="mentorship"]').click();
    //const text = await framesPage.locator('.inner-box h2').textContent();
    //console.log("Text is: "+ text);
    //expect(text).toContain("MENTORSHIP");

    
    //page.on('dialog', dialog => dialog.dismiss());
    //await page.locator('#confirmbtn').click();



    //const isEnabled = await page.locator('#enabled-button').isEnabled();
    //console.log( "Button enabled status before disable: "+ isEnabled);
    //await page.locator('#disable-button').click();
    //const isEnabledAfter = await page.locator('#enabled-button').isEnabled();
    //console.log( "Button enabled status after disable: "+ isEnabledAfter);
    

  });
});