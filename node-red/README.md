Node Red TE Light Demo Dashboard
================================

Node red flow to read and write to an Arrow Connect device. Reads light, temperature, and humidity telemetery, and displays it on a dashboard:

![Dashboard example](https://github.com/Arrow-IoT/TE_LightFair_Demo/raw/master/Documentation/red-dashboard-gauges.png)

Also displays a control interface to turn a light on/off, or set the brightness.

![Control example](https://github.com/Arrow-IoT/TE_LightFair_Demo/raw/master/Documentation/red-dashboard-control.png)

## Before Deploying

Set your Arrow Connect API key, gateway HID, and device HID in the **SetGlobals** function toward the top of the flow.



## Additional Requirements

This flow requires the **node-red-dashboard** palette.

1. Click the hamburger menu in Node Red
2. Select **Manage Palettes**
3. Click the "Install" tab
4. Search for `node-red-dashboard` and click **install**.
