// Connect Four
//  
// Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
// column until a player gets four-in-a-row (horiz, vert, or diag) or until
// board fills (tie)
//  

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

// makeBoard: create in-JS board structure:
// board = array of rows, each row is array of cells  (board[y][x])



function makeBoard() {
  //// DONE || TODO: set "board" to empty HEIGHT x WIDTH matrix array 
  //Loop to add board row HEIGHT number of times
  for (let i = 0; i < HEIGHT; i++) {
    //push array with WIDTH number of nulls to the board array
    board.push(Array(WIDTH).fill(null));
  }
}



/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  //// DONE || TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  // The html Board Table element
  const htmlBoard = document.getElementById("board");

  //// DONE || TODO: add comment for this code
  //This creates the top table row and names it "top"
  const top = document.createElement("tr");
  //Sets the id of the "top" table row element to "column-top"
  //column-top has unique CSS
  top.setAttribute("id", "column-top");
  //an event listener is added to "top"
  //this handle click function allows the play to drop a piece on the board
  top.addEventListener("click", handleClick);

  //This loop creates the squares for the top row
  //It loops WIDTH number of times
  for (let x = 0; x < WIDTH; x++) {
    //This creates each table data cell 
    const headCell = document.createElement("td");
    //It gives it an id atribute set to the incrementor value
    headCell.setAttribute("id", x);
    //Each td is appended to the top row
    top.append(headCell);
  }
  //The "top" row is appended to the htmlBoard
  htmlBoard.append(top);

  //// DONE || TODO: add comment for this code
  //This loop creates the rest of the board
  //This outer loop runs HEIGHT number of times
  for (let y = 0; y < HEIGHT; y++) {
    //For Each row of the board a table row element is create
    const row = document.createElement("tr");

    //This loop creates the squares for each row
    //This outer loop runs WIDTH number of times
    for (let x = 0; x < WIDTH; x++) {
      //Create each td element and names it cell
      const cell = document.createElement("td");
      //Each cell is given an id attribute with an x and y value
      //x corresponds with the outer loop incrementor that creates each row
      //y corresponds with inner loop incrementor that creates each cell
      //together the x and y create a coordinates for a matrix with which we can navigate the board
      cell.setAttribute("id", `${y}-${x}`);
      //Each cell is appended to the current row
      row.append(cell);
    }
    //Each row is appended to the board
    htmlBoard.append(row);
  }
}



/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  //// DONE || TODO: write the real version of this, rather than always returning 0
  let y = null;

  for(let i = HEIGHT - 1; i >= 0; i--) {
    if(board[i][x] === null) {
       y = i;
       break;
    }
  }
  return y;
}



/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  //// DONE || TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.classList.add("piece");

  //Check currPlayer and add that player's class to the piece
  if (currPlayer === 1) {
    piece.classList.add("p1");
  } else {
    piece.classList.add("p2");
  }

  //Get the cell with the id that corresponds to the x and y coordinates
  const cell = document.getElementById(`${y}-${x}`)
  //Append that piece to that cell
  cell.append(piece);
}



/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}


/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  placeInTable(y, x);
  //// DONE || TODO: add line to update in-memory board
  //Updates the item in the array with the player that occupies that cell
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  //// DONE || TODO: check if all cells in board are filled; if so call, call endGame
  if (checkBoardIsFull(board)) {
    //if checkBoardisFull returns true endGame with "Draw" message is called
    return endGame(`Game end in draw. Nobody wins!`);
  }

  // switch players
  //// DONE || TODO: switch currPlayer 1 <-> 2
  currPlayer = (currPlayer === 1) ? currPlayer = 2 : currPlayer = 1;
}



/** checkBoardisFull: checks if board is full */

function checkBoardIsFull(arr) {
  //Takes and array and checks if every item in every row(arrays in the array), is not null
  //returns boolean
  for (let row of arr) {
    if (!row.every((item) => item !== null)) return false;
  }
  return true;
}



/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}



makeBoard();
makeHtmlBoard();
