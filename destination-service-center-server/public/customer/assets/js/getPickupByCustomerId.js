$(document).ready(function(){
	

	var tempLists=[];
	var dataSets=[];


	var customerId=localStorage.getItem("customerId");




	$.get("/pickups/customer/"+customerId, function(response){
		// alert(JSON.stringify(response));
		var index = 1;
		$.each(response, function(i, item) {

				//alert(JSON.stringify(item));

				//item.timeStamp;
			
				var consigneeName=item.record.consigneeName;
				consigneeName = consigneeName.split("_").join(" ");
				var status=item.record.pickupStatus;
				status = status.split("_").join(" ");

				var statusParamter=item.record.pickupStatus;
				statusParamter = status.split(" ").join("_");

				tempLists.push(index,item.record.pickupId,consigneeName,item.record.consigneeAddress,item.record.pickupWindow.from+'-'+item.record.pickupWindow.to,status,'<a href=pickupStatus.html?pickupId='+item.record.pickupId+'&pickupStatus='+statusParamter+'>View','<a href=txHistoryByPickupId.html?pickupId='+item.record.pickupId+'>History');
				index++;
				dataSets.push(tempLists);
				tempLists=[];
				//alert(dataSet);		               
			
		});

		$('#listofPickupForASingleCustomer').dataTable( {
			data: dataSets,
			columns: [
				{ title: "SNo" },
				{ title: "PickUp ID" },
				{ title: "Consignee Name" },
				{ title: "Contact Info" },
				{ title: "Estimated Pickup Time" },
				{ title: "Status" },
				{ title: "Details" },
				{ title: "History" },
			]
		} );
	} );
});
