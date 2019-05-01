const express = require('express');
const bodyParser = require('body-parser');
var fabricUtils = require('fabric-utils');
var config = require('../config.json');
const assert = require('assert');

//this makes customerRouter as express router
const pickupRouter = express.Router();
pickupRouter.use(bodyParser.json());


pickupRouter.route('/')
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
 
    let shipperName = req.body.shipperName;
    let shipperEmailId = req.body.shipperEmailId;
    let consigneeName = req.body.consigneeName;
    let consigneeEmailId = req.body.consigneeEmailId;
    let shipperId = req.body.shipperId;
    let serviceCenterId = config.serviceCenterId;
    let pickupFrom = req.body.pickupFrom;
    let pickupTo = req.body.pickupTo;
    let deliveryFrom = req.body.deliveryFrom;
    let deliveryTo = req.body.deliveryTo;
    let consigneeId = String(req.body.consigneeId);

    //validation
    assert.notEqual(shipperName, "undefined");
    assert.notEqual(shipperEmailId, "undefined");
    assert.notEqual(consigneeName, "undefined");
    assert.notEqual(consigneeEmailId, "undefined");
    assert.notEqual(shipperId, "undefined");
    assert.notEqual(serviceCenterId, "undefined");
    assert.notEqual(pickupFrom, "undefined");
    assert.notEqual(deliveryFrom, "undefined");
    assert.notEqual(deliveryTo, "undefined");
    assert.notEqual(consigneeId, "undefined");

fabricUtils.fabricHelper.getClientForOrg(config.orgName, '', config.networkConnectionProfile,
        config.orgConnectionProfile).then((client) => {
            return client;
    }).then((client) => {
        //get user 
        return fabricUtils.fabricHelper.getRegisteredUser(shipperEmailId, config.orgName, 'department1', client, config.orgMSP);
    }).then((user) => {
        //check user
        assert.notEqual(user, "undefined");
        //invoke chaincode
        return fabricUtils.chaincodeInvoke.invokeChaincode(
            config.peerAddresses,
            config.channelName,
            config.chaincodes[0],
            "placePickupRequest",
            [shipperName, shipperEmailId, consigneeName, consigneeEmailId, shipperId, serviceCenterId, pickupFrom, pickupTo, deliveryFrom, deliveryTo, consigneeId],
            shipperEmailId,
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
.delete((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Operation not permitted"
    });
});


pickupRouter.route('/pickupDriver')
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
    })
})
.post((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Will assign pickup driver"
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



pickupRouter.route('/confirmPickup')
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
    })
})
.post((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Will confirm pickup details"
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

pickupRouter.route('/confirmPickupArrival')
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
    })
})
.post((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Will confirm pickup arrival details"
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


pickupRouter.route('/pickupstatus')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message:"Operation nto permitted"
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

    let pickupId = req.body.pickupId;
    let pickupStatus = req.body.pickupStatus;
    let userName = req.body.userName;           //here userName is the emailId

    assert.notStrictEqual(pickupId, "undefined");
    //fix issue #3
    assert.notStrictEqual(pickupStatus, "undefined"); 
    assert.notStrictEqual(userName, "undefined");

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
            "updatePickupStatus",
            [pickupId, pickupStatus],
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
            "success":false,
            "message":error,
            "txId":""
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


pickupRouter.route('/pickupimage')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message:"Operation nto permitted"
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

    let pickupId = req.body.pickupId;
    let uploadedBy  = req.body.uploadedBy;
    let time = req.body.time;
    let comments = req.body.comments;
    let userName = req.body.userName;           //here userName is the emailId
    let imageData = req.body.imageData;

    console.log("Printing attachment data : ", imageData);

    assert.notStrictEqual(pickupId, "undefined");
    assert.notStrictEqual(uploadedBy, "undefined");
    assert.notStrictEqual(time, "undefined");
    assert.notStrictEqual(comments, "undefined");
    assert.notStrictEqual(userName, "undefined");
    assert.notStrictEqual(imageData, "undefined");

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
            "updateImageInformation",
            [pickupId, time, uploadedBy, comments, imageData],
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
            "success":false,
            "message":error,
            "txId":""
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





pickupRouter.route('/:pickupId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    let pickupId = req.params.pickupId;
    assert.notEqual(pickupId, "undefined");
    
    fabricUtils.chaincodeQuery.chaincodeQuery(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[0],
        [pickupId],
        "getPickupRequestDetails",
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
        message: "Will update pickup information by pickupId"
    });
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Operation not permitted"
    });
});

module.exports = pickupRouter;