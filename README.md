PiezoBand - 05-833 Final Project 
============

This is my final project for 05-833 Applied Gadgets, Sensors and Activity Recognition in HCI. For it I created a wristband that recognizes various gestures done by the user, and controls the computer based on pre-defined shortcuts.

For the hardware, I used:	
    * Arduino Nano
 	* HC-05 Bluetooth Module
 	* 3 Piezo Sensors
 	* 3D Printed Wristband  

To recognize gestures, I trained a J48 algorithm in Weka, providing a Kappa value of roughly 0.89, with an average accuracy of 90%.

In order to start the program, connect the bluetooth device to the computer, then run

	npm install
	
	nodemon

If the serial port does not open, check that you have the correct serialport included within the socket-routes.js file.

Pictures are included in the gadget_images folder, and I will be uploading a video soon.

If you have any questions feel free to contact me.
