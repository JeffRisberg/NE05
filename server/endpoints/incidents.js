const express = require('express')

const incidentRouter = express.Router()

const bodyParser = require('body-parser')

module.exports = (app) => {
    incidentRouter.use(bodyParser.json())

    incidentRouter.get('/:tenantId', function (req, res) {
        const tenantPrefix = "t" + req.params.tenantId;

        app.pool.getConnection(function (err, connection) {
            const query = 'SELECT * FROM ' + tenantPrefix + ".incidents";
            connection.query(query, function (error, results) {
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


