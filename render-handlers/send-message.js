const { ipcRenderer } = require('electron')

document.addEventListener('click', (e) => {
   if (!document.getElementById('send-message') || !document.getElementById('send-message').contains(e.target)) return;
   let data = document.getElementById('client-message').value;
   ipcRenderer.send('send-message', data);
   document.getElementById('client-message').value = '';
})