import React from 'react';
import './App.css';
import World_grid from './components/world_grid'


function App(){
  let current = []
  let next = []
  let gen = 0
  let PurpleColorPalate = ['#9F84BD','#C09BD8','#EBC3DB','#EDE3E9','#FF9B85']
  let FallColorPalete = ['#A41623','#F85E00','#FFB563','#FFD29D','#918450']
  let RainbowcolorPalete = ['red','orange','yellow','#82D15D','blue']
  let colorPalete = RainbowcolorPalete

  let speed = 500
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
    for(let row = 0; row < rows_cols ; row++){
      for(let col = 0; col < rows_cols ; col++){
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
    let empty = 0
    //apply rules
    for(let row = 0; row < rows_cols ; row++){
      for(let col = 0; col < rows_cols ; col++){
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
            empty = empty +1
          }
        }
        
        //if a dead cell has 3 neigbors it is resurected
        else if(current[row][col] === 0){
          if(checkNeighbors(row,col) === 3){
            next[row][col] = 1
            empty = empty +1
          }
        }
      }
    }

    if(empty === 0 ){
      stop()
    }
  }

  let updateCurrent = ()=>{
    for(let row = 0; row < rows_cols ; row++){
      for(let col = 0; col < rows_cols ; col++){
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
                  cell.className = 'dead'
                  cell.style.backgroundColor = 'white'
              } else {
                  cell.className = 'alive'
                  cell.style.backgroundColor = colorPalete[Math.floor(Math.random()*(colorPalete.length))]

                }
          }
      }
  }
  let updateGen = ()=>{
    gen = gen + 1
    let genTag = document.getElementById('gen')
    genTag.textContent = 'Generation: '+gen
  }
  let randomWorld = ()=>{
    for(let row = 0; row < rows_cols ; row++){
      Math.floor(Math.random() * (18 - 7 + 1) + 7)
      let cell = document.getElementById(Math.floor(Math.random() * (18 - 7 + 1) + 7)+'_'+Math.floor(Math.random() * (18 - 7 + 1) + 7))
      cell.className = 'alive'
      cell.style.backgroundColor = 'black'
    }
  }

  //STOP BUTTON//////////////////////////////////
  let stop = ()=>{
    _start_ = true
  }
  ///////////////////////////////////////////////

  
  //START BUTTON////////////////////////////////
  let _start_ = false

  let start = ()=>{
    if(_start_ === true){
      _start_ = false
    }

    function loop(){
      setInitGen()
      setNext()
      updateCurrent()
      updateWorld()
      updateGen()
  
      if(_start_ === false){
        setTimeout(loop, speed)
      }
    }

    loop()
  }
  ///////////////////////////////////////////////

   //NEXT BUTTON////////////////////////////////

   let nextGen = ()=>{
    setInitGen()
    setNext()
    updateCurrent()
    updateWorld()
    updateGen()
   
      
   }
   ///////////////////////////////////////////////

  
  //RESET BUTTON/////////////////////////////////
  let reset = ()=>{
    initialGen()
    updateWorld()
    gen = -1
    updateGen()
  }
  ///////////////////////////////////////////////
  
  //GRW BUTTON/////////////////////////////////
  let GRW = ()=>{
    initialGen()
    updateWorld()
    gen = -1
    updateGen()

    randomWorld()
  }
  ///////////////////////////////////////////////
  return (
    <div className="App">
      
      {two_Dify_arrays()}
      {initialGen()}
      <h1>The game of Life</h1>

      <div className='mainGame'>
        <button onClick={GRW}>Generate Random World</button>

        <World_grid started={_start_}/>
        <h2 id='gen'>{'Generation: '+gen}</h2>
        
        <div className='buttons'>
          <button onClick={start}>Start</button>
          <button onClick={stop}>Stop</button>
          <button onClick={reset}>Reset</button>
          <button onClick={nextGen}>Next</button>
        </div>
        <div>
        <div className='description'>
          <h3>What is the game of life?</h3>
          <p> It is a 'cellular automaton', invented by Cambridge mathematician John Conway.</p>
        </div>
        <div className='rules'>
        <h4>Rules:</h4>
        <div className='rulesP'>
          <p>1. If a live(filled) cell has 2 - 3 neighbors it is allowed to live.</p>
          <p>2. If a live(filled) cell has 1 or less neighbors it is murdered.</p>
          <p>3. If a live(filled) cell has more than 4 neighbors it is murdered.</p>
          <p>4. If a dead(empty) cell has exactly 3 neighbors it is resurected.</p>
          </div>
        </div>
        </div>

      </div>

    </div>
  );

}

export default App;
