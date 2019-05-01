






$(document).ready(function(){
	

	var tempLists=[];
	var dataSets=[];
    var driverId = getUrlParameter('driverId');

	$('#dispatchRequest').hide();

	

	setInterval( function () {
		//alert("yes")
	$.ajax({
		dataType:"json",
		url: "/shipments/cityDriver/"+driverId,
		type:"GET",
		global:false,
		async:false, 
		success: function(response){
			var index = 1;
				
			$('#loaderDiv').hide();
			$('#dispatchRequest').show();
			$.each(response, function(i, item) {
			
			
			
				var status=item.record.status;
				status = status.split("_").join(" ");
	
				var statusParameter=item.record.status;
				statusParameter = statusParameter.split(" ").join("_");
	
	
				
	
	
					tempLists.push(index,item.record.shipmentId,'<a href=bolForCityDriver.html?bolId='+item.record.billOfLadingId+'>'+item.record.billOfLadingId,item.record.destinationServiceCenterId,item.record.dest,status,'<a href=shipmentStatusForCityDriver.html?shipmentId='+item.record.shipmentId+'&shipmentStatus='+statusParameter+'>View','<a href=getShipmentHistory.html?shipmentId='+item.record.shipmentId+'>View');
					index++;
					dataSets.push(tempLists);
					tempLists=[];
		})
	
		}
		
	});
	
	//var tokenTables=$('#allTokens').DataTable();
	//tokenTables.destroy();
	var allPendingDispatchTable=$('#allDispatchRequestForCityDriver').dataTable( {
		data: dataSets,
		destroy:true,
		columns: [
			{ title: "SNo" },
			{ title: "Shipment ID" },
			{ title: "BOL" },
			{ title: "Destination SC" },
			{ title: "Destination" },
			{ title: "Current Status" },
			{ title: "View Details" },
			{ title: "History" }

		]
	} );
	 
	allPendingDispatchTable.api().draw(true);
	dataSets=[];
	}, 5000);
	
	

	
});


