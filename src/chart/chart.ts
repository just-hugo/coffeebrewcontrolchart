import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Gridlines layer
function generateGridData() {
  var data = new Array();

  //xpos controls how far away from the left side of the page the 1st row of the grid begins
  // ypos controls how far down from the top of the page the top row of the grid begins
  var xpos = 1;
  var ypos = 1;

  // sets the width and height of each square in the grid
  var width = 50;
  var height = 50;

  // iterate for rows. < 10 creates 10 rows
  for (var row = 0; row < 10; row++) {
    data.push(new Array());

    // iterate for cells/columns inside rows. < 10 creates 10 columns
    for (var column = 0; column < 10; column++) {
      data[row].push({
        x: xpos,
        y: ypos,
        width: width,
        height: height,
      });
      // increment the x position. I.e. move it over by 50 (width variable)
      xpos += width;
    }
    // reset the x position after a row is complete
    xpos = 1;
    // increment the y position for the next row. Move it down 50 (height variable)
    ypos += height;
  }
  return data;
}

var gridData = generateGridData();

// use d3 to draw the grid element using the row/column data generated in gridData()

// width and height must ne a few pixels larger than the width/height set in grid data. If the width of a cell is 50 in gridData and there are 10 rows, the grid will take up 500px. But if the below grid variable is set to height: 500, then part of the bottom border of the grid will be cut off. So setting it to 510px allows the full bottom border to be visible
var grid = d3
  .select("#chart")
  .append("svg")
  .attr("width", "510px")
  .attr("height", "510px");

// each row is a <g> element with nested <rect> elements. Each <rect> element represents a single cell in the grid
var row = grid
  .selectAll(".row")
  .data(gridData)
  .enter()
  .append("g")
  .attr("class", "row");

var column = row
  .selectAll(".square")
  .data(function (d) {
    return d;
  })
  .enter()
  .append("rect")
  .attr("class", "square")
  .attr("x", function (d) {
    return d.x;
  })
  .attr("y", function (d) {
    return d.y;
  })
  .attr("width", function (d) {
    return d.width;
  })
  .attr("height", function (d) {
    return d.height;
  })
  .style("fill", "#fff")
  .style("stroke", "#222");

// chart axes
// Declare the chart dimensions and margins.
const width = 700;
const height = 450;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

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

// Create the SVG container.
// const svg = d3.create("svg").attr("width", width).attr("height", height);

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
