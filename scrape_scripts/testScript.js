const bootcampInfoString = require("./scrapedBootcamps");
console.log(
  Object.values(bootcampInfoString) //
    .join(",") // returns a template literal that basically mirrors the source file
    .split("\n") // returns an array of comma-separated-values with the shape 'School,State,Grads,Company' e.g. 'Dev Bootcamp,CA,14,Amazon',
    .reduce((obj, cv, idx) => {
      const currentValueArray = cv.split(","); // splits those values into a more specific sub-array on each iteration
      const schoolName = currentValueArray[0]; // represents the "school name" value
      const datapointShape = {
        company: String(currentValueArray.slice(3)),
        grads: Number(currentValueArray.slice(2, 3)),
        state: String(currentValueArray.slice(1, 2)),
      }; // represents what the most nested object will return

      // if the school name repeats itself as a key, append that datapoint to the accumulator (obj)
      if (obj[schoolName]) {
        return (
          (obj[schoolName] = {
            ...obj[schoolName],
            [idx]: datapointShape,
          }),
          obj
        );
      }

      // same as above but for the first occurrence of the object key/schoolName (creates initial schoolName object/datapoint nested object)
      return (
        (obj[schoolName] = {
          [idx]: datapointShape,
        }),
        obj
      );
    }, {})
);
