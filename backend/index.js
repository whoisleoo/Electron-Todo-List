import { app, BrowserWindow} from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const macDetector = process.platform == 'darwin';
const devDetector = process.env.NODE_ENV !== 'development';
let backend;

function startBackend(){
    backend = spawn('node', ['../backend/server.js'], {
        stdio: 'inherit',
        shell: true
    })
    console.log(`=============== PAINEL BACKEND BERNARDO ================
     ATENÇÃO BACKEND BERNARDO ATIVADO ⚠️⚠️⚠️⚠️⚠️⚠️⚠️   `);
}

function createMainWindow(){
    const win = new BrowserWindow({ //especificações da janela
        title: 'Lista Incrivel',
        width: devDetector ? 900 : 600, //se n tive no modo dev roda a janela maior
        height: 1200
    })

    if(devDetector){
        win.webContents.openDevTools();
    }

    win.loadURL('http://localhost:5173/'); // ip do front

    win.webContents.on('did-fail-load', () => {
        win.loadFile(path.join(__dirname, '../frontend/src/pages/fallback.html')) // caso n de load no vite usa essa pagina de fallback de erro
    })
}

app.whenReady().then(() =>{
    startBackend();
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0){
            createMainWindow();
        } 
    })
})


app.on('window-all-closed', () =>{ //ver se n é mac
    if(!macDetector){
        app.quit();
    }
})