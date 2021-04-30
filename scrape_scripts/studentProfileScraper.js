const util = require("util");
const puppeteer = require("puppeteer");
const studentLinks = require("../data(json)/tmpLinks.json");
const sleep = require("util").promisify(setTimeout);
const C = require("./constants");
const USERNAME_SELECTOR = "#session_key";
const PASSWORD_SELECTOR = "#session_password";
const CTA_SELECTOR =
  "#main-content > section.section.section--hero > div.sign-in-form-container > form > button";

async function startBrowser() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  return { browser, page };
}

async function closeBrowser(browser) {
  return browser.close();
}

async function playTest(url) {
  const { browser, page } = await startBrowser();
  page.setViewport({ width: 1366, height: 768 });
  await page.goto(url);
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(C.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(C.password);
  await page.click(CTA_SELECTOR);
  await page.waitForNavigation();
  let totalArr = [];
  let len = Object.values(studentLinks).length;
  // const viewportHeight = page.viewport().height;
  for (i = 1; i <= 1; i++) {
    await page.goto(Object.values(studentLinks)[i]);
    console.log("link", Object.values(studentLinks)[i]);
    await page.waitForSelector(
      `#main > div > div > section > div:nth-of-type(2) > div > div > div > div > img`
    );
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    await sleep(5000);

    let result = await page.evaluate(() => {
      // window.scrollBy(0, document.body.scrollHeight);
      let arr = [];

      const PHOTOSELECTOR = `#main > div > div > section > div:nth-of-type(2) > div > div > div > div > img`;

      const COMPANY1NAMESELECTOR = `#experience-section > ul > li > section > div > div > a > div > p:nth-of-type(2)`;
      const COMPANY1ROLESELECTOR = `#experience-section > ul > li > section > div > div > a > div > h3`;

      const COMPANY2NAMESELECTOR = `#experience-section > ul > li:nth-of-type(2) > section > div > div > a > div > p:nth-of-type(2)`;
      const COMPANY2ROLESELECTOR = `#experience-section > ul > li:nth-of-type(2) > section > div > div > a > div > h3`;

      const COMPANY1LOGOSELECTOR = `#experience-section > ul > li > section > div > div > a > div > img`;

      const COMPANY2LOGOSELECTOR = `#experience-section > ul > li:nth-of-type(2) > section > div > div > a > div > img`;

      let photo = document.querySelector(PHOTOSELECTOR).src;

      let company1Name =
        (document.querySelector(COMPANY1NAMESELECTOR) &&
          document.querySelector(COMPANY1NAMESELECTOR).innerText) ||
        null;

      let company1Role =
        (document.querySelector(COMPANY1ROLESELECTOR) &&
          document.querySelector(COMPANY1ROLESELECTOR).innerText) ||
        null;

      let company2name =
        (document.querySelector(COMPANY2NAMESELECTOR) &&
          document.querySelector(COMPANY2NAMESELECTOR).innerText) ||
        null;

      let company2role =
        (document.querySelector(COMPANY2ROLESELECTOR) &&
          document.querySelector(COMPANY2ROLESELECTOR).innerText) ||
        null;

      let company1logo =
        (document.querySelector(COMPANY1LOGOSELECTOR) &&
          document.querySelector(COMPANY1LOGOSELECTOR).currentSrc) ||
        null;

      let company2logo =
        (document.querySelector(COMPANY2LOGOSELECTOR) &&
          document.querySelector(COMPANY2LOGOSELECTOR).src) ||
        null;

      arr.push(
        `Photo URL: ${photo}\nCompany 1 Name: ${company1Name}\nCompany 1 Role: ${company1Role}\nCompany 2 Name: ${company2name}\nCompany 2 Role: ${company2role}\nCompany 1 Logo: ${company1logo}\nCompany 2 Logo: ${company2logo}"`
      );
      console.log(arr);
      return arr;
    });
    console.log({ [Object.keys(studentLinks)[i]]: result });
    totalArr.push({ [Object.keys(studentLinks)[i]]: result });
  }
  // loop ends

  let finalArr = totalArr.flat();
  console.log(util.inspect(finalArr, { maxArrayLength: null }));

  // console.log(totalArr.flat());
}
// playtest ends

(async () => {
  await playTest("https://www.linkedin.com/");
  // process.exit(1);
})();
