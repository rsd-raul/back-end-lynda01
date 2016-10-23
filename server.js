var express = require('express');
var bodyParser = require('body-parser')


var app = express();

app.use(bodyParser.json());	        // Specifies the format to parse

// Enabling CORS (comunicate with API on a different URL)
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
        // The * is a "Wildcard" meaning it allows access from any locations
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        // Define the type of headers we will allow
    next();
        // Call next to continue
})


app.post('/api/message', function(req, res){
    console.log(req.body);          // Log the body of the request received
    res.status(200);                // Set the response to 200 (OK)
})



var server = app.listen(5000, function(){
    console.log('listening on port ', server.address().port);
})
