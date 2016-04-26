var socket = io.connect();
var allVals = [0, 0, 0];

socket.on('sensorA', function (data) {
  // data.sensorVal is in the form X: ###
  document.getElementById("piezoAvgA").innerHTML = data.num;
  // Eliminate small noise
  if (data.num < 10) {
    data.num = 10;
  }
  if (data.num > 200) {
    data.num = 200;
  }
  allVals[0] = data.num;
  // checkAllVals();
});

socket.on('sensorB', function (data) {
  document.getElementById("piezoAvgB").innerHTML = data.num;
  // Eliminate small noise
  if (data.num < 10) {
    data.num = 10;
  }
  if (data.num > 200) {
    data.num = 200;
  }
  allVals[1] = data.num;
});

socket.on('sensorC', function (data) {
  document.getElementById("piezoAvgC").innerHTML = data.num;
  // Eliminate small noise
  if (data.num < 10) {
    data.num = 10;
  }
  if (data.num > 200) {
    data.num = 200;
  }
  allVals[2] = data.num;
});


var canvasWidth = 840;
var canvasHeight = 480;

var ellipseWidth = 400;
var ellipseHeight = 300;

var leftX = (canvasWidth - ellipseWidth)/2;
var leftY = (canvasHeight)/2;

var centerX = canvasWidth/2;
var centerY = (canvasHeight - ellipseHeight) /2; 

var rightX = (canvasWidth + ellipseWidth)/2;
var rightY = (canvasHeight)/2;


function setup() 
{
  createCanvas(canvasWidth, canvasHeight);
  noSmooth();
}

var arrayindex = 0;

function draw()
{
  clear();
  // ellipse(X, Y, width-length, height-length)

  // Main Wrist ellipse
  noFill();
  ellipse(canvasWidth/2, canvasHeight/2, ellipseWidth, ellipseHeight);

  // The sensor ellipses
  fill('rgba(0,0,255, 0.35)');
  ellipse(leftX, leftY, allVals[0], allVals[0]);

  fill('rgba(0,0,255, 0.35)');
  ellipse(centerX, centerY, allVals[1], allVals[1]);

  fill('rgba(0,0,255, 0.35)');
  ellipse(rightX, rightY, allVals[2], allVals[2]);
}