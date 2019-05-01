$(document).ready(function(){
	

	var tempLists=[];
	var dataSets=[];




// replace service center value


	$.get("/bollist/servicecenter/servicecenter-002", function(response){
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

			statusParameter= statusParameter.split(" ").join("_");
			

				tempLists.push(index,item.record.billOfLadingId,item.record.purchaseOrderNumber,shipperName,consigneeName,'<a href=bolDetails.html?bolId='+item.record.billOfLadingId+'>View','<a href=getBolHistory.html?bolId='+item.record.billOfLadingId+'>View');
				index++;
				dataSets.push(tempLists);
				tempLists=[];
				//alert(dataSet);		               
			
		});

		$('#allBOL').dataTable( {
			data: dataSets,
			columns: [
                { title: "SNo" },
                { title: "BOL ID" },
				{ title: "Pickup ID" },
				{ title: "Shipper" },
				{ title: "Consignee" },
				{ title: "View Details" },
				{ title: "History" }

			]
		} );
	} );
});

