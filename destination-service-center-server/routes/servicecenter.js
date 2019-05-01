const express = require('express');
const bodyParser = require('body-parser');
const assert = require('assert');
var fabricUtils = require('fabric-utils');
var config = require('../config.json');

const serviceCenterRouter = express.Router();
serviceCenterRouter.use(bodyParser.json());




serviceCenterRouter.route('/driver/citydrivers/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    let serviceCenterId = config.serviceCenterId;
    let driverType = "city";
    console.log(serviceCenterId);

    assert.notEqual(serviceCenterId, "undefined");

    return fabricUtils.chaincodeQuery.chaincodeQuery(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[0],
        [driverType,serviceCenterId],
        "getDriverByTypeForServiceCenter",
        config.adminUserName,
        config.orgName,
        config.networkConnectionProfile,
        config.orgConnectionProfile
    ).then((queryResult) => {
        res.json(JSON.parse(queryResult));
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


serviceCenterRouter.route('/driver/roaddrivers/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    let serviceCenterId = config.serviceCenterId;
    let driverType = "road";
    console.log(serviceCenterId);

    assert.notEqual(serviceCenterId, "undefined");

    return fabricUtils.chaincodeQuery.chaincodeQuery(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[0],
        [driverType,serviceCenterId],
        "getDriverByTypeForServiceCenter",
        config.adminUserName,
        config.orgName,
        config.networkConnectionProfile,
        config.orgConnectionProfile
    ).then((queryResult) => {
        res.json(JSON.parse(queryResult));
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


serviceCenterRouter.route('/billoflading/trailerno')
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

    res.json({
        message: "Operation not permitted"
    });
})
.put((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    let bolId = req.body.bolId;
    let trailerNo = req.body.trailerNo;

    fabricUtils.fabricHelper.getClientForOrg(config.orgName, '', config.networkConnectionProfile,
    config.orgConnectionProfile).then((client) => {
        return client;
    }).then((client) => {
        //get user 
        return fabricUtils.fabricHelper.getRegisteredUser(config.adminUserName, config.orgName, 'department1', client, config.orgMSP);
    }).then((user) => {
        //check user
        assert.notEqual(user, "undefined");
        
        //invoke chaincode
    return fabricUtils.chaincodeInvoke.invokeChaincode(
            config.peerAddresses,
            config.channelName,
            config.chaincodes[0],
            "updateTrailerNoBybolId",
            [bolId, trailerNo],
            config.adminUserName,
            config.orgName,
            config.networkConnectionProfile,
            config.orgConnectionProfile
        );
    }).then((invokeResult) => {
        res.json(invokeResult);
    }).catch((error) => {
        res.statusCode = 500;
        res.json({
            "success":false,
            "message":error,
            "txId":""
        });
        throw new Error(error);
    });
})
.delete((req, res, next ) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "Operation not permitted"
    });
});















serviceCenterRouter.route('/driver/:serviceCenterId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    let serviceCenterId = req.params.serviceCenterId;
    let objectType = "driver";

    assert.notEqual(serviceCenterId, "undefined");

    fabricUtils.chaincodeQuery.chaincodeQuery(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[0],
        [objectType, serviceCenterId],
        "getObjectByServiceCenter",
        config.adminUserName,
        config.orgName,
        config.networkConnectionProfile,
        config.orgConnectionProfile
    ).then((queryResult) => {
        res.json(JSON.parse(queryResult));
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


module.exports = serviceCenterRouter;