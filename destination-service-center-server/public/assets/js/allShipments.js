$(document).ready(function(){
	

	var tempLists=[];
	var dataSets=[];




// replace service center value
//shipments/sourceServiceCenterId/:sourceservicecenterid
	$.get("/shipments/sourceServiceCenterId/servicecenter-002", function(response){
		// alert(JSON.stringify(response));
		var index = 1;
		$.each(response, function(i, item) {

			var shipperName=item.record.shipperName;
			shipperName = shipperName.split("_").join(" ");
	
	

			var status=item.record.status;
			
			status = status.split("_").join(" ");

			var statusParameter=item.record.status;
			statusParameter = statusParameter.split(" ").join("_");




				tempLists.push(index,item.record.shipmentId,shipperName,item.record.dest,item.record.pickupAssetId,status,'<a href=shipmentStatus.html?shipmentId='+item.record.shipmentId+'&shipmentStatus='+statusParameter+'>View','<a href=getShipmentHistory.html?shipmentId='+item.record.shipmentId+'>View');
				index++;
				dataSets.push(tempLists);
				tempLists=[];
			
				//alert(dataSet);		               
			
		});

		$('#allShipmentsForAdmin').dataTable( {
			data: dataSets,
			columns: [
				{ title: "SNo" },
				{ title: "Shipment ID" },
				{ title: "Shipper" },
				{ title: "Destination" },
				{ title: "PickUp ID" },
				{ title: "Current Status" },
				{ title: "View Details" },
				{ title: "History" }

			]
		} );
	} );
});

