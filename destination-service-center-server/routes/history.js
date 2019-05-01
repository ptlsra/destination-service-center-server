const express = require('express');
const bodyParser = require('body-parser');
const assert = require('assert');
var fabricUtils = require('fabric-utils');
var config = require('../config.json');

//this makes history as express router
const historyRouter = express.Router();
historyRouter.use(bodyParser.json());


historyRouter.route('/shipment/:key')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    console.log("Getting history for shipment");
    let key = req.params.key;
    assert.notEqual(key, "undefined");

    fabricUtils.chaincodeQuery.chaincodeQuery(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[1],
        [key],
        "getHistoryForAsset",
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
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "Will update customer by customerId"
    });
})
.delete((req, res, next ) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "Operation not permitted"
    });
});



historyRouter.route('/delivery/:key')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    console.log("Getting history for delivery");
    let key = req.params.key;
    assert.notEqual(key, "undefined");

    fabricUtils.chaincodeQuery.chaincodeQuery(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[2],
        [key],
        "getHistoryForAsset",
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
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "Will update customer by customerId"
    });
})
.delete((req, res, next ) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "Operation not permitted"
    });
});








historyRouter.route('/:key')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    console.log("Getting history for pickup");

    let key = req.params.key;
    assert.notEqual(key, "undefined");

    fabricUtils.chaincodeQuery.chaincodeQuery(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[0],
        [key],
        "getHistoryForAsset",
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
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "Will update customer by customerId"
    });
})
.delete((req, res, next ) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "Operation not permitted"
    });
});


module.exports = historyRouter;