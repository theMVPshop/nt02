const companyGrads = require("../data(json)/scrapedBootcamps");
console.log(
  Object.values(companyGrads) //
    .join(",") // returns a template literal that basically mirrors the source file
    .split("\n") // returns an array of comma-separated-values with the shape 'School,State,Grads,Company' e.g. 'Dev Bootcamp,CA,14,Amazon',
    .reduce((obj, cv) => {
      const currentValueArray = cv.split(",");
      const state = currentValueArray[1];
      const grads = parseInt(currentValueArray[2]);

      return (obj[state] = grads + (obj[state] || grads)), obj;
    }, {})
);
