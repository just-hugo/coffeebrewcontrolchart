import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const width = 700;
const height = 450;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

function generateAxisPosition(interval: number, initialValue: number) {
  var data = new Array();
  var i = 0;

  for (var axis = 0; axis < 16; axis++) {
    data.push(new Array());
    data[axis].push(initialValue + i);

    i += interval;
  }
  return data;
}

var horizontalData = generateAxisPosition(0.1, 0.8);
var verticalData = generateAxisPosition(1, 14);

// todo: rename this because it represents the entire chart element, of which the grid is just one component
// use d3 to draw the grid element using the row/column data generated in gridData()

// width and height must be a few pixels larger than the width/height set in grid data. If the width of a cell is 50 in gridData and there are 10 rows, the grid will take up 500px. But if the below grid variable is set to height: 500, then part of the bottom border of the grid will be cut off. So setting it to 510px allows the full bottom border to be visible
var grid = d3
  .select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// chart/axis layer
// Declare the x (horizontal position) scale.
const x = d3
  .scaleLinear()
  .domain([14, 26])
  .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3
  .scaleLinear()
  .domain([0.8, 2.0])
  .range([height - marginBottom, marginTop]);

// todo: refactor
//draw Y gridlines
for (var gridline = 0; gridline < 16; gridline++) {
  var xCoord = verticalData[gridline];

  grid
    .append("line")
    .attr("x1", x(xCoord))
    .attr("x2", x(xCoord))
    .attr("y1", y(horizontalData[0]))
    .attr("y2", y(horizontalData[12]))
    .attr("stroke", "blue");
}

// todo: refactor
for (var gridline = 0; gridline < 16; gridline++) {
  var xline = horizontalData[gridline];
  grid
    .append("line")
    .attr("x1", x(verticalData[0]))
    .attr("x2", x(verticalData[12]))
    .attr("y1", y(xline))
    .attr("y2", y(xline))
    .attr("stroke", "green");
}

// Add the x-axis.
grid
  .append("g")
  .attr("transform", `translate(0,${height - marginBottom})`)
  .call(d3.axisBottom(x));

// Add the y-axis.
grid
  .append("g")
  .attr("transform", `translate(${marginLeft},0)`)
  .call(d3.axisLeft(y));

// Append the SVG element.
chart.append(grid.node());
