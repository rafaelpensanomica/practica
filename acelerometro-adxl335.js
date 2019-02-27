var five = require("johnny-five");
var r = require('rethinkdb');
var board = new five.Board();

var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
})
r.db('test').tableCreate('accelerometer').run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
})

board.on("ready", function() {
  var accelerometer = new five.Accelerometer({
    controller: "ADXL335",
    pins: ["A0", "A1", "A2"]
  });

  accelerometer.on("change", function() {
    //console.log("accelerometer");
    /*console.log("  x            : ", this.x);
    console.log("  y            : ", this.y);
    console.log("  z            : ", this.z);
    console.log("  pitch        : ", this.pitch);
    console.log("  roll         : ", this.roll);
    console.log("  acceleration : ", this.acceleration);
    console.log("  inclination  : ", this.inclination);
    console.log("  orientation  : ", this.orientation);
    console.log("--------------------------------------");*/
    var acc = this;
    r.table('accelerometer').insert({
      x: acc.x,
      y: acc.y,
      z: acc.z,
      pitch: acc.pitch,
      roll: acc.roll,
      acceleration: acc.acceleration,
      inclination: acc.inclination,
      orientation: acc.orientation
    }).run(connection, function(err, result) {
        if (err) throw err;
           console.log(JSON.stringify(result, null, 2));
    });
  });
});