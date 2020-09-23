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
  setCurrentGen() {

    for(let row = 0; row < 25 ; row++){
      for(let col = 0; col < 25 ; col++){
        let elementId = document.getElementById(row+'_'+col)
        if( elementId.className === 'alive'){
          this.setState({
            current: [...this.state.current, 1]
          })
        }
        else{
          this.setState({
            current: [...this.state.current, 0]
          })
        }
    }
  }
  }

  getNeigbors = function(){

  }
  evolve() {
    console.log(this.state.current === [] ? true:false)
    
  }
  render(){
    return (
      <div className="App">
        <h1>The Game of Life!</h1>
        < World_grid/>
        <button onClick={this.evolve}>Evolve</button>
        <button onClick={this.setCurrentGen}>{this.state.rows_cols}</button>
      </div>
    );
  }
}

export default App;
