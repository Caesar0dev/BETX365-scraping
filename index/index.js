const puppeteer = require('puppeteer');
const utils = require("./utils");

async function handleScraping() {
    let browser = null

    async function init() {
        browser = await puppeteer.launch({
            headless: false, // Use the new Headless mode
            // ... other options
        });
    }

    // for Cricket page
    async function launchCricket() {
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
            // let resultURL = "";
            
            const url = response.url();

            // Check if the response URL matches the desired URL
            if (url === 'https://www.skyexch.art/exchange/member/playerService/queryEventsWithMarket') {
                const responseBody = await response.text();
                const events = JSON.parse(responseBody).events;
                
                for (let i = 0; i < events.length; i++) {
                    const event = events[i];
                    try {
                        const market = event.markets[0];
                        const eventId = market.eventId;
                        // console.log("eventID >>> ", eventId);
                        const marketId = market.marketId;
                        // console.log("marketId >>> ", marketId);
                        count = count + 1;
                        const resultURL = `https://www.skyexch.art/exchange/member/fullMarket?eventType=4&eventId=${eventId}&marketId=${marketId}`;
                        // console.log("requestURL >>> ", resultURL);
                        const targetURL = `https://54.158.38.118/exchange/member/fullMarket?eventType=4&eventId=${eventId}&marketId=${marketId}`;
                        
                        console.log("------------------------Cricket-"+count+"-----------------------");
                        console.log("Cricket URL: ", targetURL);

                        const eventType = "4";
                        await utils.fetchData(resultURL, eventId, marketId, eventType)
                            .then(response => {
                                if (response.ok) {
                                    return response.json(); // assuming the response is in JSON format
                                } else {
                                    throw new Error("Request failed with status " + response.status);
                                }
                            })
                            .then(data => {
                                console.log("Cricket response: ", data);

                                utils.sendToServer(targetURL, data)

                            })
                        console.log("---------------------------------------------------");

                    } catch (error) {
                        console.log("There isn't a market.");
                    }
                    
                }
                
            }
        });
      
        // Disable request interception
        await page.setRequestInterception(false);

        // await browser.close();
    }

    // for Soccer page
    async function launchSoccer() {
        const page = await browser.newPage();
        
          // Navigate to a page that triggers AJAX requests
          await page.goto('https://www.skyexch.art/exchange/member/index.jsp?eventType=1', {
              timeout: 300000
          });
          console.log("Soccer page loaded!");

        await page.setRequestInterception(true);

        // Listen for the 'response' event
        page.on('response', async (response) => {

            let count = 0;
            let resultURL = "";
            
            const url = response.url();

            // Check if the response URL matches the desired URL
            if (url === 'https://www.skyexch.art/exchange/member/playerService/queryEventsWithMarket') {
                const responseBody = await response.text();
                const events = JSON.parse(responseBody).events;
                
                for (let i = 0; i < events.length; i++) {
                    const event = events[i];
                    try {
                        const market = event.markets[0];
                        const eventId = market.eventId;
                        const marketId = market.marketId;
                        count = count + 1;
                        resultURL = `https://www.skyexch.art/exchange/member/fullMarket?eventType=1&eventId=${eventId}&marketId=${marketId}`;
                        const targetURL = `https://54.158.38.118/exchange/member/fullMarket?eventType=1&eventId=${eventId}&marketId=${marketId}`;

                        console.log("------------------------Soccer-"+count+"-----------------------");
                        console.log("soccer URL: ", resultURL);

                        const eventType = "1";
                        await utils.fetchData(resultURL, eventId, marketId, eventType)
                            .then(response => {
                                if (response.ok) {
                                    return response.json(); // assuming the response is in JSON format
                                } else {
                                    throw new Error("Request failed with status " + response.status);
                                }
                            })
                            .then(data => {
                                console.log("soccer response: ", data);

                                utils.sendToServer(targetURL, data)
                            })
                        console.log("---------------------------------------------------");

                    } catch (error) {
                        console.log("There isn't a market.");
                    }
                    
                }
                
            }
        });
      
        // Disable request interception
        await page.setRequestInterception(false);

        // await browser.close();
    }

    // for Tennis page
    async function launchTennis() {
        const page = await browser.newPage();
        
          // Navigate to a page that triggers AJAX requests
          await page.goto('https://www.skyexch.art/exchange/member/index.jsp?eventType=2', {
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
                const events = JSON.parse(responseBody).events;
                
                for (let i = 0; i < events.length; i++) {
                    const event = events[i];
                    try {
                        const market = event.markets[0];
                        const eventId = market.eventId;
                        const marketId = market.marketId;
                        count = count + 1;
                        resultURL = `https://www.skyexch.art/exchange/member/fullMarket?eventType=2&eventId=${eventId}&marketId=${marketId}`;
                        const targetURL = `https://54.158.38.118/exchange/member/fullMarket?eventType=2&eventId=${eventId}&marketId=${marketId}`;

                        console.log("------------------------Tennis-"+count+"-----------------------");
                        console.log("Tennis URL: ", resultURL);

                        const eventType = "2";
                        utils.fetchData(resultURL, eventId, marketId, eventType)
                            .then(response => {
                                if (response.ok) {
                                    return response.json(); // assuming the response is in JSON format
                                } else {
                                    throw new Error("Request failed with status " + response.status);
                                }
                            })
                            .then(data => {
                                console.log("Tennis response: ", data);

                                utils.sendToServer(targetURL, data)
                            })
                        console.log("---------------------------------------------------");

                    } catch (error) {
                        console.log("There isn't a market.");
                    }
                    
                }
                
            }
        });
      
        // Disable request interception
        await page.setRequestInterception(false);

        // await browser.close();
    }

    // lunch each page
    await init()
    await launchCricket()
    await launchSoccer()
    await launchTennis()
    
}

// lunch full code
handleScraping().then(res => {
    // console.log('handle scraping have done!!')
})