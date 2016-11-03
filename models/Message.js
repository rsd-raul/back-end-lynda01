var mongoose = require('mongoose');

module.exports = mongoose.model('Message', {    // Allow the model to be exported
    msg: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
        // To associate the user ID with the message
});
