// const bootcampInfoString = require("./scrapedBootcamps");
// // console.log(bootcampInfoString);
// console.log(
//   Object.values(bootcampInfoString)
//     .join(",")
//     .split("\n")
//     .reduce((obj, cv, idx) => {
//       if (obj[cv.split(",")[0]]) {
//         // console.log(obj[cv.split(",")[0]]);
//         // console.log(cv.split(",").slice(1));
//         // console.log(cv.split(",")[0]);
//         return (
//           (obj[cv.split(",")[0]] = obj[cv.split(",")[0]].concat([
//             cv.split(",").slice(1),
//           ])),
//           obj
//         );
//       }
//       return (obj[cv.split(",")[0]] = { data: cv.split(",").slice(1) }), obj;
//     }, {})
// );

const bootcampInfoString = require("./scrapedBootcamps");
// console.log(bootcampInfoString);
console.log(
  Object.values(bootcampInfoString)
    .join(",")
    .split("\n")
    .reduce((obj, cv, idx) => {
      if (obj[cv.split(",")[0]]) {
        // console.log(obj[cv.split(",")[0]]);
        // console.log(cv.split(",").slice(1));
        // console.log(cv.split(",")[0]);
        return (
          (obj[cv.split(",")[0]] = obj[cv.split(",")[0]].concat([
            cv.split(",").slice(1),
          ])),
          obj
        );
      }
      return (obj[cv.split(",")[0]] = [cv.split(",").slice(1)]), obj;
    }, {})
);
