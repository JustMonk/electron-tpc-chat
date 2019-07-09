var net = require('net');

let clients = {
   users: [],
   get count() {
      return this.users.length;
   }
};

function addMessage(user, data) {
   let hours = `${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}`;
   let minutes = `${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`;
   let message = `\x1b[32m[${hours}:${minutes}]\x1b[36m ${user}:\x1b[0m ${data.toString().trim()}`;

   clients.users.forEach((conn) => {
      if (user != conn.nickname) conn.write(message);
   });
   console.log(`\x1b[42m[SERVER]>> \x1b[0m${message}`);
}

var server = net.createServer(function (conn) {
   console.log(`connected ${conn.remoteAddress} : ${conn.remotePort}`);
   //add client to registry
   clients.users.push(conn);
   conn.id = clients.count - 1;

   conn.on('data', function (data) {
      if (!conn.nickname) conn.nickname = data.toString().trim();
      addMessage(conn.nickname, data);
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

module.exports = server