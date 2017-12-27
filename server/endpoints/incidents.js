const express = require('express')

const incidentRouter = express.Router({ mergeParams: true })

const bodyParser = require('body-parser')

module.exports = (app, tenantRouter) => {
    incidentRouter.use(bodyParser.json())

    incidentRouter.get('/', function (req, res) {
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

    incidentRouter.get('/:id', function (req, res) {
        const tenantPrefix = "t" + req.params.tenantId;

        app.pool.getConnection(function (err, connection) {

            const query = 'SELECT * FROM ' + tenantPrefix + '.incidents WHERE id =' + req.params.id;
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

    tenantRouter.use('/:tenantId/incidents', incidentRouter)
}
