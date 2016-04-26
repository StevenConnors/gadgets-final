var socket = io.connect();
var allVals = [0, 0, 0];

socket.on('sensorA', function (data) {
  allVals[0] = data.num;
});

socket.on('sensorB', function (data) {
  allVals[1] = data.num;
});

socket.on('sensorC', function (data) {
  allVals[2] = data.num;
  checkAllVals();
});




/** getGesture will return either 0, 1, 2, 3, or 4 depending on 
    the gesture recognized. 
    0: No gesture
    1: Tap A
    2: Tap B
    3: Tap C
    4: Grasp
*/
var getGestureSimple = function () {
  var threshold = 300;

  var tappedA = allVals[0] > threshold;
  var tappedB = allVals[1] > threshold;
  var tappedC = allVals[2] > threshold;

  if (tappedA) {
    return 1;
  }
  if (tappedB) {
    return 2;
  }
  if (tappedC) {
    return 3;
  }

  // No gesture
  return 0;
}


/** getGesture will return either 0, 1, 2, 3, or 4 depending on 
    the gesture recognized. 
    0: No gesture
    1: Tap A
    2: Tap B
    3: Tap C
    4: Grasp

    The values below are determined by weka's J48 algorithm
*/
var getGestureWeka = function () {
  var A = allVals[0];
  var B = allVals[1];
  var C = allVals[2];

  if (A <= 2.8) {
    if (B <= 13.6) {
      if (C <= 5) {
        if (B <= 3.5) {
          if (A <= 0.1) {
            if (A <= 0) {
              if (B <= 0) {
                if (C <= 0.5) {
                  if (C <= 0.1) {
                    return 0;
                  } else {
                    if (C <= 0.2) {
                      return 2;
                    } else {
                      return 0;
                    }
                  }
                } else {
                  return 0;
                }
              } else {
                return 0;
              }
            } else {
              if (C <= 0.8) {
                return 0;
              } else {
                return 2;
              }
            }
          } else {
            if (A <= 1.1) {
              return 0;
            } else {
              if (C < 1.2) {
                if (C <= 0) {
                  if (A <= 1.8) {
                    return 0;
                  } else {
                    return 3;
                  }
                }
              } else {
                return 1;
              }
            }
          } 
        } else {
          if (A <= 1.1) {
            if (A <= 0.4) {
              return 2;
            } else {
              if (A <= 0.9) {
                if (A <= 0.7) {
                  if (A <= 0.6) {
                    return 0;
                  } else {
                    if (B <= 10.4) {
                      return 4;
                    } else {
                      return 0;
                    }
                  }
                } else {
                  return 2;
                }
              } else {
                return 0;
              }
            }
          } else {
            return 4;
          }
        }
      } else {
        if (C <= 30.6) {
          if (A <= 1.8) {
            return 4;
          } else {
            return 3;
          }
        } else {
          return 3; 
        }
      }
    } else {
      return 2;
    }
  } else {
    if (C <= 31.8) {
      if (B <= 18.9) {
        if (C <= 6.5) {
          if (A <= 11.9) {
            if (B <= 4.2) {
              if (C <= 0.2) {
                return 3;
              } else {
                return 1;
              }
            } else {
              if (C <= 2.1) {
                if (C <= 0.7) { 
                  return 4;
                } else {
                  if (B <= 9.6) {
                    return 4;
                  } else {
                    if (B <= 10.5) {
                      return 1;
                    } else {
                      return 4;
                    }
                  }
                }
              } else {
                return 3;
              }
            }
          } else {
            return 1;
          }
        } else {
          if (A <= 58) {
            if (A <= 4.6) {
              if (B <= 4.9) {
                return 3;
              } else {
                return 4;
              }
            } else {
              if (C <= 13.3) {
                if (A <= 6.8) {
                  return 2;
                } else {
                  return 4;
                }
              } else {
                if (C <= 27) {
                  return 2;
                } else {
                  if (A <= 8.2) {
                    return 4;
                  } else {
                    return 2;
                  }
                }
              }
            }
          } else {
            return 1;
          }
        }
      } else {
        if (C <= 2.5) {
          if (A <= 6.2) {
            if (B <= 51.9) {
              return 4;
            } else {
              return 2;
            }
          } else {
            return 4;
          }
        } else {
          if (A <= 41.3) {
            if (C <= 14) {
              if (A <= 10.8) {
                return 2;
              } else {
                if (B <= 30.2) {
                  return 2;
                } else {
                  return 4;
                }
              }
            } else {
              return 2;
            }
          } else {
            if (B <= 69.6) {
              return 1;
            } else {
              return 4;
            }
          }
        }
      }
    } else {
      if (B <= 7.7) {
        if (A <= 35.9) {
          if (C <= 590.7) {
            if (A <= 7.7) {
              if (A <= 5.5) {
                if (B <= 1.1) {
                  return 4;
                } else {
                  return 3;
                }
              } else {
                if (C <= 368.1) {
                  return 4;
                } else {
                  if (B <= 1.2) {
                    return 4;
                  } else {
                    return 3;
                  }
                }
              }
            } else {
              return 3;
            }
          } else {
            return 4;
          }
        } else {
          return 4;
        }
      } else {
        return 4;
      }
    }
  } 

  // Just in case return 0
  return 0;
}


var alerted = false;
var oldGesture;
var gestureArr = new Array(15);
// Length of gestureArr is 15

var checkStable = function (gestureNum) {
  gestureArr.shift();
  gestureArr.push(gestureNum);

  var firstVal = gestureArr[0];
  for (var i = 0; i < gestureArr.length; i++) {
    if (gestureArr[i] != firstVal) {
      return false;
    }
  }
  return true;
}




var checkAllVals = function () {
  var gesture = getGestureWeka();

  if (!alerted && !checkStable(gesture)) {
    return;
  }

  // if (!alerted && (oldGesture != gesture)    ) {
  if (!alerted) {
    if (gesture > 0) {
      alerted = true;
      oldGesture = gesture;

      if (gesture == 1) {
        window.open("http://hcii.cmu.edu");
        window.open("http://cmu.edu");

        socket.emit('doActionA', { 
        
        });
        document.getElementById("action").innerHTML = "Action A was done";
      }

      if (gesture == 2) {
        socket.emit('doActionB', { 
        
        });
        document.getElementById("action").innerHTML = "Action B was done";
      }
      
      if (gesture == 3) {
        socket.emit('doActionC', { 
        
        });
        document.getElementById("action").innerHTML = "Action C was done";
      }

      if (gesture == 4) {
        window.open("http://www.google.com/search?q=cute+animal+pictures&safe=active&espv=2&biw=840&bih=956&source=lnms&tbm=isch&sa=X&ved=0ahUKEwio2ISx36vMAhUBET4KHacHBWEQ_AUIBigB");
        socket.emit('doActionGrasp', {

        });
        document.getElementById("action").innerHTML = "Grasp action was done";
      }
    }
  } else {
    if (gesture == 0) {
      alerted = false;
      document.getElementById("action").innerHTML = "No actions done yet";
    }
  }
}