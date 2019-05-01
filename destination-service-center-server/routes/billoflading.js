const express = require('express');
const bodyParser = require('body-parser');
var fabricUtils = require('fabric-utils');
var config = require('../config.json');
var assert = require('assert');


//this makes bolRouter as express router
const bolRouter = express.Router();
bolRouter.use(bodyParser.json());


bolRouter.route('/')
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

        let purchaseOrderNumber = String(req.body.purchaseOrderNumber);
        let shipperName = String(req.body.shipperName);
        let shipperAccountNumber = String(req.body.shipperAccountNumber);
        let shipperAddress = String(req.body.shipperAddress);
        let shipperAttentionTo = req.body.shipperAttentionTo;
        let shipperPhoneNumber = String(req.body.shipperPhoneNumber);
        let shipperSignature = req.body.shipperSignature;
        let consigneeName = req.body.consigneeName;
        let consigneeAddress = req.body.consigneeAddress;
        let consigneeAccountNumber = String(req.body.consigneeAccountNumber);
        let consigneeAttentionTo = req.body.consigneeAttentionTo;
        let consigneePhoneNumber = String(req.body.consigneePhoneNumber);
        let cityDriverId = String(req.body.cityDriverId);
        let pickupArrivalTime = req.body.pickupArrivalTime;
        let pickupDepartTime = req.body.pickupDepartTime;
        let freightTerms = req.body.freightTerms;
        let freightAmount = req.body.freightAmount;
        let pickupStatus = req.body.pickupStatus;
        let sourceAddress = req.body.sourceAddress;
        let destinationAddress = req.body.destinationAddress;
        let sourceServiceCenterId = config.serviceCenterId;
        let destinationServiceCenterId = config.destinationServiceCenterId;

       // console.log("printing body : ", req.body);


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
                "createBol",
                [purchaseOrderNumber,
                    shipperName,
                    shipperAccountNumber,
                    shipperAddress,
                    shipperAttentionTo,
                    shipperPhoneNumber,
                    shipperSignature,
                    consigneeName,
                    consigneeAddress,
                    consigneeAccountNumber,
                    consigneeAttentionTo,
                    consigneePhoneNumber,
                    cityDriverId,
                    pickupArrivalTime,
                    pickupDepartTime,
                    freightTerms,
                    freightAmount,
                    pickupStatus,
                    sourceAddress,
                    destinationAddress,
                    sourceServiceCenterId,
                    destinationServiceCenterId
                ],
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
                "success": false,
                "message": error,
                "txId": ""
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
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            message: "Operation not permitted"
        });
    });


bolRouter.route('/citydriver/updatepickup')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        res.json({
            message: "Operation not permitted"
        })
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
        

        let bolId = String(req.body.bolId);
        let trailerNo = String(req.body.trailerNo);
        let pickupArrivalTime = String(req.body.pickupArrivalTime);
        let pickupDepartTime = String(req.body.pickupDepartTime);
        let pickupStatus = req.body.pickupStatus;
        let weight = String(req.body.weight);
        let pickupDate = String(req.body.pickupDate);
        let pieceCount = String(req.body.pieceCount);
        let handlingUnit = String(req.body.handlingUnit);
        let pkgType = String(req.body.pkgType);
        let pieces = String(req.body.pieces);
        let hm = String(req.body.hm);
        let packageDescription = String(req.body.packageDescription);
        let nmfcItemNo = String(req.body.nmfcItemNo);
        let classification = req.body.classification;
        let userName = req.body.userName;

        fabricUtils.fabricHelper.getClientForOrg(config.orgName, '', config.networkConnectionProfile,
        config.orgConnectionProfile).then((client) => {
        return client;
    }).then((client) => {
        //get user 
        return fabricUtils.fabricHelper.getRegisteredUser(userName, config.orgName, 'department1', client, config.orgMSP);
    }).then((user) => {

        //check user
        assert.notEqual(user, "undefined");

        //invoke chaincode
        return fabricUtils.chaincodeInvoke.invokeChaincode(
            config.peerAddresses,
            config.channelName,
            config.chaincodes[0],
            "updatePickupByCityDriver",
            [bolId,
            trailerNo,
            pickupArrivalTime,
            pickupDepartTime,
            pickupStatus,
            weight,
            pickupDate,
            pieceCount,
            handlingUnit,
            pkgType,
            pieces,
            hm,
            packageDescription,
            nmfcItemNo,
            classification],
            userName,
            config.orgName,
            config.networkConnectionProfile,
            config.orgConnectionProfile
        );
        }).then((invokeResult) => {
            res.json(invokeResult);
        }).catch((error) => {
            res.statusCode = 500;
            res.json({
                "success": false,
                "message": error,
                "txId": ""
            });
            throw new Error(error);
        });
        
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            message: "Operation not permitted"
        });
    });



    bolRouter.route('/customer/updatepickup')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        res.json({
            message: "Operation not permitted"
        })
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
        

        let bolId = String(req.body.bolId);
        let userName = req.body.userName;

        fabricUtils.fabricHelper.getClientForOrg(config.orgName, '', config.networkConnectionProfile,
        config.orgConnectionProfile).then((client) => {
        return client;
    }).then((client) => {

        //get user 
        return fabricUtils.fabricHelper.getRegisteredUser(userName, config.orgName, 'department1', client, config.orgMSP);
    }).then((user) => {

        //check user
        assert.notEqual(user, "undefined");

        //invoke chaincode
        return fabricUtils.chaincodeInvoke.invokeChaincode(
            config.peerAddresses,
            config.channelName,
            config.chaincodes[0],
            "updatePickupByShipper",
            [bolId],
            userName,
            config.orgName,
            config.networkConnectionProfile,
            config.orgConnectionProfile
        );
        }).then((invokeResult) => {
            res.json(invokeResult);
        }).catch((error) => {
            res.statusCode = 500;
            res.json({
                "success": false,
                "message": error,
                "txId": ""
            });
            throw new Error(error);
        });
        
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            message: "Operation not permitted"
        });
    });

    
bolRouter.route('/:bolId')
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
            [bolId],
            "getBOLDetails",
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

module.exports = bolRouter;



