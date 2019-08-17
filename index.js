const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	try {
		await page.goto('https://bdvenlinea.banvenez.com/login')
		await page.waitForSelector('#tarjeta')
		await page.type('#tarjeta', process.env.TARJETA)
		await page.type('#tarjeta-password', process.env.CLAVE)
		await page.click('button[type=submit]')
		await page.waitForNavigation({waituntil: 'domcontentloaded'});
		await page.waitFor(2000)
		await page.screenshot({path: 'posicionConsolidada.png'});

		const divs = await page.$$('.bdvenlinea-subtitle')
		divs[3].click()
		await page.waitFor(2000)
		divs[4].click()
		await page.waitFor(2000)
		await page.screenshot({fullPage: true, path: 'tdc.png'});
		await browser.close();
	}
	catch(error){
		await page.screenshot({fullPage: true, path: 'error.png'});
		console.error(error)
		await browser.close();
		process.exit(1)
	}
})();
