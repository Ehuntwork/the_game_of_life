import React from 'react';
import './App.css';
import World_grid from './world_grid'

function App() {
  return (
    <div className="App">
      <h1>The Game of Life!</h1>
      < World_grid/>
      <button onClick=''>Evolve</button>
    </div>
  );
}

export default App;
