'use client';

import React from 'react';
import styles from './style.module.scss';
import { RotateCcw, Undo } from 'lucide-react';

interface GameInfoProps {
  winner: 'black' | 'white' | null;
  currentPlayer: 'black' | 'white';
  onClickRestart: () => void;
  onClickUndo: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({
  winner,
  currentPlayer,
  onClickRestart,
  onClickUndo,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.turn}>
        {winner ? (
          <div
            className={
              winner === 'black'
                ? `${styles.blackStone} ${styles.win}`
                : `${styles.whiteStone} ${styles.win}`
            }
          />
        ) : (
          <div className={styles.currentPlayer}>
            <div
              className={
                currentPlayer === 'black'
                  ? `${styles.blackStone} ${styles.turnAnimation}`
                  : `${styles.whiteStone} ${styles.turnAnimation}`
              }
            />
          </div>
        )}
      </div>
      <div className={styles.menu}>
        <div className={styles.icon} onClick={onClickRestart}>
          <RotateCcw />
        </div>
        <div className={styles.icon} onClick={onClickUndo}>
          <Undo />
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
