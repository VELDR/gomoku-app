'use client';

import React from 'react';
import styles from './style.module.scss';

interface BoardProps {
  board: (string | null)[][];
  currentPlayer: 'black' | 'white';
  placeStone: (row: number, col: number) => void;
  boardSize: number;
  winner: 'black' | 'white' | null;
}

const Board: React.FC<BoardProps> = ({
  board,
  currentPlayer,
  placeStone,
  boardSize,
  winner,
}) => {
  const renderCell = (row: number, col: number) => {
    const stone = board[row][col];
    const isEmpty = stone === null;
    let stoneClass = '';
    if (!isEmpty) {
      stoneClass = stone === 'black' ? styles.blackStone : styles.whiteStone;
    }
    const isCenterCell =
      row === Math.floor(boardSize / 2) && col === Math.floor(boardSize / 2);

    return (
      <div
        key={`cell_${row}_${col}`}
        className={`${styles.plus} ${isEmpty && !winner ? styles.empty : ''} ${
          currentPlayer === 'black' && !winner
            ? styles.blackTurn
            : currentPlayer === 'white' && !winner
            ? styles.whiteTurn
            : ''
        } ${stoneClass} ${isCenterCell ? styles.center : ''}`}
        onClick={() => placeStone(row, col)}
      ></div>
    );
  };

  const renderRow = (rowIndex: number) => {
    const cells = [];
    for (let j = 0; j < boardSize; j++) {
      cells.push(renderCell(rowIndex, j));
    }
    return (
      <div key={`row_${rowIndex}`} className={styles.row}>
        {cells}
      </div>
    );
  };

  const renderBoard = () => {
    const rows = [];
    for (let i = 0; i < boardSize; i++) {
      rows.push(renderRow(i));
    }
    return rows;
  };
  return <div className={styles.board}>{renderBoard()}</div>;
};

export default Board;
