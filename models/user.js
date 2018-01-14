var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var post = require('./post');

var UserSchema = new Schema({

    uid : {type : String, required: true, unique: true },

    password : {type: Buffer, required: true},

    email : {type: String, required: true},

    gender : {type: Boolean, required: true},

    level: {type: String, required: true},

    post: [{type: Schema.Types.ObjectId, ref: 'post'}]

});

module.exports = mongoose.model('user', UserSchema);