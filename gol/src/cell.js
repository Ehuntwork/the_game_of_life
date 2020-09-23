import React from 'react'

class Cell extends React.Component{
    constructor(){
        super();
        this.state={
            alive: false,
        };
    }

    onClick = ()=>{
        console.log('Cell_test_onClick')
        console.log((this.state.alive === false)?'dead':'alive')
        if( this.state.alive === false){
            this.setState(
                {
                alive: true,
                }
            )
        }
        else{
            this.setState(
                {
                alive: false,
                }
            )
        }
        
    }
    
    render(){
        return(
            <td 
            style={(this.state.alive === false)?{backgroundColor:'white'}: {backgroundColor: 'black'}} 
            id = {this.props.row+'_'+this.props.col} 
            className={(this.state.alive === false)?'dead':'alive'} 
            onClick={this.onClick}>

            </td>
        )
    }
}
export default Cell