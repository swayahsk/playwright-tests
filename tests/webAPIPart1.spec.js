const {test, expect, request} = require('@playwright/test');


const loginPayload = {
    userEmail: "skandarswayah@gmail.com", 
    userPassword: "Learning124578"}


    let token;
    let orderId;
    


test.beforeAll(async () => { // Code à exécuter avant tous les tests
  const APIContext = await request.newContext();// Crée un nouveau contexte API pour les requêtes HTTP
  const loginResponse = await APIContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", // URL de l'API de connexion
    {
    data: loginPayload
    })
    expect(loginResponse.ok()).toBeTruthy();// assertion pour vérifier que la réponse est correcte
    
    const responseJson = await loginResponse.json();// Extraire le corps de la réponse en JSON
    console.log(responseJson);// Afficher la réponse JSON dans la console
    token = responseJson.token;// Extraire le token de la réponse JSON

//************************************************************ */
    const placeOrder = await APIContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", // URL de l'API de création de commande
    {
      data: {
        orders: 
        [{
            country: "France", 
            productOrderedId: "6964af52c941646b7a919472"
        }]
    },
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    });
    expect(placeOrder.ok()).toBeTruthy();// assertion pour vérifier que la réponse est correcte
    const placeOrderJson = await placeOrder.json();// Extraire le corps de la réponse en JSON
    console.log(placeOrderJson);// Afficher la réponse JSON dans la console
    orderId = placeOrderJson.orders[0];// Extraire l'ID de la commande créée
}); 
//*************************************************************/

test('add to card', async ({page}) => {

    await page.addInitScript( token => {
      window.localStorage.setItem('token', token);
    }, token );

  //const products = page.locator(".card-body");
  //const alertMessage = page.getByRole('alert', { name: 'Product Added To Cart' });


    // Se connecter d'abord

await page.goto('https://rahulshettyacademy.com/client' );
  // Attendre que les produits soient chargés
  await page.waitForLoadState('networkidle');

  // Utiliser l'ID de commande créé via l'API

  console.log("ID Vente de l'API:", orderId);

  await page.locator("label[routerlink*='myorders']").click();

    await expect(page.locator("h1.ng-star-inserted")).toHaveText('Your Orders');//assertion

    // Chercher l'ID de vente dans le tableau et cliquer sur le bouton View correspondant
    const tableRows = page.locator("tbody tr");
    await tableRows.first().waitFor();// attendre que la première ligne soit visible

    const rowsCount = await tableRows.count();
    console.log(`Nombre de lignes dans le tableau: ${rowsCount}`);// afficher le nombre de lignes
    console.log(`ID de vente recherché: "${orderId.trim()}"`);// afficher l'ID de vente recherché

    for (let i = 0; i < rowsCount; i++) {// parcourir chaque ligne du tableau
      const orderId = await tableRows.nth(i).locator("th").textContent();// obtenir l'ID de la ligne i
      console.log(`Ligne ${i}: ID = "${orderId.trim()}"`);// afficher l'ID de chaque ligne

      if (orderId.trim() === orderId.trim()) {// comparer avec l'ID de vente recherché
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
    await expect(orderIdDetail.trim()).toBe(orderId.trim());//assertion
    //await expect(page.url()).toContain(idVente.trim());//assertion

});