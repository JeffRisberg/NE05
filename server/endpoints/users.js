const express = require('express')

const userRouter = express.Router({mergeParams: true})

const bodyParser = require('body-parser')

module.exports = (app, tenantRouter) => {
    userRouter.use(bodyParser.json())

    userRouter.get('/', function (req, res) {
        const tenantPrefix = "t" + req.params.tenantId;

        app.pool.getConnection(function (err, connection) {
            const query = 'SELECT * FROM ' + tenantPrefix + ".users";
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
        })
    });

    userRouter.get('/:id', function (req, res) {
        const tenantPrefix = "t" + req.params.tenantId;

        app.pool.getConnection(function (err, connection) {

            const query = 'SELECT * FROM ' + tenantPrefix + '.users WHERE id =' + req.params.id;
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

    tenantRouter.use('/:tenantId/users', userRouter)
}
