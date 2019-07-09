const { ipcRenderer } = require('electron')

ipcRenderer.on('get-message-reply', (event, arg) => {
   //change form to server open
   let serverConsole = document.getElementById('server-console')

   let div = document.createElement('div');
   div.innerHTML = arg
   serverConsole.append(div)
})