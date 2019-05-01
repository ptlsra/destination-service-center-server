const express = require('express');
const bodyParser = require('body-parser');
const assert = require('assert');
var fabricUtils = require('fabric-utils');
var config = require('../config.json');
//this makes deliveryRouter as express router
const deliveryRouter = express.Router();
deliveryRouter.use(bodyParser.json());

deliveryRouter.route('/receipt')
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
     let shipmentId = req.body.shipmentId;
   

     //validation
     assert.notEqual(shipmentId, "undefined");
     
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
     let shipmentChainCodeName=config.chaincodes[1]
     //invoke chaincode
    return fabricUtils.chaincodeInvoke.invokeChaincode(
         config.peerAddresses,
         config.channelName,
         config.chaincodes[2],
         "generateDeliver",
         [shipmentId, shipmentChainCodeName,bolChainCodeName],
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





deliveryRouter.route('/receipt/updadeCityDriver')
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
    let recId = String(req.body.recId);
    let dateofdelivery = String(req.body.dateofdelivery);
    let arrivaltimeofdriver  = String(req.body.arrivaltimeofdriver);

    console.log(req.body)
    
    assert.notStrictEqual(recId, "undefined");
    assert.notStrictEqual(dateofdelivery, "undefined");
    assert.notStrictEqual(arrivaltimeofdriver, "undefined");

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
            config.chaincodes[2],
            "updateReceiptByCityClerk",
            [recId, dateofdelivery,arrivaltimeofdriver],
            config.adminUserName,
            config.orgName,
            config.networkConnectionProfile,
            config.orgConnectionProfile
        );
    }).then((invokeResult) => {
        console.log(invokeResult)
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



deliveryRouter.route('/receipt/customer/:customerId')
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
        config.chaincodes[2],
        [customerId],
        "getDeliveryReceiptsByShipperId",
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
        message: "Will update delivery receipt by customerId."
    });
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Operation not permitted"
    });
});



deliveryRouter.route('/receipt/consignee/')
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
    });
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "No operation"
    });
})
.put((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    let deliveryId = req.body.deliveryId;
    let userName = req.body.userName;       //customer emailId

    assert.notStrictEqual(deliveryId, "undefined");
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
            config.chaincodes[2],
            "updateReceiptByConsignee",
            [deliveryId],
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



deliveryRouter.route('/receipt/citydriver/updatereceipt')
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
    });
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "No operation"
    });
})
.put((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    let deliveryId = req.body.deliveryId;
    let userName = req.body.userName;       //city driver username emailId
    let departureTime = req.body.departureTime  //departure time

    assert.notStrictEqual(deliveryId, "undefined");
    assert.notStrictEqual(departureTime, "undefined");
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
            config.chaincodes[2],
            "updateReceiptByCityDriver",
            [deliveryId, departureTime],
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


deliveryRouter.route('/receipt/driver/:driverId')
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
        config.chaincodes[2],
        [driverId],
        "getDeliveryReceiptsByCityDriverId",
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
        message: "No operation"
    });
})
.put((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Will update receipt by driverId."
    });
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Operation not permitted"
    });
});



deliveryRouter.route('/receipts')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    
    fabricUtils.chaincodeQuery.chaincodeQuery(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[2],
        [""],
        "getAllreceipts",
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
        message: "Operation not permitted."
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

deliveryRouter.route('/receipt/:receiptId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    let receiptId = req.params.receiptId;
    assert.notEqual(receiptId, "undefined");

    fabricUtils.chaincodeQuery.chaincodeQuery(
        config.peerAddresses,
        config.channelName,
        config.chaincodes[2],
        [receiptId],
        "getDeliverDetails",
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
        message: "No operation"
    });
})
.put((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Will update receipt by receiptId."
    });
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: "Operation not permitted"
    });
});

module.exports = deliveryRouter;