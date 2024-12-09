import React, { useState } from "react";
// import React, { useState, useEffect } from "react";
// import './TodoList.css';
import './TodoList.css';
import Icone from './assets/icon.png';

function TodoList(){

    const listaStorage = localStorage.getItem('Lista');

    const [lista, setLista] = useState([]);
    // const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    // useEffect( () => { localStorage.setItem('Lista', JSON.stringify(lista)); },[lista])

    function adicionaItem(form){
        form.preventDefault();
        if(!novoItem){
            return;
        }
        setLista([...lista, {text: novoItem, isCompleted: false}]);
        setNovoItem("");
        document.getElementById('tarefa').focus();

    }

    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletaTodos(){
        setLista([]);
    }

    return(

        <div>
            <h1>Lista de Tarefas</h1>

            <form onSubmit={adicionaItem}   action="">
                <label htmlFor="tarefa">Adicione uma nova Tarefa!</label>
                <input
                  type="text"
                  name="tarefa" 
                  id="tarefa" 
                  placeholder="Adicione uma tarefa"
                  value={novoItem}
                  onChange={ (e) => {setNovoItem(e.target.value)} }

                />

                <button type="submit">Add</button>
            </form>

            {/* no react ussar className pois o class é palavra reservada para JS */}

            <div className="lista-tarefas">
                
                <div className="alinhar">
                    
                    {
                        lista.length < 1
                        ?
                        <img className="icone-central" src={'./src/assets/icon.png'} alt="" />
                        :
                        lista.map((item, index) => (
                            <div
                                key={index}
                                className={ item.isCompleted ? "item-completo" : "item" }
                            >

                                <span onClick={ ()=>{clicou(index)} }>{item.text}</span>

                                <button onClick={ ()=>{deleta(index)} }>Deletar</button>
                            </div>
                        ))  
                    }


                </div>

            </div>

                {
                    // se for maior que zero mostra o botão
                    lista.length > 0 &&
                    <button
                     onClick={ ()=>{deletaTodos()} }
                     className="deletar-todas">Deletar Todas</button>  
                }

        </div>

        
        

    )

}

export default TodoList