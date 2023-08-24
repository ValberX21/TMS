import React from "react";
import { EntrMercadorias } from "./components/entrMercadorias";
import {BrowserRouter, NavLink, Routes,Route} from 'react-router-dom';
import { SaidaMercadorias } from "./components/saidaMercadorias";

function App(){
    return(
        <BrowserRouter> 
        <div className="center">
            <h3 className="d-flex justify-content-center m-3">
                Controle de Mercadorias
            </h3>

            <nav className="navv navbar navbar-expand-sm bg-light navbar-dark ">
                <ul className="navbar-nav">
                    <li className="nav-item- m-1">
                        <NavLink className="btn btn-light btn-outline-primary" to="/entrMercadorias">
                          Entrada de Mercadorias
                        </NavLink>
                    </li>

                    <li className="nav-item- m-1">
                        <NavLink className="btn btn-light btn-outline-primary" to="/saiMercadorias">
                          Saida de Mercadorias
                        </NavLink>
                    </li>

                </ul>
            </nav>

        <Routes>
             <Route path="/" element={<EntrMercadorias/>} /> 
             <Route path="/entrMercadorias" element={<EntrMercadorias/>} /> 
             <Route path="/saiMercadorias" element={<SaidaMercadorias/>} />
        </Routes>
        </div>
        </BrowserRouter>          
    )
}

export default App;