const { ipcRenderer } = require('electron')

ipcRenderer.on('got-message-reply', (event, arg) => {
   let message = JSON.parse(arg);

   console.log('messages GOT from server ' + arg)
   //change form to server open
   let tab = document.getElementById('tab1').querySelector('.server-form');
   //let tab2 = document.getElementById('tab2').querySelector('.user-panel');

   let div = document.createElement('div');
   div.innerHTML = `> (${message.date}) ${message.user}: ${message.message}`;
   tab.querySelector('#server-console').append(div);
   //tab2.querySelector('#user-chat').append(div);
})