/*
Preciso criar um context pa comunicar lista com a sidebar pq o modo que to fazendo tá dando b.o

criar o context, atribuir um provider com os states que vão ser passados 
qe é basicamente pra ver se a lista ta selecionada e pra ver os todos

*/


import { createContext, useContext, useState } from "react";
const ListContext = createContext()

export function ListProvider({children}){
    const [selectedList, setSelectedList ] = useState(null) // a lista que vai ser selecionada
    const [todos, setTodos] = useState([]) //armazena os todos em uma array linda e perfeita
    const [loading, setLoading] = useState(false)
    
    const selectList = (lista) => { // função que recebe a lista, bota no state a lista selecionada e os todo
        if(selectedList && selectedList.id === lista.id ){
            return // se é a mesma lista que foi selecionada então nao faz nada (evita carregamento desnecessário e flickering)
        }
        setLoading(true)
        setSelectedList(lista)
        setTodos([])
    }

    const clearSelectedList = () => {
        setSelectedList(null)
        setTodos([])
    }

    const value = { // os vallue que vão ser passado do contexto
        selectedList,
        selectList,
        clearSelectedList,
        todos,
        setTodos,
        loading,
        setLoading
    }
    return (
        <ListContext.Provider value={value}>
            {children}
        </ListContext.Provider>
    )

}

export function useList(){ // hook pra não precisa configurar o use context
    const context = useContext(ListContext)
    if(!context){ // ve se o provider não tá fora de algum componente como o sidebar
        throw new Error('alguma coisa deu errado ai')
    }
    return context // etorna os value
}

//const { selectedList, selectList, todos, setTodos } = useList() <-- vai ser usado isso aqui dai