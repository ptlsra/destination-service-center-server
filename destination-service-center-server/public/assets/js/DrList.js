$(document).ready(function(){
	

	var tempLists=[];
	var dataSets=[];




// replace service center value


	$.get("/delivery/receipts", function(response){
		// alert(JSON.stringify(response));
		var index = 1;
		$.each(response, function(i, item) {

		

		

			

				tempLists.push(index,item.record.freightBillId,item.record.shipMentId,item.record.shipperAddress,item.record.consigneeAddress,'<a href=getDRDetails.html?drNo='+item.record.freightBillId+'>View');
				index++;
				dataSets.push(tempLists);
				tempLists=[];
				//alert(dataSet);		               
			
		});

		$('#allDR').dataTable( {
			data: dataSets,
			columns: [
                { title: "SNo" },
                { title: "DR ID" },
				{ title: "Shipment ID" },
				{ title: "Source" },
				{ title: "Destination" },
		
				{ title: "View Details" }

			]
		} );
	} );
});

