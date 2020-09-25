import React from 'react';
import './App.css';
import World_grid from './world_grid'
import {test }from './functions'

class App extends React.Component{
  constructor(){
    super();
    this.state={
        rows_cols: 25,
        gen: 0,
        current: [],
        next: [],
        start: false
    };
  }
  
  //START BUTTON////////////////////////////////

  start = ()=>{
    let steInitGen = ()=> {
      //clears current
      this.setState({
        current: []
      })

      //creates rows in 2d array
      for(let row = 0; row < 25 ; row++){
        this.setState(state=>{
          let innerArray = []//holder for colmn nums
          const current = [...state.current, innerArray]

          //creates cols in 2d array
          for(let col = 0; col < 25 ; col++){
            //gets starter tiles
            let elementId = document.getElementById(row+'_'+col)

            //checks for live tiles
            if( elementId.className === 'alive'){
              innerArray.push(1)

            }

            //checks for dead tiles
            else{
              innerArray.push(0)
            }
        }
        return{
          ...this.state,
          current
        }
        })

      }
    }

    let checkNeighbors = (row, col, current)=>{
      let neighbors = 0
      let ac = col + 1
      let sc = col - 1
      let ar = row + 1
      let sr = row - 1
      console.log(current)
      if (sr >= 0) {//if not top row 
        if (current[sr][col] === 1) {
            neighbors++;}
      }


      if (sr >= 0 && sc >= 0){//tif not top right
        if (current[sr][sc] === 1){ 
          neighbors++;}
      }


      if (sr >= 0 && ac < this.state.rows_cols){//if not top left
              if (current[sr][ac] === 1){ 
                  neighbors++;}
      }


      if (sc >= 0) {//if not left
          if (current[row][sc] === 1){ 
              neighbors++;}
      }


      if (ac < this.state.rows_cols) {//if not right
          if (current[row][ac] === 1){ 
              neighbors++;}
      }

      if (ar < this.state.rows_cols && sc >= 0) {//if not bottom left
          if (current[ar][sc] === 1){ 
              neighbors++;}
      }

      if (ar < this.state.rows_cols && ac < this.state.rows_cols) {//if not bottom right
          if (current[ar][ac] === 1){ 
              neighbors++;}
      }
      
      
      if (ar < this.state.rows_cols) {//if not bottom
          if (current[ar][col] === 1) {
              neighbors++;}
      }
  
      
      return neighbors;
        
    }

    if( this.state.start === false){
      steInitGen()
      this.setState({
        start: true,
        gen: this.state.gen++
      })
    }
    else{
      steInitGen()
      console.log(checkNeighbors(0,0, this.state.current))

    }

  
    
  }///////////////////////////////////////////////



  stop = ()=>{
    console.log(this.state.current)
  }
  reset = ()=>[

  ]
  render(){
    return (
      <div className="App">
        <h1>The Game of Life!</h1>
        < World_grid/>
        <button onClick={this.start}>Evolve</button>
        <button onClick={this.stop}>TEST</button>
      </div>
    );
  }
}

export default App;
