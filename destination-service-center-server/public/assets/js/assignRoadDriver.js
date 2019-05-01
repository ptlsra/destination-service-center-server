function assignRoadDriver() {
  

	
	

	var shipmentId=document.getElementById('shipmentId').innerHTML;

	var trailerNumber=$('#trailerNo').val();

	var roadDriverId=$('#assignRoadDriverForShipment').val();



	setTimeout(function(){
		$.get("/driver/"+roadDriverId, function(response){

		var driverName=response.firstName+" "+response.lastName;
		var roadDriverAdd=response.emailId;
		
var data = 
{
"shipmentId":shipmentId,
"trailerNumber":trailerNumber,
"roadDriverName":driverName,
"roadDriverId":roadDriverId,
"roadDriverAdd":roadDriverAdd
};


	  


alert(JSON.stringify(data))
   $.ajax({
   	
       dataType:"json",
       contentType: 'application/json; charset=UTF-8',
      // url:"/requestBOL?assetId="+assetId,		
      url:"/shipment/driver/roadDriver",	
      data: JSON.stringify(data),
       type:"POST",
       global:false,
       async:false, 
       
					success: function(responseData){
						var txId=responseData.txId;
						var success=responseData.success;
				
						if(success==true){
						  document.getElementById("txHashstatus").innerHTML = txId; 
						  $('#success').modal(); 
    		   
    		   setTimeout(function(){ 
                   
				window.location.href="allShipments.html";    	              
    	           }, 2000);


					}else{
						document.getElementById("txFailMessage").innerHTML = 'Transaction has failed.Please try again later.'; 
						$('#txFail').modal(); 
			  
						  setTimeout(function(){ 
								 
							window.location.href="allShipments.html";
						}, 2000);
					}
				}
				})
			})

		
		}, 1000);
			
 return false;
}
