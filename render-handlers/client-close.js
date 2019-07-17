const { ipcRenderer } = require('electron')

document.addEventListener('click', (e) => {
   if (e.target.id != 'close-client') return;
   ipcRenderer.send('close-client')
})

ipcRenderer.on('close-client-reply', (event, arg) => {
   let tab = document.getElementById('tab2').querySelector('.client-form');
   let fs = require('fs');
   fs.readFile('./markup/client-connect-form.html', function(err, data) {
      if (err) console.log(err);
      tab.innerHTML = data.toString()
   });
})