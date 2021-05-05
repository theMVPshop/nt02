const util = require("util");
const bootcampInfoString = require("../data(json)/scrapedBootcamps");

const reducedByState = Object.values(bootcampInfoString) //
  .join(",") // returns a template literal that basically mirrors the source file
  .trim()
  .split("\n") // returns an array of comma-separated-values with the shape 'School,State,Grads,Company' e.g. 'Dev Bootcamp,CA,14,Amazon',
  .reduce((obj, cv, idx) => {
    const currentValueArray = cv.split(","); // splits those values into a more specific sub-array on each iteration
    const schoolName = currentValueArray[0]; // represents the "school name" value
    const company = currentValueArray[3];
    const grads = parseInt(currentValueArray[2]);
    const state = currentValueArray[1];

    // assemble data using schoolName as object keys, nesting the rest of the data points inside their respective schools using idx as each nested key

    // obj[state] = {
    //   ...obj[state],
    //   [schoolName]: [...obj[state][schoolName], { company, grads }],
    // };

    obj[state] = obj[state] || {};
    obj[state][schoolName] = obj[state][schoolName] || [];
    obj[state][schoolName].push({ [company]: grads });

    return obj;
  }, {});

console.log(
  util.inspect(reducedByState, { maxArrayLength: null, depth: null })
);
