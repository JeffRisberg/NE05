const express = require('express')

const tenantRouter = express.Router({ mergeParams: true })

const bodyParser = require('body-parser')

const incidents = require('./incidents')
const users = require('./users')

module.exports = (app) => {
    tenantRouter.use(bodyParser.json())

    tenantRouter.get('/', function (req, res) {

        app.pool.getConnection(function (err, connection) {

            connection.query('SELECT * FROM tenants', function (error, results) {
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

    tenantRouter.get('/:id', function (req, res) {
        app.pool.getConnection(function (err, connection) {

            const query = 'SELECT * FROM tenants WHERE id =' + req.params.id;
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

    users(app, tenantRouter);
    incidents(app, tenantRouter);

    app.use('/api/v1/tenants', tenantRouter)
}


