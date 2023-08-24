import React,{Component} from "react";
import { apiAcess } from "../service/api";

export class EntrMercadorias extends Component{

    constructor(props) {
        super(props);

        this.state={
            mercNome:"",
            mercFabri:"",
            mercTipo:"",
            descricao:"",
            quantidade:"",
            local:""
        }
    }

    sendData(){
        if(this.state.mercNome == ""){
            alert("Favor informar o nome da Mercadoria");
        }else if(this.state.fabricant == ""){
            alert("Favor informar o Fabricante");
        }else if(this.state.mercTipo == ""){
            alert("Favor informar o Tipo da mercadoria");
        }else if(this.state.quantidade == 0){
            alert("Favor informar a Quantidade da mercadoria");
        }else if(this.state.local == ""){
            alert("Favor informar o local");
        }else{
            fetch(apiAcess.API_NOV_MERC+'NovaMercadorias',{
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
                    FABRICANTE:this.state.mercFabri,
                    TIPO:this.state.mercTipo,
                    DESCRICAO:this.state.descricao,
                    QUANTIDADE:this.state.quantidade,
                    LOCAL:this.state.local 
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                console.log(error)
            })
        }
    }

    nomeHandler = (e) =>{
        this.setState({mercNome:e.target.value});
    }

    fabricantHandler = (e) =>{
        this.setState({mercFabri:e.target.value});
    }

    tipoHandler = (e) => {
        this.setState({mercTipo:e.target.value})
    }

    descriHandler = (e) => {
        this.setState({descricao:e.target.value})
    } 
    
    quantiHandler = (e) => {
        this.setState({quantidade:e.target.value})
    }

    localHandler = (e) => {
        this.setState({local:e.target.value})
    }
    
    render(){
        const {
            mercNome,
            mercFabri,
            mercTipo,
            descricao,    
            quantidade,
            local
        }=this.state;

        return(
       
            <main className="entForm">
                <form>
               
                <h1 className="h3 mb-3 fw-normal">Cadastrar nova mercadoria</h1>

                    <input  required type="text" value={mercNome} onChange={this.nomeHandler} className="form-control top" placeholder="Digite o nome da mercadoria" autoComplete="off" autoFocus />
                    <input  required type="text" value={mercFabri} onChange={this.fabricantHandler} className="form-control top" placeholder="Digite o nome do fabricante" autoComplete="off" autoFocus />
                    <input  required type="text" value={mercTipo} onChange={this.tipoHandler} className="form-control top" placeholder="Digite o tipo da mercadoria" autoComplete="off" autoFocus />
                    <textarea type="text" value={descricao} onChange={this.descriHandler} className="form-control top" placeholder="Descrição" autoComplete="off" autoFocus />
                    <input  required type="number" value={quantidade} onChange={this.quantiHandler} className="form-control top" placeholder="Quantidade" autoComplete="off" autoFocus />
                    <input  required type="text" value={local} onChange={this.localHandler} className="form-control top" placeholder="Local" autoComplete="off" autoFocus />

                    <button className="w-100 btn btn-lg btn-primary" onClick={()=>this.sendData()}>Cadastrar Mercadoria</button>
            
                </form>
            </main>
        )
    }
    
}
