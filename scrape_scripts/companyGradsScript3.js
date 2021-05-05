const util = require("util");
const bootcampInfoString = require("../data(json)/scrapedBootcamps");
const reducedCSV = Object.values(bootcampInfoString) //
  .join(",") // returns a template literal that basically mirrors the source file
  .split("\n") // returns an array of comma-separated-values with the shape 'School,State,Grads,Company' e.g. 'Dev Bootcamp,CA,14,Amazon',
  .reduce((obj, cv, idx) => {
    const currentValueArray = cv.split(","); // splits those values into a more specific sub-array on each iteration
    const schoolName = currentValueArray[0]; // represents the "school name" value
    const company = currentValueArray[3];
    const grads = parseInt(currentValueArray[2]);
    const state = currentValueArray[1];

    return (
      obj[state]
        ? [
            ...obj[state],
          obj[state] = 
            obj[state][schoolName]
            ? (obj[state][schoolName] = [
                ...obj[state][schoolName]                
            ]) 
            : 
           
          ]
        : (obj[state] =  {
          name: state,
          children: [
            ...obj[state],
            obj[state][schoolName] = {
              name: school,
              children: [
                ...obj[state][schoolName],
                obj[state][schoolName][company]
                  ? {
                      name: company,
                      value: grads,
                    }
                  : (obj[state][schoolName][company] = company),
              ]
            },
              
          ],
        },),
      obj
    );

    // obj[company]
    //   ? obj[company].push({
    //       name: company,
    //       children: [
    //         {
    //           name: schoolName,
    //           value: grads,
    //         },
    //       ],
    //     })
    //   : (obj[company] = []),
    //   obj;
  }, {});

console.log(util.inspect(reducedCSV, { maxArrayLength: null, depth: null }));

// assemble data using schoolName as object keys, nesting the rest of the data points inside their respective schools using idx as each nested key
// return (
//   (obj[schoolName] = {
//     ...obj[schoolName],
//     [company]: { grads, state },
//   }),
//   obj
// );
// ...obj,
