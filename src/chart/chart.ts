import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const width = 700;
const height = 545;
const marginTop = 40;
const marginRight = 40;
const marginBottom = 40;
const marginLeft = 40;
const xAxisScale = d3
  .scaleLinear()
  .domain([14, 26])
  .range([marginLeft, width - marginRight]);

const yAxisScale = d3
  .scaleLinear()
  .domain([0.9, 1.8])
  .range([height - marginBottom, marginTop]);
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
  .attr("width", width)
  .attr("height", height);

const horizontalGridLineCoordinates = generateGridlineCoordinates(0.1, 0.9);
const verticalGridLineCoordinates = generateGridlineCoordinates(1, 14);

drawGridLines(horizontalGridLineCoordinates, "y");
drawGridLines(verticalGridLineCoordinates, "x");

// Add the x-axis.
chart
  .append("g")
  .attr("transform", `translate(0,${height - marginBottom})`)
  .call(d3.axisBottom(xAxisScale));

// Add the y-axis.
chart
  .append("g")
  .attr("transform", `translate(${marginLeft},0)`)
  .call(d3.axisLeft(yAxisScale));

  // strong section
chart
  .append("rect")
  .attr("x", xAxisScale(18))
  .attr("y", yAxisScale(1.8))
  .attr("width", xAxisScale(22) - xAxisScale(18))
  .attr("height", yAxisScale(1.45) - yAxisScale(1.8))
  .attr("class", "strong");

// ideal brew section
chart
  .append("rect")
  .attr("x", xAxisScale(18))
  .attr("y", yAxisScale(1.45))
  .attr("width", xAxisScale(22) - xAxisScale(18))
  .attr("height", yAxisScale(1.15) - yAxisScale(1.45))
  .attr("class", "ideal");

  // weak section
chart
  .append("rect")
  .attr("x", xAxisScale(18))
  .attr("y", yAxisScale(1.15))
  .attr("width", xAxisScale(22) - xAxisScale(18))
  .attr("height", yAxisScale(0.9) - yAxisScale(1.15))
  .attr("class", "weak");

  // Strong & Underextracted section
chart
  .append("rect")
  .attr("x", xAxisScale(14))
  .attr("y", yAxisScale(1.8))
  .attr("width", xAxisScale(22) - xAxisScale(18))
  .attr("height", yAxisScale(1.45) - yAxisScale(1.8))
  .attr("class", "strong-underextracted");

  // Underextracted
chart
  .append("rect")
  .attr("x", xAxisScale(14))
  .attr("y", yAxisScale(1.45))
  .attr("width", xAxisScale(22) - xAxisScale(18))
  .attr("height", yAxisScale(1.15) - yAxisScale(1.45))
  .attr("class", "underextracted");

  // Weak and Underextracted
chart
  .append("rect")
  .attr("x", xAxisScale(14))
  .attr("y", yAxisScale(1.15))
  .attr("width", xAxisScale(22) - xAxisScale(18))
  .attr("height", yAxisScale(0.9) - yAxisScale(1.15))
  .attr("class", "weak-underextracted");

// Strong and overextracted
chart
  .append("rect")
  .attr("x", xAxisScale(22))
  .attr("y", yAxisScale(1.8))
  .attr("width", xAxisScale(22) - xAxisScale(18))
  .attr("height", yAxisScale(1.45) - yAxisScale(1.8))
  .attr("class", "strong-overextracted");

// Overextracted
chart
  .append("rect")
  .attr("x", xAxisScale(22))
  .attr("y", yAxisScale(1.45))
  .attr("width", xAxisScale(22) - xAxisScale(18))
  .attr("height", yAxisScale(1.15) - yAxisScale(1.45))
  .attr("class", "overextracted");

// Weak and overextracted
chart
  .append("rect")
  .attr("x", xAxisScale(22))
  .attr("y", yAxisScale(1.15))
  .attr("width", xAxisScale(22) - xAxisScale(18))
  .attr("height", yAxisScale(0.9) - yAxisScale(1.15))
  .attr("class", "weak-overextracted");

// Append the SVG element.
chart.append(chart.node());
