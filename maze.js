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
  _setup() {
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
  _draw() {
    maze.width = this.size;
    maze.height = this.size;
    maze.style.background = 'black';
    current.visited = true;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let grid = this.grid;
        grid[r][c]._show(this.size, this.rows, this.columns);
      }
    }
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

  _drawTopWall(x, y, size, rows, columns) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / columns, y);
    ctx.stroke();
  }
  _drawRightWall(x, y, size, rows, columns) {
    ctx.beginPath();
    ctx.moveTo(x + size / columns, y);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  _drawBottomWall(x, y, size, rows, columns) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / rows);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }
  _drawLeftWall(x, y, size, rows, columns) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size / rows);
    ctx.stroke();
  }
  // Function that draw the cells in the canvas
  _show(size, rows, columns) {
    let x = (this.colNum * size) / columns;
    let y = (this.rowNum * size) / rows;
    // initialize color of the strokes
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'black';
    ctx.lineWidth = '2';
    if (this.walls.topWall) this._drawTopWall(x, y, size, columns, rows);
    if (this.walls.rightWall) this._drawRightWall(x, y, size, columns, rows);
    if (this.walls.bottomWall) this._drawBottomWall(x, y, size, columns, rows);
    if (this.walls.leftWall) this._drawLeftWall(x, y, size, columns, rows);
    if (this.visited) {
      ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    }
  }
}

// for (let a = 0; a < 3; a++) {
//   console.log('a=', a);
//   for (let b = 0; b < 3; b++) {
//     console.log('b=', b);
//   }
// }

let newMaze = new Maze(500, 10, 10);
newMaze._setup();
newMaze._draw();
