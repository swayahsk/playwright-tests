const {test, expect} = require('@playwright/test');

test.skip('Browser context playwright test', async ({browser}) => {
  // Navigate to the application's main page
  //chrome - plugins, cookies, cache
  const context = await browser.newContext(); //Auto if not write ,creat a new instance of the browser (can pass cookies, cahche...)
  const page = await context.newPage(); //Auto if not write  create a new page (tab)
  await page.goto('https://rahulshettyacademy.com/locatorspractice/' );
  await expect(page.locator('#inputUsername')).toBeVisible();

  await page.locator('#inputUsername').fill('testuser');
  await page.locator("input[name='inputPassword']").fill('rahulshettyacademy');
  await page.locator("input#chkboxOne").check();
  await page.locator("input#chkboxTwo").check();
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.locator("div[class*='login-container'] h2")).toHaveText('Hello testuser,');

});


test.describe('My first test suite', () => {

  test.skip('page playwright test fail', async ({page}) => {
    const userName = page.locator("#username");
    const password = page.locator("input[type='password']");
    const signInBtn = page.locator("#signInBtn");

    // Navigate to the application's main page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/' );
    await expect(page.locator("#username")).toBeVisible();
    await userName.fill("rahulshettyacadem");
    await password.fill("learning");
    await page.locator("span.radiotextsty").first().click();
    await signInBtn.click();

    const error = await page.locator("[style*='block']").textContent();
    await expect(error).toContain("Incorrect"); //assertion
  });


  test('page playwright test', async ({page}) => {
    const userName = page.locator("#username");
    const password = page.locator("input[type='password']");
    const signInBtn = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-title a");
    const dropdown = page.locator("select.form-control");
    const okBtn = page.locator("#okayBtn");
    const documentsLink = page.locator("[href*='https://rahulshettyacademy.com/documents-request']");

    // Navigate to the application's main page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/' );
    await expect(page.locator("#username")).toBeVisible();
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await page.locator("span.radiotextsty").last().click();
    await okBtn.click();
    await expect(page.locator("span.radiotextsty").last()).toBeChecked();//assertion
    await dropdown.selectOption("consult");// select by value 
    await page.locator("#terms").check();// check 
    await expect(page.locator("#terms")).toBeChecked();//assertion 
    await page.locator("#terms").uncheck();// uncheck 
    await expect(page.locator("#terms")).not.toBeChecked();//negation assertion 
    await expect(documentsLink).toHaveAttribute('class','blinkingText');//assertion for attribute


    await signInBtn.click();

    await expect(page.getByText('Shop Name')).toHaveText('Shop Name');//assertion
    const productTitle = await cardTitle.first().textContent();// get first product title
    await expect(productTitle).toContain('iphone X'); //assertion
    const allTitles = await cardTitle.allTextContents();// get all product titles
    console.log(allTitles);
    await expect(allTitles).toContain('iphone X');//assertion 
  });


  test.only('Child windows handler', async ({browser}) => {
    // Navigate to the application's main page
    const context = await browser.newContext(); //Auto if not write ,creat a new instance of the browser (can pass cookies, cahche...)
    const page = await context.newPage(); //Auto if not write  create a new page (tab)
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/' );
    
    const documentsLink = page.locator("[href*='https://rahulshettyacademy.com/documents-request']");
    const userName = page.locator("#username");


    const [newPage] = await Promise.all([ // steps are asynchronous together parallelly
    context.waitForEvent('page'),// wait for the new page to load, listen for the new page event : pending, rejected, fulfilled
    documentsLink.click(),// click on the link that opens a new window
    ]);
    
    const title = await newPage.locator(".auto-container h1").textContent();// get the title text
    console.log(title);
    await expect(title).toContain('Documents');//assertion
    
    const text = await newPage.locator(".red").textContent();// get the red text content
    const arraytext = text.split("@");// split the text by space and get the 3rd word
    const Domain = arraytext[1].split(" ")[0];// split the 2nd part by space and get the first word
    await page.locator("#username").fill(Domain);// fill the username with extracted domain text
    console.log(await page.locator("#username").inputValue());// print the filled username
    
    page.pause();
});
});