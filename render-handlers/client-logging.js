const { ipcRenderer } = require('electron')

ipcRenderer.on('new-message-reply', (event, arg) => {
   let message = JSON.parse(arg);
   //change form to server open
   let tab = document.getElementById('tab2').querySelector('#user-chat');
   //let tab2 = document.getElementById('tab2').querySelector('.user-panel');


   let userMessage = document.createElement('div');
   userMessage.className = 'user-message';
   if (message.self) userMessage.classList.add('self-message');

   console.log(document.getElementById('user-chat'));
   let username;

   if (document.getElementById('user-chat').lastElementChild) {
      if (document.getElementById('user-chat').lastElementChild.classList.contains('self-message')) username = `<div class="baloon-user" style="font-weight: bold; padding-left: 10px"></div>`
      else username = `<div class="baloon-user" style="font-weight: bold; padding-left: 10px">${message.user}</div>`
   } else username = `<div class="baloon-user" style="font-weight: bold; padding-left: 10px">${message.user}</div>`


   if (document.getElementById('user-chat').lastElementChild) {
      console.log(document.getElementById('user-chat').lastElementChild)
   }

   userMessage.innerHTML = `
   <div class="baloon-wrapper">
   ${username}
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