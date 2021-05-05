const util = require("util");
const bootcampInfoString = require("../data(json)/scrapedBootcamps");

const reducedCSV = Object.values(bootcampInfoString) //
  .join(",") // returns a template literal that basically mirrors the source file
  .split("\n"); // returns an array of comma-separated-values with the shape 'School,State,Grads,Company' e.g. 'Dev Bootcamp,CA,14,Amazon',
const currentValueArray = cv.split(","); // splits those values into a more specific sub-array on each iteration
const schoolName = currentValueArray[0]; // represents the "school name" value
const company = currentValueArray[3];
const grads = parseInt(currentValueArray[2]);
const state = currentValueArray[1];

console.log(util.inspect(reducedCSV, { maxArrayLength: null, depth: null }));

// let final = {
//     name: 'states',
//     children: [
//         {
//             name: 'WA',
//             children: [
//                 {
//                     name: 'Nucamp Coding Bootcamp',
//                     children: [
//                         {
//                             name: 'Walgreens',
//                             value: 3
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }
