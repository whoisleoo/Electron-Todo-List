import { useEffect, useState } from 'react'
import SideBar from '../components/sideBar'
import api from '../services/api.js'
import { useList } from '../contexts/listContext';
import { useNavigate } from 'react-router-dom';



function ListPage() {
    const { selectedList, todos, setTodos, loading, setLoading } = useList() // dados do context
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [input, setInput] = useState('')
    const [editInput, setEditInput] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [user, setUser] = useState(null);

// ================== GET DOS TODO ===================================
    const buscarTodo = async function (){
        if(!selectedList) return
    try{
        const token = localStorage.getItem('token')
        const response = await api.get(`/list/${selectedList.id}/todo`, 
            { headers: { Authorization: `Bearer ${token}`}
        })

        setTodos(response.data.todos)
    }catch(error){
        setErrorMessage(`Não foi possivel buscar listas devido a ${error}`)
    }finally{
        setLoading(false)
    }
}

useEffect(() => {
    if(selectedList) { 
        setErrorMessage('') 
        setInput('')  
        buscarTodo() 
    }
}, [selectedList])
    
// ================== post DOS TODO ===================================

const criarTodo = async function (){
    if(!selectedList) return

    if(!input.trim()){ //ve se n ta vazio o input
        setErrorMessage("Campo vazio")
        return 
    }

    if(input.length > 75){
        setErrorMessage("Max de caracteres: 75")
        return
    }

    setErrorMessage('')

    try{
        const token = localStorage.getItem('token')
        const response = await api.post(`/list/${selectedList.id}/todo`, 
            { text: input.trim() }, 
            { headers: { Authorization: `Bearer ${token}`}
        })

        setTodos([response.data.todo, ...todos]) 
        setSuccessMessage(`Tarefa ${input} adicionada com sucesso!`)
        setInput('')
    }catch(error){
        const message = error.response?.data?.error
        setErrorMessage(message)
    }
}

// ==================PUT DO TODO ===================

    const toggleCompleted = async function (todoId, currentStatus){
        try{
            const token = localStorage.getItem('token')
            await api.put(`/list/${selectedList.id}/todo/${todoId}`,
                { completed: !currentStatus },
                {headers: { Authorization: `Bearer ${token}`}}
            )

            setTodos(todos.map(todo =>
                todo.id === todoId ? { ...todo, completed: !currentStatus} : todo
            ))
        }catch(error){
            setErrorMessage(`Erro ao alterar status: ${error}`)
        }
    }

// ==================DELETE DO TODO ===================

const deletarTodo = async function (todoId){
 

    setErrorMessage('')
    setSuccessMessage('')

    try{
        const token = localStorage.getItem('token')
        await api.delete(`/list/${selectedList.id}/todo/${todoId}`, 
            { headers: { Authorization: `Bearer ${token}`}
        })

        setTodos(todos.filter(todo => todo.id !== todoId))
    }catch(error){
        const message = error.response?.data?.error
        setErrorMessage(message)
    }
}


// ======================================================
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/');
    }

    useEffect(() =>{
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token')
        if(userData && token){
            setUser(JSON.parse(userData))
        } else{
            navigate('/')
        }
    }, [navigate])

    if(!user){
        return (
            <div>
                <h1>se vc ta vendo isso deu erro no codigo</h1>
            </div>
        )
    }



   return (
        <div className="flex h-screen bg-black text-white">
            <SideBar />

            <div className="flex-1 flex flex-col">
                <div className="flex justify-end items-center p-4 bg-black border-b border-gray-700">
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-900/60 transition-colors"
                        >
                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm">{user.username}</span>
                            <svg
                                className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </button>

                        {showUserMenu && (
                            <div className="absolute right-0 top-full mt-7 w-48 bg-black rounded-lg shadow-xl border border-gray-700 z-50">
                                <div className="p-3 border-b border-gray-700">
                                    <div className="text-sm font-medium">{user.username}</div>
                                    <div className="text-xs text-gray-400">{user.email}</div>
                                </div>
                                <div className="py-2">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                                    >
                                        Logout
                                    </button>
                                    <button
                                        onClick={() => window.close()}
                                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                                    >
                                        Sair do aplicativo
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 p-6">
                    
                    {!selectedList ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <svg className="w-16 h-16 mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </svg>
                            <h2 className="text-xl font-semibold mb-2">Selecione uma lista</h2>
                            <p className="text-sm">Clique em uma lista na barra lateral para ver suas tarefas</p>
                        </div>
                    ) : loading ? (
   <div className="flex flex-col items-center justify-center h-full text-gray-400">
    <div className="relative mb-4">
        <div className="w-12 h-12 border-4 border-gray-700 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-gray-700 border-b-indigo-400 rounded-full animate-spin" 
             style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
    </div>
    <p className="text-white text-sm animate-pulse">Carregando tarefas...</p>
</div>
                    ) : todos.length === 0 ? (
                        
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <svg className="w-16 h-16 mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <h2 className="text-xl font-semibold mb-2">Nenhuma tarefa criada ainda</h2>
                            <p className="text-sm mb-4">Adicione a primeira tarefa da lista "{selectedList.name}"</p>
                             <div className=" bg-black ">
                                 <div className="flex gap-2">
                                 <input
                                    type="text"
                                    placeholder="Digite sua tarefa"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                  onKeyUp={(e) => {
                      if (e.key === 'Enter') criarTodo()
                      if (e.key === 'Escape') setShowForm(false)
                  }}
                  className="flex-1 px-3 py-2 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none " autoFocus/>
              <button
                  onClick={criarTodo}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                  Adicionar
              </button>
          </div>
          {errorMessage && <div className="text-red-400 text-sm mt-2">{errorMessage}</div>}
      </div>
                           
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-white">{selectedList.name}</h1>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Total de larefas: {todos.length}
                                    </p>
                                </div>


                             <div className=" bg-black ">
                                 <div className="flex gap-2">
                                 <input
                                    type="text"
                                    placeholder="Digite sua tarefa"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                  onKeyUp={(e) => {
                      if (e.key === 'Enter') criarTodo()
                      if (e.key === 'Escape') setShowForm(false)
                  }}
                  className="flex-1 px-3 py-2 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2
                     focus:ring-indigo-500" autoFocus/>
              <button
                  onClick={criarTodo}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                  Adicionar
              </button>
          </div>
          {errorMessage && <div className="text-red-400 text-sm mt-2">{errorMessage}</div>}
      </div>
                            </div>


                        

                        

                            <div className="space-y-3">
                                {todos.map(todo => (
                                    <div key={todo.id} className="p-4 bg-black border-gray-700 border rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span
                                            onClick={() => toggleCompleted(todo.id, todo.completed)}
                                            className={`flex-1 cursor-pointer hover:text-gray-400 transition-colors ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                                            {todo.text}
                                            </span>
                                            <div className="flex gap-2">
                                                <span className={`${todo.completed ? 'py-1 px-2 text-sm text-gray-400 transition-colors' : 'py-1 px-2 text-sm text-white transition-colors'}`}>{todo.completed ? 'Concluido' : 'Em andamento'}</span>
                                               
                                                <button onClick={() => deletarTodo(todo.id)} className="p-1 text-gray-400 hover:text-red-400 transition-colors" title="Excluir">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                                    </svg>
                                        </button>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
    )}
    </div>
</div>
</div>
    )
}

export default ListPage