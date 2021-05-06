const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Emitted when the DOM is parsed and ready (without waiting for resources)
  page.once('domcontentloaded', () => console.info('✅ DOM is ready'));

  // Emitted when the page is fully loaded
  page.once('load', () => console.info('✅ Page is loaded'));

  // Emitted when the page attaches a frame
  page.on('frameattached', () => console.info('✅ Frame is attached'));

  // Emitted when a frame within the page is navigated to a new URL
  page.on('framenavigated', () => console.info('👉 Frame is navigated'));

  // Emitted when a script within the page uses `console.timeStamp`
  page.on('metrics', data => console.info(`👉 Timestamp added at ${data.metrics.Timestamp}`));

  // Emitted when a script within the page uses `console`
  page.on('console', message => console[message.type()](`👉 ${message.text()}`));

  // Emitted when the page emits an error event (for example, the page crashes)
  page.on('error', error => console.error(`❌ ${error}`));

  // Emitted when a script within the page has uncaught exception
  page.on('pageerror', error => console.error(`❌ ${error}`));

  // Emitted when a script within the page uses `alert`, `prompt`, `confirm` or `beforeunload`
  page.on('dialog', async dialog => {
    console.info(`👉 ${dialog.message()}`);
    await dialog.dismiss();
  });

  // Emitted when a new page, that belongs to the browser context, is opened
  page.on('popup', () => console.info('👉 New page is opened'));

  // Emitted when the page produces a request
  page.on('request', request => console.info(`👉 Request: ${request.url()}`));

  // Emitted when a request, which is produced by the page, fails
  page.on('requestfailed', request => console.info(`❌ Failed request: ${request.url()}`));

  // Emitted when a request, which is produced by the page, finishes successfully
  page.on('requestfinished', request => console.info(`👉 Finished request: ${request.url()}`));

  // Emitted when a response is received
  page.on('response', response => console.info(`👉 Response: ${response.url()}`));

  // Emitted when the page creates a dedicated WebWorker
  page.on('workercreated', worker => console.info(`👉 Worker: ${worker.url()}`));

  // Emitted when the page destroys a dedicated WebWorker
  page.on('workerdestroyed', worker => console.info(`👉 Destroyed worker: ${worker.url()}`));

  // Emitted when the page detaches a frame
  page.on('framedetached', () => console.info('✅ Frame is detached'));

  // Emitted after the page is closed
  page.once('close', () => console.info('✅ Page is closed'));

  // await page.goto('https://pptr.dev');
  await page.goto(url);
  // console.info(page);
  const title = await page.title();
  console.log({title});
  // const [el] = await page.$x("");
  // const src = await el.getProperty("src");
  // const imgURL = await src.jsonValue();
  await page.waitForSelector('title');
  const el2 = await page.$x('//*[@id="main"]/div/div/div[2]/ul/li[2]/div/div/div[2]/div[1]/div/div[1]/span/div/span[1]/span/a/span/span[1]');
  console.log(el2);
  // const txt = await el2.getProperty("textContent");
  // const title = await txt.jsonValue();

  // const [el3] = await page.$x("");
  // const txt2 = await el3.getProperty("textContent");
  // const price = await txt2.jsonValue();

  // const rating = await page.evaluate(return $('#main > div > div > div.pv2.artdeco-card.ph0.mb2 > ul > li:nth-child(2) > div > div > div.entity-result__content.entity-result__divider.pt3.pb3.t-12.t-black--light > div.mb1 > div > div.t-roman.t-sans > span > div > span.entity-result__title-line.flex-shrink-1.entity-result__title-text--black > span > a > span > span:nth-child(1)'));
  // console.log({rating});
  browser.close();
}

scrapeProduct(
  "https://www.linkedin.com/search/results/people/?keywords=%22austin%20coding%20academy%22&origin=FACETED_SEARCH&schoolFilter=%5B%224062050%22%5D"
);
