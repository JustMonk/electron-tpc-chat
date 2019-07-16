const { ipcRenderer } = require('electron')

document.addEventListener('click', (e) => {
   if (!document.getElementById('send-message') || !document.getElementById('send-message').contains(e.target)) return;
   let data = document.getElementById('client-message').value;
   ipcRenderer.send('send-message', data);
   document.getElementById('client-message').value = '';
})


/*ipcRenderer.on('send-message-reply', (event, arg) => {
   let tab = document.getElementById('tab1').querySelector('.server-form');
   let fs = require('fs');
   fs.readFile('./markup/create-server-form.html', function(err, data) {
      if (err) console.log(err);
      tab.innerHTML = data.toString()
      require('dns').lookup(require('os').hostname(), function (err, add, fam) {
         document.getElementById('ip').value = add;
      })
   });
});*/