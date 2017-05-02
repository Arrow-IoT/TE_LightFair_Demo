/* jslint node:true */
/* jshint unused:false */

var dgram = require('dgram');


var UDP_CLIENT_PORT = 44000; // 44000?
var UDP_CLIENT_HOST = '127.0.0.1';

var UDP_DEST_PORT = 44001;
var UDP_DEST_HOST = '0.0.0.0';
  
var client = dgram.createSocket('udp4');

function udpOut() {
  client.on("message", function(msg, rinfo) {
    console.log('the packet came back: ' + msg);
  });
}

udpOut.prototype.send = function(name, value, type) {
  const msgBuf = new Buffer("{\"" + type + "|" + name + "\":\"" + value + "\"}");
  client.send(msgBuf, 0, msgBuf.length, UDP_CLIENT_PORT, UDP_CLIENT_HOST);
};

module.exports = udpOut;