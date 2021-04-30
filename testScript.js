const bootcampInfoString = require("./scrapedBootcamps");

console.log(
  Object.values(bootcampInfoString)
    .join(",")
    .split("\n") // returns an array of comma-separated-values
    .reduce((obj, cv, idx) => {
      const currentValueArray = cv.split(","); // splits those values into a more specific array on each iteration
      const schoolName = currentValueArray[0]; // represents the "school name" value
      const datapointShape = {
        company: String(currentValueArray.slice(3)),
        grads: Number(currentValueArray.slice(2, 3)),
        state: String(currentValueArray.slice(1, 2)),
      }; // kinda self-explantory

      // if the school name repeats itself, just append that datapoint to the accumulator (obj)
      if (obj[schoolName]) {
        return (
          (obj[schoolName] = {
            ...obj[schoolName],
            [idx]: datapointShape,
          }),
          obj
        );
      }

      // if school name doesn't repeat, this condition returns first (creates initial schoolName object/datapoint entry)
      return (
        (obj[schoolName] = {
          [idx]: datapointShape,
        }),
        obj
      );
    }, {})
);
