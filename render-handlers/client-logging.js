const { ipcRenderer } = require('electron')

ipcRenderer.on('new-message-reply', (event, arg) => {
   let message = JSON.parse(arg);
   //change form to server open
   let tab = document.getElementById('tab2').querySelector('#user-chat');

   let userMessage = document.createElement('div');
   userMessage.className = 'user-message';
   if (message.self) userMessage.classList.add('self-message');

   let username;

   if (document.getElementById('user-chat').lastElementChild) {
      if (document.getElementById('user-chat').lastElementChild.classList.contains('self-message')) username = `<div class="baloon-user" style="font-weight: bold; padding-left: 10px"></div>`
      else username = `<div class="baloon-user" style="font-weight: bold; padding-left: 10px">${message.user}</div>`
   } else username = `<div class="baloon-user" style="font-weight: bold; padding-left: 10px">${message.user}</div>`

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
   tab.append(userMessage);
   tab.scrollTop = tab.scrollHeight;
})