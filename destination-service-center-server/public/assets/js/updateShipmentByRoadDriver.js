function updateShipmentByRoadDriver() {
  
	var files = document.getElementById('uploadShipmentImageByRoadDriver').files;
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

	
		
		var timeValue=new Date().toLocaleTimeString();
		 
	
		
		var contentType = 'image/png';
		
		var readerResult=reader.result;
		//readerResult.split('data:image/png;base64').join('')
		var b64Data = readerResult;
	
	

	var shipmentId=document.getElementById('shipmentId').innerHTML;
	var roadDriverId = document.getElementById('roadDriverId').innerHTML;

	
	//var roadDriverId=$('#assignRoadDriverForShipment').val();

	var date = new Date();


	setTimeout(function(){
		
		
var data = 
{
"shipmentId":shipmentId,
"time":date,
"uploadedBy":roadDriverId,
"comments":"Road Driver Picked Up Shipment",
"image":b64Data,
"statusUpdate":"Pickup Confirmed by Road Driver"
};

	  

alert(JSON.stringify(data))
   $.ajax({
   	
       dataType:"json",
       contentType: 'application/json; charset=UTF-8',
      // url:"/requestBOL?assetId="+assetId,		
      url:"/shipment/driver/roaddriver/updateshipment/",
      data: JSON.stringify(data),
       type:"PUT",
       global:false,
       async:false, 
       
					success: function(responseData){
						var txId=responseData.txId;
						var success=responseData.success;
				
						if(success==true){
						  document.getElementById("txHashstatus").innerHTML = txId; 
						  $('#success').modal(); 
    		   
    		   setTimeout(function(){ 
                   
				window.location.href="roadDriver.html?driverId="+roadDriverId;    	              
    	           }, 2000);


					}else{
						document.getElementById("txFailMessage").innerHTML = 'Transaction has failed.Please try again later.'; 
						$('#txFail').modal(); 
			  
						  setTimeout(function(){ 
								 
							window.location.href="roadDriver.html?driverId="+roadDriverId;    	              
						}, 2000);
					}
				}
				
				})
			

		
		}, 1000);
	}
			
 return false;
}
