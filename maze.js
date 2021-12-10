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
    let next = current._checkNeighbors();
    if (next) {
      next.visited = true;
      this.stack.push(current);
      current._highlight(this.columns);

      current._removeWall(current, next);

      current = next;
    } else if (this.stack.length > 0) {
      let cell = this.stack.pop;
      current = cell;
      current._highlight(this.columns);
    }
    if (this.stack.length === 0) {
      return;
    }
    window.requestAnimationFrame(() => {
      this._draw();
    });
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
  _checkNeighbors() {
    let grid = this.parentGrid;
    let row = this.rowNum;
    let col = this.colNum;
    let neighbors = [];

    // Side area of canvas will return undefined to
    // side area out of grid scope
    let top = row !== 0 ? grid[row - 1][col] : undefined;
    let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    let left = col !== 0 ? grid[row][col - 1] : undefined;

    if (top && !top.visited) neighbors.push(top);
    if (right && !right.visited) neighbors.push(right);
    if (bottom && !bottom.visited) neighbors.push(bottom);
    if (left && !left.visited) neighbors.push(left);

    if (neighbors.length != 0) {
      let random = Math.floor(Math.random() * neighbors.length);
      return neighbors[random];
    } else {
      return undefined;
    }
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

  _highlight(columns) {
    let x = (this.colNum * this.parentSize) / columns + 1;
    let y = (this.rowNum * this.parentSize) / columns + 1;

    ctx.fillStyle = 'green'; //Color of visited color
    ctx.fillRect(
      x + 1,
      y + 1,
      this.parentSize / columns - 3,
      this.parentSize / columns - 3
    );
  }
  _removeWall(cell1, cell2) {
    // compare cell on x axis
    let x = (cell1.colNum = cell2.colNum);
    if (x == 1) {
      cell1.walls.leftWall = false;
      cell2.walls.rightWall = false;
    } else if (x == -1) {
      cell1.walls.rightWall = false;
      cell2.walls.leftWall = false;
    }
    let y = (cell1.rowNum = cell2.rowNum);
    if (y == 1) {
      cell1.walls.topWall = false;
      cell2.walls.bottomWall = false;
    } else if (y == -1) {
      cell1.walls.bottomWall = false;
      cell2.walls.topWall = false;
    }
  }
}

let newMaze = new Maze(500, 10, 10);
newMaze._setup();
newMaze._draw();
