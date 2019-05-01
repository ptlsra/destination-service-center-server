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


	$.get("/delivery/receipts", function(response){
		// alert(JSON.stringify(response));
		var index = 1;
		$.each(response, function(i, item) {

		
 var cityDriver=item.record.driverId;
		
			
        
		
            if(driverId==cityDriver){

                tempLists.push(index,item.record.freightBillId,item.record.shipMentId,item.record.shipperAddress,item.record.consigneeAddress,'<a href=getDRDetailsForCityDriver.html?drNo='+item.record.freightBillId+'>View');
                index++;
                dataSets.push(tempLists);
                tempLists=[];
            }
                                           
			
		});

		$('#allDRforCityDriver').dataTable( {
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

