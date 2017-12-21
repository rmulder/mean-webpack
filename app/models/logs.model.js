//posts model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
  title: String,
  body: String
});

module.exports = mongoose.model('Log', LogSchema);
