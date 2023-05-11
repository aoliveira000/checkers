import React from 'react';
// import './App.css';
import './components/Board';
import Board from './components/Board';

function App() {
  return (
    <div className="app">
      <Board width={8} height={8}/>
    </div>
  );
}

export default App;
