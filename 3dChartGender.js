// Some default variables. These margins are not all hard-and-fast
// values - some are increased and some are reduced for each chart.
marginLeft = 60;
marginRight = 25;
marginTop = 80;
marginBottom = 65;
marginInner = 20;

// This is the same for each chart
yaxisScaleMax = 60;

// How many animation frames there are
frames = 20;

// Used later
current = {};

// Here are the three datasets for the chart
data2 = [
  [78.3, 21.7], // US CS Grads
  [62.3, 37.7], // US Bootcamp Grads
];

// The colors for the bars
colors2 = [
  "Gradient(#696:#0f0:#0f0)",
  "Gradient(#966:#f00:#f00)",
  "Gradient(#669:blue:blue)",
];

// And the X axis labels for the chart
xaxisLabels2 = ["Male", "Female"];

// Draw the first bar chart
function draw1() {
  current.bar1 = new RGraph.Bar({
    id: "cvs2",
    data: data2[2],
    options: {
      // These few properties set the chart to be a 3D Bar chart and turn off
      // the 3D axes that are drawn.
      variant: "3d",
      variantThreedYaxis: false,
      variantThreedXaxis: false,

      colorsStroke: "rgba(0,0,0,0)",
      colors: [colors2[2]],

      // The background grid is only enabled on this chart - the
      // bar chart at the back
      backgroundGridColor: "#ccc",
      backgroundGridHlinesCount: 5,
      backgroundGridVlinesCount: 14,

      // Set the margins based on the values that are defined above
      marginBottom: marginBottom,
      marginTop: marginTop,
      marginLeft: marginLeft,
      marginRight: marginRight,
      marginInner: marginInner,

      yaxisScaleMax: yaxisScaleMax,
      xaxis: false,
      yaxis: false,
      yaxisScale: false,
    },

    // Use the grow() effect. The function that gets called at the
    // end of the effect (the draw2G() function) starts drawing/animating
    // the second set of bars.
  });

  if (RGraph.ISIE) {
    current.bar1.draw();
    draw2G();
  } else {
    current.bar1.grow({ frames: frames }, draw2G);
  }
}

// This function draws the second bar chart. It's called when the grow()
// effect of the first bar chart completes.
function draw2G() {
  current.bar2G = new RGraph.Bar({
    id: "cvs2",
    data: data2[0],
    options: {
      // Stipulate 3d but no 3D axes
      variant: "3d",
      variantThreedYaxis: false,
      variantThreedXaxis: false,

      colorsStroke: "rgba(0,0,0,0)",
      colors: [colors2[1]],

      // No background grid or X/Y labels for the second and third charts
      backgroundGrid: false,
      yaxisLabels: false,
      xaxisLabels: [],

      // The default margins are increased on one side and reduced on
      // the other in order to move the chart to the left a little and
      // enhance the perception of depth.
      marginBottom: marginBottom - 10,
      marginTop: marginTop + 10,
      marginLeft: marginLeft - 25,
      marginRight: marginRight + 25,
      marginInner: marginInner,

      yaxisScaleMax: yaxisScaleMax,
      xaxis: false,
      yaxis: false,
      yaxisScale: false,
    },

    // Use the grow() effect again and when it's done the draw3G() function
    // is called.
  });

  if (RGraph.ISIE) {
    current.bar2G.draw();
    draw3G();
  } else {
    current.bar2G.grow({ frames: frames }, draw3G);
  }
}

// This function draws the third bar chart
function draw3G() {
  current.bar3G = new RGraph.Bar({
    id: "cvs2",
    data: data2[1],
    options: {
      // Set the chart to be 3D but without any axes
      variant: "3d",
      variantThreedYaxis: false,
      variantThreedXaxis: false,

      colorsStroke: "rgba(0,0,0,0)",
      colors: [colors2[0]],

      // Now that we're drawing the chart that's "at the front" the X axis labels can be drawn
      xaxisLabels: xaxisLabels2,

      backgroundGrid: false,

      // Add and subtract from the default margins in order to move the
      // chart to the left
      marginTop: marginTop + 20,
      marginBottom: marginBottom - 20,
      marginLeft: marginLeft - 40,
      marginRight: marginRight + 50,
      marginInner: marginInner,

      yaxisScaleMax: yaxisScaleMax,
      xaxis: false,
      yaxis: false,
      yaxisScale: false,
    },
    // Use the grow() effect to show the chart but this time with no callback
    // function because there's no subsequent chart to draw.
    //
    // The responsive function is new as of October 2019 and allows you to specify
    // different settings for different screen sizes. Remember that you may need
    //to add settings to the chart again if you remove them for some sizes.
  });

  if (RGraph.ISIE) {
    current.bar3G.draw();
  } else {
    current.bar3G.grow({ frames: frames });
  }

  current.bar3G.responsive([
    {
      maxWidth: null,
      width: 450,
      height: 300,
      options: {
        // xaxisLabels: [
        //   "Monday",
        //   "Tuesday",
        //   "Wednesday",
        //   "Thursday",
        //   "Friday",
        //   "Saturday",
        //   "Sunday",
        // ],
        textSize: 12,
        marginInner: marginInner,
      },
      callback: function () {
        // current.bar1.set("marginInner", 15);
        current.bar2G.set("marginInner", 15);
        current.bar3G.set("marginInner", 15);
        setTimeout(function () {
          current.yaxisObj.x = 635;
          current.yaxisObj.set("textSize", 12);
          RGraph.redraw();
        }, 250);
      },
    },
    {
      maxWidth: 1150,
      width: 450,
      height: 200,
      options: {
        // xaxisLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        textSize: 8,
        marginInner: 10,
      },
      callback: function () {
        // current.bar1.set("marginInner", 10);
        current.bar2G.set("marginInner", 10);
        current.bar3G.set("marginInner", 10);
        current.yaxisObj.x = 435;
        current.yaxisObj.set("textSize", 8);
        RGraph.redraw();
      },
    },
  ]);
}

// Initiate the drawing of the first chart. The second and then the
// third charts are initiated by the prior charts animation callback
// function. This has to be placed before the Y axis.
draw2G();

// This drawing API Y axis is used to show the Y axis labels on the
// right-hand-side - though the actual axis is not shown - just the labels.
current.yaxisObj = new RGraph.Drawing.YAxis({
  id: "cvs2",
  x: 635,
  options: {
    yaxisColor: "rgba(0,0,0,0)",
    textColor: "black",
    marginTop: 40,
    marginBottom: 70,
    yaxisScaleMax: 35,
    yaxisPosition: "right",
  },
}).draw();
