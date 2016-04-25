var robot = require("robotjs");

var serialport = require('serialport');
var SerialPort = require("serialport").SerialPort;

var port = new SerialPort("/dev/tty.usbmodem1411", {
  parser: serialport.parsers.readline('\n')
});
// var port = new SerialPort("/dev/tty.HC-05-DevB", {
    // parser: serialport.parsers.readline('\n')
// });


// Max length of the running average array is 10
var averageA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


module.exports = function (io) {
  io.on('connection', function (socket) {
    // socket.on('my other event', function (data) {
    //   console.log(data);
    // });
  });



  port.on('open', function() {
    console.log('Serial Port Opend');

    port.on('data', function(data){      
      if (data.charAt(0) == "A") {
        io.emit('sensorA', {
          sensorVal : data
        });
      } else if (data.charAt(0) == "B") {
        io.emit('sensorB', {
          sensorVal : data
        });
      }

    });
  });

}




// var plotly = require('plotly')("steven77723", "sbx6i5ut8n");

// var data = [
//   {
//     x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
//     y: [1, 3, 6],
//     type: 'scatter'
//   }
// ];

// Plotly.newPlot('myDiv', data);








var typeHelloWorld = function () {
    //Type "Hello World".
    robot.typeString("Hello World");

    //Press enter. 
    robot.keyTap("enter");
}


var shutdown = function () {
    //Speed up the mouse.
    robot.setMouseDelay(2);

    var twoPI = Math.PI * 2.0;
    var screenSize = robot.getScreenSize();
    var height = (screenSize.height / 2) - 10;
    var width = screenSize.width;

    for (var x = 0; x < width; x++)
    {
        y = height * Math.sin((twoPI * x) / width) + height;
        robot.moveMouse(x, y);
    }
}


