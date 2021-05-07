const util = require("util");
const bootcampInfoString = require("../data(json)/scrapedBootcamps");

const reducedBySchool = Object.values(bootcampInfoString)
  .join(",")
  .trim()
  .split("\n")
  .reduce((obj, cv) => {
    const currentValueArray = cv.split(",");
    const school = currentValueArray[0];
    const company = currentValueArray[3];
    const grads = parseInt(currentValueArray[2]);

    obj[school] = obj[school] || [];
    obj[school].push({ name: company, value: grads });

    return obj;
  }, {});

console.log(
  util.inspect(reducedBySchool, { maxArrayLength: null, depth: null })
);

// let final = {
//     name: 'schools',
//     children: [
//         {
//             name: 'Nucamp Coding Bootcamp',
//             children: [
//                 {
//                     name: 'Walgreens',
//                     value: 3
//                 }
//             ]
//         }
//     ]
// }
