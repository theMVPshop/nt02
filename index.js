const stateCounts = require("./data(json)/stateCounts.json");

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

// const len = stateCounts.length
// for (i=0;i >= len; i++) {
//   let stateId = document.getElementById(stateCounts[i])
//   if (stateCounts[i] = )
// }
