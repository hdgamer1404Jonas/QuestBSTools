const { ipcRenderer } = require('electron');

ipcRenderer.on('log', (event, arg) => {
    console.log(arg);

    let log = document.getElementById('log');

    let div = document.createElement('div');
    div.className = arg.type;
    div.innerHTML = arg.message;

    log.appendChild(div);

});