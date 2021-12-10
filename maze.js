let maze = document.querySelector('canvas');

let ctx = maze.getContext('2d');

let current;
class Maze {
  // initialize maze
  constructor(size, rows, columns) {
    this.size = size;
    this.rows = rows;
    this.columns = columns;

    // creates 2D array
    this.grid = [];
    // push pop
    this.stack = [];
  }
  // Methods

  // Draw the Grid
  setup() {
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        // create a cell
        let cell = new Cell(r, c, this.grid, this.size);
        row.push(cell);
      }
      this.grid.push(row);
    }
    current = this.grid[0][0]; //Start of the path
  }
}
// to create individual cell
class Cell {
  constructor(rowNum, colNum, parentGrid, parentSize) {
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.parentGrid = parentGrid;
    this.parentSize = parentSize;
    // Path
    this.visited = false;
    //walls
    this.walls = {
      topWall: true,
      rightWall: true,
      bottomWall: true,
      leftWall: true,
    };
  }
}

// for (let a = 0; a < 3; a++) {
//   console.log('a=', a);
//   for (let b = 0; b < 3; b++) {
//     console.log('b=', b);
//   }
// }

let newMaze = new Maze(500, 5, 10);
newMaze.setup();
