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
          await page.goto('https://www.skyexch.art/exchange/member/index.jsp?eventType=4', {
              timeout: 300000
          });
          console.log("page loaded!");

        await page.setRequestInterception(true);

        // Listen for the 'response' event
        page.on('response', async (response) => {

            let count = 0;
            let event_ID = [];
            let market_ID = [];
            var newLine = '\r\n';
            let resultURL = "";
            
            const url = response.url();

            // Check if the response URL matches the desired URL
            if (url === 'https://www.skyexch.art/exchange/member/playerService/queryEventsWithMarket') {
                const responseBody = await response.text();
                // console.log(`Response URL: ${url}`);
                // console.log(`Response body: ${responseBody}`);
                // Perform further actions with the response
                // const json = JSON.stringify(responseBody);
                const events = JSON.parse(responseBody).events;
                // console.log("events : ", events);
                
                for (let i = 0; i < events.length; i++) {
                    const event = events[i];
                    try {
                        const market = event.markets[0];
                        const eventId = market.eventId;
                        const marketId = market.marketId;
                        // console.log("event ID: ", eventId);
                        // console.log("market ID: ", marketId);
                        // console.log("--------------------");
                        event_ID[count] = eventId;
                        market_ID[count] = marketId;
                        count = count + 1;

                    } catch (error) {
                        console.log("There isn't a market.");
                    }
                    
                }
                for (let j = 0; j < event_ID.length; j++) {
                    const event_element = event_ID[j];
                    // console.log("event element: ", event_element);
                    const market_element = market_ID[j];
                    // 'https://www.skyexch.art/exchange/member/fullMarket?eventType=4&eventId=32758571&marketId=1.220452339'
                    resultURL = resultURL + "https://www.skyexch.art/exchange/member/fullMarket?eventType=4&eventId=" + event_element + "&marketId=" + market_element + newLine;
                }

                fs.stat("urlList.csv", function (err, stat) {
                    fs.writeFile("urlList.csv", resultURL, function (err) {
                        if (err) throw err;
                        console.log('file saved');
                    });
                });

                // fs.writeFileSync('Demo2.json', responseBody);
            }
        });
      
        // Disable request interception
        await page.setRequestInterception(false);

        // await browser.close();
    }

    await launchBrowser();
    
}

// date setting
handleScraping().then(res => {
    console.log('handle scraping have done!!')
})


