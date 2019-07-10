const { app, BrowserWindow } = require('electron')

// Храните глобальную ссылку на объект окна, если вы этого не сделаете, окно будет
// автоматически закрываться, когда объект JavaScript собирает мусор.
let win

function createWindow() {
   // Создаём окно браузера.
   win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
         nodeIntegration: true
      }
   })

   // and load the index.html of the app.
   win.loadFile('index.html')

   // Отображаем средства разработчика.
   win.webContents.openDevTools()

   // Будет вызвано, когда окно будет закрыто.
   win.on('closed', () => {
      // Разбирает объект окна, обычно вы можете хранить окна     
      // в массиве, если ваше приложение поддерживает несколько окон в это время,
      // тогда вы должны удалить соответствующий элемент.
      win = null
   })
}

// Этот метод будет вызываться, когда Electron закончит 
// инициализацию и готов к созданию окон браузера.
// Некоторые API могут использоваться только после возникновения этого события.
app.on('ready', createWindow)

// Выходим, когда все окна будут закрыты.
app.on('window-all-closed', () => {
   // Для приложений и строки меню в macOS является обычным делом оставаться
   // активными до тех пор, пока пользователь не выйдет окончательно используя Cmd + Q
   if (process.platform !== 'darwin') {
      app.quit()
   }
})

app.on('activate', () => {
   // На MacOS обычно пересоздают окно в приложении,
   // после того, как на иконку в доке нажали и других открытых окон нету.
   if (win === null) {
      createWindow()
   }
})

// В этом файле вы можете включить код другого основного процесса 
// вашего приложения. Можно также поместить их в отдельные файлы и применить к ним require.
const { ipcMain } = require('electron')

var server = {};
var client = {};

function outerSend(data) {
   console.log('soket run');
   const { ipcRenderer } = require('electron')
   ipcRenderer.send('got-message', data)
}

ipcMain.on('run-server', (event, arg) => {
   const ip = arg.ip;
   const port = arg.port;

   var net = require('net');

   let clients = {
      users: [],
      get count() {
         return this.users.length;
      }
   };


   function sendMessage(user, data) {
      //WRITE ONLY JSON.STRING

      let hours = `${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}`;
      let minutes = `${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`;

      let messageObj = { user: user, message: data.toString().trim(), date: `${hours}:${minutes}` };

      clients.users.forEach((conn) => {
         if (user != conn.nickname) {
            conn.write(JSON.stringify(messageObj));
         }
         else {
            let selfMessage = Object.create(messageObj);
            selfMessage.self = true;
            conn.write(JSON.stringify(messageObj));
         }
      });

      //for server console
      event.sender.send('got-message-reply', JSON.stringify(messageObj));
   }

   var server = net.createServer(function (conn) {
      console.log(`connected ${conn.remoteAddress} : ${conn.remotePort}`);
      //add client to registry
      clients.users.push(conn);
      conn.id = clients.count - 1;

      conn.on('data', function (data) {
         if (!conn.nickname) conn.nickname = data.toString().trim();
         sendMessage(conn.nickname, data);
      });

      conn.on('close', function () {
         clients.users.splice(conn.id, 1);
         console.log(`client ${conn.nickname} closed connection`);
      });

      conn.on("error", (err) => {
         //just hide
      });

   })

   server.on('error', function (err) {
      if (err.code == 'EADDRINUSE') {
         console.warn('Address in use, retrying...');
         setTimeout(() => {
            server.close();
         }, 1000);
      }
      else {
         console.error(err);
      }
   });

   server.on('listening', function () {
      console.log(`listening on ${ip} : ${port}`);
      //send feedback when server running
      event.sender.send('run-server-reply', { 'ip': ip, 'port': port });
   });
   server.listen(port, ip);
})

ipcMain.on('close-server', (event, arg) => {
   console.log('closed signal')
   server.close((err, data) => {
      if (err) console.log(err);
      event.sender.send('close-server-reply', {});
   });
});

//CLIENT BLOCK
ipcMain.on('client-connect', (event, arg) => {
   console.log('in connect')
   //client = require('./main-process/connect-client')

   var net = require('net');
   client = new net.Socket();
   client.setEncoding('utf8');

   // show message from server

   client.on('close', function () {
      console.log('connection is closed');
   });

   const ip = arg.ip;
   const port = arg.port;
   const nickname = arg.nickname;
   client.on('data', function (data) {
      console.log('reply on client')
      console.dir(data);
      event.sender.send('new-message-reply', data);
   });
   // connect to server
   client.connect(port, ip, function () {
      console.log('connected to server')
      event.sender.send('client-connect-reply', JSON.stringify({ip: ip, nickname: nickname}));
      client.write(nickname);
   });
});

ipcMain.on('got-message', (event, arg) => {
   event.sender.send('got-message-reply', arg);
});

ipcMain.on('send-message', (event, arg) => {
   client.write(arg);
})