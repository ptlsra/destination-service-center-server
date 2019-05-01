var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var drNo = getUrlParameter('drNo');


document.getElementById('content-heading').innerHTML="Delivery Receipt details for DR ID "+drNo;
document.getElementById('freightBillIId').innerHTML=drNo;
document.getElementById('freightBillIIdForForm').innerHTML=drNo;
document.getElementById('freightBillIIdForForm').innerHTML=drNo;


$.get("/delivery/receipt/"+drNo, function(response){

    document.getElementById('shipDate').innerHTML=response.dateOfDelivery;
    document.getElementById('shipDateForm').innerHTML=response.dateOfDelivery;

    document.getElementById('bolIdForm').innerHTML=response.billOfLadingId;
    document.getElementById('bolId').innerHTML=response.billOfLadingId;
    document.getElementById('po').innerHTML=response.po;

    document.getElementById('poForm').innerHTML=response.po;

    document.getElementById('origin').innerHTML=response.origin;

    document.getElementById('originForm').innerHTML=response.origin;

    document.getElementById('destination').innerHTML=response.destination;

    document.getElementById('destinationForm').innerHTML=response.destination;


    document.getElementById('consignee').innerHTML=response.consigneeAddress;

    document.getElementById('consigneeForm').innerHTML=response.consigneeAddress;
    document.getElementById('shipper').innerHTML=response.shipperAddress;

    document.getElementById('shipperForm').innerHTML=response.shipperAddress;
    document.getElementById('pieces').innerHTML=response.freightDetails[0].pieces;
    document.getElementById('piecesForm').innerHTML=response.freightDetails[0].pieces;

    document.getElementById('pieceNew').innerHTML=response.freightDetails[0].pieces;
    document.getElementById('pieceNewForm').innerHTML=response.freightDetails[0].pieces;

    

    document.getElementById('pkgType').innerHTML=response.freightDetails[0].pkgType;
    document.getElementById('pkgTypeForm').innerHTML=response.freightDetails[0].pkgType;


    document.getElementById('handlingUnit').innerHTML=response.freightDetails[0].handlingUnit;
    document.getElementById('handlingUnitForm').innerHTML=response.freightDetails[0].handlingUnit;


    document.getElementById('description').innerHTML=response.freightDetails[0].packageDescription;
    document.getElementById('descriptionForm').innerHTML=response.freightDetails[0].packageDescription;

    document.getElementById('weight').innerHTML=response.freightDetails[0].weight;
    document.getElementById('weightForm').innerHTML=response.freightDetails[0].weight;


    document.getElementById('nmfcItemNo').innerHTML=response.freightDetails[0].nmfcItemNo;
    document.getElementById('nmfcItemNoForm').innerHTML=response.freightDetails[0].nmfcItemNo;

    document.getElementById('trailerNo').innerHTML="TrailerNo: "+response.trailerNo;
    document.getElementById('trailerNoForm').innerHTML="TrailerNo: <span style=margin-left:10px;>"+response.trailerNo+"</span>";



    document.getElementById('driverId').innerHTML=response.driverId;
    document.getElementById('driverIdForm').innerHTML=response.driverId;


    document.getElementById('arrivalTimeOfDriver').innerHTML=response.arrivalTimeOfDriver;
    document.getElementById('arrivalTimeOfDriverForm').innerHTML=response.arrivalTimeOfDriver;



    document.getElementById('departureTimeOfDriver').innerHTML=response.departureTimeOfDriver;
    document.getElementById('departureTimeOfDriverForm').innerHTML=response.departureTimeOfDriver;


    document.getElementById('dateOfDelivery').innerHTML=response.dateOfDelivery;
    document.getElementById('dateOfDeliveryForm').innerHTML=response.dateOfDelivery;


    var purchaseOrder=response.po;

    var shipmentId=response.shipMentId;

    $.get("/shipment/"+shipmentId, function(shipmentData){

var status=shipmentData.status;

if(status=="Shipment Delivered Successfully" || status=="Received Approval from Consignee"){
    $.get("/pickup/"+purchaseOrder, function(responseData){
        var consigneeName=responseData.consigneeName;
        consigneeName=consigneeName.split('_').join(' ');
        document.getElementById('recievedByForm').innerHTML=consigneeName;
        document.getElementById('recievedBy').innerHTML=consigneeName;

    
    });
}
});
    
    
    

    

});




