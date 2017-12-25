const express = require('express')

const tenantRouter = express.Router()

const bodyParser = require('body-parser')

module.exports = (app) => {
    app.use(bodyParser.urlencoded({
        extended: true,
    }))

    tenantRouter.use(bodyParser.json())

    tenantRouter.get('/', function (req, res) {

        const connection = app.connection;

        connection.connect();

        connection.query('SELECT * FROM tenant', function (error, results) {
            if (error) throw error;
            res.send({
                'status': 'ok',
                'data': results
            });
        });

        connection.end();
    });

    app.use('/api/v1/tenants', tenantRouter)
}


