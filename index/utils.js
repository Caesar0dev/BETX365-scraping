
const FETCH_URL = `https://www.skyexch.art/exchange/member/playerService/queryFullMarkets`
const SERVER_URL = `https://54.158.38.118/exchange/member/playerService/queryFullMarkets`

const sendToServer = (baseUrl, data) => {
    fetch(SERVER_URL, {
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
            "Referer": baseUrl,
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
}

const fetchData = (resultURL, eventId, marketId, eventType) => {
    // console.log("resultURL on utils >>> ", resultURL);
    // console.log("eventId on utils >>> ", eventId);
    // console.log("marketId on utils >>> ", marketId);
    // console.log("eventType on utils >>> ", eventType);
    return fetch(FETCH_URL, {
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
            "cookie": `JSESSIONID=C42AACA422038D2F78D9614B4251AF62.player01; _ga=GA1.2.229449976.1699152856; _gid=GA1.2.580020956.1699152856; _fw_crm_v=a76acf77-1b9e-4fb7-f951-bbdd660dff97; uiSelect_=%7B%22act%22%3A%22selectMarket%22%2C%22eventType%22%3A%22${eventType}%22%2C%22eventId%22%3A%22${eventId}%22%2C%22marketId%22%3A%22${marketId}%22%7D`,
            "Referer": resultURL,
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `eventId=${eventId}&marketId=${marketId}&selectionTs=-1&isGetRunnerMetadata=true&queryPass=C42AACA422038D2F78D9614B4251AF62.player01`,
        "method": "POST"
    })
}

module.exports = { 
    sendToServer,
    fetchData,
};