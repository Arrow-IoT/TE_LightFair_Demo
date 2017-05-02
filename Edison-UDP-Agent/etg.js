/*
 * etg.js
 */
/* jslint node:true */
/* jshint unused:true */

function etg(pwmPin, controlPin) {
  var m = require('mraa');
  this.p = new m.Pwm(pwmPin);
  this.p.enable(true);
  this.p.period_us(1000); // 100us
  this.p.pulsewidth_us(0); // 100us
  
  this.c = new m.Gpio(controlPin);
  this.c.dir(m.DIR_OUT);
}

etg.prototype.enable = function(val) {
  if (val === 'true') {
    this.c.write(1);
  } else {
    this.c.write(0);    
  }
};

etg.prototype.disable = function() {
  this.c.write(0);
};

etg.prototype.write = function(value) {
  console.log("Setting brightness to " + value);
  this.p.pulsewidth_us(value * 10);
};

module.exports = etg;