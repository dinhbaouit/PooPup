const args = process.argv;
const url = args[2];
const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({
        // devtools: true,
        args: ["--disable-xss-auditor"]
    });

    const xssalert = "==== XSS Detected ====";
    const page = await browser.newPage();
    const domain = await page.evaluate(() => document.domain);


    page.on('dialog', async dialog => {


    if(dialog.message() == domain)
        {
            console.log(xssalert);
        }
    await dialog.dismiss();
  });

    await page.goto(url);
    browser.close();
})
();