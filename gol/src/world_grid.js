import React from 'react'
import Cell from './cell'
//convert to class component and put current: [] in state. loop in map to optimize a bit

function CreateWorld(){
  const rows_cols = 25
  const gridSize = []

  for(let i = 0; i < rows_cols ; i++){
      gridSize.push(i)
  }
  return(
      <div id='world'>
          <table id='worldgrid'>
              {gridSize.map(row=>( 
                  <tr>
                      {gridSize.map(col=>( 
                          <Cell row={row} col={col}/>
                      ))}
                  </tr>
              ))}
          </table>
      </div>
  );
}
export default CreateWorld
