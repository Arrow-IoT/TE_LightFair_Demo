Intel® XDK IoT Edison UDP Agent Node.js
===========================================

See [LICENSE.md](LICENSE.md) for license terms and conditions.

For help getting started developing applications with the
Intel XDK, please start with
[the Intel XDK documentation](https://software.intel.com/en-us/xdk/docs).

See also, the
[mraa library documentation](https://iotdk.intel.com/docs/master/mraa/index.html)
for details regarding supported boards and the mraa library API and the
[upm library documentation](https://iotdk.intel.com/docs/master/upm/) for
information regarding the upm sensor and actuator library APIs.

App Overview
------------

This Node.js script executes the following actions:

* Monitor a TE MultiSensor over I2C -- reading light, temperature, and humidity values.
* Monitor differential ADC signals carrying voltage and current information.
* UDP Client
    * Every 15 seconds sends UDP packets carrying light, temperature, humidity, voltage, and current telemetry.
* UDP Server
    * On incoming message for `set-pwm` sets the duty cycle of a PWM pin
    * On incoming message for `enable-etg` sets or clears a digital I/O output

Important App Files
-------------------

* main.js -- Main application file. Main program loop and UDP server event listeners.
* dadc.js -- Differential ADC abstraction
* etg.js -- PWM and digital output to ETG light controller
* te-i2c.js -- I2C driver for the TE MultiSensor
* udp.js -- UDP client module
* package.json

Important Project Files
-----------------------

* README.md
* LICENSE.md
* \<project-name\>.xdk

Tested IoT Node.js Platforms
----------------------------

* [Intel® Edison Board for Arduino](http://intel.com/edison)
