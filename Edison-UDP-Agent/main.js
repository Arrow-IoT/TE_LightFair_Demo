/*
 * TE LightFair 
 */

/* spec jslint and jshint lines for desired JavaScript linting */
/* see http://www.jslint.com/help.html and http://jshint.com/docs */
/* jslint node:true */
/* jshint unused:true */

"use strict" ;

var D_ADC = require("./dadc");
var TE = require("./te-i2c");
var ETG = require("./etg");
var dgram = require('dgram');
var UDP_client = require('./udp');

var dadc1 = new D_ADC(0, 1);
var dadc2 = new D_ADC(2, 3);
var etg = new ETG(3, 2); // PWM pins: 3, 5, 6, 9
var te = new TE();
var udp = new UDP_client();

var server = dgram.createSocket('udp4');

var UDP_PORT = 44001;
var UDP_HOST = '0.0.0.0';

server.on('error', function (err) {
  console.log('server error:' + err.stack);
  server.close();
});

server.on('message', function (msg, rinfo) {
  console.log('server got: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port);
  var jsonMsg = JSON.parse(msg);
  var jsonPayload = JSON.parse(jsonMsg.payload);
  switch (jsonMsg.command) {
    case 'enable-etg':
      etg.enable(jsonPayload.value);
      break;
    case 'set-pwm':
      var brightness = parseFloat(jsonPayload.value);
      etg.write(brightness);
      break;
    case 'default':
      break;
  }
  console.log("Command: " + jsonMsg.command);
  console.log("Payload: " + jsonMsg.payload);
});

server.on('listening', function() {
  var address = server.address();
  console.log('server listening ' + address.address + ':' + address.port);
});

server.bind(UDP_PORT, UDP_HOST);

function report () {
  if (te.update()) {
    var temp = te.temperature() / 1000.0;
    var hum = te.humidity() / 1000.0;
    var light = te.light();
    temp = temp * 9.0 / 5.0 + 32.0;
    udp.send('temperature', temp, 'f');
    udp.send('light', light, 'i');
    udp.send('humidity', hum, 'f');
  }
  var voltageADC = dadc1.read();
  var currentADC = dadc2.read();
  // 5.0 = Max ADC Voltage
  // 2<9 = 10-bit adc (10-1)
  // 8 = amp gain
  // 2200 = voltage divider into amp
  var voltage = voltageADC * 5.0 / (2<<9) / 8.0 * 2200.0;
  // 0.0025 = mOhm shunt resistor
  var current = currentADC * 5.0 / (2<<9) / 8.0 / 0.0025;
  udp.send('voltage', voltage, 'f');
  udp.send('current', current, 'f');
}

setInterval(report, 15000);