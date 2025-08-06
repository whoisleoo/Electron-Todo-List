import { useState } from 'react'



function SideBar() {


   

    
    return (
        <div className="w-80 bg-black border-r border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-4">Suas Listas</h2>
                
                <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                    Nova Lista
                </button>
            </div>


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