const express = require('express')

const userRouter = express.Router()

const bodyParser = require('body-parser')

module.exports = (app) => {
    userRouter.use(bodyParser.json())

    userRouter.get('/', function (req, res) {

        app.pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM t1.users', function (error, results) {
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


