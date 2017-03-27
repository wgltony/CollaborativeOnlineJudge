var mongoose = require("mongoose");

var dbConnect = mongoose.connect("mongodb://judgeAdmin:admin999@ds119370.mlab.com:19370/judgequestion");

module.exports = dbConnect;
