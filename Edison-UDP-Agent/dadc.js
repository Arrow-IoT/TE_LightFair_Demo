/* jslint node:true */
/* jshint unused:true */

function dadc(pin1, pin2) {
  var mraa = require("mraa");
  
  this.adcH = new mraa.Aio(pin1);
  this.adcL = new mraa.Aio(pin2);
  
  this.adcH.ioPin = pin1;
  this.adcL.ioBit = 10; // 16-bit resolution
  this.adcH.ioPin = pin2;
  this.adcL.ioBit = 10;
}

dadc.prototype.read = function() {
  
  return (this.adcH.read() - this.adcL.read());
};

module.exports = dadc;