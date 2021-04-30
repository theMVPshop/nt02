const bootcampInfoString = require("./scrapedBootcamps");
console.log(
  Object.values(bootcampInfoString) //
    .join(",") // returns a template literal that basically mirrors the source file
    .split("\n") // returns an array of comma-separated-values with the shape 'School,State,Grads,Company' e.g. 'Dev Bootcamp,CA,14,Amazon',
    .reduce((obj, cv, idx) => {
      const currentValueArray = cv.split(","); // splits those values into a more specific sub-array on each iteration
      const schoolName = currentValueArray[0]; // represents the "school name" value
      const datapointShape = {
        schoolName,
        company: String(currentValueArray.slice(3)),
        grads: Number(currentValueArray.slice(2, 3)),
        state: String(currentValueArray.slice(1, 2)),
      }; // represents what the most nested object will return

      return {
        ...obj,
        ...{ [idx]: datapointShape },
      };
    }, {})
);
