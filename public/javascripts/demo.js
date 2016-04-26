var socket = io.connect();
var allVals = [0, 0, 0];

socket.on('sensorA', function (data) {
  // data.sensorVal is in the form X: ###
  // document.getElementById("piezoAvgA").innerHTML = data.num;
  allVals[0] = data.num;
  checkAllVals();
});

socket.on('sensorB', function (data) {
  // document.getElementById("piezoAvgB").innerHTML = data.num;
  allVals[1] = data.num;
});

socket.on('sensorC', function (data) {
  // document.getElementById("piezoAvgC").innerHTML = data.num;
  allVals[2] = data.num;
});


var alerted = false;
var threshold = 300;

var checkAllVals = function () {
  var tappedA = allVals[0] > threshold;
  var tappedB = allVals[1] > threshold;
  var tappedC = allVals[2] > threshold;

  if (!alerted) {
    if (tappedA || tappedB || tappedC) {
      alerted = true;

      if (tappedA) {
        window.open("http://hcii.cmu.edu");
        window.open("http://netflix.com");
        window.open("http://gmail.com");
        window.open("http://facebook.com");

        socket.emit('doActionA', { 
        
        });
        document.getElementById("action").innerHTML = "Action A was done";
      }

      if (tappedB) {
        socket.emit('doActionB', { 
        
        });
        document.getElementById("action").innerHTML = "Action B was done";
      }
      
      if (tappedC) {
        socket.emit('doActionC', { 
        
        });
        document.getElementById("action").innerHTML = "Action C was done";
      }
    }
  } else {
    if (!tappedA && !tappedB && !tappedC) {
      alerted = false;
    }
  }
}