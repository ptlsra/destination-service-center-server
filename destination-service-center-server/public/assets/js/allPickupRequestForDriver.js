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


// replace service center value

	$.get("/pickups/driver/"+driverId, function(response){
		// alert(JSON.stringify(response));
		var index = 1;
		$.each(response, function(i, item) {

			var shipperName=item.record.shipperName;
			shipperName = shipperName.split("_").join(" ");
	
			var consigneeName=item.record.consigneeName;
            consigneeName = consigneeName.split("_").join(" ");
            var address=item.record.customerAddress;
            /*
            var address=item.record.address;
			address = address.split("_").join(" ");
*/
			var status=item.record.pickupStatus;
			status = status.split("_").join(" ");

			var statusParameter=item.record.pickupStatus;
			statusParameter = statusParameter.split(" ").join("_");


			

				tempLists.push(index,item.record.pickupId,address,item.record.pickupWindow.from+' - '+item.record.pickupWindow.to,status,'<a href=pickupStatusForDriver.html?pickupId='+item.record.pickupId+'&pickupStatus='+statusParameter+'>View');
				index++;
				dataSets.push(tempLists);
				tempLists=[];
				//alert(dataSet);		               
			
		});

		$('#allPickupRequestForDriver').dataTable( {
			data: dataSets,
			columns: [
				{ title: "SNo" },
				{ title: "Pickup ID" },
				{ title: "Address" },
				{ title: "PickUp Window" },
				{ title: "Current Status" },
				{ title: "View Details" }
			]
		} );
	} );
});

