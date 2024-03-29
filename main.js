const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const { getLogger, init } = require('./utils/globalVars.js')
const checkAdb = require('./checks/checkadb.js')
const checkDevices = require('./checks/checkDevices.js')


function getFrontEndFile(page) {
    return path.join(__dirname, 'frontend', page, 'page.html')
}

async function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        }
    })

    win.loadFile(getFrontEndFile('loading'))

    await init(win);

    await checkAdb().then(() => {
        checkDevices();
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
