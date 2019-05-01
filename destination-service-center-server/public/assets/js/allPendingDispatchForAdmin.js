


$(document).ready(function(){
	

	var tempLists=[];
	var dataSets=[];

	$('#pendingDispatchTable').hide();

	

	setInterval( function () {
		//alert("yes")
	$.ajax({
		dataType:"json",
		url: "/shipments/destinationServiceCenterId/servicecenter-002",
		type:"GET",
		global:false,
		async:false, 
		success: function(response){
			var index = 1;
				
			$('#loaderDiv').hide();
			$('#pendingDispatchTable').show();
			$.each(response, function(i, item) {
			
			
				var shipperName=item.record.shipperName;
				shipperName = shipperName.split("_").join(" ");
		
		
	
				var status=item.record.status;
				
				status = status.split("_").join(" ");
	
				var statusParameter=item.record.status;
				statusParameter = statusParameter.split(" ").join("_");
	
	
	
	
				if(status=="Shipment Delivered by Road Driver"||status=="Shipment At Destination SC" || status=="City Driver Assigned for Dispatch" ||status=="Delivery Receipt created" || status=="Ready to Deliver Shipment" ||status=="Received Approval from Consignee" || status=="Shipment Delivered Successfully"){
					var statusParameter=item.record.status;
					statusParameter = statusParameter.split(" ").join("_");
		
		
					
		
						tempLists.push(index,item.record.shipmentId,shipperName,item.record.dest,item.record.pickupAssetId,status,'<a href=pendingDispatchStatus.html?shipmentId='+item.record.shipmentId+'&shipmentStatus='+statusParameter+'>View','<a href=getShipmentHistory.html?shipmentId='+item.record.shipmentId+'>View');
						index++;
						dataSets.push(tempLists);
						tempLists=[];
					}
			
		})
	
		}
		
	});
	
	//var tokenTables=$('#allTokens').DataTable();
	//tokenTables.destroy();
	var allPendingDispatchTable=$('#allPendingDispatchForAdmin').dataTable( {
		data: dataSets,
		destroy:true,
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
	
	 
	allPendingDispatchTable.api().draw(true);
	dataSets=[];
	}, 5000);
	
	

	
});


