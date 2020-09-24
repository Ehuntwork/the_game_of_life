import React from 'react';
import './App.css';
import World_grid from './world_grid'

class App extends React.Component{
  constructor(){
    super();
    this.state={
        rows_cols: 25,
        gen: 0,
        current: [],
        next: [],
    };
  }

  steInitGen = ()=> {
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

  getNeigbors = ()=>{

  }
  evolve = ()=>{

    console.log(this.state.current)
    console.log(this.state.current[0][0])
    
  }
  render(){
    return (
      <div className="App">
        <h1>The Game of Life!</h1>
        < World_grid/>
        <button onClick={this.evolve}>Evolve</button>
        <button onClick={this.steInitGen}>TEST</button>
      </div>
    );
  }
}

export default App;
