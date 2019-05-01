const express = require('express');
const bodyParser = require('body-parser');
var config = require('../config.json');
var fabricUtils = require('fabric-utils');


//this makes blockRouter as express router
const blockRouter = express.Router();
blockRouter.use(bodyParser.json());


blockRouter.route('/:blockNumber')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    let blockNumber = req.params.blockNumber;

    fabricUtils.chaincodeQuery.getBlockByNumber(
        config.peerAddresses,
        config.channelName,
        blockNumber,
        config.adminUserName,
        config.orgName,
        config.networkConnectionProfile,
        config.orgConnectionProfile
    ).then((queryResult) => {
        res.json(queryResult);
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

module.exports = blockRouter;