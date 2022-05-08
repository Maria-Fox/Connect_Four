/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

//IMPORTNAT: Y = ROW, X= COLUMN

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // board = [[HEIGHT * WIDTH]]; initial attempt- THIS HARD CODES?
  for (let gameBoard = 0; gameBoard < HEIGHT; gameBoard++) {
    board.push(Array.from({ length: WIDTH }));
    //this initializes an array with a length of the width value. Those values are then pushed into the board (previously empty array).
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  //get element with id of #board - assign to htmlBoard variable
  const htmlBoard = document.querySelector("#board");

  // TODO: add comment for this code
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //*Create the top row ("top") and attach an id of "column-top." Add an event listener for handling an event (click) on top row.

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  //*While x is less than width: create a new table data element referrred to as "headCell." Give headCell an id of "x". the top should append the headCell. The htmlBoard should append top. Flow: Board, top, headCell.

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
      //*While y is less than height create a new row. While x is less than width create a new table data element referred to as a cell. Assign each cell (td) an id of their y-x location. Then, for each row we append cell(s). Finally, we append the rows to the htmlBoard.
    }
    htmlBoard.append(row);
  }
}

//*While y is less than height create a new row. While x is less than width create a new table data element referred to as a cell. Assign each cell (td) an id object of {y-x}. Then, for each row we append cell(s). Finally, we append the rows to the htmlBoard.

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let piece = document.createElement("div");

  piece.classList.add("piece");
  piece.classList.add(`player${currPlayer}`);
  console.log(currPlayer, piece.classList); //currPLayer variable previously assigned

  const slot = document.getElementById(`${y}-${x}`);
  slot.append(piece);

  // created a div(piece). According to the table cell chosen (Grabbing the row/ column chosen by player)- Append that piece(marker on who chose what) to the slot.
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(e) {
  // get x from ID of clicked cell
  let x = +e.target.id; // this gives us the cell # chosen ONLY

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);

  if (y === null) {
    return;
    // *this refers to the top row - if clicked if there are no more spaces vertifically ignore the click- do not drop a piece/ td. Otherwise, drop piece in top empty row.
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;
  //grab the row and colummn and run palceInTable function.

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (
    board.every((val) => {
      val.every((cell) => {
        return cell !== null;
        // if not all cells are full-escape/ return
      });
    })
  ) {
    endGame("You've tied! Play another round to find the one true winner!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2

  currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);
  console.log(currPlayer);
  // currplayer is intiated above at === 1 - if true- switch to player 2, If false, switch back to 1.
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

  for (var y = 0; y < HEIGHT; y++) {
    //while y is less than height iterate through row, and cols, and and check for..
    for (var x = 0; x < WIDTH; x++) {
      //while x is less than width iterate through check for.. if any of the below y/x formats are a match declare winner by horiz, vert, or diagonal methods
      var horiz = [
        //a HORIZONTAL win- grab the y and x location, check if next input matches the 3 scenarious
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      var vert = [
        //a VERTICAL win- grab the y and x location, check if next input matches the 3 scenarious
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      var diagDR = [
        //a DIAGONAL-RIGHT win- grab the y and x location, check if next input matches the 3 scenarious
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      var diagDL = [
        //a DIAGONAL-LEFT win- grab the y and x location, check if next input matches the 3 scenarious
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
