const puppeteer = require('puppeteer');
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const e = require("express");
const io = require('socket.io-client');

async function handleScraping() {
    async function launchBrowser() {

        let Digital_Token = null;

        const browser = await puppeteer.launch({
            headless: false, // Use the new Headless mode
            // ... other options
        });

        // Rest of your code using the browser instance
        const page = await browser.newPage();

        // // Enable request interception
        // await page.setRequestInterception(true);

        // page.on('request', async (request) => {
        //     console.log("request!");
        //     const url = request.url();
        //     if (url === 'wss://premiumfancy.centralredis.in/socket.io/?EIO=4&transport=websocket') {
        //       const socketId = request.headers()['sec-websocket-key'];
        //       console.log(`Socket ID: ${socketId}`);
        //     }
        //     request.continue()
        // });

        // page.on('websocket', (ws) => {
        //     console.log("websocket!");
        //     const url = ws.url();
        //     if (url.includes('wss://premiumfancy.centralredis.in/socket.io/?EIO=4&transport=websocket') ) {
        //         const socketId = ws._socket._handle._parent._peername.port;
        //         console.log(`Socket ID: ${socketId}`);
                
        //         ws.on('message', (data) => {
        //         console.log(`Socket Message: ${data}`);
        //         });
        //     }
        
        //     // Continue with WebSocket connection
        //     ws.continue();
        // });
        

        // Navigate to a page that triggers AJAX requests
        await page.goto('https://betx365.win/exchange/Match/Inner/4/32743986', {
            timeout: 300000
        });
        console.log("page loaded!");
        // Delay function
        function delay(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        // login step //
        // await delay(2000);
        // userNameXPath = '/html/body/div[1]/div[1]/form/div/input[1]';
        // const [userName] = await page.$x(userNameXPath);
        // await userName.type('lotus1')

        // await page.waitForSelector('#password', {timeout: 300000});
        // await page.type('#password', 'Abcd1234');

        // await delay(2000); // 10,000 milliseconds = 10 seconds
        // const menu = await page.waitForSelector('#menu_user_d_cr_inplay', {timeout: 300000});
        // await menu.click({timeout: 300000});
        // console.log("menu clicked");

        await delay(2000); // 10,000 milliseconds = 10 seconds
        try {
            const premiumButton = await page.waitForSelector('#showSportsBookBtn', {timeout: 300000});
            await premiumButton.click({timeout: 300000});
            console.log("Premium button clicked!");

        } catch (error) {
            console.log(error)
        }       

        await delay(6000); // 10,000 milliseconds = 10 seconds

        const cdp = await page.target().createCDPSession();
        await cdp.send('Network.enable');
        await cdp.send('Page.enable');
      
        const printResponse = response => {
            const requestID = response.requestId;
            // console.log("receive websocket!", requestID);
            const socketType = response.response.payloadData;
            const contentText = socketType.split("[")[1];
            console.log(">>> ", contentText);
            console.log('response: ', response);
            try {
                if (contentText.indexOf("Premium") > -1) {
                    console.log("###########################################################################")
                    const payloadData = response.response.payloadData.replace("42", "");
                    console.log("payload data : ", payloadData);
                    const data = JSON.parse(payloadData)[1].data;
                    console.log("data : ", data);
                    const json = JSON.stringify(data);
                    fs.writeFileSync('Result.json', json);
                    console.log("###########################################################################")

                    // fs.appendFile("Result.json", data, function (err) {
                    //     if (err) throw err;
                    //     console.log('Writed!');
                    // }); 
                    // fs.writeFileSync('Result.json', data);
                }

            } catch (error) {
                console.log(error);
            }
                // console.log('response: ', response);
                
                // fs.writeFileSync('result.json', response);
                

        };
      
        cdp.on('Network.webSocketFrameReceived', printResponse); // Fired when WebSocket message is received.
        cdp.on('Network.webSocketFrameSent', printResponse); // Fired when WebSocket message is sent.

        // fetch("wss://premiumfancy.centralredis.in/socket.io/?EIO=4&transport=websocket", {
        //     "headers": {
        //         "accept-language": "en-US,en;q=0.9,ko;q=0.8",
        //         "cache-control": "no-cache",
        //         "pragma": "no-cache",
        //         "sec-websocket-extensions": "permessage-deflate; client_max_window_bits",
        //         "sec-websocket-key": "KehE7v02vAseJgYikvwGfA==",
        //         "sec-websocket-version": "13"
        //     },
        //     "body": null,
        //     "method": "GET"
        // })
        //     .then(message => {
        //         if (message.ok) {
        //             console.log("Okkkkkkkkkkkkkkkkkkkkkkkkkk");
        //             return response.json(); // assuming the response is in JSON format
        //         } else {
        //             throw new Error("Request failed with status " + response.status);
        //         }
        //     })
        //     .then(data => {
        //         // handle the response data here
        //         console.log("-----------------------------------------------------");
        //         console.log(data);
        //         console.log("-----------------------------------------------------");
        //         // const infos = data.vehicleSummaryList;
        //         // for (let num = 0; num < infos.length; num++) {
        //         //     const info = infos[num];
        //         //     if (info.payLaterRate) {
        //         //         carName = info.make;
        //         //         carDesc = info.makeModel;
        //         //         payLaterAmount = info.payLaterRate.amount;
        //         //         payLaterTotalAmount = info.payLaterRate.totalRateAmount;
        //         //         countNum = countNum + 1;
        //         //         csvRow[num] = {'Code': searchKey, 'Name': carName, 'Type': carDesc, 'PayLater': payLaterAmount, 'PayLaterTotal': payLaterTotalAmount, 'State': state, 'City': city, 'Full Location': fullLocation, 'URL': link}
        //         //         writeData.push(csvRow[num]);

        //         //         // Write data to CSV file
        //         //         csvWriter
        //         //             .writeRecords(writeData)
        //         //             .then(() => console.log('CSV file written successfully.'))
        //         //             .catch((err) => console.error('Error writing CSV file:', err));
        //         //     }
        //         // }
        //     })
        //     .catch(error => {
        //         // handle any errors that occurred during the request
        //         console.error(error);
        //     });

        // await browser.close();
    }

    await launchBrowser()
}

// date setting
handleScraping().then(res => {
    console.log('handle scraping have done!!')
})   