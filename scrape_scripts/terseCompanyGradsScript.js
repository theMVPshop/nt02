const bootcampInfoString = require("./scrapedBootcamps");
console.log(
  Object.values(bootcampInfoString) //
    .join(",") // returns a template literal that basically mirrors the source file
    .split("\n") // returns an array of comma-separated-values with the shape 'School,State,Grads,Company' e.g. 'Dev Bootcamp,CA,14,Amazon',
    .reduce(
      (obj, cv, idx) => (
        (obj[cv.split(",")[0]] = {
          ...obj[cv.split(",")[0]],
          [idx]: {
            company: String(cv.split(",").slice(3)),
            grads: Number(cv.split(",").slice(2, 3)),
            state: String(cv.split(",").slice(1, 2)),
          },
        }),
        obj
      ),
      {}
    )
);
