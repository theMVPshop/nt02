const bootcampInfoString = require("./scrapedBootcamps");
// console.log(bootcampInfoString);
console.log(
  Object.values(bootcampInfoString)
    .join(",")
    .split("\n")
    .reduce(
      (obj, cv, idx) => ((obj[cv.split(",")[0]] = cv.split(",").slice(1)), obj),
      {}
    )
);
