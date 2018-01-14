var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({

    title: {type: String, required: true, },

    content: {type: String},

    photoPath: {type: String},

    registerTime: {type: Date, default: Date.now}

});

module.exports = mongoose.model('post', PostSchema);