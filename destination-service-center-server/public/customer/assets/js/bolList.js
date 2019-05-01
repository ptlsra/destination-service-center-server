$(document).ready(function(){
	

	var tempLists=[];
	var dataSets=[];



    var customerId=localStorage.getItem("DestcustomerId");


	$.get("/bollist", function(response){
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
            var consigneeAccountNumber=item.record.consigneeAccountNumber;
            var shipperAccountNumber=item.record.shipperAccountNumber;

        
            if(customerId==consigneeAccountNumber || customerId==shipperAccountNumber){
                tempLists.push(index,item.record.billOfLadingId,item.record.purchaseOrderNumber,shipperName,consigneeName,'<a href=bolDetailsForCustomer.html?bolId='+item.record.billOfLadingId+'>View');
				index++;
				dataSets.push(tempLists);
				tempLists=[];

            }

			
				//alert(dataSet);		               
			
		});

		$('#allBOLforCustomer').dataTable( {
			data: dataSets,
			columns: [
                { title: "SNo" },
                { title: "BOL ID" },
				{ title: "Pickup ID" },
				{ title: "Shipper" },
				{ title: "Consignee" },
				{ title: "View Details" }

			]
		} );
	} );
});

