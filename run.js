const puppeteer = require('puppeteer');
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const e = require("express");

async function handleScraping() {
    async function launchBrowser() {

        let Digital_Token = null;
        let RecaptchaResponse = null;
        let Cookie = null;
        let BasicPayload = null;
        let carName = "";
        let carDesc = "";
        let payLaterAmount = "";
        let payLaterTotalAmount = "";
        let csvRow = [];
        const writeData = [];

        const browser = await puppeteer.launch({
            headless: true, // Use the new Headless mode
            // ... other options
        });

        // Rest of your code using the browser instance
        const page = await browser.newPage();

        // Enable request interception
        await page.setRequestInterception(true);

        // Listen for the request event
        page.on('request', async (request) => {

            if (!request.isNavigationRequest()) {
                // It's an AJAX request
                if (request.url().includes('wss://premiumfancy.centralredis.in/socket.io/?EIO=4&transport=websocket')) {

                    BasicPayload = request.postData();

                    if(BasicPayload) {
                        Digital_Token = request.headers()['Sec-Websocket-Extensions'];
                        
                    }
                }
            }
            request.continue();
        });

        // Navigate to a page that triggers AJAX requests
        await page.goto('https://betx365.win/', {
            timeout: 300000
        });

        // Delay function
        function delay(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        await delay(2000); // 10,000 milliseconds = 10 seconds
        const menu = await page.waitForSelector('#menu_user_d_cr_inplay', {timeout: 300000});
        await menu.click({timeout: 300000});

        await delay(2000); // 10,000 milliseconds = 10 seconds
        let firstSideBarXPath = '//*[@id="data_list"]/li[2]/a';
        try {
            const [firstSideBar] = await page.$x(firstSideBarXPath);
            await firstSideBar.click({timeout:300000});
        } catch (error) {
            console.log(error);
        }

        await delay(2000); // 10,000 milliseconds = 10 seconds
        let secondSideBarXPath = '//*[@id="data_list"]/li[1]/a';
        try {
            const [secondSideBar] = await page.$x(secondSideBarXPath);
            await secondSideBar.click({timeout:300000});
        } catch (error) {
            console.log(error);
        }

        // await page.waitForSelector('#PicLoc_value', {timeout: 300000});
        // await page.type('#PicLoc_value', 'shr');
        // await page.$eval('#from', (element) => {
        //     element.value = "10/15/2023";
        // });

        // await delay(3000); // 10,000 milliseconds = 10 seconds
        // const endDateField = await page.waitForSelector('#to', {timeout: 300000});
        // await endDateField.click({timeout: 300000});

        // await delay(3000); // 10,000 milliseconds = 10 seconds
        // const endDateXPath = '//*[@id="ui-datepicker-div"]/div[3]/table/tbody/tr[1]/td[4]/a';
        // const [end_day] = await page.$x(endDateXPath);
        // await end_day.click({timeout: 300000});

        // await delay(3000); // 10,000 milliseconds = 10 seconds

        // const findButton = await page.waitForSelector('#res-home-select-car', {timeout: 300000});
        // await findButton.click({timeout: 300000});

        await delay(3000); // 10,000 milliseconds = 10 seconds

        await fetch("https://www.avis.com/webapi/reservation/vehicles", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9",
                "action": "RES_VEHICLESHOP",
                "bookingtype": "car",
                "channel": "Digital",
                "content-type": "application/json",
                "devicetype": "bigbrowser",
                "digital-token": Digital_Token,
                "domain": "us",
                "g-recaptcha-response": RecaptchaResponse,
                "initreservation": "true",
                "locale": "en",
                "password": "AVISCOM",
                "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "username": "AVISCOM",
                "cookie": Cookie,
                "Referer": "https://www.avis.com/en/home",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": "{\"rqHeader\":{\"brand\":\"\",\"locale\":\"en_US\"},\"nonUSShop\":false,\"pickInfo\":\""+searchKey+"\",\"pickCountry\":\"US\",\"pickDate\":\""+start_date+"\",\"pickTime\":\"12:00 PM\",\"dropInfo\":\""+searchKey+"\",\"dropDate\":\""+end_date+"\",\"dropTime\":\"12:00 PM\",\"couponNumber\":\"\",\"couponInstances\":\"\",\"couponRateCode\":\"\",\"discountNumber\":\"\",\"rateType\":\"\",\"residency\":\"US\",\"age\":25,\"wizardNumber\":\"\",\"lastName\":\"\",\"userSelectedCurrency\":\"\",\"selDiscountNum\":\"\",\"promotionalCoupon\":\"\",\"preferredCarClass\":\"\",\"membershipId\":\"\",\"noMembershipAvailable\":false,\"corporateBookingType\":\"\",\"enableStrikethrough\":\"true\",\"picLocTruckIndicator\":false,\"amazonGCPayLaterPercentageVal\":\"\",\"amazonGCPayNowPercentageVal\":\"\",\"corporateEmailID\":\"\"}",
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
                // handle the response data here
                const infos = data.vehicleSummaryList;
                for (let num = 0; num < infos.length; num++) {
                    const info = infos[num];
                    if (info.payLaterRate) {
                        carName = info.make;
                        carDesc = info.makeModel;
                        payLaterAmount = info.payLaterRate.amount;
                        payLaterTotalAmount = info.payLaterRate.totalRateAmount;
                        countNum = countNum + 1;
                        csvRow[num] = {'Code': searchKey, 'Name': carName, 'Type': carDesc, 'PayLater': payLaterAmount, 'PayLaterTotal': payLaterTotalAmount, 'State': state, 'City': city, 'Full Location': fullLocation, 'URL': link}
                        writeData.push(csvRow[num]);

                        // Write data to CSV file
                        csvWriter
                            .writeRecords(writeData)
                            .then(() => console.log('CSV file written successfully.'))
                            .catch((err) => console.error('Error writing CSV file:', err));
                    }
                }
            })
            .catch(error => {
                // handle any errors that occurred during the request
                console.error(error);
            });

        await browser.close();
    }

    await launchBrowser()
}

// date setting
handleScraping().then(res => {
    console.log('handle scraping have done!!')
})   