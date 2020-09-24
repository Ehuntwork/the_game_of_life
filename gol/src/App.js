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
  setCurrentGen = ()=> {
    this.setState({
      current: []
    })
    for(let row = 0; row < 25 ; row++){
      console.log(row)
      for(let col = 0; col < 25 ; col++){
        console.log(col)
        let elementId = document.getElementById(row+'_'+col)
        if( elementId.className === 'alive'){
          this.setState(state=>{
            const current = state.current.push(1)
            return current
          })
        }
        else{
          this.setState(state=>{
            const current = state.current.push(0)
            return current
          })
        }
    }
  }
  }

  getNeigbors = ()=>{

  }
  evolve = ()=>{
    console.log(this.state.current)
    
  }
  render(){
    return (
      <div className="App">
        <h1>The Game of Life!</h1>
        < World_grid/>
        <button onClick={this.evolve}>Evolve</button>
        <button onClick={this.setCurrentGen}>TEST</button>
      </div>
    );
  }
}

export default App;
