const bootcampInfoString = require("./scrapedBootcamps");

console.log(
  Object.values(bootcampInfoString)
    .join(",")
    .split("\n")
    .reduce((obj, cv, idx) => {
      if (obj[cv.split(",")[0]]) {
        return (
          (obj[cv.split(",")[0]] = {
            ...obj[cv.split(",")[0]],
            [idx]: {
              state: String(cv.split(",").slice(1, 2)),
              grads: String(cv.split(",").slice(2, 3)),
              company: String(cv.split(",").slice(3)),
            },
          }),
          obj
        );
      }
      return (
        (obj[cv.split(",")[0]] = {
          [idx]: {
            state: String(cv.split(",").slice(1, 2)),
            grads: String(cv.split(",").slice(2, 3)),
            company: String(cv.split(",").slice(3)),
          },
        }),
        obj
      );
    }, {})
);
