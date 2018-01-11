var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id : {type : Objectid},          // pk
    uid : {type : String},
    password : {type: String},
    email : {type: String},
    gender : {type: Boolean},
    post: Array,

});
