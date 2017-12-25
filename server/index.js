// modules =================================================
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================

// config files
var db = require('../config/db');

var port = process.env.PORT || 3000; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

var mysql      = require('mysql');

app.connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'developer',
    password : '123456',
    database : 'master'
});

// routes
const tenant = require('./endpoints/tenant')

tenant(app);

// start app ===============================================
app.listen(port);
console.log('Server running on port ' + port); 			// inform the user
exports = module.exports = app; 						// expose app