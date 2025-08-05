import { app, BrowserWindow} from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createMainWindow(){
    const win = new BrowserWindow({
        title: 'Lista Incrivel',
        width: 600,
        height: 1200
    })

    win.loadURL('http://localhost:5173/');

    win.webContents.on('did-fail-load', () => {
        win.loadFile(path.join(__dirname, '../frontend/src/pages/fallback.html'))
    })
}

app.whenReady().then(() =>{
    createMainWindow();
})