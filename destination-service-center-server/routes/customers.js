const express = require('express');
const bodyParser = require('body-parser');
var config = require('../config.json');
var fabricUtils = require('fabric-utils');

//this makes customerRouter as express router
const customersRouter = express.Router();
customersRouter.use(bodyParser.json());


customersRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    fabricUtils.chaincodeQuery.chaincodeQuery(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[0],
        [""],
        "getAllCustomers",
        config.adminUserName,
        config.orgName,
        config.networkConnectionProfile,
        config.orgConnectionProfile
    ).then((queryResult) => {
        res.json(JSON.parse(queryResult).reverse());
    })
    .catch((error) => {
        throw new Error(error);
    });
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "Operation not permitted"
    });
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

module.exports = customersRouter;