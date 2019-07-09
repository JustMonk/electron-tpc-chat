const { ipcRenderer } = require('electron')

document.addEventListener('click', (e) => {
   if (e.target.id != 'client-connect') return;
   console.log('click on connect')
   let port = +document.getElementById('connect-port').value;
   let ip = document.getElementById('connect-ip').value;
   let nickname = document.getElementById('connect-nickname').value;
   ipcRenderer.send('client-connect', {port: port, ip: ip, nickname: nickname})
})

ipcRenderer.on('client-connect-reply', (event, arg) => {
   //change form to server open
   let tab = document.getElementById('tab2').querySelector('.client-form');

   let fs = require('fs');
   fs.readFile('./markup/open-client-form.html', function(err, data) {
      if (err) console.log(err);
      tab.innerHTML = data.toString();
   });
})