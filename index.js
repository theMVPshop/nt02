// const stateCounts = require("./data(json)/stateCounts.json");
document.write("hello world");

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

// const len = Object.keys(stateCounts).length;

// for (i = 0; i <= len; i++) {
//   stateKeys = Object.keys(stateCounts);
//   stateAmounts = Object.values(stateCounts);
//   let stateIds = document.querySelectorAll(`#${stateKeys[i]}`);
//   console.log(Object.keys(stateCounts)[i]);
//   console.log(stateIds);
//   // if (stateAmounts[i] < 10) stateIds[i].style.color = red;
//   if (stateAmounts[i] < 10) stateIds[i].fill = "red";
// }

// document.querySelectorAll("#AK").style.color = "red";
document.querySelectorAll("#AK").fill = "red";
// document.getElementById("AK").fill = "red";
// document.getElementById("AK").style.backgroundColor = "red";
// document.getElementById("AK").style.color = "red";
