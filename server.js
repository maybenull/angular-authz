var express = require('express');
var app = express();
var port = process.argv[2] || 8000;
 
app.configure(function () {
    app.use(
        "/", 
        express.static(__dirname) 
    );
});
app.listen(port); 
console.log("Express server running at => http://localhost:" + port + "/\nCTRL + C to shutdown");
