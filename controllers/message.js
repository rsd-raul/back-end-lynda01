var Message = require('../models/message'); // Import the model

module.exports = {
    get: function (req, res) { // req and res so it can be used in a GET request

        // .exec is a "promise", like, once you complete the call, do X with the result, or handle the error
        Message.find({}).populate('user', '-pwd').exec(function (err, result) {
                     // .populate = attach the user info to the messages when asked for all the messages
                                        // -pwd = dont show the password though

            res.send(result); // Send the query from the database as a response
        })
    },

    post: function (req, res) {
        console.log("Saving : " + req.body, req.user); // Log the body of the request received, log the user id of the author

        req.body.user = req.user;   // Retrieve our user from authentication and set it up in the body
                                    // As the body builds the message, this will save the user too

        // req.body is JSON, so it's natively compatible with mongoDB
        //      database.collection('messages').insertOne(req.body);              STOCK MONGO
        var message = new Message(req.body);
        message.save();

        res.status(200); // Set the response to 200 (OK)
    }

}
