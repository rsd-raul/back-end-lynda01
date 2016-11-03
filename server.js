// REQUIRED -------------------------------------------------------------------

var express = require('express');
var bodyParser = require('body-parser')
var cors = require('./services/cors');

// CONFIG ---------------------------------------------------------------------

var app = express();

app.use(bodyParser.json());	        // Specifies the format to parse

// Enabling CORS (comunicate with API on a different URL)
app.use(cors);

// MONGO (mongoose) -----------------------------------------------------------

//var mongo = require('mongodb').MongoClient;                           STOCK MONGO
var mongoose = require('mongoose');
var database;

// 27017 = DB port, test = DB name
//mongo.connect("mongodb://localhost:27017/test", function(err, db){    STOCK MONGO
mongoose.connect("mongodb://localhost:27017/test", function(err, db){
    if(err){
       console.log("problems connecting to DB");
       console.log("run C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe");
       return;
    }

    console.log("we are connected to mongo");
//    database = db;                                                    STOCK MONGO
})

// API ------------------------------------------------------------------------

var auth = require('./controllers/auth');
app.post('/auth/register', auth.register);

var message = require('./controllers/message');
var checkAuthenticated = require('./services/checkAuthenticated');
app.post('/api/message', checkAuthenticated, message.post);
app.get('/api/message', message.get);           // Pass a fuction directly

// OTHER ----------------------------------------------------------------------

var server = app.listen(5000, function(){
    console.log('listening on port ', server.address().port);
})
