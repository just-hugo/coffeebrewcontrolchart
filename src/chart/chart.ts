import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const CHART_CONFIG = {
  dimensions: {
    width: 700,
    height: 545,
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 40,
    marginRight: 40,
  },
  axes: {
    extractionYield: {
      domain: [14, 26],
      interval: 1,
    },
    tds: {
      domain: [0.9, 1.8],
      interval: 0.1,
    },
  },
};

const xAxisScale = d3
  .scaleLinear()
  .domain([
    CHART_CONFIG.axes.extractionYield["domain"][0],
    CHART_CONFIG.axes.extractionYield["domain"][1],
  ])
  .range([
    CHART_CONFIG.dimensions["marginLeft"],
    CHART_CONFIG.dimensions["width"] - CHART_CONFIG.dimensions["marginRight"],
  ]);

const yAxisScale = d3
  .scaleLinear()
  .domain([
    CHART_CONFIG.axes.tds["domain"][0],
    CHART_CONFIG.axes.tds["domain"][1],
  ])
  .range([
    CHART_CONFIG.dimensions["height"] - CHART_CONFIG.dimensions["marginBottom"],
    CHART_CONFIG.dimensions["marginTop"],
  ]);

const [xMin, xMax] = xAxisScale.domain();
const [yMin, yMax] = yAxisScale.domain();

function generateGridlineCoordinates(
  incrementValue: number,
  initialValue: number,
) {
  var gridlineCoordinates = new Array();
  var i = 0;

  for (var axis = 0; axis < 16; axis++) {
    gridlineCoordinates.push(initialValue + i);

    i += incrementValue;
  }
  return gridlineCoordinates;
}

function drawGridLines(
  coordinates: number[],
  referenceAxis: "x" | "y",
  className = "minor",
) {
  for (let coordinate of coordinates) {
    let x1;
    let x2;
    let y1;
    let y2;

    if (referenceAxis == "x") {
      x1 = coordinate;
      x2 = coordinate;
      y1 = yMin;
      y2 = yMax;
    } else {
      x1 = xMin;
      x2 = xMax;
      y1 = coordinate;
      y2 = coordinate;
    }

    chart
      .append("line")
      .attr("x1", xAxisScale(x1))
      .attr("x2", xAxisScale(x2))
      .attr("y1", yAxisScale(y1))
      .attr("y2", yAxisScale(y2))
      .attr("class", `gridline ${className}`);
  }
}

const chart = d3
  .select("#chart-container")
  .append("svg")
  .attr("width", CHART_CONFIG.dimensions["width"])
  .attr("height", CHART_CONFIG.dimensions["height"]);

const horizontalGridLineCoordinates = generateGridlineCoordinates(
  CHART_CONFIG.axes.tds.interval,
  CHART_CONFIG.axes.tds.domain[0],
);
const verticalGridLineCoordinates = generateGridlineCoordinates(
  CHART_CONFIG.axes.extractionYield.interval,
  CHART_CONFIG.axes.extractionYield.domain[0],
);

drawGridLines(horizontalGridLineCoordinates, "y");
drawGridLines(verticalGridLineCoordinates, "x");

// Add the x-axis.
chart
  .append("g")
  .attr(
    "transform",
    `translate(0,${CHART_CONFIG.dimensions["height"] - CHART_CONFIG.dimensions["marginBottom"]})`,
  )
  .call(d3.axisBottom(xAxisScale));

// Add the y-axis.
chart
  .append("g")
  .attr("transform", `translate(${CHART_CONFIG.dimensions["marginLeft"]},0)`)
  .call(d3.axisLeft(yAxisScale));

// the x,y pair of coordinates corresponds to the placement of the upper left corner of a rectangle. The rest of the rectangle will be drawn to the right and down of this position based on its height and width
function addBrewSection(
  x: number,
  y: number,
  width: number,
  height: number,
  className: string,
) {
  chart
    .append("rect")
    .attr("x", x)
    .attr("y", y)
    .attr("width", width)
    .attr("height", height)
    .attr("class", className);
}

addBrewSection(
  xAxisScale(18),
  yAxisScale(1.8),
  xAxisScale(22) - xAxisScale(18),
  yAxisScale(1.45) - yAxisScale(1.8),
  "strong",
);

addBrewSection(
  xAxisScale(18),
  yAxisScale(1.45),
  xAxisScale(22) - xAxisScale(18),
  yAxisScale(1.15) - yAxisScale(1.45),
  "ideal",
);

addBrewSection(
  xAxisScale(18),
  yAxisScale(1.15),
  xAxisScale(22) - xAxisScale(18),
  yAxisScale(0.9) - yAxisScale(1.15),
  "weak",
);

addBrewSection(
  xAxisScale(14),
  yAxisScale(1.8),
  xAxisScale(22) - xAxisScale(18),
  yAxisScale(1.45) - yAxisScale(1.8),
  "strong-underextracted",
);

addBrewSection(
  xAxisScale(14),
  yAxisScale(1.45),
  xAxisScale(22) - xAxisScale(18),
  yAxisScale(1.15) - yAxisScale(1.45),
  "underextracted",
);

addBrewSection(
  xAxisScale(14),
  yAxisScale(1.15),
  xAxisScale(22) - xAxisScale(18),
  yAxisScale(0.9) - yAxisScale(1.15),
  "weak-underextracted",
);

addBrewSection(
  xAxisScale(22),
  yAxisScale(1.8),
  xAxisScale(22) - xAxisScale(18),
  yAxisScale(1.45) - yAxisScale(1.8),
  "strong-overextracted",
);

addBrewSection(
  xAxisScale(22),
  yAxisScale(1.45),
  xAxisScale(22) - xAxisScale(18),
  yAxisScale(1.15) - yAxisScale(1.45),
  "overextracted",
);

addBrewSection(
  xAxisScale(22),
  yAxisScale(1.15),
  xAxisScale(22) - xAxisScale(18),
  yAxisScale(0.9) - yAxisScale(1.15),
  "weak-overextracted",
);
