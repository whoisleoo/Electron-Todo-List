import { useState } from 'react'



function SideBar() {

const [showBar, setShowBar ] = useState(false) 
   

    
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
    <div className={`p-4 bg-black border-b border-gray-700 transition-all duration-300 ease-in-out transform ${showBar ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div className="space-y-3">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome da lista
                </label>
                <input 
                    type="text"
                    placeholder="Digite o nome da lista"
                    className="w-full px-3 py-2 bg-black-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </div>
                             
            <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                    Adicionar
                </button>
                <button 
                    onClick={() => setShowBar(false)}
                    className="px-4 py-2 bg-gray-900/60 hover:bg-gray-900/90 text-gray-300 rounded-lg font-medium transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </div>
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