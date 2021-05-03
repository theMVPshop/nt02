// jquery for showing selected state in header
$("path, circle").click(function () {
  var getId = this.id;
  var selection = $("#selected-state");

  $.getJSON(
    "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json",
    function (data) {
      selection.html(selection).html(data[getId]);
    }
  );
});

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

// loops thru stateCounts and assigns color to each state node on the map based on stateCount range
for (const state in stateCounts) {
  let stateEl = document.getElementById(state);
  let stateCount = stateCounts[state];

  if (stateCount < 15) stateEl.attributes[1].nodeValue = "rgb(0,100,0, .32)";
  if (stateCount >= 15 && stateCount <= 35)
    stateEl.attributes[1].nodeValue = "rgb(0,100,0, .65)";
  if (stateCount > 35) stateEl.attributes[1].nodeValue = "rgb(0,100,0)";
}
