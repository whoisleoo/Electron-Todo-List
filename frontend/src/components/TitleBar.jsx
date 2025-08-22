import { useState, useEffect } from 'react'

function CustomTitleBar() {
    const [isMaximized, setIsMaximized] = useState(false)

    useEffect(() => {
        if (window.windowControls) {
            window.windowControls.isMaximized().then(setIsMaximized)
        }
    }, [])

    const minimizeWindow = () => {
        if (window.windowControls) {
            window.windowControls.minimize()
        }
    }

    const maximizeWindow = async () => {
        if (window.windowControls) {
            window.windowControls.maximize()
            setTimeout(async () => {
                const maximized = await window.windowControls.isMaximized()
                setIsMaximized(maximized)
            }, 100)
        }
    }

    const closeWindow = () => {
        if (window.windowControls) {
            window.windowControls.close()
        }
    }

    return (
        <div className="flex items-center justify-between bg-black h-10 select-none" style={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999}}>
            <div className="flex items-center px-4 space-x-3">
                <img 
                    src="/icon.png" 
                    alt="Logo" 
                    className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-white text-sm font-semibold">Task Hub</span>
            </div>

            <div className="flex-1 h-full" style={{ WebkitAppRegion: 'drag' }}></div>

            <div className="flex">
                <button
                    onClick={minimizeWindow}
                    className="w-12 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors group"
                    style={{ WebkitAppRegion: 'no-drag' }}
                >
                    <div className="w-3 h-0.5 bg-gray-400 group-hover:bg-white transition-colors"></div>
                </button>

                <button
                    onClick={maximizeWindow}
                    className="w-12 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors group"
                    style={{ WebkitAppRegion: 'no-drag' }}
                >
                    {isMaximized ? (
                        <div className="relative">
                            <div className="w-2.5 h-2.5 border border-gray-400 group-hover:border-white transition-colors absolute top-0 left-0.5"></div>
                            <div className="w-2.5 h-2.5 border border-gray-400 group-hover:border-white transition-colors bg-black relative top-0.5 right-0.5"></div>
                        </div>
                    ) : (
                        <div className="w-3 h-3 border border-gray-400 group-hover:border-white transition-colors"></div>
                    )}
                </button>

                <button
                    onClick={closeWindow}
                    className="w-12 h-10 flex items-center justify-center hover:bg-indigo-700 transition-colors group"
                    style={{ WebkitAppRegion: 'no-drag' }}
                >
                    <div className="relative w-3 h-3">
                        <div className="absolute w-3 h-0.5 bg-gray-400 group-hover:bg-white transition-colors transform rotate-45 top-1/2 left-0 -translate-y-1/2"></div>
                        <div className="absolute w-3 h-0.5 bg-gray-400 group-hover:bg-white transition-colors transform -rotate-45 top-1/2 left-0 -translate-y-1/2"></div>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default CustomTitleBar
