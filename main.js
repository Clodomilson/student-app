const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let apiServer;

// Função para criar a janela principal
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'assets', 'icon.png'), // Adicione um ícone se desejar
        show: false,
        titleBarStyle: 'default'
    });

    // Carregar a página de login
    mainWindow.loadFile(path.join(__dirname, 'renderer', 'login.html'));

    // Mostrar a janela quando estiver pronta
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Evento para quando a janela for fechada
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Em desenvolvimento, abrir DevTools
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }
}

// Função para iniciar o servidor da API
function startApiServer() {
    console.log('Iniciando servidor da API...');
    
    apiServer = spawn('node', [path.join(__dirname, 'api', 'server.js')], {
        stdio: 'inherit',
        cwd: __dirname
    });

    apiServer.on('error', (error) => {
        console.error('Erro ao iniciar o servidor da API:', error);
    });

    apiServer.on('close', (code) => {
        console.log(`Servidor da API encerrado com código: ${code}`);
    });
}

// Função para parar o servidor da API
function stopApiServer() {
    if (apiServer) {
        console.log('Parando servidor da API...');
        apiServer.kill();
        apiServer = null;
    }
}

// Quando o Electron estiver pronto
app.whenReady().then(() => {
    // Iniciar o servidor da API
    startApiServer();
    
    // Aguardar um pouco para o servidor iniciar
    setTimeout(() => {
        createWindow();
    }, 2000);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quando todas as janelas forem fechadas
app.on('window-all-closed', () => {
    stopApiServer();
    
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Quando o app for encerrado
app.on('before-quit', () => {
    stopApiServer();
});

// Handler para IPC (comunicação entre renderer e main process)
ipcMain.handle('app-version', () => {
    return app.getVersion();
});

ipcMain.handle('minimize-window', () => {
    if (mainWindow) {
        mainWindow.minimize();
    }
});

ipcMain.handle('maximize-window', () => {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    }
});

ipcMain.handle('close-window', () => {
    if (mainWindow) {
        mainWindow.close();
    }
});

// Tratar links externos
app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (event, navigationUrl) => {
        event.preventDefault();
        require('electron').shell.openExternal(navigationUrl);
    });
});

// Log de debug
console.log('Student App iniciado');
console.log('Versão do Electron:', process.versions.electron);
console.log('Versão do Node:', process.versions.node);
