// object of how many times each state occurs in company hiring
const stateCounts = {
  AL: 14,
  AZ: 18,
  CA: 157,
  CO: 78,
  FL: 24,
  GA: 15,
  ID: 12,
  IL: 41,
  IN: 28,
  KY: 24,
  MA: 8,
  MI: 14,
  MN: 14,
  MO: 13,
  NC: 25,
  ND: 12,
  NH: 6,
  NJ: 6,
  NY: 152,
  OH: 42,
  OR: 40,
  PA: 10,
  TN: 14,
  TX: 26,
  UT: 47,
  VT: 11,
  WA: 35,
  WY: 9,
};
// loops thru stateCounts and assigns color to each state node on the map based on stateCount range, as well as an eventListener for each state to display as a header onClick
for (const state in stateCounts) {
  const stateEl = document.getElementById(state);
  let selectedStateTitleEl = document.getElementById("selected-state");
  const stateCount = stateCounts[state];

  stateEl.addEventListener("click", () => {
    fetch(
      "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json"
    )
      .then((response) => response.json())
      .then((data) => {
        selectedStateTitleEl.innerHTML = `{<span style="color:blue">${data[state]}</span>:
          <span style="color:green">${stateCount}</span>
         bootcamp grads hired}`;
      });
  });

  if (stateCount < 15) stateEl.attributes[1].nodeValue = "rgb(0,100,0, .32)";
  if (stateCount >= 15 && stateCount <= 35)
    stateEl.attributes[1].nodeValue = "rgb(0,100,0, .65)";
  if (stateCount > 35) stateEl.attributes[1].nodeValue = "rgb(0,100,0)";
}
