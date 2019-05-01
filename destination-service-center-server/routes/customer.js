const express = require('express');
const bodyParser = require('body-parser');
const assert = require('assert');
var fabricUtils = require('fabric-utils');
var md5 = require('md5');
var config = require('../config.json');

//this makes customerRouter as express router
const customerRouter = express.Router();
customerRouter.use(bodyParser.json());


customerRouter.route('/')
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

    //get body
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let phoneNumber = req.body.phoneNumber;
    let emailId = req.body.emailId;
    let password = req.body.password;
    let zipCode = req.body.zipCode;
    let state = req.body.state;
    let country = req.body.country;
    let city = req.body.city;

    //validation
    assert.notEqual(firstName, "undefined");
    assert.notEqual(lastName, "undefined");
    assert.notEqual(address, "undefined");
    assert.notEqual(phoneNumber, "undefined");
    assert.notEqual(emailId, "undefined");
    assert.notEqual(password, "undefined");
    assert.notEqual(city, "undefined");

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
            "registerCustomer",
            [firstName, lastName, address, phoneNumber, emailId, md5(password), zipCode, state, country, city],
            emailId,
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
})



customerRouter.route('/login')
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

    let objectType = "customer";

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







customerRouter.route('/:customerId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    let customerId = req.params.customerId;
    assert.notEqual(customerId, "undefined");

    fabricUtils.chaincodeQuery.chaincodeQuery(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[0],
        [customerId],
        "getCustomerDetails",
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


module.exports = customerRouter;