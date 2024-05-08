'use client';

import React, { useEffect, useState } from 'react';
import Board from '../Board';
import GameInfo from '../GameInfo';
import styles from './style.module.scss';

type BoardState = (string | null)[][];

const Game: React.FC = () => {
  const BOARD_SIZE = 15;
  const [board, setBoard] = useState<BoardState>(
    Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, () => null)
    )
  );
  const [currentPlayer, setCurrentPlayer] = useState<'black' | 'white'>(
    'black'
  );
  const [winner, setWinner] = useState<'black' | 'white' | null>(null);
  const [showWinner, setShowWinner] = useState<boolean>(false);
  const [history, setHistory] = useState<BoardState[]>([]);
  useEffect(() => {
    if (winner) {
      setShowWinner(true);
      setTimeout(() => {
        setShowWinner(false);
      }, 3000);
    }
  }, [winner]);

  const checkForWin = (row: number, col: number, player: 'black' | 'white') => {
    const directions = [
      [1, 0], // vertical
      [0, 1], // horizontal
      [1, 1], // diagonal \
      [1, -1], // diagonal /
    ];

    for (const [dx, dy] of directions) {
      let count = 1; // count of consecutive stones
      let r = row + dx;
      let c = col + dy;

      // Check in one direction
      while (
        r >= 0 &&
        r < BOARD_SIZE &&
        c >= 0 &&
        c < BOARD_SIZE &&
        board[r][c] === player
      ) {
        count++;
        r += dx;
        c += dy;
      }

      // Check in opposite direction
      r = row - dx;
      c = col - dy;
      while (
        r >= 0 &&
        r < BOARD_SIZE &&
        c >= 0 &&
        c < BOARD_SIZE &&
        board[r][c] === player
      ) {
        count++;
        r -= dx;
        c -= dy;
      }

      if (count >= 5) {
        setWinner(player);
        break;
      }
    }
  };

  const placeStone = (row: number, col: number) => {
    if (!winner && !board[row][col]) {
      const newBoard = board.map((row) => [...row]);
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      setHistory((prevHistory) => [...prevHistory, newBoard]);
      checkForWin(row, col, currentPlayer);
      setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
    }
  };

  const restartGame = () => {
    setBoard(
      Array.from({ length: BOARD_SIZE }, () =>
        Array.from({ length: BOARD_SIZE }, () => null)
      )
    );
    setCurrentPlayer('black');
    setWinner(null);
    setHistory([]);
  };

  const undoMove = () => {
    if (history.length > 0) {
      if (history.length === 1) {
        restartGame();
      } else {
        const lastBoardState = history[history.length - 2];
        setBoard(lastBoardState);
        setHistory(history.slice(0, -1));
        setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
        setWinner(null);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>五</h1>
        <h1>目</h1>
        <h1>並</h1>
        <h1>べ</h1>
      </div>
      <GameInfo
        winner={winner}
        currentPlayer={currentPlayer}
        onClickRestart={restartGame}
        onClickUndo={undoMove}
      />
      <Board
        board={board}
        currentPlayer={currentPlayer}
        placeStone={placeStone}
        boardSize={BOARD_SIZE}
        winner={winner}
      />
      {showWinner && (
        <div className={styles.winnerMessage}>
          {winner === 'black' ? (
            <p className={`${styles.winner} ${styles.blackWin}`}>Black Wins!</p>
          ) : winner === 'white' ? (
            <p className={`${styles.winner} ${styles.whiteWin}`}>White Wins!</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Game;
