const bootcampInfoString = require("./scrapedBootcamps");
// console.log(bootcampInfoString);
console.log(
  Object.values(bootcampInfoString)
    .join(",")
    .split("\n")
    .reduce((obj, cv, idx) => ((obj[idx] = cv.split(",")), obj), {})
);
