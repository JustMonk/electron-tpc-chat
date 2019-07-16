const { ipcRenderer } = require('electron')

ipcRenderer.on('new-message-reply', (event, arg) => {
   let message = JSON.parse(arg);
   console.log('---message---')
   console.dir(message)
   //change form to server open
   let tab = document.getElementById('tab2').querySelector('#user-chat');
   //let tab2 = document.getElementById('tab2').querySelector('.user-panel');
   console.log(tab)


   let userMessage = document.createElement('div');
   userMessage.className = 'user-message';
   if (message.self) userMessage.classList.add('self-message');

   userMessage.innerHTML = `
   <div class="baloon-wrapper">
   <div class="baloon-user" style="font-weight: bold; padding-left: 10px">${message.user}</div>
   <div class="baloon">
   <div class="baloon-text">
   ${message.message}
   <div class="baloon-date" style="text-align: right; color: #cacaca; font-size: 11px;">${message.date}</div>
   </div>
   </div>
   </div>
   `;
   //div.innerHTML = `(${message.date}) ${message.user}: ${message.message}`;
   tab.append(userMessage);
   //tab2.querySelector('#user-chat').append(div);
})