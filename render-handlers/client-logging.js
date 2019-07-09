const { ipcRenderer } = require('electron')

ipcRenderer.on('new-message-reply', (event, arg) => {
   console.log('client logging handler')
   //change form to server open
   let tab = document.getElementById('tab2').querySelector('#user-chat');
   //let tab2 = document.getElementById('tab2').querySelector('.user-panel');
   console.log(tab)
   let div = document.createElement('div');
   div.innerHTML = arg;
   tab.append(div);
   //tab2.querySelector('#user-chat').append(div);
})