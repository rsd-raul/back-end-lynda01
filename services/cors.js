module.exports = function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
        // The * is a "Wildcard" meaning it allows access from any locations
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        // Define the type of headers we will allow
    next();
        // Call next to continue
}
