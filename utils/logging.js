const { BrowserWindow, ipcMain } = require('electron')

class Logger {
    log = [];
    mainwindow = null;
    constructor(mainwindow) {
        this.log = [];
        this.mainwindow = mainwindow;

        ipcMain.on('getLog', (event, arg) => {
            event.reply('getLog', this.log);
        });
    }

    info(message) {
        let json = {
            type: 'info',
            message: message
        }
        this.log.push(json);
        this.sendToIpcRenderer(json);
        console.log(message);
    }

    error(message) {
        let json = {
            type: 'error',
            message: message
        }
        this.log.push(json);
        console.error(message);
    }

    getLog() {
        return this.log;
    }

    clearLog() {
        this.log = [];
    }

    sendToIpcRenderer(message) {
        this.mainwindow.webContents.send('log', message);
    }
}

module.exports = Logger;