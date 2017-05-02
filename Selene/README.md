# Selene Config Files

## udp-forwarder.properties

* `address` and `deviceAddress` should be set to the localhost (127.0.0.1)
* `port` -- Port that the Selene engine listens on. Should be the same port the UDP client script writes out to.
* `devicePort` -- Selene engine's outgoing port. Should be the same port the UDP server listens on.

## TE MultiSensor Device Type

This script creates a custom device type to to send voltage, current, light, temperature, and humidity telemetry.

Use the Arrow Connect Portal to create the device type using this example:

![Arrow Connect Custom Device Type](https://github.com/Arrow-IoT/TE_LightFair_Demo/raw/master/Documentation/te-multisensor-ac-device-type.png)
