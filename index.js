// object of how many times each state occurs in company hiring
const stateCounts = {
  AL: 26,
  AZ: 47,
  CA: 3990,
  CO: 368,
  FL: 111,
  GA: 76,
  ID: 25,
  IL: 103,
  IN: 264,
  KY: 157,
  MA: 27,
  MI: 330,
  MN: 226,
  MO: 45,
  NC: 48,
  ND: 16,
  NH: 7,
  NJ: 6,
  NY: 3971,
  OH: 720,
  OR: 164,
  PA: 16,
  TN: 195,
  TX: 199,
  UT: 281,
  VT: 19,
  WA: 525,
  WY: 10,
};
// loops thru stateCounts and assigns color to each state node on the map based on stateCount range, as well as an eventListener for each state to display as a header onClick
for (const state in stateCounts) {
  const stateEl = document.getElementById(state);
  const selectedStateTitleEl = document.getElementById("selected-state");
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

  if (stateCount < 50) stateEl.attributes[1].nodeValue = "rgb(0,100,0, .3)";
  if (stateCount >= 50 && stateCount <= 150)
    stateEl.attributes[1].nodeValue = "rgb(0,100,0, .6)";
  if (stateCount >= 150 && stateCount <= 300)
    stateEl.attributes[1].nodeValue = "rgb(0,100,0, .80)";
  if (stateCount > 300) stateEl.attributes[1].nodeValue = "rgb(0,100,0)";
}
