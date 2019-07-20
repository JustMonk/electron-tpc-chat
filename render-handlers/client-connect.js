const { ipcRenderer } = require('electron')

document.addEventListener('click', (e) => {
   if (e.target.id != 'client-connect') return;
   let port = +document.getElementById('connect-port').value;
   let ip = document.getElementById('connect-ip').value;
   let nickname = document.getElementById('connect-nickname').value;
   ipcRenderer.send('client-connect', { port: port, ip: ip, nickname: nickname })
})

ipcRenderer.on('client-connect-reply', (event, arg) => {
   //change form to server open
   let obj = JSON.parse(arg);
   let tab = document.getElementById('tab2').querySelector('.client-form');

   let fs = require('fs');
   fs.readFile('./markup/open-client-form.html', function (err, data) {
      if (err) console.log(err);
      tab.innerHTML = data.toString().replace('${SERVER}', obj.ip).replace('${USER}', obj.nickname);

      //add send on enter handler
      let input = document.getElementById('client-message');
      input.onfocus = messageInputFocus;
      input.onblur = messageInputBlur;

      function messageInputFocus(e) {
         e.target.addEventListener('keydown', messageSendOnKey);
      }

      function messageInputBlur(e) {
         e.target.removeEventListener('keydown', messageSendOnKey)
      }

      function messageSendOnKey(e) {
         if (e.key != 'Enter') return;
         let data = document.getElementById('client-message').value;
         ipcRenderer.send('send-message', data);
         document.getElementById('client-message').value = '';
      }
   });
})