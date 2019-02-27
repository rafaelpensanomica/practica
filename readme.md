r = require('rethinkdb');
var connection = null;
r.connect({host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});
  r.table('accelerometer').get("115fc7b8-ab3e-4f4a-ad62-75b78f8198e3");
  r.table('accelerometer').count()