const puppeteer = require("puppeteer");
const C = require("./constants");
const USERNAME_SELECTOR = "#username";
const PASSWORD_SELECTOR = "#password";
const CTA_SELECTOR = "#organic-div > form > div.login__form_action_container > button";

let listOfNames = [
	{
	id: 0,
	name: '',
	profile: ''
	}

]


async function startBrowser() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  return { browser, page };
}

async function closeBrowser(browser) {
  return browser.close();
}

async function playTest(url) {
	try {
		const { browser, page } = await startBrowser();
		const listNumber = 1;
		page.setViewport({ width: 1366, height: 768 });
		await page.goto(url);
		await page.click("body > div.page.page--is-mercado-theme-enabled > main > p > a");
		await page.click(USERNAME_SELECTOR);
		await page.keyboard.type(C.username);
		await page.click(PASSWORD_SELECTOR);
		await page.keyboard.type(C.password);
		await page.click(CTA_SELECTOR);
		await page.waitForNavigation();

		await page.waitForXPath(`//*[@id="main"]/div/div/div[2]/ul/li[${listNumber}]/div/div/div[2]/div[1]/div/div[1]/span/div/span[1]/span/a`)
		await page.waitForXPath(`//*[@id="main"]/div/div/div[2]/ul/li[${listNumber}]/div/div/div[2]/div[1]/div/div[2]/div[1]`);
	  
		const el2 = await page.$x(`//*[@id="main"]/div/div/div[2]/ul/li[1]/div/div/div[2]/div[1]/div/div[2]/div[1]`);
	  
		const text = await page.evaluate((el) => {
		  return el.textContent.trim();
		}, el2[0]);


		console.log({ text });
		await page.screenshot({ path: "linkedin.png" });
	}

	catch(err) {
		console.log(err);
	}

}

async function getStudentProfile(url) {
	try {
		
	}
	catch(err) {
		console.log(err);
	}
}

(async () => {
  await playTest("https://www.linkedin.com/search/results/people/?keywords=%22austin%20coding%20academy%22&origin=FACETED_SEARCH&schoolFilter=%5B%224062050%22%5D");

  await getStudentProfile('"https://www.linkedin.com/search/results/people/?keywords=%22austin%20coding%20academy%22&origin=FACETED_SEARCH&schoolFilter=%5B%224062050%22%5D"')
  // process.exit(1);
})();
