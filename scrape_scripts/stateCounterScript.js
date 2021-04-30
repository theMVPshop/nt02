const companyGrads = require("./scrapedBootcamps");
console.log(
  Object.values(companyGrads) //
    .join(",") // returns a template literal that basically mirrors the source file
    .split("\n") // returns an array of comma-separated-values with the shape 'School,State,Grads,Company' e.g. 'Dev Bootcamp,CA,14,Amazon',
    .reduce((obj, cv, idx) => {
      const currentValueArray = cv.split(",");
      const state = currentValueArray[1];
      return (obj[state] = 1 + (obj[state] || 0)), obj;
    }, {})
);
