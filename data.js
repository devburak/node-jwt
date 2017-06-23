var mysql = require('mysql');
var pool  = null;
exports.connect = function() {
  pool = mysql.createPool({
    host     : 'localhost',
    user     : 'node',
    password : '1312',
    database : 'node'
  });
}
exports.get = function() {
  return pool;
}
