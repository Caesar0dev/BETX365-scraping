const puppeteer = require('puppeteer');
// const csv = require('csv-parser');
// const fs = require('fs');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const e = require("express");
// const io = require('socket.io-client');

async function handleScraping() {
    let browser = null;

    async function init() {
        browser = await puppeteer.launch({
            headless: false, // Use the new Headless mode
            // ... other options
        });
    }

    // Rest of your code using the browser instance

    // for Cricket page
    async function launchCricket() {

        //open window
        const browser = await puppeteer.launch({
            headless: true, // Use the new Headless mode
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
                const events = JSON.parse(responseBody).events;
                
                for (let i = 0; i < events.length; i++) {
                    const event = events[i];
                    try {
                        const market = event.markets[0];
                        const eventId = market.eventId;
                        const marketId = market.marketId;
                        count = count + 1;
                        resultURL = "https://www.skyexch.art/exchange/member/fullMarket?eventType=4&eventId=" + eventId + "&marketId=" + marketId;
                        const targetURL = "https://54.158.38.118/exchange/member/fullMarket?eventType=4&eventId=" + eventId + "&marketId=" + marketId;
                        
                        console.log("-------------------------"+count+"-----------------------");
                        console.log("Cricket URL: ", targetURL);

                        await fetch("https://www.skyexch.art/exchange/member/playerService/queryFullMarkets", {
                            "headers": {
                                "accept": "application/json, text/javascript, */*; q=0.01",
                                "accept-language": "en-US,en;q=0.9",
                                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-ch-ua-platform": "\"Windows\"",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "x-requested-with": "XMLHttpRequest",
                                "cookie": "JSESSIONID=C42AACA422038D2F78D9614B4251AF62.player01; _ga=GA1.2.229449976.1699152856; _gid=GA1.2.580020956.1699152856; _fw_crm_v=a76acf77-1b9e-4fb7-f951-bbdd660dff97; uiSelect_=%7B%22act%22%3A%22selectMarket%22%2C%22eventType%22%3A%224%22%2C%22eventId%22%3A%22"+eventId+"%22%2C%22marketId%22%3A%22"+marketId+"%22%7D",
                                "Referer": resultURL,
                                "Referrer-Policy": "strict-origin-when-cross-origin"
                            },
                            "body": "eventId="+eventId+"&marketId="+marketId+"&selectionTs=-1&isGetRunnerMetadata=true&queryPass=C42AACA422038D2F78D9614B4251AF62.player01",
                            "method": "POST"
                        })
                            .then(response => {
                                if (response.ok) {
                                    return response.json(); // assuming the response is in JSON format
                                } else {
                                    throw new Error("Request failed with status " + response.status);
                                }
                            })
                            .then(data => {
                                console.log("Cricket response: ", data);

                                // send the ajax to target website
                                fetch("https://54.158.38.118/exchange/member/playerService/queryFullMarkets", {
                                    "headers": {
                                        "accept": "application/json, text/javascript, */*; q=0.01",
                                        "accept-language": "en-US,en;q=0.9",
                                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                        "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                                        "sec-ch-ua-mobile": "?0",
                                        "sec-ch-ua-platform": "\"Windows\"",
                                        "sec-fetch-dest": "empty",
                                        "sec-fetch-mode": "cors",
                                        "sec-fetch-site": "same-origin",
                                        "x-requested-with": "XMLHttpRequest",
                                        "cookie": "JSESSIONID=C42AACA422038D2F78D9614B4251AF62.player01; _ga=GA1.2.229449976.1699152856; _gid=GA1.2.580020956.1699152856; _fw_crm_v=a76acf77-1b9e-4fb7-f951-bbdd660dff97; uiSelect_=%7B%22act%22%3A%22selectMarket%22%2C%22eventType%22%3A%224%22%2C%22eventId%22%3A%22"+eventId+"%22%2C%22marketId%22%3A%22"+marketId+"%22%7D",
                                        "Referer": targetURL,
                                        "Referrer-Policy": "strict-origin-when-cross-origin"
                                    },
                                    "body": data,
                                    "method": "POST"
                                })
                                    .then(response => {
                                        if(response.ok) {
                                            console.log("Cricket Request has been sent successfully!");
                                        } else {
                                            console.log("Cricket Request has not been sent!")
                                        }
                                    })
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
                        resultURL = "https://www.skyexch.art/exchange/member/fullMarket?eventType=1&eventId=" + eventId + "&marketId=" + marketId;
                        const targetURL = "https://54.158.38.118/exchange/member/fullMarket?eventType=1&eventId=" + eventId + "&marketId=" + marketId;

                        console.log("-------------------------"+count+"-----------------------");
                        console.log("soccer URL: ", resultURL);

                        await fetch("https://www.skyexch.art/exchange/member/playerService/queryFullMarkets", {
                            "headers": {
                                "accept": "application/json, text/javascript, */*; q=0.01",
                                "accept-language": "en-US,en;q=0.9",
                                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-ch-ua-platform": "\"Windows\"",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "x-requested-with": "XMLHttpRequest",
                                "cookie": "JSESSIONID=C42AACA422038D2F78D9614B4251AF62.player01; _ga=GA1.2.229449976.1699152856; _gid=GA1.2.580020956.1699152856; _fw_crm_v=a76acf77-1b9e-4fb7-f951-bbdd660dff97; uiSelect_=%7B%22act%22%3A%22selectMarket%22%2C%22eventType%22%3A%221%22%2C%22eventId%22%3A%22"+eventId+"%22%2C%22marketId%22%3A%22"+marketId+"%22%7D",
                                "Referer": resultURL,
                                "Referrer-Policy": "strict-origin-when-cross-origin"
                            },
                            "body": "eventId="+eventId+"&marketId="+marketId+"&selectionTs=-1&isGetRunnerMetadata=true&queryPass=C42AACA422038D2F78D9614B4251AF62.player01",
                            "method": "POST"
                        })
                            .then(response => {
                                if (response.ok) {
                                    return response.json(); // assuming the response is in JSON format
                                } else {
                                    throw new Error("Request failed with status " + response.status);
                                }
                            })
                            .then(data => {
                                console.log("soccer response: ", data);
                                
                                fetch("https://54.158.38.118/exchange/member/playerService/queryFullMarkets", {
                                    "headers": {
                                        "accept": "application/json, text/javascript, */*; q=0.01",
                                        "accept-language": "en-US,en;q=0.9",
                                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                        "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                                        "sec-ch-ua-mobile": "?0",
                                        "sec-ch-ua-platform": "\"Windows\"",
                                        "sec-fetch-dest": "empty",
                                        "sec-fetch-mode": "cors",
                                        "sec-fetch-site": "same-origin",
                                        "x-requested-with": "XMLHttpRequest",
                                        "cookie": "JSESSIONID=C42AACA422038D2F78D9614B4251AF62.player01; _ga=GA1.2.229449976.1699152856; _gid=GA1.2.580020956.1699152856; _fw_crm_v=a76acf77-1b9e-4fb7-f951-bbdd660dff97; uiSelect_=%7B%22act%22%3A%22selectMarket%22%2C%22eventType%22%3A%221%22%2C%22eventId%22%3A%22"+eventId+"%22%2C%22marketId%22%3A%22"+marketId+"%22%7D",
                                        "Referer": targetURL,
                                        "Referrer-Policy": "strict-origin-when-cross-origin"
                                    },
                                    "body": data,
                                    "method": "POST"
                                })
                                    .then(response => {
                                        if(response.ok) {
                                            console.log("Soccer Request has been sent successfully!");
                                        } else {
                                            console.log("Soccer Request has not been sent!")
                                        }
                                    })
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

        const browser = await puppeteer.launch({
            headless: false, // Use the new Headless mode
            // ... other options
        });

        // Rest of your code using the browser instance
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
                        resultURL = "https://www.skyexch.art/exchange/member/fullMarket?eventType=2&eventId=" + eventId + "&marketId=" + marketId;
                        const targetURL = "https://54.158.38.118/exchange/member/fullMarket?eventType=2&eventId=" + eventId + "&marketId=" + marketId;

                        console.log("-------------------------"+count+"-----------------------");
                        console.log("Tennis URL: ", resultURL);

                        await fetch("https://www.skyexch.art/exchange/member/playerService/queryFullMarkets", {
                            "headers": {
                                "accept": "application/json, text/javascript, */*; q=0.01",
                                "accept-language": "en-US,en;q=0.9",
                                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-ch-ua-platform": "\"Windows\"",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "x-requested-with": "XMLHttpRequest",
                                "cookie": "JSESSIONID=C42AACA422038D2F78D9614B4251AF62.player01; _ga=GA1.2.229449976.1699152856; _gid=GA1.2.580020956.1699152856; _fw_crm_v=a76acf77-1b9e-4fb7-f951-bbdd660dff97; uiSelect_=%7B%22act%22%3A%22selectMarket%22%2C%22eventType%22%3A%222%22%2C%22eventId%22%3A%22"+eventId+"%22%2C%22marketId%22%3A%22"+marketId+"%22%7D",
                                "Referer": resultURL,
                                "Referrer-Policy": "strict-origin-when-cross-origin"
                            },
                            "body": "eventId="+eventId+"&marketId="+marketId+"&selectionTs=-1&isGetRunnerMetadata=true&queryPass=C42AACA422038D2F78D9614B4251AF62.player01",
                            "method": "POST"
                        })
                            .then(response => {
                                if (response.ok) {
                                    return response.json(); // assuming the response is in JSON format
                                } else {
                                    throw new Error("Request failed with status " + response.status);
                                }
                            })
                            .then(data => {
                                console.log("Tennis response: ", data);
                                
                                fetch("https://54.158.38.118/exchange/member/playerService/queryFullMarkets", {
                                    "headers": {
                                        "accept": "application/json, text/javascript, */*; q=0.01",
                                        "accept-language": "en-US,en;q=0.9",
                                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                        "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                                        "sec-ch-ua-mobile": "?0",
                                        "sec-ch-ua-platform": "\"Windows\"",
                                        "sec-fetch-dest": "empty",
                                        "sec-fetch-mode": "cors",
                                        "sec-fetch-site": "same-origin",
                                        "x-requested-with": "XMLHttpRequest",
                                        "cookie": "JSESSIONID=C42AACA422038D2F78D9614B4251AF62.player01; _ga=GA1.2.229449976.1699152856; _gid=GA1.2.580020956.1699152856; _fw_crm_v=a76acf77-1b9e-4fb7-f951-bbdd660dff97; uiSelect_=%7B%22act%22%3A%22selectMarket%22%2C%22eventType%22%3A%222%22%2C%22eventId%22%3A%22"+eventId+"%22%2C%22marketId%22%3A%22"+marketId+"%22%7D",
                                        "Referer": targetURL,
                                        "Referrer-Policy": "strict-origin-when-cross-origin"
                                    },
                                    "body": data,
                                    "method": "POST"
                                })
                                    .then(response => {
                                        if(response.ok) {
                                            console.log("Tennis Request has been sent successfully!");
                                        } else {
                                            console.log("Tennis Request has not been sent!")
                                        }
                                    })
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

    // lunch each page\
    launchCricket();
    launchSoccer();
    launchTennis();
    
}

// lunch full code
handleScraping().then(res => {
    // console.log('handle scraping have done!!')
})


