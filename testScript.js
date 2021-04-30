const bootcampInfoString = require("./scrapedBootcamps");

console.log(
  Object.values(bootcampInfoString)
    .join(",")
    .split("\n")
    .reduce((obj, cv, idx) => {
      const currentValueArray = cv.split(",");

      if (obj[currentValueArray[0]]) {
        return (
          (obj[currentValueArray[0]] = {
            ...obj[currentValueArray[0]],
            [idx]: {
              company: String(currentValueArray.slice(3)),
              grads: Number(currentValueArray.slice(2, 3)),
              state: String(currentValueArray.slice(1, 2)),
            },
          }),
          obj
        );
      }

      return (
        (obj[currentValueArray[0]] = {
          [idx]: {
            company: String(currentValueArray.slice(3)),
            grads: Number(currentValueArray.slice(2, 3)),
            state: String(currentValueArray.slice(1, 2)),
          },
        }),
        obj
      );
    }, {})
);
