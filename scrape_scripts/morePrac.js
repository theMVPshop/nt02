const util = require("util");
const bootcampInfoString = require("../data(json)/scrapedBootcamps");

const reducedByState = Object.values(bootcampInfoString)
  .join(",")
  .trim()
  .split("\n")
  .reduce((obj, cv, idx) => {
    const currentValueArray = cv.split(",");
    const schoolName = currentValueArray[0];
    const company = currentValueArray[3];
    const grads = parseInt(currentValueArray[2]);
    const state = currentValueArray[1];

    obj[state] = obj[state] || [];
    obj[state][schoolName] = obj[state][schoolName] || [];
    obj[state].concat(obj[state][schoolName]);
    obj[state][schoolName].push({ name: company, value: grads });

    return obj;
  }, {});

console.log(
  util.inspect(reducedByState, { maxArrayLength: null, depth: null })
);

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
