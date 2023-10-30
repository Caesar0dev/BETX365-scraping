const fs = require('fs');


const data = "Hello world!!!";
setInterval(() => {
    fs.writeFileSync('Test1.json', data);
    fs.appendFile("Test2.json", data, function (err) {
        if (err) throw err;
        console.log('Changed!');
    });
    console.log("write!");
}, 1000)