const express = require('express');
const bodyParser = require('body-parser');
var assert = require('assert');
var adminConfig = require('../adminConfig.json');

//this makes adminRouter as express router
const adminRouter = express.Router();
adminRouter.use(bodyParser.json());


adminRouter.route('/login')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "Operation not permitted"
    });
})
.post((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    let userName = req.body.userName;
    let password = req.body.password;

    //validation
    assert.notStrictEqual(userName, "undefined");
    assert.notStrictEqual(password, "undefined");
    console.log(adminConfig.admins[0]);
    //check user and password
    if (userName == adminConfig.admins[0].username && password == adminConfig.admins[0].secret){
        res.json({
            message : "success",
            statusCode: 200
        });
    }else{
        res.statusCode = 500;
        res.json({
            message : "Login failed",
            statusCode: 500
        });
    }

})
.put((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "Operation not permitted"
    });
})
.delete((req, res, next ) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "Operation not permitted"
    });
});

module.exports = adminRouter;