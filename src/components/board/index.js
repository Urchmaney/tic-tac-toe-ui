import React from 'react';
import Container from 'react-bootstrap/Container';
import Box from '../box';
import './index.css'

const Board = ({ board, moveFunc, disabled }) => {
  const renderBox = (i) => (<Box letter={board[i]} onClick={() => { moveFunc(i) }} />)

  return <>
    <div className={`board ${disabled ? 'disabled-board' : ''}`}>
      <Container>
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
      </Container>
    </div>
  </>
}

export default Board;