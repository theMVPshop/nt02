const util = require("util");
const bootcampInfoString = require("../data(json)/scrapedBootcamps");

const reducedCSV = Object.values(bootcampInfoString) //
  .join(",") // returns a template literal that basically mirrors the source file
  .split("\n") // returns an array of comma-separated-values with the shape 'School,State,Grads,Company' e.g. 'Dev Bootcamp,CA,14,Amazon',
  .reduce((arr, cv, idx) => {
    const currentValueArray = cv.split(","); // splits those values into a more specific sub-array on each iteration
    const schoolName = currentValueArray[0]; // represents the "school name" value
    const company = currentValueArray[3];
    const grads = parseInt(currentValueArray[2]);
    const state = currentValueArray[1];

    return (
      arr.push({
        [!name && name]: state,
        children: [
          ...this.children,
          {
            [!name && name]: schoolName,
            children: [
              ...this.children,
              {
                [!name && name]: company,
                value: grads,
              },
            ],
          },
        ],
      }),
      arr
    );
  }, []);

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

// (arr = {
//   ...arr,
//   name: "states",
//   [`children ${[idx]}`]: [
//     {
//       name: state,
//       children: [
//         {
//           name: schoolName,
//           children: [
//             {
//               name: company,
//               value: grads,
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }),
// arr
// );
// }, {}),

console.log(util.inspect(reducedCSV, { maxArrayLength: null, depth: null }));

// "callback hell" attempt
// return (
//   arr[state]
//     ? arr[state].push({
//         name: "schools",
//         children: [
//           arr[state][schoolName]
//             ? arr[state][schoolName].push({
//                 name: "companies",
//                 children: [
//                   arr[state][schoolName][company]
//                     ? arr[state][schoolName][company].push({
//                         name: company,
//                         value: grads,
//                       })
//                     : (arr[state][schoolName][company] = []),
//                 ],
//               })
//             : (arr[state][schoolName] = []),
//         ],
//       })
//     : (arr[state] = []),
//   arr
// );

// another valient attempt
// return (
//   obj[state]
//     ? {
//         ...obj[state],
//         name: state,
//         children: [
//           ...obj[state],
//           obj[state][schoolName]
//             ? (obj[state][schoolName] = {
//                 ...obj[state][schoolName],
//                 name: school,
//                 children: [
//                   ...obj[state][schoolName],
//                   obj[state][schoolName][company]
//                     ? {
//                         name: company,
//                         value: grads,
//                       }
//                     : (obj[state][schoolName][company] = company),
//                 ],
//               })
//             : (obj[state][schoolName] = schoolName),
//         ],
//       }
//     : (obj[state] = state),
//   obj
// );
