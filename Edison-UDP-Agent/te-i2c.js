/* jslint node:true */
/* jshint unused:true */

var TE_MULTISENSOR_I2C_ADDRESS = 0x2A;
var I2C_BUS = 6; // i2c-6, exposed on Edison Arduino board
// Baud rate 100kHz

var TE_REGISTER_TEMPERATURE_16 = 0x01;
var TE_REGISTER_HUMIDITY_16 = 0x03;
var TE_REGISTER_LIGHT_16 = 0x05;
var TE_REGISTER_START_SCAN = 0xC0;
  
var m = require("mraa");
var i2c = new m.I2c(I2C_BUS);

function teI2C() {
  i2c.address(TE_MULTISENSOR_I2C_ADDRESS);
  
  i2c.frequency(m.I2C_STD); // 100khz
  this.t = 0;
  this.h = 0;
  this.l = 0;
}

teI2C.prototype.update = function() {
  // Write 0x3F to the start scan register to initiate scan of all sensors:
  i2c.writeReg(TE_REGISTER_START_SCAN, 0x3F);
  
  // Read from 16-bit data registers and transpose bytes
  var tmp = i2c.readWordReg(TE_REGISTER_TEMPERATURE_16);
  this.t = ((tmp & 0xFF) << 8) | ((tmp & 0xFF00) >> 8);
  tmp = i2c.readWordReg(TE_REGISTER_HUMIDITY_16);
  this.h = ((tmp & 0xFF) << 8) | ((tmp & 0xFF00) >> 8);
  tmp = i2c.readWordReg(TE_REGISTER_LIGHT_16);
  this.l = ((tmp & 0xFF) << 8) | ((tmp & 0xFF00) >> 8);
  
  return true; //! Could be a callback
};

teI2C.prototype.humidity = function() {
  return this.h;
};

teI2C.prototype.temperature = function() {
  return this.t;
};

teI2C.prototype.light = function() {
  return this.l;
};

module.exports = teI2C;