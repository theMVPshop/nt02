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

for (const property in stateCounts) {
  let currentStateNode = document.getElementById(property);
  let currentStateCount = stateCounts[property];

  if (currentStateCount < 10) currentStateNode.attributes[1].nodeValue = "blue";
  if (currentStateCount > 10 && currentStateCount < 25)
    currentStateNode.attributes[1].nodeValue = "orange";
  if (currentStateCount > 25)
    currentStateNode.attributes[1].nodeValue = "green";
}
