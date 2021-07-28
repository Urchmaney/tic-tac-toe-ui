import React, { useState } from 'react';
import Box from '../box';
import { ActionCable } from 'react-actioncable-provider'
import { makeMoveAPI } from '../../services/api';
import './index.css'
// import ActionCableConsumer from '@thrash-industries/react-actioncable-provider';

const Board = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const playerLetter = "X";
  const [playingTurn, setPlayingTurn] = useState(true);

  const RegisterMove = (i, moveLetter) => {
    setBoard(board.map((x, index) => index === i ? moveLetter : x ));
  }
  const makeMove = (moveIndex) => {
    RegisterMove(moveIndex, playerLetter);
    makeMoveAPI({ game_id: 1, letter: playerLetter, position: moveIndex, order: 4 });
  }
  const renderBox = (i) => (<Box letter={board[i]} onClick={() => { makeMove(i, playerLetter) }} />)
  const recieveMove = ({ letter, position }) => {
    RegisterMove(position, letter);
  }

  return <>
    <ActionCable
      channel= {{ channel: 'GameChannel' }}
      onConnected={() => console.log("connected") }
      onReceived={recieveMove}
    >
      <div className="board">
        <div className="board-row">
          {renderBox(0)}
          {renderBox(1)}
          {renderBox(2)}
        </div>
        <div className="board-row">
          {renderBox(3)}
          {renderBox(4)}
          {renderBox(5)}
        </div>
        <div className="board-row">
          {renderBox(6)}
          {renderBox(7)}
          {renderBox(8)}
        </div>
      </div>
    </ActionCable>
  </>
}

export default Board;