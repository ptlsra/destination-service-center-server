
  
function signShipmentByConsignee() {


	
		//<img id="img" height="150">
		

	 

        
		var DR=document.getElementById('drNoValue').innerHTML;


		var shipmentId=document.getElementById('shipmentId').innerHTML;
        var userName=localStorage.getItem("DestcustomerEmailId"); 





var data = 
{
"shipmentId":shipmentId,
"statusUpdate":"Received Approval from Consignee"

};

var drData = 
{

	"deliveryId":DR,
	"userName":userName
	
};


//alert(JSON.stringify(data))
   $.ajax({
   	
       dataType:"json",
       contentType: 'application/json; charset=UTF-8',
      // url:"/requestBOL?assetId="+assetId,		
      url:"/shipment/updateShipment",	
      data: JSON.stringify(data),
       type:"PUT",
       global:false,
       async:false, 
       success: function(result){
		$('#pending').modal();
       // alert(JSON.stringify(result))
      
        var txId=result.txId;
        var success=result.success;

        if(success==true){
   //    $('#success').modal(); // hode register driver modal

   setTimeout(function(){    
   
$.ajax({
   	
	dataType:"json",
	contentType: 'application/json; charset=UTF-8',
   // url:"/requestBOL?assetId="+assetId,		
   url:"/delivery/receipt/consignee/",	
   data: JSON.stringify(drData),
	type:"PUT",
	global:false,
	async:false, 
	success: function(response){

		var txId=response.txId;
        var success=response.success;
		if(success==true){
		
							
			
						$('#pending').hide();
						var txId=response.txId;
						var success=response.success;
				
						if(success==true){
						  document.getElementById("txHashstatus").innerHTML = txId; 
						  $('#success').modal(); 
    		   
    		   setTimeout(function(){ 
                   
				window.location.href="consignment.html";
    	              
    	           }, 2000);


					}else{
						document.getElementById("txFailMessage").innerHTML = 'Transaction has failed.Please try again later.'; 
						$('#txFail').modal(); 
			  
						  setTimeout(function(){ 
								 
                            window.location.href="consignment.html";
						}, 2000);
					}
				
			
		

		   }
		
		}
	
		});

	}, 5000);
        
          
			}
			
			else{
				document.getElementById("txFailMessage").innerHTML = 'Transaction has failed.Please try again later.'; 
			$('#txFail').modal(); 
  
			  setTimeout(function(){ 
					 
                window.location.href="consignment.html";
            }, 2000);

			}
        }
            });
			

        
	
		
 return false;
		
}
