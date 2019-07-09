var net = require('net');
var client = new net.Socket();
client.setEncoding('utf8');

// show message from server

client.on('close', function () {
   console.log('connection is closed');
});

module.exports = client