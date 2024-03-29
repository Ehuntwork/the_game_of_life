import React from 'react'
import Cell from './cell'

function CreateWorld(props){
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
                          <Cell row={row} col={col} started={props.started}/>
                      ))}
                  </tr>
              ))}
          </table>
      </div>
  );
}
export default CreateWorld
