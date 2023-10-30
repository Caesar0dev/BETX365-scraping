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
        await page.goto('https://betx365.win/', {
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

        await delay(2000); // 10,000 milliseconds = 10 seconds
        const menu = await page.waitForSelector('#menu_user_d_cr_inplay', {timeout: 300000});
        await menu.click({timeout: 300000});
        console.log("menu clicked");

        await delay(2000);
        try {
            const aTags = await page.$$eval('ul#myID li a', as => as.map(a => a.textContent));
            console.log("Cricket Name >>> ", aTags)
        } catch (error) {
            console.log(error);
        }

        // await delay(30000); // 10,000 milliseconds = 10 seconds
        // try {
        //     const firstSideBarXPath = '//*[@id="data_list"]/li[2]/a';
        //     const [firstSideBar] = await page.$x(firstSideBarXPath);
        //     await firstSideBar.click({timeout:300000});
        //     console.log("WBBL clicked!");
            
        // } catch (error) {
        //     console.log(error);
        // }
        
        // await delay(6000); // 10,000 milliseconds = 10 seconds
        // try {
        //     const secondSideBarXPath = '//*[@id="data_list"]/li[1]/a';
        //     const [secondSideBar] = await page.$x(secondSideBarXPath);
        //     await secondSideBar.click({timeout:300000});
        //     console.log("WBBL vs Other team clicked!");
        // } catch (error) {
        //     console.log(error);
        // }
        
        // await delay(3000); // 10,000 milliseconds = 10 seconds
        // try {
        //     const thirdSideBar = await page.waitForSelector('#name', {timeout: 300000});
        //     await thirdSideBar.click({timeout: 300000});
        //     console.log("Match odds clicked!");

        // } catch (error) {
        //     console.log(error);
        // }

        // await delay(2000); // 10,000 milliseconds = 10 seconds
        // try {
        //     const premiumButton = await page.waitForSelector('#showSportsBookBtn', {timeout: 300000});
        //     await premiumButton.click({timeout: 300000});
        //     console.log("Premium button clicked!");

        // } catch (error) {
        //     console.log(error)
        // }      

        // await delay(6000); // 10,000 milliseconds = 10 seconds

        // const cdp = await page.target().createCDPSession();
        // await cdp.send('Network.enable');
        // await cdp.send('Page.enable');
      
        // const printResponse = response => {
        //     const requestID = response.requestId;
        //     // console.log("receive websocket!", requestID);
        //     const socketType = response.response.payloadData;
        //     const contentText = socketType.split("[")[1];
        //     console.log(">>> ", contentText);
        //     console.log('response: ', response);
        //     try {
        //         if (contentText.indexOf("Premium") > -1) {
        //             console.log("###########################################################################")
        //             const payloadData = response.response.payloadData.replace("42", "");
        //             console.log("payload data : ", payloadData);
        //             const data = JSON.parse(payloadData)[1].data;
        //             console.log("data : ", data);
        //             const json = JSON.stringify(data);
        //             fs.writeFileSync('Demo.json', json);
        //             console.log("###########################################################################")

        //             // fs.appendFile("Result.json", data, function (err) {
        //             //     if (err) throw err;
        //             //     console.log('Writed!');
        //             // }); 
        //             // fs.writeFileSync('Result.json', data);
        //         }

        //     } catch (error) {
        //         console.log(error);
        //     }

        // };
      
        // cdp.on('Network.webSocketFrameReceived', printResponse); // Fired when WebSocket message is received.
        // cdp.on('Network.webSocketFrameSent', printResponse); // Fired when WebSocket message is sent.

    }

    await launchBrowser()
}

// date setting
handleScraping().then(res => {
    console.log('handle scraping have done!!')
})   