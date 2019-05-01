$(document).ready(function(){
	

	var tempLists=[];
	var dataSets=[];


    



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
    
    
    document.getElementById('txHistoryTile').innerHTML="Transaction History for DR "+drNo;



// replace service center value

$.get("/receipt/"+bolId, function(response){
    // alert(JSON.stringify(response));
    var index = 1;
    $.each(response, function(i, item) {

            //alert(JSON.stringify(item));

            //item.timeStamp;
        
            var shipperName=item.value.shipperName;
            shipperName = shipperName.split("_").join(" ");

            var consigneeName=item.value.consigneeName;
            consigneeName = consigneeName.split("_").join(" ");
            

            tempLists.push(index,'<a href=# data-toggle="tooltip" title='+item.txId+'>'+item.txId.substring(0,20)+'...',item.timestamp,shipperName,consigneeName,bolId,item.value.purchaseOrderNumber,item.value.pickupStatus);
            index++;
            dataSets.push(tempLists);
            tempLists=[];
            //alert(dataSet);		               
        
    });

    $('#bolHistory').dataTable( {
        data: dataSets,
        columns: [
            { title: "SNo" },
            { title: "Transaction ID" },
            { title: "TimeStamp" },
            { title: "Shipper" },
            { title: "Consignee" },
            { title: "BOL ID" },
            { title: "Pickup ID" },
            { title: "Status" },
        ]
    } );
} );

});

