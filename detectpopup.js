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
    await page.setBypassCSP(true);

    page.on('dialog', async dialog => {
        if(dialog.message() == 1337)
            {
                console.log(xssalert);
            }
        await dialog.dismiss();
      });

    await page.goto(url);
    browser.close();
})
();