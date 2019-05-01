const express = require('express');
const bodyParser = require('body-parser');
var fabricUtils = require('fabric-utils');
var config = require('../config.json');
var assert = require('assert');


const bollistRouter = express.Router();
bollistRouter.use(bodyParser.json());

bollistRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        let bolId = req.params.bolId;
        assert.notEqual(bolId, "undefined");
    
        fabricUtils.chaincodeQuery.chaincodeQuery(
            config.peerAddresses,
            config.channelName,
            config.chaincodes[0],
            [""],
            "getListofBOL",
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
            message: "Will update bol by bolId"
        });
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            message: "Operation not permitted"
        });
    });

    bollistRouter.route('/servicecenter/:serviceCenterId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        let serviceCenterId = req.params.serviceCenterId;
        assert.notEqual(serviceCenterId, "undefined");
    
        fabricUtils.chaincodeQuery.chaincodeQuery(
            config.peerAddresses,
            config.channelName,
            config.chaincodes[0],
            [serviceCenterId],
            "getBolByServiceCenterId",
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
            message: "Will update bol by bolId"
        });
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            message: "Operation not permitted"
        });
    });

module.exports = bollistRouter;