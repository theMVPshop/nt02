const util = require("util");
const puppeteer = require("puppeteer");
const studentLinks = require("./studentLinks.json");
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

// console.log("links obj", Object.entries(studentLinks));
console.log("links obj", Object.values(studentLinks)[1]);

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

  for (i = 1; i <= 5; i++) {
    await page.goto(Object.values(studentLinks)[i]);
    // await page.waitForNavigation();
    // await page.waitForSelector(`body`);
    // console.log(page);
    // await page.waitForSelector(
    //   `#main > div > div > section > div:nth-of-type(2) > div > div > div > div > img`
    // );
    // await page.waitForSelector(
    //   `#experience-section > ul > li > section > div > div > a > div`
    // );
    // await page.waitForSelector(
    //   `#experience-section > ul > li:nth-of-type(2) > section > div > div > a > div:nth-of-type(2) > h3`
    // );
    await page.waitForSelector(
      `#experience-section > ul > li > section > div > div > a > div > img`
    );
    // await page.waitForSelector(
    //   `#experience-section > ul > li:nth-child(2) > section > div > a > div > div > img`
    // );

    let result = await page.evaluate(() => {
      let arr = [];
      const PHOTOSELECTOR = `#main > div > div > section > div:nth-of-type(2) > div > div > div > div > img`;
      const COMPANY1NAMEROLESELECTOR = `#experience-section > ul > li > section > div > div > a > div`;
      const COMPANY2NAMESELECTOR = `#experience-section > ul > li:nth-of-type(2) > section > div > div > a > div > img`;
      const COMPANY2ROLESELECTOR = `#experience-section > ul > li:nth-of-type(2) > section > div > div > a > div:nth-of-type(2) h3`;
      const COMPANY1LOGOSELECTOR = `#experience-section > ul > li > section > div > div > a > div > img`;
      const COMPANY2LOGOSELECTOR = `#experience-section > ul > li:nth-of-type(2) > section > div > div > a > div > img`;

      let photo = document.querySelector(PHOTOSELECTOR).src;

      let company1Name = document
        .querySelectorAll(COMPANY1NAMEROLESELECTOR)[1]
        .innerText.split("\n")[4];

      let company1Role = document
        .querySelectorAll(COMPANY1NAMEROLESELECTOR)[1]
        .innerText.split("\n")[0];

      let company2name = document.querySelector(COMPANY2NAMESELECTOR).alt;

      let company2role = document.querySelector(COMPANY2ROLESELECTOR).innerText;

      let company1logo = document.querySelectorAll(COMPANY1LOGOSELECTOR)[0]
        .currentSrc;

      let company2logo =
        document.querySelectorAll(COMPANY2LOGOSELECTOR)[0].src || null;

      arr.push(
        `Photo URL: ${photo}\nCompany 1 Name: ${company1Name}\nCompany 1 Role: ${company1Role}\nCompany 2 Name: ${company2name}\nCompany 2 Role:${company2role}\nCompany 1 Logo: ${company1logo}\nCompany 2 Logo: ${company2logo}"`
      );
      console.log(arr);
      return arr;
    });
    console.log({ [Object.keys(studentLinks)[200]]: result });
  }
  // loop ends

  // totalArr.push(result);
  // let flatArr = totalArr.flat();
  // console.log(util.inspect(flatArr, { maxArrayLength: null }));

  // data.push(totalArr.flat());
  // console.log(totalArr.flat());
}
// playtest ends

(async () => {
  await playTest("https://www.linkedin.com/");
  // process.exit(1);
})();
