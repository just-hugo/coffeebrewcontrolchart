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

type BrewRegion = {
  name: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  className: string;
};

const BREW_REGIONS: BrewRegion[] = [
  {
    name: "Ideal",
    xMin: 18,
    xMax: 22,
    yMin: 1.15,
    yMax: 1.45,
    className: "ideal",
  },
  {
    name: "Strong",
    xMin: 18,
    xMax: 22,
    yMin: 1.45,
    yMax: 1.8,
    className: "strong",
  },
  {
    name: "Weak",
    xMin: 18,
    xMax: 22,
    yMin: 0.9,
    yMax: 1.15,
    className: "weak",
  },
  {
    name: "Underextracted",
    xMin: 14,
    xMax: 18,
    yMin: 1.15,
    yMax: 1.45,
    className: "underextracted",
  },
  {
    name: "Overextracted",
    xMin: 22,
    xMax: 26,
    yMin: 1.15,
    yMax: 1.45,
    className: "overextracted",
  },
  {
    name: "StrongUnderextracted",
    xMin: 14,
    xMax: 18,
    yMin: 1.45,
    yMax: 1.8,
    className: "strong-underextracted",
  },
  {
    name: "WeakUnderextracted",
    xMin: 14,
    xMax: 18,
    yMin: 0.9,
    yMax: 1.15,
    className: "weak-underextracted",
  },
  {
    name: "StrongOverextracted",
    xMin: 22,
    xMax: 26,
    yMin: 1.45,
    yMax: 1.8,
    className: "strong-overextracted",
  },
  {
    name: "WeakOverextracted",
    xMin: 22,
    xMax: 26,
    yMin: 0.9,
    yMax: 1.45,
    className: "weak-overextracted",
  },
];

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
  interval: number,
  min: number,
  max: number,
) {
  var gridlineCoordinates = new Array();
  var i = 0;

  for (min; min < max; i++) {
    gridlineCoordinates.push(min + interval);

    min += interval;
  }

  return gridlineCoordinates;
}

const chart = d3
  .select("#chart-container")
  .append("svg")
  .attr("width", CHART_CONFIG.dimensions["width"])
  .attr("height", CHART_CONFIG.dimensions["height"]);

const regions = chart.append("g").attr("id", "brew-regions")

const grid = chart.append("g").attr("id", "grid");

// the x,y pair of coordinates corresponds to the placement of the upper left corner of a rectangle. The rest of the rectangle will be drawn to the right and down of this position based on its height and width
function addBrewSection({ xMin, xMax, yMin, yMax, className }: BrewRegion) {
  regions
    .append("rect")
    .attr("x", xAxisScale(xMin))
    .attr("y", yAxisScale(yMax))
    .attr("width", xAxisScale(xMax) - xAxisScale(xMin))
    .attr("height", yAxisScale(yMin) - yAxisScale(yMax))
    .attr("class", className);
}

BREW_REGIONS.forEach(addBrewSection);

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

    grid
      .append("line")
      .attr("x1", xAxisScale(x1))
      .attr("x2", xAxisScale(x2))
      .attr("y1", yAxisScale(y1))
      .attr("y2", yAxisScale(y2))
      .attr("class", `gridline ${className}`);
  }
}

const horizontalGridLineCoordinates = generateGridlineCoordinates(
  CHART_CONFIG.axes.tds.interval,
  CHART_CONFIG.axes.tds.domain[0],
  CHART_CONFIG.axes.tds.domain[1],
);

const verticalGridLineCoordinates = generateGridlineCoordinates(
  CHART_CONFIG.axes.extractionYield.interval,
  CHART_CONFIG.axes.extractionYield.domain[0],
  CHART_CONFIG.axes.extractionYield.domain[1],
);
drawGridLines(horizontalGridLineCoordinates, "y");
drawGridLines(verticalGridLineCoordinates, "x");

// Add the x- and y- axes
chart
  .append("g")
  .attr("id", "x-axis")
  .attr(
    "transform",
    `translate(0,${CHART_CONFIG.dimensions["height"] - CHART_CONFIG.dimensions["marginBottom"]})`,
  )
  .call(d3.axisBottom(xAxisScale));

chart
  .append("g")
  .attr("id", "y-axis")
  .attr("transform", `translate(${CHART_CONFIG.dimensions["marginLeft"]},0)`)
  .call(d3.axisLeft(yAxisScale));
