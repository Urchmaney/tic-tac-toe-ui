import React from 'react';
import './index.css';

const Box = ({ letter, onClick }) => {
  return <>
    <button className="box" onClick={onClick}>
      {letter}
    </button>
 </> 
}

export default Box;
