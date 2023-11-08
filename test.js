const fs = require('fs');
const { Parser } = require('json2csv'); // You may need to install the 'json2csv' package using npm or yarn

const resultFileName = "testResult.csv";

for (let i = 0; i < 10; i++) {
    const data = [
        {
            Code: "sea, rchKey" + i,
            CarName: "carName" + i,
            Type: "carD, esc" + i,
        },
    ];

    const parser = new Parser();
    const csv = parser.parse(data);

    const csvDataWithoutHeader = csv.split('\n')[1] + '\n';
        fs.appendFileSync(resultFileName, csvDataWithoutHeader, 'utf8', (err) => {
            if (err) {
                console.error('Error appending to CSV file:', err);
            } else {
                console.log('CSV data appended successfully.');
            }
        });
}


