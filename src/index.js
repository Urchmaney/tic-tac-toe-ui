import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';
import App from './App';
import { ActionCableProvider } from 'react-actioncable-provider';
// import ActionCableProvider from '@thrash-industries/react-actioncable-provider';

ReactDOM.render(
  <React.StrictMode>
    <ActionCableProvider>
      <App />
    </ActionCableProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
