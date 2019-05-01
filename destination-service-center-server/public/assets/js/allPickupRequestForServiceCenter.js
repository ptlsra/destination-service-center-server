$(document).ready(function(){
	

	var tempLists=[];
	var dataSets=[];




// replace service center value

	$.get("/pickups/serviceCenter/servicecenter-002", function(response){
		// alert(JSON.stringify(response));
		var index = 1;
		$.each(response, function(i, item) {

			var shipperName=item.record.shipperName;
			shipperName = shipperName.split("_").join(" ");
	
			var consigneeName=item.record.consigneeName;
			consigneeName = consigneeName.split("_").join(" ");

			var status=item.record.pickupStatus;
			status = status.split("_").join(" ");

			var statusParameter=item.record.pickupStatus;
			statusParameter = statusParameter.split(" ").join("_");


			

				tempLists.push(index,item.record.pickupId,shipperName,consigneeName,item.record.pickupWindow.from+' - '+item.record.pickupWindow.to,status,'<a href=pickupStatus.html?pickupId='+item.record.pickupId+'&pickupStatus='+statusParameter+'>View','<a href=getPickupHistory.html?pickupId='+item.record.pickupId+'>View');
				index++;
				dataSets.push(tempLists);
				tempLists=[];
				//alert(dataSet);		               
			
		});

		$('#allPickupRequest').dataTable( {
			data: dataSets,
			columns: [
				{ title: "SNo" },
				{ title: "Pickup ID" },
				{ title: "Shipper" },
				{ title: "Consignee" },
				{ title: "PickUp Window" },
				{ title: "Current Status" },
				{ title: "View Details" },
				{ title: "History" }

			]
		} );
	} );
});

