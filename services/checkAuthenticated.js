var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function(req, res, next){
    if(!req.header('Authorization'))
        return res.status(401).send({message: "Your request doesn't have an Authorization header"});

    var token = req.header('Authorization').split(' ')[1];

    var payload = jwt.decode(token, 'secret');
    // secret is a encoding phrase, normally stored in a config file, normally much complex

    if(payload.exp <= moment().unix())
        return res.status(401).send({message: "Token expired"});

    req.user = payload.sub;

    next();
}
