// modules =================================================
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

// configuration ===========================================

// config files
const db = require('../config/db');

const port = process.env.PORT || 3000; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.connection = mysql.createConnection({
    host     : db.host,
    user     : db.user,
    password : db.password,
    database : db.database
});

// routes
const tenants = require('./endpoints/tenants')
const incidents = require('./endpoints/incidents')

tenants(app);
incidents(app);

// start app ===============================================
app.listen(port);

console.log('Server running on port ' + port); 			// inform the user
exports = module.exports = app; 						// expose app