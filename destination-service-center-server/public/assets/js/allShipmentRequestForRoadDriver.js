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
    var driverId = getUrlParameter('driverId');
    
	$.get("/shipments/driver/"+driverId, function(response){
		// alert(JSON.stringify(response));
		var index = 1;
		$.each(response, function(i, item) {

	
	
	

			var status=item.record.status;
			status = status.split("_").join(" ");

			var statusParameter=item.record.status;
			statusParameter = statusParameter.split(" ").join("_");


			

				tempLists.push(index,item.record.shipmentId,item.record.trailerNo,item.record.destinationServiceCenterId,item.record.sourceServiceCenterId,status,'<a href=shipmentStatusForRoadDriver.html?shipmentId='+item.record.shipmentId+'&shipmentStatus='+statusParameter+'>View','<a href=getShipmentHistory.html?shipmentId='+item.record.shipmentId+'>View');
				index++;
				dataSets.push(tempLists);
				tempLists=[];
				//alert(dataSet);		               
			
		});

		$('#viewShipmentRequestForRoadDriver').dataTable( {
			data: dataSets,
			columns: [
				{ title: "SNo" },
				{ title: "Shipment ID" },
				{ title: "Trailer Number" },
				{ title: "Destination" },
				{ title: "Source" },
				{ title: "Current Status" },
				{ title: "View Details" },
				{ title: "History" }

			]
		} );
	} );
});

