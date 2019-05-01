const express = require('express');
const bodyParser = require('body-parser');
var config = require('../config.json');
var assert = require('assert');
var fabricUtils = require('fabric-utils');
var md5 = require('md5');

//this makes driverRouter as express router
const driverRouter = express.Router();
driverRouter.use(bodyParser.json());

driverRouter.route('/')
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
  
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let emailId = req.body.emailId;
    let password = req.body.password;
    let driverType = req.body.driverType;

    assert.notEqual(firstName, "undefined");
    assert.notEqual(lastName, "undefined");
    assert.notEqual(emailId, "undefined");
    assert.notEqual(password, "undefined");
    assert.notEqual(driverType, "undefined");

    fabricUtils.fabricHelper.getClientForOrg(config.orgName, '', config.networkConnectionProfile,
    config.orgConnectionProfile).then((client) => {
        return client;
    }).then((client) => {
    //get user 
    return fabricUtils.fabricHelper.getRegisteredUser(emailId, config.orgName, 'department1', client, config.orgMSP);
    }).then((user) => {
        //check user
        assert.notEqual(user, "undefined");
                //invoke chaincode
       return fabricUtils.chaincodeInvoke.invokeChaincode(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[0],
        "addDriver",
        [firstName, lastName, driverType, config.serviceCenterId, emailId, md5(password)],
        emailId,
        config.orgName,
        config.networkConnectionProfile,
        config.orgConnectionProfile
        );
    }).then((invokeResult) => {
        res.json(invokeResult);
    })
    .catch((error) => {
        res.statusCode = 500;
        res.json({
            "success":false,
            "message":error,
            "txId":""
        });
        throw new Error(error);
    })
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Operation not permitted"
    });
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Operation not permitted"
    });
});



driverRouter.route('/login')
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

    let emailId = req.body.emailId;
    let password = req.body.password;

    let objectType = "driver";

    fabricUtils.chaincodeQuery.chaincodeQuery(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[0],
        [emailId, objectType],
        "getUserDetailsByEmailId",
        config.adminUserName,
        config.orgName,
        config.networkConnectionProfile,
        config.orgConnectionProfile
    ).then((result) => {
        if (JSON.parse(result)[0].record.password == md5(password)){
            res.json(JSON.parse(result)[0].record);
        }else{
            res.json({
                message: "invalid credentials"
            });
        }
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



driverRouter.route('/:driverId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    let driverId = req.params.driverId;

    assert.notEqual(driverId, "undefined");

    fabricUtils.chaincodeQuery.chaincodeQuery(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[0],
        [driverId],
        "getDriverDetails",
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
        message: "Will update driver information by driverId"
    });
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Operation not permitted"
    });
});



module.exports = driverRouter;