const util = require("util");
const puppeteer = require("puppeteer");
const C = require("./constants");
const USERNAME_SELECTOR = "#username";
const PASSWORD_SELECTOR = "#password";
const CTA_SELECTOR =
  "#organic-div > form > div.login__form_action_container > button";

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
  await page.click(
    "body > div.page.page--is-mercado-theme-enabled > main > p > a"
  );
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(C.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(C.password);
  await page.click(CTA_SELECTOR);
  await page.waitForNavigation();
  await page.waitForXPath(
    `//*[@id="main"]/div/div/div[2]/ul/li[1]/div/div/div[2]/div[1]/div/div[2]/div[1]`
  );
  let totalArr = [];
  const firstResult = await page.evaluate(() => {
    let arr = [];
    for (j = 1; j <= 10; j++) {
      let name =
        document.querySelectorAll(
          `#main > div > div > div.pv2.artdeco-card.ph0.mb2 > ul > li:nth-child(${j}) > div > div > div.entity-result__content.entity-result__divider.pt3.pb3.t-12.t-black--light > div.mb1 > div > div.t-roman.t-sans > span > div > span.entity-result__title-line.flex-shrink-1.entity-result__title-text--black > span > a > span > span:nth-child(1)`
        )[0] &&
        document.querySelectorAll(
          `#main > div > div > div.pv2.artdeco-card.ph0.mb2 > ul > li:nth-child(${j}) > div > div > div.entity-result__content.entity-result__divider.pt3.pb3.t-12.t-black--light > div.mb1 > div > div.t-roman.t-sans > span > div > span.entity-result__title-line.flex-shrink-1.entity-result__title-text--black > span > a > span > span:nth-child(1)`
        )[0].innerText;

      let role =
        document.querySelectorAll(
          `#main > div > div > div.pv2.artdeco-card.ph0.mb2 > ul > li:nth-child(${j}) > div > div > div.entity-result__content.entity-result__divider.pt3.pb3.t-12.t-black--light > div.mb1 > div > div:nth-child(2) > div.entity-result__primary-subtitle.t-14.t-black`
        )[0] &&
        document.querySelectorAll(
          `#main > div > div > div.pv2.artdeco-card.ph0.mb2 > ul > li:nth-child(${j}) > div > div > div.entity-result__content.entity-result__divider.pt3.pb3.t-12.t-black--light > div.mb1 > div > div:nth-child(2) > div.entity-result__primary-subtitle.t-14.t-black`
        )[0].innerText;

      arr.push(`${name}: "${role}"`);
    }
    console.log(arr);
    return arr;
  });
  console.log({ firstResult });
  totalArr.push(firstResult);

  for (i = 2; i <= 55; i++) {
    await page.goto(
      `https://www.linkedin.com/search/results/people/?keywords=%22austin%20coding%20academy%22&origin=FACETED_SEARCH&page=${i}&schoolFilter=%5B%224062050%22%5D`
    );
    await page.waitForXPath(
      `//*[@id="main"]/div/div/div[2]/ul/li[1]/div/div/div[2]/div[1]/div/div[2]/div[1]`
    );

    let result = await page.evaluate(() => {
      let arr = [];
      for (j = 1; j <= 10; j++) {
        let name =
          document.querySelectorAll(
            `#main > div > div > div.pv2.artdeco-card.ph0.mb2 > ul > li:nth-child(${j}) > div > div > div.entity-result__content.entity-result__divider.pt3.pb3.t-12.t-black--light > div.mb1 > div > div.t-roman.t-sans > span > div > span.entity-result__title-line.flex-shrink-1.entity-result__title-text--black > span > a > span > span:nth-child(1)`
          )[0] &&
          document.querySelectorAll(
            `#main > div > div > div.pv2.artdeco-card.ph0.mb2 > ul > li:nth-child(${j}) > div > div > div.entity-result__content.entity-result__divider.pt3.pb3.t-12.t-black--light > div.mb1 > div > div.t-roman.t-sans > span > div > span.entity-result__title-line.flex-shrink-1.entity-result__title-text--black > span > a > span > span:nth-child(1)`
          )[0].innerText;

        let role =
          document.querySelectorAll(
            `#main > div > div > div.pv2.artdeco-card.ph0.mb2 > ul > li:nth-child(${j}) > div > div > div.entity-result__content.entity-result__divider.pt3.pb3.t-12.t-black--light > div.mb1 > div > div:nth-child(2) > div.entity-result__primary-subtitle.t-14.t-black`
          )[0] &&
          document.querySelectorAll(
            `#main > div > div > div.pv2.artdeco-card.ph0.mb2 > ul > li:nth-child(${j}) > div > div > div.entity-result__content.entity-result__divider.pt3.pb3.t-12.t-black--light > div.mb1 > div > div:nth-child(2) > div.entity-result__primary-subtitle.t-14.t-black`
          )[0].innerText;

        arr.push(`${name}: "${role}"`);
      }
      console.log({ arr });
      return arr;
    });

    console.log({ [i]: result });
    totalArr.push(result);
    let flatArr = totalArr.flat();
    // console.log({ totalArr });
    // console.log({ flatArr });
    console.log(util.inspect(flatArr, { maxArrayLength: null }));
  }

  data.push(totalArr.flat());
  console.log(totalArr.flat());
}

(async () => {
  await playTest(
    "https://www.linkedin.com/search/results/people/?keywords=%22austin%20coding%20academy%22&origin=FACETED_SEARCH&schoolFilter=%5B%224062050%22%5D"
  );
  // process.exit(1);
})();
