const { ipcRenderer } = require('electron')

document.addEventListener('click', (e) => {
   if(e.target.id != 'close-server') return;
   ipcRenderer.send('close-server')
})

ipcRenderer.on('close-server-reply', (event, arg) => {
   let tab = document.getElementById('tab1').querySelector('.server-form');
   let fs = require('fs');
   fs.readFile('./markup/create-server-form.html', function(err, data) {
      if (err) console.log(err);
      tab.innerHTML = data.toString()
      require('dns').lookup(require('os').hostname(), function (err, add, fam) {
         document.getElementById('ip').value = add;
      })
   });
});