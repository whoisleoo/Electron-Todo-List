import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const macDetector = process.platform == 'darwin';
const devDetector = process.env.NODE_ENV !== 'development';
let mainWindow;
let backend;

function startBackend(){
    try{
        backend = spawn('node', ['../backend/server.js'], {
            stdio: 'inherit',
            shell: true
        })
        console.log("Iniciando backend...")
    }catch(error){
        console.log(`Não deu pra inicializar o bernardo devido a ${error}`)
    }
}

function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'Task Hub',
        width: devDetector ? 700 : 700,
        height: 750,
        
        icon: path.join(__dirname, '../frontend/src/assets/icons/icon.png'),
        frame: false,
        backgroundColor: '#000000',
        roundedCorners: true,
        autoHideMenuBar: true,
        titleBarStyle: macDetector ? 'hiddenInset' : 'default',
        show: false,

        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, './src/utils/preload.js')
        }
    })

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    if(devDetector){
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadURL('http://localhost:5173/');

    mainWindow.webContents.on('did-fail-load', () => {
        mainWindow.loadFile(path.join(__dirname, '../frontend/src/pages/fallback.html'))
    })
}

app.whenReady().then(() => {
    startBackend();
    createMainWindow();

    // HANDLERS IPC - SEM BIBLIOTECAS EXTERNAS
    ipcMain.on('window-minimize', () => {
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.minimize()
        }
    })

    ipcMain.on('window-maximize', () => {
        if (mainWindow && !mainWindow.isDestroyed()) {
            if (mainWindow.isMaximized()) {
                mainWindow.unmaximize()
            } else {
                mainWindow.maximize()
            }
        }
    })

    ipcMain.on('window-close', () => {
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.close()
        }
    })

    ipcMain.handle('window-is-maximized', () => {
        return mainWindow && !mainWindow.isDestroyed() ? mainWindow.isMaximized() : false
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0){
            createMainWindow();
        } 
    })
})

app.on('window-all-closed', () => {
    if(!macDetector){
        app.quit();
    }
})