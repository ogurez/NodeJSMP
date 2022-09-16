import csv from "csvtojson";
import fs from "fs";
import {parse} from "csv-parse";

let s = ''

//Full file reading solution
// csv()
// .fromFile('./csv/nodejs-hw1-ex1.csv')
// .then((jsonObj)=>{
//     jsonObj.forEach(v => s += `${JSON.stringify(v)}\n`)
//     fs.writeFile('./csv/hw1ex1.txt', s, err => {
//         if (err) {
//           console.error(err);
//         }
//       });
// })
// .catch(err => {
//     console.error(err)
// })

//Line by line reading solution
fs.createReadStream('./csv/nodejs-hw1-ex1.csv')
  .pipe(parse({ delimiter: ",", from_line: 2}))
  .on("data", function (row) {
      const a = {
          "book": row[0],
          "author": row[1],
          "price": row[2]
      }
      s += `${JSON.stringify(a)}\n`
  })
  .on("end", function () {
    console.log("finished");
    fs.writeFile('./csv/hw1ex1.txt', s, err => {
        if (err) {
            console.error(err);
        }
    });
  })
  .on("error", function (error) {
    console.log(error.message);
  });
