import React,{Component} from "react";
import { apiAcess } from "../service/api";
import DropList from "./dropListMerc";

export class SaidaMercadorias extends Component{

    constructor(props) {
        super(props);

        this.state={
            mercNome:"",
            mercQuanti:""
        }
    }


    sendData(){
        if(this.state.mercNome == ""){
            alert("Favor informar Mercadoria");
        }else if(this.state.mercQuanti == 0){
            alert("Favor informar o Fabricante");
        }else{
            fetch(apiAcess.API_SAI_MERC+'SaidaMercadorias',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
                    'Access-Control-Allow-Headers':'Content-Type',
                    'Access-Control-Allow-Credentials':'true'
                },
                body:JSON.stringify({
                    MERCAD_NOME:this.state.mercNome,
                    QUANTIDADE:this.state.mercQuanti         
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                console.log(result);
                this.refreshList();
            },(error)=>{           
                console.log(error)
            })
        }
    }

    // nomeHandler = (e) =>{
    //     this.setState({mercNome:e.target.value});
    // }

    quantHandler = (e) =>{
        this.setState({mercQuanti:e.target.value});
    }

    nomeZeroHandler = (e) =>{      
        this.setState({mercNome:e});
        console.log("saidMerc - " + e)
    }
    
    render(){
        const {         
            nomeZero,
            mercQuanti,
        }=this.state;

        return(
       
            <main className="entForm">
                <form>
               
                <h1 className="h3 mb-3 fw-normal">Saida de mercadoria</h1>
                        <DropList value={nomeZero} mercd={this.nomeZeroHandler} />
                        {/* <input  required type="text" value={mercNome} onChange={this.nomeHandler} className="form-control top" placeholder="Digite o nome da mercadoria" autoComplete="off" autoFocus /> */}
                        <input  required type="number" value={mercQuanti} onChange={this.quantHandler}  className="form-control top" placeholder="Quantidade" autoComplete="off" autoFocus />
                        <button className="w-100 btn btn-lg btn-primary" onClick={()=>this.sendData()} >Confirmar saida de Mercadoria</button>
                
                </form>
            </main>
        )
    }
    
}
