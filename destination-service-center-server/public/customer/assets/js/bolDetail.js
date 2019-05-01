

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
    
	var bolId = getUrlParameter('bolId');
    
    
	document.getElementById('content-heading').innerHTML="BOL details for BOL ID "+bolId;
	
	function displayBOLDetails(){

	$.get("/billoflading/"+bolId, function(response){
		document.getElementById('purchaseOrder').innerHTML=response.purchaseOrderNumber;
		document.getElementById('shipperName').innerHTML=response.shipperName;
		document.getElementById('shipperName2').innerHTML=response.shipperName;
		document.getElementById('shipperAccountNo').innerHTML=response.shipperAccountNumber;
		document.getElementById('consigneeName').innerHTML=response.consigneeName;

		document.getElementById('consigneeAccountNo').innerHTML=response.consigneeAccountNumber;
		document.getElementById('shipperPhoneNo').innerHTML=response.shipperPhoneNo;
		document.getElementById('consigneePhoneNo').innerHTML=response.consigneePhoneNo;
		document.getElementById('sourceAddress').innerHTML=response.sourceAddress;
		document.getElementById('destinationAddress').innerHTML=response.destinationAddress;
		document.getElementById('bolId').innerHTML=bolId;

		document.getElementById('deliveryWindow').innerHTML=response.deliveryWindow.from+" "+response.deliveryWindow.to;

		document.getElementById('handlingUnit').innerHTML=response.freightDetails[0].handlingUnit;
		document.getElementById('pkgType').innerHTML=response.freightDetails[0].pkgType;
		document.getElementById('pieces').innerHTML=response.freightDetails[0].pieces;
		document.getElementById('packageDescription').innerHTML=response.freightDetails[0].packageDescription;
		document.getElementById('weight').innerHTML=response.freightDetails[0].weight;
		document.getElementById('nmfcItemNo').innerHTML=response.freightDetails[0].nmfcItemNo;
		document.getElementById('classification').innerHTML=response.freightDetails[0].classification;

		
		document.getElementById('pickupDate').innerHTML=response.pickupDate;
		document.getElementById('dateValue').innerHTML=response.pickupDate;
		document.getElementById('dateValue2').innerHTML=response.pickupDate;

		
		
		document.getElementById('shipperSignature').innerHTML=response.shipperSignature;
		document.getElementById('shipperSignature2').innerHTML=response.shipperSignature;
		document.getElementById('cityDriverId').innerHTML=response.cityDriverId;
		document.getElementById('trailerNo').innerHTML=response.trailerNo;

		
	
		
		
})
	}


	function getConsigneeDetails(){
		setTimeout(function(){
		var consigneeId=document.getElementById('consigneeAccountNo').innerHTML;

		$.get("/customer/"+consigneeId, function(response){

		
			document.getElementById('consigneeZipCode').innerHTML=response.zipCode;
			document.getElementById('consigneeCountry').innerHTML=response.country;
			document.getElementById('consigneeState').innerHTML=response.state;


		});
	}, 1500);

	}


	function getConsignorDetails(){
		setTimeout(function(){
		var shipperId=document.getElementById('shipperAccountNo').innerHTML;

		$.get("/customer/"+shipperId, function(response){

		
			document.getElementById('consignorZipCode').innerHTML=response.zipCode;
			document.getElementById('consignorCountry').innerHTML=response.country;
			document.getElementById('consignorState').innerHTML=response.state;


		});
	}, 1500);

	}

	var displayDetails = function() {
     
    };
    
    displayDetails.prototype.callDisplayBOLDetails = function() {
		displayBOLDetails()
      this.name = 'displayBOLDetails';
      return this;
	};
	
	displayDetails.prototype.callGetConsigneeDetails = function() {
		getConsigneeDetails()
      this.name = 'getConsigneeDetails';
      return this;
	};
	
	displayDetails.prototype.callGetConsignorDetails = function() {
		getConsignorDetails()
      this.name = 'getConsignorDetails';
      return this;
    };

   
      
   
  new displayDetails().callDisplayBOLDetails().callGetConsigneeDetails().callGetConsignorDetails();

