import { useEffect, useState } from 'react'
import SideBar from '../components/sideBar'
import api from '../services/api.js'
import { useNavigate } from 'react-router-dom';



function ListPage() {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [user, setUser] = useState(null);


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
                <h1>se vc ta vendo isso deu cagada no codigo</h1>
            </div>
        )
    }



    return (
        <div className="flex h-screen bg-black text-white">
            <SideBar 
            />

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
                            <svg // FLECHINHA BONITA
                                className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} // roda flechinha quando retornar false
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
                                        onClick={() => {  window.close()
                                        }}
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
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <svg className="w-16 h-16 mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                        <h2 className="text-xl font-semibold mb-2">Nenhuma lista encontrada</h2>
                        <p className="text-sm">Crie uma nova lista na barra lateral</p>
                    </div>
                </div>
            </div>
            
    
        </div>
    )
}

export default ListPage