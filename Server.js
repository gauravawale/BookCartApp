'use strict'
 
var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
require('./app_api/models/db');
require('./app_api/models/usercart');
require('./app_api/models/book');
require('./app_api/config/passport');
var routesApi = require('./app_api/routes/index');



 
var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use('/api', routesApi);

app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/',function(req,res){
    res.sendFile('main.html',{'root':__dirname + '/public'});
});

app.listen('3001',function(){
    console.log('Server running at http://localhost:3001 !!')
});

