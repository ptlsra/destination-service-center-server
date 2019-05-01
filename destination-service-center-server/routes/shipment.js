const express = require('express');
const bodyParser = require('body-parser');
const assert = require('assert');
var fabricUtils = require('fabric-utils');
var config = require('../config.json');
//this makes shipmentRouter as express router
const shipmentRouter = express.Router();
shipmentRouter.use(bodyParser.json());

shipmentRouter.route('/')
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
    let bolId = req.body.bolId;
   

    //validation
    assert.notEqual(bolId, "undefined");
    
    console.log("Printing bolId", req.body);



    fabricUtils.fabricHelper.getClientForOrg(config.orgName, '', config.networkConnectionProfile,
    config.orgConnectionProfile).then((client) => {
        return client;
}).then((client) => {
    //get user 
    return fabricUtils.fabricHelper.getRegisteredUser(config.adminUserName, config.orgName, 'department1', client, config.orgMSP);
}).then((user) => {
    //check user
    assert.notEqual(user, "undefined");
    

    let bolChainCodeName=config.chaincodes[0]
    //invoke chaincode
   return fabricUtils.chaincodeInvoke.invokeChaincode(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[1],
        "createShipment",
        [bolId, bolChainCodeName],
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






















shipmentRouter.route('/driver/:shipmentId&:driverId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: `Will return shipment details for the shipment ${req.params.shipmentId} by ${req.params.driverId}`
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
.delete((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Operation not permitted"
    });
});

shipmentRouter.route('/driver/roadDriver')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "No operation"
    });
})
.post((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    let shipmentId = req.body.shipmentId;
    let trailerNumber = req.body.trailerNumber;
    let roadDriverName  = req.body.roadDriverName;
    let roadDriverId   = req.body.roadDriverId;
    let roadDriverAdd   = req.body.roadDriverAdd;
    
    assert.notStrictEqual(shipmentId, "undefined");
    assert.notStrictEqual(trailerNumber, "undefined");
    assert.notStrictEqual(roadDriverName, "undefined");
    assert.notStrictEqual(roadDriverId, "undefined");
    assert.notStrictEqual(roadDriverAdd, "undefined");

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
            config.chaincodes[1],
            "updateShipmentWithDriverDetails",
            [shipmentId, trailerNumber,roadDriverName,roadDriverId,roadDriverAdd],
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




shipmentRouter.route('/driver/roaddriver/updateshipment')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "No operation"
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
    let shipmentId = req.body.shipmentId;
    let time = req.body.time;
    let uploadedBy  = req.body.uploadedBy;
    let comments   = req.body.comments;
    let image   = req.body.image;
    let statusUpdate   = req.body.statusUpdate;
    
    assert.notStrictEqual(shipmentId, "undefined");
    assert.notStrictEqual(time, "undefined");
    assert.notStrictEqual(uploadedBy, "undefined");
    assert.notStrictEqual(comments, "undefined");
    assert.notStrictEqual(statusUpdate, "undefined");

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
            config.chaincodes[1],
            "updateShipmentbyDriver",
            [shipmentId, time,uploadedBy,comments,image,statusUpdate],
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


.delete((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Operation not permitted"
    });
});








shipmentRouter.route('/driver/cityDriver')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "No operation"
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
    let shipmentId = req.body.shipmentId;
    let destinationCityDriverId = req.body.destinationCityDriverId;
    let destcityDriverName  = req.body.destcityDriverName;
    let statusUpdate   = req.body.statusUpdate;
    
    assert.notStrictEqual(shipmentId, "undefined");
    assert.notStrictEqual(destinationCityDriverId, "undefined");
    assert.notStrictEqual(destcityDriverName, "undefined");
    assert.notStrictEqual(statusUpdate, "undefined");

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
            config.chaincodes[1],
            "updateShipmentByCityClerk",
            [shipmentId, destinationCityDriverId,destcityDriverName,statusUpdate],
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


.delete((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Operation not permitted"
    });
});


shipmentRouter.route('/updateShipment')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');

    res.json({
        message: "No operation"
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
    let shipmentId = req.body.shipmentId;
    let statusUpdate   = req.body.statusUpdate;
    
    assert.notStrictEqual(shipmentId, "undefined");
    assert.notStrictEqual(statusUpdate, "undefined");

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
            config.chaincodes[1],
            "updateShipmentStatus",
            [shipmentId,statusUpdate],
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


.delete((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Operation not permitted"
    });
});

shipmentRouter.route('/:shipmentId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    let shipmentId = req.params.shipmentId;
    assert.notEqual(shipmentId, "undefined");

    fabricUtils.chaincodeQuery.chaincodeQuery(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[1],
        [shipmentId],
        "getShipmentDetails",
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
        message: "Update shipment details by id"
    });
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Operation not permitted"
    });
});





module.exports = shipmentRouter;