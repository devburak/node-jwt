var express     = require('express');
var bodyparser  = require('body-parser');
var mysql       = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host:'localhost',
  user:'node',
  password:'1312',
  database:'node'
});

connection.connect(function(err){
  if(!!err){
    console.log('error: ' , err);
  }else{
    console.log('connection true');
  }
})

var oData = [];
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json());

app.get('/api/get-data', function(req,res){
  res.json({data:oData});
});

app.post('/api/post-data' ,function(req,res){
  var newData = req.body.data;

  oData.push(newData);
  res.json({data : oData});
});

app.listen(2233, function(){
  console.log('server start @2233');
})
