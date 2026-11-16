import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const width = 700;
const height = 450;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

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

function drawGridLines(coordinates: number[], referenceAxis: "x" | "y") {
  const [xMin, xMax] = xAxisScale.domain();
  const [yMin, yMax] = yAxisScale.domain();

  for (let gridline = 0; gridline < coordinates.length; gridline++) {
    const coordinate = coordinates[gridline];
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
      .attr("stroke", "green");
  }
}

const chart = d3
  .select("#chart-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const xAxisScale = d3
  .scaleLinear()
  .domain([14, 26])
  .range([marginLeft, width - marginRight]);

const yAxisScale = d3
  .scaleLinear()
  .domain([0.8, 2.0])
  .range([height - marginBottom, marginTop]);

const verticalCoordinates = generateGridlineCoordinates(0.1, 0.8);
const horizontalCoordinates = generateGridlineCoordinates(1, 14);

drawGridLines(verticalCoordinates, "y");
drawGridLines(horizontalCoordinates, "x");

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

// Append the SVG element.
chart.append(chart.node());
