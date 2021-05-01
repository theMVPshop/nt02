const stateCounts = require("./data(json)/stateCounts.json");

const len = Object.keys(stateCounts).length;

for (i = 0; i <= len; i++) {
  stateKeys = Object.keys(stateCounts);
  stateAmounts = Object.values(stateCounts);
  let stateIds = document.querySelectorAll(stateKeys[i]);
  console.log(Object.keys(stateCounts)[i]);
  // console.log(stateIds);
  if (stateAmounts[i] < 10) stateIds[i].fill = red;
}
