import * as webdriver from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome.js';

// const webdriver = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');

const run = async () => {
    const service = new chrome.ServiceBuilder('./chromedriver/windows.exe').build();

    chrome.setDefaultService(service);

    // let driver await new Builder().forBrowser('chrome').build();

    const driver = await new webdriver.Builder()
                            .forBrowser('chrome')
                            .build();
    // await driver.get('https://google.com');
    await driver.get('https://studio.bhaptics.com/project');

    setTimeout(async () =>{
        await driver.quit();
        process.exit(0);
    }, 3000);
    console.log('OpenWeb');
}

run();

// let google = document.getElementById( "VisuoTorus" );
// google.addEventListener("click", ()=>{
// console.log('wow');
// run();
// });
// export{ google };