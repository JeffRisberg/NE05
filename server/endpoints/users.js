const express = require('express')

const userRouter = express.Router()

const bodyParser = require('body-parser')

module.exports = (app) => {
    userRouter.use(bodyParser.json())

    userRouter.get('/', function (req, res) {

        const connection = app.connection;

        connection.connect();

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
        });

        connection.end();
    });

    app.use('/api/v1/users', userRouter)
}


