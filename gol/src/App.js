import React from 'react';
import './App.css';
import World_grid from './world_grid'


function App(){
  let current = []
  let next = []
  const rows_cols = 25

  function two_Dify_arrays(){
    for(let i=0;i<rows_cols;i++){
      current[i] = new Array()
      next[i] = new Array()
    }
  }
  function initialGen(){
    for(let row = 0; row < rows_cols; row++){
      for(let col = 0; col < rows_cols; col++){
        current[row][col] = 0;
        next[row][col] = 0
      }
    }
  }
  let setInitGen = ()=> {
    for(let row = 0; row < 25 ; row++){
      for(let col = 0; col < 25 ; col++){
        //gets starter tiles
        let elementId = document.getElementById(row+'_'+col)

        //checks for live tiles
        if( elementId.className === 'alive'){
        current[row][col] = 1
        }

        //checks for dead tiles
        else{
          current[row][col] = 0
        }
    }
    }
  }
  
  let checkNeighbors = (row, col)=>{
  let neighbors = 0
  let ac = col + 1
  let sc = col - 1
  let ar = row + 1
  let sr = row - 1
  let edge = rows_cols - 1

  if (row > 0) {//if not top row 
      if (current[sr][col] === 1) {
          neighbors++;}
  }


  if (row > 0 && col > 0){//if not top left corner
      if (current[sr][sc] === 1){ 
      neighbors++;}
  }


  if (row > 0 && col < edge){//if not top right
          if (current[sr][ac] === 1){ 
              neighbors++;}
  }


  if (col > 0) {//if not left
      if (current[row][sc] === 1){ 
          neighbors++;}
  }


  if (col < edge) {//if not right
      if (current[row][ac] === 1){ 
          neighbors++;}
  }

  if (row < edge && col > 0) {//if not bottom left
      if (current[ar][sc] === 1){ 
          neighbors++;}
  }

  if (row < edge && col < edge) {//if not bottom right
      if (current[ar][ac] === 1){ 
          neighbors++;}
  }
  
  
  if (row < edge) {//if not bottom
      if (current[ar][col] === 1) {
          neighbors++;}
  }

  
  return neighbors;
      
  }

  let setNext = ()=>{
    //apply rules
    for(let row = 0; row < 25 ; row++){
      for(let col = 0; col < 25 ; col++){
        //if an alive cell has more than 4 or less than one neighbor it dies
        if(current[row][col] === 1){
          if(checkNeighbors(row,col) <= 1){
            next[row][col] = 0
          }
          else if( checkNeighbors(row,col)>=4){
            next[row][col] = 0
          }
          else if( checkNeighbors(row,col) >= 2 && checkNeighbors(row,col) <= 3){
            next[row][col] = 1
          }
        }
        
        //if a dead cell has 3 neigbors it is resurected
        else if(current[row][col] === 0){
          if(checkNeighbors(row,col) === 3){
            next[row][col] = 1
          }
        }
      }
    }
  }

  let updateCurrent = ()=>{
    for(let row = 0; row < 25 ; row++){
      for(let col = 0; col < 25 ; col++){
        current[row][col] = next[row][col];
        // Set nextGen back to empty
        next[row][col] = 0;
      }
    } 
  }


  let updateWorld= ()=> {
      for (let row = 0; row < rows_cols; row++) {
          for (let col = 0; col < rows_cols; col++) {
              let cell = document.getElementById(row + '_' + col);
              
              if (current[row][col] === 0) {
                  cell.setAttribute('class', 'dead');
                  cell.style.backgroundColor = 'white'
              } else {
                  cell.setAttribute('class', 'alive');
                  cell.style.backgroundColor = 'blue'

                }
          }
      }
  }
  
  //START BUTTON////////////////////////////////
  let start = ()=>{
    setInitGen()
    setNext()
    updateCurrent()
    updateWorld()
  }
  ///////////////////////////////////////////////


  //STOP BUTTON//////////////////////////////////
  let stop = ()=>{

  }
  ///////////////////////////////////////////////

  
  //RESET BUTTON/////////////////////////////////
  let reset = ()=>{
    initialGen()
    updateWorld()
  }
  ///////////////////////////////////////////////
  

  return (
    <div className="App">
      
      { two_Dify_arrays()}
      {initialGen()}
      <h1>The game of Life</h1>
      <World_grid/>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>

    </div>
  );

}

export default App;
