(function () {
   let tab = document.getElementById('tab2').querySelector('.client-form');
   let fs = require('fs');
   fs.readFile('./markup/client-connect-form.html', function (err, data) {
      if (err) console.log(err);
      tab.innerHTML = data.toString()
   });
})();

(function () {
   let tab = document.getElementById('tab1').querySelector('.server-form');
   let fs = require('fs');
   fs.readFile('./markup/create-server-form.html', function (err, data) {
      if (err) console.log(err);
      tab.innerHTML = data.toString()

      require('dns').lookup(require('os').hostname(), {family: 4, all: true}, (err, add, fam) => {
         if (err) console.log(err);
         let ipSelect = document.getElementById('ip-select')
         if(!add.length || !add[0].address) add = [{address: '127.0.0.1'}];
         add.forEach((val, i) => {
            let option = new Option(val.address);
            ipSelect.insertAdjacentElement('afterbegin', option);
         })
         ipSelect.selectedIndex = 0;
      })
   });
})();