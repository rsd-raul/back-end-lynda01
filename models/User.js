var mongoose = require('mongoose');

module.exports = mongoose.model('User', {    // Allow the model to be exported
    email: String,
    pwd: String
});
