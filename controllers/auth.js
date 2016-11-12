var User = require('../models/user');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {

    register: function(req, res){

        User.findOne({email: req.body.email}, function(err, existingUser){

            // If duplicated, let the user know with a 409 and send a custom message
            if(existingUser)
                return res.status(409).send({message: "Email already registered"});

            // If new, Save user
            var user = new User(req.body);
            user.save(function(err, result){
                if(err){
                    res.status(500).send({
                        message: err.message
                    })
                }

                res.status(200).send({token: createToken(result)});
            })
        });
    },

    login: function(req, res){
        User.findOne({email: req.body.email}, function(err, user){

            // If the user is not found or the password does not match, return a 401 and notify the user
            if(!user || req.body.pwd != user.pwd)
                return res.status(401).send({message: "Email and/or Password invalid"});

            // If it's found, log the user (create a token for him)
            console.log(req.body, user.pwd);
            res.send({token: createToken(user)});

        });
    }
}

function createToken(user){
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, "secret");
    // secret is a encoding phrase, normally stored in a config file, normally much complex
}
