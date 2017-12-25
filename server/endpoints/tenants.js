const express = require('express')

const tenantRouter = express.Router()

const bodyParser = require('body-parser')

module.exports = (app) => {
    tenantRouter.use(bodyParser.json())

    tenantRouter.get('/', function (req, res) {

        app.pool.getConnection(function (err, connection) {

            connection.query('SELECT * FROM tenant', function (error, results) {
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

    app.use('/api/v1/tenants', tenantRouter)
}


