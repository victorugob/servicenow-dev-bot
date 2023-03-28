const { userInfo } = require('dotenv/config');
const puppeteer = require('puppeteer');
const myInstance = process.env.DEVINST;
const instance = "https:" + myInstance + ".service-now.com/login";

const ChromeLauncher = require('chrome-launcher');

//

function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  }); 
  

  /* Use o código abaixo dentro de  .launch() para que abra a aba para ver o processo
     Sem esse código o bot rodará as instruções no background
  {headless: false, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'} 
  ou
  { headless: false, defaultViewport: null, args: [
    '--window-size=1360,768',
  ] } 
   */


  const page = await browser.newPage();
  await page.goto(instance); // atentar ao <numero da sua instancia>  e substituir a que irá usar
  
  // Validate if instance is sleeping, if so, login to wake
  if(await (await page.$$('.instance-hibernating-page')).length > 0) {
    console.log('Instance is sleeping, Bot will redirect and wake your stance')
    await page.goto('https://developer.service-now.com/login')
    if(page.url('https://developer.servicenow.com/dev.do#!/home')){
      await page.goto('https://signon.service-now.com/ssologin.do?RelayState=%252Fapp%252Fservicenow_ud%252Fexks6phcbx6R8qjln0x7%252Fsso%252Fsaml%253FRelayState%253Dhttps%25253A%25252F%25252Fdeveloper.servicenow.com%25252Fdev.do%252523%252521%25252Fhome&redirectUri=&email=')
    }
    await page.type('#username', process.env.USEREMAIL)
    await page.click('#usernameSubmitButton') 
    await delay(2000)
    await page.type('#password', process.env.EMAILPW);

    await Promise.all([
      page.waitForNavigation(), 
      page.click('#submitButton')
    ]);

    console.log('Bot awakaned your instance, please wait a few minutes');
  } else {
  console.log('Your stance is not sleeping')

  await page.type('#user_name', process.env.USER_NAME )
  await page.type('#user_password', process.env.PASSWORD)

  await Promise.all([
    page.waitForNavigation(), // promise resolve quando navigation finaliza
    page.click('#sysverb_login') // clicar no link causa uma navigation indireta
  ]);

  //await page.screenshot({path: 'confirmation/anything.png'}); //path e nome da screenshot

  console.log('Bot has finalized'); 

  await browser.close();
}
})();
