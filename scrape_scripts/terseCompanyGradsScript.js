const bootcampInfoString = require("./scrapedBootcamps");
console.log(
  Object.values(bootcampInfoString) //
    .join(",") // returns a template literal that basically mirrors the source file
    .split("\n") // returns an array of comma-separated-values with the shape 'School,State,Grads,Company' e.g. 'Dev Bootcamp,CA,14,Amazon',
    .reduce(
      (obj, cv, idx) => (
        // assembles an object one datapoint at a time with the following shape, and uses the schoolNames as the parent objects
        (obj[cv.split(",")[0]] = {
          ...obj[cv.split(",")[0]],
          [idx]: {
            company: cv.split(",")[3],
            grads: parseInt(cv.split(",")[2]),
            state: cv.split(",")[1],
          },
        }),
        obj
      ),
      {}
    )
);
