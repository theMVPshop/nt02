// https://observablehq.com/@d3/zoomable-sunburst@353
export default function define(runtime, observer) {
  const main = runtime.module();
  // const fileAttachments = new Map([["flare-2.json",new URL("./files/e65374209781891f37dea1e7a6e1c5e020a3009b8aedf113b4c80942018887a1176ad4945cf14444603ff91d3da371b3b0d72419fa8d2ee0f6e815732475d5de",import.meta.url)]]);
  console.log("ss", selectedState);
  let fileAttachments = new Map([
    [
      `${selectedState}.json`,
      new URL(`./state-data/${selectedState}.json`, import.meta.url),
    ],
  ]);
  main.builtin(
    "FileAttachment",
    runtime.fileAttachments((name) => fileAttachments.get(name))
  );
  //   main.variable(observer()).define(["md"], function(md){return(
  // md`# Zoomable Sunburst

  // This variant of a [sunburst diagram](/@d3/sunburst) shows only two layers of the hierarchy at a time. Click a node to zoom in, or the center to zoom out. Compare to an [icicle](/@d3/zoomable-icicle).`
  // )});
  main
    .variable(observer("chart"))
    .define(
      "chart",
      ["partition", "data", "d3", "width", "color", "arc", "format", "radius"],
      function (partition, data, d3, width, color, arc, format, radius) {
        const root = partition(data);

        root.each((d) => (d.current = d));

        const svg = d3
          .create("svg")
          .attr("viewBox", [0, 0, width, width])
          .style("font", "10px sans-serif");

        const g = svg
          .append("g")
          .attr("transform", `translate(${width / 2},${width / 2})`);

        const path = g
          .append("g")
          .selectAll("path")
          .data(root.descendants().slice(1))
          .join("path")
          .attr("fill", (d) => {
            while (d.depth > 1) d = d.parent;
            return color(d.data.name);
          })
          .attr("fill-opacity", (d) =>
            arcVisible(d.current) ? (d.children ? 0.8 : 0.4) : 0
          )
          .attr("d", (d) => arc(d.current));

        path
          .filter((d) => d.children)
          .style("cursor", "pointer")
          .on("click", clicked);

        path.append("title").text(
          (d) =>
            `${d
              .ancestors()
              .map((d) => d.data.name)
              .reverse()
              .join("/")}\n${format(d.value)}`
        );

        const label = g
          .append("g")
          .attr("pointer-events", "none")
          .attr("text-anchor", "middle")
          .style("user-select", "none")
          .selectAll("text")
          .data(root.descendants().slice(1))
          .join("text")
          .attr("dy", "0.35em")
          .attr("fill-opacity", (d) => +labelVisible(d.current))
          .attr("transform", (d) => labelTransform(d.current))
          .text((d) => d.data.name);

        const parent = g
          .append("circle")
          .datum(root)
          .attr("r", radius)
          .attr("fill", "none")
          .attr("pointer-events", "all")
          .on("click", clicked);

        function clicked(event, p) {
          parent.datum(p.parent || root);

          root.each(
            (d) =>
              (d.target = {
                x0:
                  Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
                  2 *
                  Math.PI,
                x1:
                  Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
                  2 *
                  Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth),
              })
          );

          const t = g.transition().duration(750);

          // Transition the data on all arcs, even the ones that aren’t visible,
          // so that if this transition is interrupted, entering arcs will start
          // the next transition from the desired position.
          path
            .transition(t)
            .tween("data", (d) => {
              const i = d3.interpolate(d.current, d.target);
              return (t) => (d.current = i(t));
            })
            .filter(function (d) {
              return +this.getAttribute("fill-opacity") || arcVisible(d.target);
            })
            .attr("fill-opacity", (d) =>
              arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0
            )
            .attrTween("d", (d) => () => arc(d.current));

          label
            .filter(function (d) {
              return (
                +this.getAttribute("fill-opacity") || labelVisible(d.target)
              );
            })
            .transition(t)
            .attr("fill-opacity", (d) => +labelVisible(d.target))
            .attrTween("transform", (d) => () => labelTransform(d.current));
        }

        function arcVisible(d) {
          return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
        }

        function labelVisible(d) {
          return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
        }

        function labelTransform(d) {
          const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
          const y = ((d.y0 + d.y1) / 2) * radius;
          return `rotate(${x - 90}) translate(${y},0) rotate(${
            x < 180 ? 0 : 180
          })`;
        }

        return svg.node();
      }
    );
  main
    // .variable(observer("data"))
    .define("data", ["FileAttachment"], function (FileAttachment) {
      return FileAttachment(`${selectedState}.json`).json();
    });
  main
    // .variable(observer("partition"))
    .define("partition", ["d3"], function (d3) {
      return (data) => {
        const root = d3
          .hierarchy(data)
          .sum((d) => d.value)
          .sort((a, b) => b.value - a.value);
        return d3.partition().size([2 * Math.PI, root.height + 1])(root);
      };
    });
  main
    // .variable(observer("color"))
    .define("color", ["d3", "data"], function (d3, data) {
      return d3.scaleOrdinal(
        d3.quantize(d3.interpolateRainbow, data.children.length + 1)
      );
    });
  main
    // .variable(observer("format"))
    .define("format", ["d3"], function (d3) {
      return d3.format(",d");
    });
  main
    // .variable(observer("width"))
    .define("width", function () {
      return 932;
    });
  main
    // .variable(observer("radius"))
    .define("radius", ["width"], function (width) {
      return width / 6;
    });
  main
    // .variable(observer("arc"))
    .define("arc", ["d3", "radius"], function (d3, radius) {
      return d3
        .arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius((d) => d.y0 * radius)
        .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));
    });
  main
    // .variable(observer("d3"))
    .define("d3", ["require"], function (require) {
      return require("d3@6");
    });

  // const stateCounts = {
  //   AL: 26,
  //   AZ: 47,
  //   CA: 3990,
  //   CO: 368,
  //   FL: 111,
  //   GA: 76,
  //   ID: 25,
  //   IL: 103,
  //   IN: 264,
  //   KY: 157,
  //   MA: 27,
  //   MI: 330,
  //   MN: 226,
  //   MO: 45,
  //   NC: 48,
  //   ND: 16,
  //   NH: 7,
  //   NJ: 6,
  //   NY: 3971,
  //   OH: 720,
  //   OR: 164,
  //   PA: 16,
  //   TN: 195,
  //   TX: 199,
  //   UT: 281,
  //   VT: 19,
  //   WA: 525,
  //   WY: 10,
  // };

  // for (const state in stateCounts) {
  //   // const stateEl = document.getElementById(state);
  //   // const stateEls = document.getElementsByClassName("observablehq");
  //   // d3.select(".observablehq ").dispatch("click");

  //   stateEls.addEventListener("click", () => {
  //     selectedState = state;
  //     // fileAttachments = new Map([
  //     //   [
  //     //     `${state}.json`,
  //     //     new URL(`./state-data/${state}.json`, import.meta.url),
  //     //   ],
  //     // ]);
  //   });
  // }

  return main;
}
