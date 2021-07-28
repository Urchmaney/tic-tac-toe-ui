import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board';
import { ActionCableProvider } from 'react-actioncable-provider';
// import ActionCableProvider from '@thrash-industries/react-actioncable-provider';

ReactDOM.render(
  <React.StrictMode>
    <ActionCableProvider url=" http://localhost:3000/cable">
      <Board />
    </ActionCableProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
