var express = require('express');
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.json());	// Specifies the format to parse


app.post('/api/message', function(req, res){
    console.log(req.body);  // Log the body of the request received
    res.status(200);        // Set the response to 200 (OK)
})



var server = app.listen(5000, function(){
    console.log('listening on port ', server.address().port);
})
