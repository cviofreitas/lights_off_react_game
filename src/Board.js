import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import Restart from "./Restart"

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/
const RandomTrueOrFalse = () => {
  let num = Math.random();
  return num < 0.5 ? (num = false) : (num = true);
};


function Board({ nrows = 5, ncols = 5, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let rowsArray = []
    let initialBoard = [];
    for (let i = 0; i < nrows * ncols; i++) {
      rowsArray.push(RandomTrueOrFalse());
      // rowsArray.push(true);
    }
    for (let i = 0; i < nrows; i++) {
      let i = rowsArray.splice(0, ncols);
      initialBoard.push(i);
    }
    return initialBoard;
  }

  function hasWon() {
    let flatArray = [].concat(...board)
    if (flatArray.includes(false)) { return } else { return true }

    // TODO: check the board in state to determine whether the player has won.
  }

  function flipCellsAroundMe(coord) {

    let x = Number(coord[0])
    // x is the column
    let y = Number(coord[2])
    // y is the row
    const newBoard = [...board]

    // create coordinate for adjacent cells
    let clickedCell = `${y}${x}`;
    let cellAbove = `${y + 1}${x}`;
    let cellRight = `${y}${x + 1}`;
    let cellUnder = `${y - 1}${x}`;
    let cellLeft = `${y}${x - 1}`;


    const flipCell = (coordinates, newBoard) => {
      let y = Number(coordinates[0]);
      let x = Number(coordinates[1])
      // check if cells exist on board
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        if (newBoard[y][x] === true) {
          newBoard[y][x] = false
        }
        else if (newBoard[y][x] === false) {
          newBoard[y][x] = true
        }
      }
    }
    // flips center, top, left, bottom, and left cells
    flipCell(clickedCell, newBoard)
    flipCell(cellAbove, newBoard)
    flipCell(cellRight, newBoard)
    flipCell(cellUnder, newBoard)
    flipCell(cellLeft, newBoard)

    setBoard(newBoard);
  }

  const restart = () => {
    setBoard(createBoard())

    console.log('restarted')
  }

  return (
    <>
      <h1>
        Lights out
      </h1>
      <h2>To win make every square blue</h2>
      {hasWon() ? <h2 className="winnerNotification">you win</h2> : ''}
      <Restart action={restart} />
      <div className="gameBoardContainer">
        <div className="gameBoard">{
          board.map((row, y) => (<tr>{row.map((val, x) => (<Cell
            coordinates={`${x}-${y}`}
            isLit={val === true ? 'isLit' : ''}
            val={`${val}`}
            flipCellsAroundMe={flipCellsAroundMe}
          />))}</tr>))

        }</div>
      </div>

    </>
  )
  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
}

export default Board;
