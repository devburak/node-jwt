var express     = require('express');
var bodyparser  = require('body-parser');
var mysql       = require('mysql');
var jwt = require('jsonwebtoken');
var app = express();
var sRoutes = express.Router();
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

process.env.SECRET_KEY='denemekey';
var auth = require('./controller/Authenticate');
var oData = [];
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json());

app.use('/s_api/',sRoutes);

sRoutes.use(function(req,res,next){
  var token = req.body.token || req.headers['token'];

  if(token){
    jwt.verify(token,process.env.SECRET_KEY, function(err, decode){
      if(err){
        res.status(500).send('invalid Token');
      }
      else {
        next();
      }
    })
  }
  else {
    res.send('no have token');
  }
})

app.get('/api/get-data', function(req,res){
  res.json({data:oData});
});

app.get('/api/auth',auth.authenticate);

sRoutes.post('/post-data' ,function(req,res){
  var newData = req.body.data;

  oData.push(newData);
  res.json({data : oData});
});

app.listen(2233, function(){
  console.log('server start @2233');
})
