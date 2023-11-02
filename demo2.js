const puppeteer = require('puppeteer');
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const e = require("express");
const io = require('socket.io-client');

async function handleScraping() {

    async function launchBrowser() {

        const browser = await puppeteer.launch({
            headless: false, // Use the new Headless mode
            // ... other options
        });

        // Rest of your code using the browser instance
        const page = await browser.newPage();
        
          // Navigate to a page that triggers AJAX requests
          await page.goto('https://www.skyexch.art/exchange/member/fullMarket?eventType=4&eventId=32744713&marketId=1.220200073', {
              timeout: 300000
          });
          console.log("page loaded!");

        await page.setRequestInterception(true);

        // Listen for the 'response' event
        page.on('response', async (response) => {
            const url = response.url();

            // Check if the response URL matches the desired URL
            if (url === 'https://lt-fn-cdn001.akamaized.net/techablesoftware/en/Etc:UTC/gismo/match_info/41946121') {
                const responseBody = await response.text();
                console.log(`Response URL: ${url}`);
                console.log(`Response body: ${responseBody}`);
                // Perform further actions with the response
                // const json = JSON.stringify(responseBody);
                fs.writeFileSync('Demo2.json', responseBody);
            }
        });
      
        // Disable request interception
        await page.setRequestInterception(false);
    }

    await launchBrowser();
    
}

// date setting
handleScraping().then(res => {
    console.log('handle scraping have done!!')
})


