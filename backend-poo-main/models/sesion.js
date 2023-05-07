const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: String,
    expires: mongoose.Schema.Types.Mixed,
    session: String
});

module.exports = mongoose.model('sessions', schema);