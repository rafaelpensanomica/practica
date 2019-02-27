var five = require("johnny-five");
var sqlite3 = require('sqlite3');
var board = new five.Board();


var db = new sqlite3.Database('arduino.db', sqlite3.OPEN_READWRITE);
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
    
    db.serialize(function() {
     var stmt = db.prepare("INSERT INTO accelerometer (id,x, y, z, pitch, roll, acceleration, inclination, orientation) VALUES (?,?,?,?,?,?,?,?,?)");
      stmt.run(acc.x, acc.x, acc.y, acc.z, acc.pitch, acc.roll, acc.acceleration, acc.inclination, acc.orientation);
      stmt.finalize();
    });
 
    
  });
});
 db.close(); 