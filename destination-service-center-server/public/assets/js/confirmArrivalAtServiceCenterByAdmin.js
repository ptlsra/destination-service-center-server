function confirmArrivalAtServiceCenterByAdmin() {
  
	var files = document.getElementById('uploadArrivalImage').files;
	if (files.length > 0) {
		

	 // getBase64(files[0]);
	  var reader = new FileReader();
	  reader.readAsDataURL(files[0]);
	  
	  reader.onerror = function (error) {
		console.log('Error: ', error);
	  };
	}
 
	reader.onload = function () {
		
		console.log(reader);
	
	var pickupId=document.getElementById('pickupIdforForm').innerHTML;

	var bolId=document.getElementById('bolId').innerHTML;
	
	

	var userName="admin"


	var pickupStatus="Pickup at Source Service Centre"


	var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; 
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}

today = mm + '/' + dd + '/' + yyyy;
var pickupDate=today

var timeValue=new Date().toLocaleTimeString();
 
var createShipmentdata = {
	"bolId":bolId
};

var contentType = 'image/png';

var readerResult=reader.result;
//readerResult.split('data:image/png;base64').join('')
var b64Data = readerResult;

//var blob = b64toBlob(b64Data, contentType);
//var blobUrl = URL.createObjectURL(blob);

//var img = document.createElement('img');
//img.src = blobUrl;
var imagedata = {
	"pickupId":pickupId,
	"uploadedBy":userName,
	"time":timeValue,
	"comments":"Admin Uploading Pickup Images from Service Center",
	"imageData":b64Data,
	"userName":'admin'
};

var pickupStatusData={
		"pickupId":pickupId,
		"pickupStatus":pickupStatus,
		"userName":userName
	  }
	  


   	
	
							
				$.ajax({
					
					dataType:"json",
					contentType: 'application/json; charset=UTF-8',
				// url:"/requestBOL?assetId="+assetId,		
				url:"/pickup/pickupstatus",	
				data: JSON.stringify(pickupStatusData),
					type:"PUT",
					global:false,
					async:false, 
					success: function(responseData){
					
						var success=responseData.success;
				
						if(success==true){
							$('#pending').modal()
							setTimeout(function(){

								
							$.ajax({
					
								dataType:"json",
								contentType: 'application/json; charset=UTF-8',
							// url:"/requestBOL?assetId="+assetId,		
							url:"/shipment",	
							data: JSON.stringify(createShipmentdata),
								type:"POST",
								global:false,
								async:false, 
								success: function(response){
								
									if(success==true){

										setTimeout(function(){ 
										$.ajax({
   	
											dataType:"json",
											contentType: 'application/json; charset=UTF-8',
										   // url:"/requestBOL?assetId="+assetId,		
										   url:"/pickup/pickupimage",	
										   data: JSON.stringify(imagedata),
											type:"PUT",
											global:false,
											async:false, 
											success: function(responseDataValue){

												var txId=responseDataValue.txId;
												var success=responseDataValue.success;
												if(success==true){
													
													alert("yes")
										$('#pending').modal('hide')
										
										document.getElementById("txHashstatus").innerHTML = txId; 
										$('#success').modal(); 
							
											setTimeout(function(){ 
								
											window.location.href="allPickupRequestForServiceCenter.html";
									
											}, 2000);

											}
											else{
												document.getElementById("txFailMessage").innerHTML = 'Transaction has failed.Please try again later.'; 
												$('#txFail').modal(); 
									  
												  setTimeout(function(){ 
													
													window.location.href="allPickupRequestForServiceCenter.html";
												}, 2000);
											}



										}
									})
									
								}, 2500);


									
								}


								}
							
							})
						},3000)
					
							
					}else{
						document.getElementById("txFailMessage").innerHTML = 'Transaction has failed.Please try again later.'; 
						$('#txFail').modal(); 
			  
						  setTimeout(function(){ 
							
                            window.location.href="allPickupRequestForServiceCenter.html";
						}, 2000);
					}
				}
				})
			
           
			

			}
		 
			
 return false;
}
