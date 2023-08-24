import React, {Component} from "react";
import { apiAcess } from "../service/api";

export class DropList extends Component{
        
        constructor(props){
            super(props)
    
            this.state={
                mercadorias:[]
            }
        }

    refreshList = () =>{
        fetch(apiAcess.API_MERC_CAD +'MercadoriasCadastradas', {
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({mercadorias:data})
        })
    }

    componentDidMount = () =>{
        this.refreshList();
    }
    
    selectHandler = (e) =>{      
        console.log(e.target.value) 
        this.props.mercd(e.target.value) 
    }

    render(){
        const{
            mercadorias
         }=this.state;

            return(
                <div className="App">            
                    <select onChange={this.selectHandler} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                    {mercadorias.map((i) =>{
                    return <option key={i.ID} value={i.MERCAD_NOME}>{i.MERCAD_NOME}</option>
                    })}
                    </select>
                </div>
            )
        }
}

export default DropList;