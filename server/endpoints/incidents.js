const express = require('express')

const incidentRouter = express.Router()

const bodyParser = require('body-parser')

module.exports = (app) => {
    incidentRouter.use(bodyParser.json())

    incidentRouter.get('/', function (req, res) {

        const connection = app.connection;

        connection.connect();

        connection.query('SELECT * FROM incident', function (error, results) {
            if (error) {
                res.send({
                    'status': 'error',
                    'data': error
                })
            }
            else {
                res.send({
                    'status': 'ok',
                    'data': results
                })
            }
        });


        connection.end();
    });

    app.use('/api/v1/incidents', incidentRouter)
}


