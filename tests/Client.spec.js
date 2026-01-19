const {test, expect} = require('@playwright/test');



test.describe('My first test suite', () => {

  test('register on page', async ({page}) => {
   //const registerButton = page.locator(".text-reset");
    const registerhere = page.locator(".text-reset");  
    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const email = page.locator("#userEmail"); 
    const phone = page.locator("#userMobile");
    const gender = page.locator("[formcontrolname*='gender']");
    const age = page.locator("[type*='checkbox']");
    const password = page.locator("#userPassword");
    const confirmPassword = page.locator("#confirmPassword");
    const loginmail = page.locator("#userEmail");
    const loginpassword = page.locator("#userPassword");
    const loginBtn = page.locator(".btn.btn-block.login-btn");   
    const signInBtn = page.locator(".btn.btn-block.login-btn");
    const registerButton = page.locator(".text-reset");
    const cardTitle = page.locator(".card-body b");

    
    
    // Navigate to the application's main page
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login' );
    await registerhere.click();
    await expect(page.locator(".login-title")).toBeVisible();


    await firstName.fill("Skandar");
    await lastName.fill("Swayah");
    await email.fill("skandarswayah@gmail.com");
    await phone.fill("1234567890");
    await gender.nth(0).click();   
    await password.fill("Learning124578");
    await confirmPassword.fill("Learning124578");
    await age.check();
    await signInBtn.click();

    await registerButton.click();
    await expect(page.locator(".login-title")).toHaveText('Log in');//assertion

    await loginmail.fill("skandarswayah@gmail.com");
    await loginpassword.fill("Learning124578");
    await loginBtn.click();


    //await page.waitForLoadState('networkidle'); flaky approach
    await page.locator(".card-body b").first().waitFor(); // explicit wait approach
    await expect(cardTitle.first()).toHaveText('Automation 8'); //assertion
    await cardTitle.allTextContents(); // get all titles
    console.log( await cardTitle.allTextContents() ); // print all titles


    });


test('add to card', async ({page}) => {
  const loginmail = page.locator("#userEmail");
  const loginpassword = page.locator("#userPassword");
  const loginBtn = page.locator(".btn.btn-block.login-btn");
  const products = page.locator(".card-body");
  const alertMessage = page.getByRole('alert', { name: 'Product Added To Cart' });
  
  // Se connecter d'abord
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await loginmail.fill("skandarswayah@gmail.com");
  await loginpassword.fill("Learning124578");
  await loginBtn.click();
  
  // Attendre que les produits soient chargés
  await page.locator(".card-body b").first().waitFor();
  
  // Récupérer tous les produits
  const count = await products.count();
  
  // Parcourir les produits pour trouver "ADIDAS ORIGINAL"
  for (let i = 0; i < count; i++) {
    const productName = await products.nth(i).locator("b").textContent();
    
    if (productName === "ADIDAS ORIGINAL") {
      // Cliquer sur le bouton "Add to Cart" pour ce produit
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  
  // Vérification optionnelle : attendre la confirmation
  await page.waitForTimeout(1000); // ou utiliser un locator pour le toast/message de confirmation
  await expect(alertMessage).toBeVisible();

  await page.locator("button[routerlink*='cart']").click();
  const cartItem = page.locator(".cartSection h3");
  await expect(cartItem).toHaveText('ADIDAS ORIGINAL'); //assertion


  const idProduct = await page.locator(".itemNumber").textContent();
  console.log(idProduct);
  expect(idProduct).toBeDefined();//assertion

  await page.locator("button:has-text('Checkout')").click();

  // Sélectionner et remplir le champ CVV
  const cvvField = page.locator(".title:has-text('CVV Code') + input.txt");
  await cvvField.fill("123");

  // Sélectionner le jour "20" dans le dropdown
  const dayDropdown = page.locator("select.input.ddl").last();
  await dayDropdown.selectOption("20");

    const monthDropdown = page.locator("select.input.ddl").first();
    await monthDropdown.selectOption("10");

    const couponInput = page.locator("[name*='coupon']");
    await couponInput.fill("rahulshettyacademy");

    const applyCouponBtn = page.locator("button:has-text('Apply Coupon')");
    await applyCouponBtn.click();
    await page.waitForTimeout(3000); // attendre que le coupon soit appliqué

    // Sélectionner un pays dans le champ d'autocomplétion
    const countryInput = page.locator("[placeholder='Select Country']");
    await countryInput.pressSequentially("Fra",{ delay: 100 }); // taper "Fra" avec un délai entre les frappes afin de simuler la saisie humaine

    // Attendre que la liste d'autocomplétion apparaisse
    const countryOptions = page.locator(".ta-results button");// sélectionner toutes les options
    await countryOptions.first().waitFor();// attendre que la première option soit visible

    // Parcourir les options et sélectionner "India"
    const optionsCount = await countryOptions.count(); // obtenir le nombre d'options
    for (let i = 0; i < optionsCount; i++) {// parcourir chaque option
      const countryText = await countryOptions.nth(i).textContent();// obtenir le texte de l'option
      if (countryText.trim() === "France") {// vérifier si c'est "France"
        await countryOptions.nth(i).click();// cliquer sur l'option
        break;// sortir de la boucle une fois trouvé
      }
    }

    const nameOnCard = page.locator(".title:has-text('Name on Card ') + input.txt");
    await nameOnCard.fill("Skandar swayah");

    const placeOrderBtn = page.locator("[class='btnn action__submit ng-star-inserted']");;
    await placeOrderBtn.click();


    await expect(page.locator(".hero-primary")).toHaveText(' Thankyou for the order. ');//assertion

    const idVenteRaw = await page.locator("label[class*='ng-star-inserted']").textContent();
    console.log("ID Vente brut:", idVenteRaw);

    // Extraire uniquement l'ID (enlever les pipes | et espaces)
    const idVente = idVenteRaw.split("|").map(part => part.trim()).find(part => part.length > 0) || "";
    console.log("ID Vente nettoyé:", idVente);// afficher l'ID de vente nettoyé
    expect(idVente).toBeDefined();// assertion pour s'assurer que l'ID de vente est défini

    await page.locator("label[routerlink='/dashboard/myorders']").click();

    await expect(page.locator("h1.ng-star-inserted")).toHaveText('Your Orders');//assertion

    // Chercher l'ID de vente dans le tableau et cliquer sur le bouton View correspondant
    const tableRows = page.locator("tbody tr");
    await tableRows.first().waitFor();// attendre que la première ligne soit visible

    const rowsCount = await tableRows.count();
    console.log(`Nombre de lignes dans le tableau: ${rowsCount}`);// afficher le nombre de lignes
    console.log(`ID de vente recherché: "${idVente.trim()}"`);// afficher l'ID de vente recherché

    for (let i = 0; i < rowsCount; i++) {// parcourir chaque ligne du tableau
      const orderId = await tableRows.nth(i).locator("th").textContent();// obtenir l'ID de la ligne i
      console.log(`Ligne ${i}: ID = "${orderId.trim()}"`);// afficher l'ID de chaque ligne

      if (orderId.trim() === idVente.trim()) {// comparer avec l'ID de vente recherché
        console.log(`Match trouvé à la ligne ${i}!`);// log du match trouvé
        // Attendre que le bouton soit visible et cliquable
        const viewButton = tableRows.nth(i).locator("button").first().click();// localiser le bouton View dans la ligne correspondante et cliquer dessus
        //await viewButton.waitFor({ state: 'visible' });// attendre que le bouton soit visible
        //await viewButton.first().click();
        break;
      }
    }

    // Attendre que la page des détails de commande se charge
    await page.waitForLoadState('networkidle');// attendre que le réseau soit inactif
    await page.waitForTimeout(3000);// attendre un peu plus pour s'assurer que tout est chargé

    // Vérifier que nous sommes sur la page de détails de la commande
    //await expect(page.locator(".email-title")).toBeVisible();//assertion

    const orderIdDetail = await page.locator(".col-text.-main").textContent();
    await expect(orderIdDetail.trim()).toBe(idVente.trim());;//assertion
    //await expect(page.url()).toContain(idVente.trim());//assertion

});
});