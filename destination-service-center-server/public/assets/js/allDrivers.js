$(document).ready(function(){
	

	var tempLists=[];
	var dataSets=[];





	
	//$.get("/drivers", function(response){
		$.get("/servicecenter/driver/servicecenter-002", function(response){
		// alert(JSON.stringify(response));
		var index = 1;
		$.each(response, function(i, item) {

				//alert(JSON.stringify(item));

				//item.timeStamp;
			

				tempLists.push(index,item.record.driverId,item.record.driverType,item.record.firstName+' '+item.record.lastName,item.record.emailId);
				index++;
				dataSets.push(tempLists);
				tempLists=[];
				//alert(dataSet);		               
			
		});

		$('#allDrivers').dataTable( {
			data: dataSets,
			columns: [
				{ title: "SNo" },
				{ title: "Driver ID" },
				{ title: "Type" },
				{ title: "Name" },
				{ title: "Email" }
			]
		} );
	} );
});

