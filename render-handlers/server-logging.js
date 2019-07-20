const { ipcRenderer } = require('electron')

ipcRenderer.on('got-message-reply', (event, arg) => {
   let message = JSON.parse(arg);

   //change form when server open
   let tab = document.getElementById('tab1').querySelector('.server-form');

   let div = document.createElement('div');
   div.innerHTML = `> (${message.date}) ${message.user}: ${message.message}`;
   tab.querySelector('#server-console').append(div);
})