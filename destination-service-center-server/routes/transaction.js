

const express = require('express');
const bodyParser = require('body-parser');
var fabricUtils = require('fabric-utils');
var config = require('../config.json');
var assert = require('assert');

//this makes txRouter as express router
const txRouter = express.Router();
txRouter.use(bodyParser.json());

var transactionData;

txRouter.route('/trim/:txId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        let txId = req.params.txId;
        assert.notEqual(txId, "undefined");
        
        return fabricUtils.chaincodeQuery.getTransactionByID (
            config.peerAddresses[0],
            config.channelName,
            txId,
            config.adminUserName,
            config.orgName,
            config.networkConnectionProfile,
            config.orgConnectionProfile
        ).then((queryResult) => {
            //res.json((queryResult));
             transactionData = {
                txId:queryResult.transactionEnvelope.payload.header.channel_header.tx_id,
                timeStamp:queryResult.transactionEnvelope.payload.header.channel_header.timestamp,
                channelName:queryResult.transactionEnvelope.payload.header.channel_header.channel_id,
                chaincodeName:queryResult.transactionEnvelope.payload.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.chaincode_id.name,
                executedBy:queryResult.transactionEnvelope.payload.header.signature_header.creator,
                blockNumber:""
            }
            return transactionData;
        })
        .then((transactionData) => {
            var txId = transactionData.txId;
            console.log(txId);
            return fabricUtils.chaincodeQuery.getBlockByTxId(
                config.peerAddresses[0],
                config.channelName,
                txId,
                config.adminUserName,
                config.orgName,
                config.networkConnectionProfile,
                config.orgConnectionProfile
            );
        })
        .then((blockData) => {
            //res.json(blockData);
            transactionData.blockNumber = blockData.header.number;

             res.jsonp(transactionData);
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













txRouter.route('/:txId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        let txId = req.params.txId;
        assert.notEqual(txId, "undefined");
        
        return fabricUtils.chaincodeQuery.getTransactionByID (
            config.peerAddresses[0],
            config.channelName,
            txId,
            config.adminUserName,
            config.orgName,
            config.networkConnectionProfile,
            config.orgConnectionProfile
        ).then((queryResult) => {
            res.json((queryResult));
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




    

module.exports = txRouter;