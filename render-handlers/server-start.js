const { ipcRenderer } = require('electron')

const runServerBtn = document.getElementById('run-server')

document.addEventListener('click', (e) => {
   if (e.target.id != 'run-server') return;
   let port = +document.getElementById('port').value;
   let ipSelect = document.getElementById('ip-select');
   let ip = ipSelect.options[ipSelect.selectedIndex].text;

   ipcRenderer.send('run-server', {port: port, ip: ip})
})

ipcRenderer.on('run-server-reply', (event, arg) => {
   //change when server open
   let tab = document.getElementById('tab1').querySelector('.server-form');

   let fs = require('fs');
   fs.readFile('./markup/open-server-form.html', function(err, data) {
      if (err) console.log(err);
      tab.innerHTML = data.toString().replace('${IP}', arg.ip).replace('${PORT}', arg.port)
   });
})