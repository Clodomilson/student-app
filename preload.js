const { contextBridge, ipcRenderer } = require('electron');

// Expor APIs seguras para o renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    // Informações do app
    getVersion: () => ipcRenderer.invoke('app-version'),
    
    // Controles da janela
    minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
    maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
    closeWindow: () => ipcRenderer.invoke('close-window'),
    
    // Utilitários
    platform: process.platform,
    
    // Navegação (se necessário)
    openExternal: (url) => {
        // Validar URL antes de abrir
        if (url.startsWith('http://') || url.startsWith('https://')) {
            require('electron').shell.openExternal(url);
        }
    }
});

// Log para debug
console.log('Preload script carregado');