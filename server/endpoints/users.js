const express = require('express')

const userRouter = express.Router()

const bodyParser = require('body-parser')

module.exports = (app) => {
    userRouter.use(bodyParser.json())

    userRouter.get('/:tenantId', function (req, res) {
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

    app.use('/api/v1/users', userRouter)
}


