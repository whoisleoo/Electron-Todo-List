import { useState, useEffect } from 'react'
import { useList } from '../contexts/listContext'
import api from '../services/api'




function SideBar() {
const { selectList }  = useList()
const [showBar, setShowBar ] = useState(false) 
const [editMode, setEditMode] = useState(false)
const [idEdit, setIdEdit] = useState(null)
const [inputEdit, setInputEdit] = useState('')
const [lists, setLists] = useState([])
const [input, setInput ] = useState('')
const [errorMessage, setErrorMessage ] = useState('')
const [successMessage, setSuccessMessage] = useState('')
const [deleteModal, setDeleteModal ] = useState(false)
const [idDelete, setIdDelete ] = useState(null)
   

//===========================================================
//                 GET DE LISTA
//===========================================================
const buscarListas = async function (){

    try{
        const token = localStorage.getItem('token')
        const response = await api.get('/list', 
            { headers: { Authorization: `Bearer ${token}`}
        })

        setLists(response.data.lista)
    }catch(error){
        setErrorMessage(`Não foi possivel buscar listas devido a ${error}`)
    }
}

useEffect(() => {
    buscarListas()
}, [])

//===========================================================
//                 POST DE LISTA
//===========================================================
const criarListas = async function (){

    if(!input.trim()){ //ve se n ta vazio o input
        setErrorMessage("Digite o nome da lista.")
        return 
    }

    setErrorMessage('')

    try{
        const token = localStorage.getItem('token')
        const response = await api.post('/list', 
            { nome: input.trim() }, // puxa o nome usando o post 
            { headers: { Authorization: `Bearer ${token}`}
        })

        setLists([response.data.lista, ...lists]) // bota na array das listas criadas bem no comecinho
        setSuccessMessage(`Lista ${input} adicionada com sucesso!`)
        setInput('')
    }catch(error){
        const message = error.response?.data?.error
        setErrorMessage(message)
    }
}


//===========================================================
//                 MODAL DE DELETAGEM FODASTICA
//===========================================================

const openModal = (id) => {
    setIdDelete(id)
    setDeleteModal(true)
}

//===========================================================
//                 MODAL DE DELETAGEM CANCELADO
//===========================================================

const closeModal = () => {
    setIdDelete(null)
    setDeleteModal(false)
}

//===========================================================
//                   EDIT FODASTICA
//===========================================================

const abrirEdit = (id, nomeEdit) => {
    setEditMode(true)
    setIdEdit(id)
    setInputEdit(nomeEdit)
    setSuccessMessage('')
    setErrorMessage('')
}

//===========================================================
//                EDIT CANCELADO
//===========================================================

const fecharEdit = () => {
   setEditMode(false)
   setIdEdit(null)
   setInputEdit('')
    setSuccessMessage('')
    setErrorMessage('')
}

//===========================================================
//                 EDITAR DE LISTA
//===========================================================

const editLista = async function (){
    try{
        const token = localStorage.getItem('token')
         await api.put(`/list/${idEdit}`, 
            { nome: inputEdit.trim() },  
            { headers: { Authorization: `Bearer ${token}`}}
        ) 
     
        setLists(lists.map(lista =>  // mapeia o array da lista e ve se o id da lista é igual ao id da edição, se for desestrutura a lista e troca o nome pelo input
            lista.id === idEdit 
                ? { ...lista, name: inputEdit.trim() } 
                : lista
        ))


    
        fecharEdit()
    } catch(error){

    }
}

//===========================================================
//                 DELETE DE LISTA
//===========================================================
const deletarLista = async function (){
 

    setErrorMessage('')
    setSuccessMessage('')

    try{
        const token = localStorage.getItem('token')
        await api.delete(`/list/${idDelete}`, 
            { headers: { Authorization: `Bearer ${token}`}
        })

        setLists(lists.filter(lista => lista.id !== idDelete))


    }catch(error){
        const message = error.response?.data?.error
        setErrorMessage(message)
    }


    setDeleteModal(false)
    setIdDelete(null)
}

//===========================================================
//                 MENSAGEM ERRO
//===========================================================
const ErrorMessage = ({message}) => {
    if(!message){
     return null
    } 
    return(
    <div className='backdrop-blur-md text-red-700  mt-1'>
      {message}
    </div>
    )
  }


  //===========================================================
//                 MENSAGEM SUCESSO
//===========================================================
  const SuccessMessage = ({message}) => {
    if(!message){
     return null
    } 
    return(
    <div className='backdrop-blur-md text-indigo-400  mt-1'>
      {message}
    </div>
    )
  }

    
    return (
        <div className="w-80 bg-black border-r border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-4">Suas Listas</h2>
                
                <button onClick={() => setShowBar(!showBar)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                    <svg className={`w-5 h-5 transition-transform ${showBar ? 'rotate-50' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                    Nova Lista
                </button>
            </div>
 


          {showBar && (
    <div className={`p-4 bg-black border-b border-gray-700  transition-all duration-300 ease-in-out transform  ${showBar ? 'translate-y-0 transition-all  opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div className="space-y-3">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome da lista
                </label>
                <input 
                    type="text"
                    placeholder="Digite o nome da lista"
                    value={input}
                    onChange={(e) => setInput(e.target.value)} //captura digitação e aplica o valor
                     onKeyUp={(e) => {
                                            if (e.key === 'Enter') criarListas()
                                            if (e.key === 'Escape') setShowBar(false)
                                        }}
                    className="w-full px-3 py-2 bg-black-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </div>
                             
            <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors" onClick={criarListas}>
                    Adicionar
                </button>
                <button 
                    onClick={() => {setShowBar(false); setInput(''); setErrorMessage(''); setSuccessMessage('')}}
                    className="px-4 py-2 bg-gray-900/60 hover:bg-gray-900/90 text-gray-300 rounded-lg font-medium transition-colors"
                >
                    Cancelar
                </button>
            </div>
             {successMessage && <SuccessMessage message={successMessage} />} 
              {errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
    </div>
    
)}



    
      {lists.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                    <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                    <p className="text-sm">Nenhuma lista criada ainda</p>
                </div>
            ) : (
                <div className="p-2">
                    {lists.map(lista => (
                        <div key={lista.id} className="mb-2 p-3 bg-black hover:bg-gray-900/50 transition-colors " onClick={() => selectList(lista)}>
                            {editMode && idEdit === lista.id ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={inputEdit}
                                        onChange={(e) => setInputEdit(e.target.value)}
                                        onKeyUp={(e) => {
                                            if (e.key === 'Enter') editLista()
                                            if (e.key === 'Escape') fecharEdit()
                                        }}
                                        className="flex-1 px-2 py-1 bg-black-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        autoFocus
                                    />
                                    <button
                                        onClick={editLista}
                                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm transition-colors"
                                        title="Salvar"
                                    >
                                        ✓
                                    </button>
                                    <button
                                        onClick={fecharEdit}
                                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors"
                                        title="Cancelar"
                                    >
                                        X
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between"  onClick={() => selectList(lista)}>
                                    <button
                                    
                                        className="text-white font-medium hover:text-indigo-300 transition-colors"
                                >
                                    {lista.name}
                                    </button>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => abrirEdit(lista.id, lista.name)}
                                            className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                                            title="Editar lista"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => openModal(lista.id)}
                                            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                                            title="Deletar lista"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
        {deleteModal && (
             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-black-800 rounded-lg p-6 max-w-sm mx-4 border border-gray-600">
                        <h3 className="text-white text-lg font-semibold mb-4">Confirmar exclusão</h3>
                        <p className="text-gray-300 mb-6">
                            Tem certeza que deseja deletar esta lista?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={deletarLista}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Deletar
                            </button>
                            <button
                                onClick={closeModal}
                                className="flex-1 bg-gray-900/50 hover:bg-gray-800/50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
        )}
        
    </div>
)}
             
            


            <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                </div>
            </div>
            <div className="p-4 border-t border-black">
                <div className="text-xs text-gray-400 text-center">
                    Desenvolvido por whoisleoo
                </div>
            </div>
        </div>
    )
}

export default SideBar