function generateGridData() {
  var data = new Array();

  //xpos controls how far away from the left side of the page the 1st row of the grid begins
  // ypos controls how far down from the top of the page the top row of the grid begins
  var xpos = marginLeft;
  var ypos = marginTop;

  // sets the width and height of each square in the grid
  var width = 50;
  var height = 35;

  // iterate for rows. < 10 creates 10 rows
  for (var row = 0; row < 16; row++) {
    data.push(new Array());

    // iterate for cells/columns inside rows. < 10 creates 10 columns
    for (var column = 0; column < 12; column++) {
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
    xpos = marginLeft;
    // increment the y position for the next row. Move it down 50 (height variable)
    ypos += height;
  }
  return data;
}
