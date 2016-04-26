var robot = require("robotjs");

var serialport = require('serialport');
var SerialPort = require("serialport").SerialPort;

// var port = new SerialPort("/dev/tty.usbmodem1411", {
//   parser: serialport.parsers.readline('\n')
// });
var port = new SerialPort("/dev/tty.HC-05-DevB", {
  parser: serialport.parsers.readline('\n')
});
// /dev/tty.wchusbserial1410

// Max length of the running average array is 6
var averageArrayA = [0, 0, 0, 0, 0, 0];
var averageArrayB = [0, 0, 0, 0, 0, 0];
var averageArrayC = [0, 0, 0, 0, 0, 0];

var threshold = 300;




var shiftAverage = function (firstLetter, val) {
  var arr = averageArrayA;
  if (firstLetter == "A") {
    arr = averageArrayA;
  } else if (firstLetter == "B") {
    arr = averageArrayB;
  } else if (firstLetter == "C"){
    arr = averageArrayC;
  } 

  arr.shift();
  arr.push(val);

  return getAverage(arr);
}

var getAverage = function (arr) {
  var avg = 0;
  for (var i = 0; i < arr.length; i++) {
    avg += arr[i];
  }
  return avg / arr.length;
}

var actionDone = false;

var doAction = function (firstLetter, averageVal) {
  if (firstLetter == "A" && averageVal > threshold && !actionDone) {
    shutdown();
    actionDone = true;
  }

  checkEverythingNormal();
}


var checkEverythingNormal = function () {
  var avgA = getAverage(averageArrayA);
  var avgB = getAverage(averageArrayB);
  var avgC = getAverage(averageArrayC);

  if (avgA < threshold && avgB < threshold && avgC < threshold) {
    actionDone = false;
  }
}



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









module.exports = function (io) {
  io.on('connection', function (socket) {


  });


  port.on('open', function() {
    console.log('Serial Port Opend');

    port.on('data', function(data){
      // data is in form 'X: ###' 
      var firstLetter = data.charAt(0);
      var num = parseInt(data.substr(3, data.length - 1));

      var averageVal = shiftAverage(firstLetter, num);

      if (firstLetter == "A") {
        io.emit('sensorA', {
          sensorVal : data,
          num : averageVal
        });
      } else if (firstLetter == "B") {
        io.emit('sensorB', {
          sensorVal : data,
          num : averageVal
        });
      } else if (firstLetter == "C") {
        io.emit('sensorC', {
          sensorVal : data,
          num : num
        });
      }

      doAction(firstLetter, averageVal);

    });
  });

}
// End socketio



