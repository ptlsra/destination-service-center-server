function confirmArrivalAtDestinationCenter() {
  

	
	

	var shipmentId=document.getElementById('shipmentId').innerHTML;


	var roadDriverId=$('#assignRoadDriverForShipment').val();

	var date = new Date();


	setTimeout(function(){
		
		
var data = 
{
"shipmentId":shipmentId,

"statusUpdate":"Shipment At Destination SC"
};

	  

//alert(JSON.stringify(data))
   $.ajax({
   	
       dataType:"json",
       contentType: 'application/json; charset=UTF-8',
      // url:"/requestBOL?assetId="+assetId,		
      url:"/shipment/updateshipment/",
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
			

		
		}, 1000);
			
 return false;
}
