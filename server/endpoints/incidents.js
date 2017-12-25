const express = require('express')

const incidentRouter = express.Router()

const bodyParser = require('body-parser')

module.exports = (app) => {
    incidentRouter.use(bodyParser.json())

    incidentRouter.get('/', function (req, res) {

        app.pool.getConnection(function (err, connection) {

            connection.query('SELECT * FROM t1.incident', function (error, results) {
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

                connection.release();
            });
        });
    });

    app.use('/api/v1/incidents', incidentRouter)
}


