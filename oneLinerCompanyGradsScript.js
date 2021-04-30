const bootcampInfoString = require("./scrapedBootcamps");
console.log(
  Object.values(bootcampInfoString)
    .join(",")
    .split("\n")
    .reduce(
      (obj, currentValue, idx) => ({
        ...obj,
        ...{
          [`datapoint #${idx}`]: {
            schoolName: currentValue.split(",")[0],
            company: String(currentValue.split(",").slice(3)),
            grads: Number(currentValue.split(",").slice(2, 3)),
            state: String(currentValue.split(",").slice(1, 2)),
          },
        },
      }),
      {}
    )
);
