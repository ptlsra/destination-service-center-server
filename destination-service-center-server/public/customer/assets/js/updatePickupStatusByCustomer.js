function updatePickupStatusByCustomer() {
  

	

	var pickupId=document.getElementById('pickupIdforForm').innerHTML;

	var bolId=document.getElementById('bolId').innerHTML;
	
	

	var userName=localStorage.getItem('customerEmailId')


	var pickupStatus="Customer Sign Received"


var data = {
	"bolId":bolId,

	"userName":userName
};



var pickupStatusData={
		"pickupId":pickupId,
		"pickupStatus":pickupStatus,
		"userName":userName
	  }
	  

alert(JSON.stringify(data))
   $.ajax({
   	
       dataType:"json",
       contentType: 'application/json; charset=UTF-8',
      // url:"/requestBOL?assetId="+assetId,		
      url:"/billoflading/customer/updatepickup/",	
      data: JSON.stringify(data),
       type:"PUT",
       global:false,
       async:false, 
       success: function(result){

       // alert(JSON.stringify(result))
      
        var txId=result.txId;
        var success=result.success;

        if(success==true){
         // document.getElementById("txHashstatus").innerHTML = txId; 
   //    $('#success').modal(); // hode register driver modal

			   $('#pending').modal();
   

   setTimeout(function(){
	
							
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
						var txId=responseData.txId;
						var success=responseData.success;
				
						if(success==true){
							$('#pending').modal('hide');

						  document.getElementById("txHashstatus").innerHTML = txId; 
						  $('#success').modal(); 
    		   
    		   setTimeout(function(){ 
                   
                window.location.href="pickup.html";
    	              
    	           }, 2000);


					}else{
						document.getElementById("txFailMessage").innerHTML = 'Transaction has failed.Please try again later.'; 
						$('#txFail').modal(); 
			  
						  setTimeout(function(){ 
								 
                            window.location.href="pickup.html";
						}, 2000);
					}
				}
				})
			
	
			}, 4000);
	

		  
        
          
			}
			
			else{
				document.getElementById("txFailMessage").innerHTML = 'Transaction has failed.Please try again later.'; 
			$('#txFail').modal(); 
  
			  setTimeout(function(){ 
					 
					 window.location.href="pickup.html";
				  }, 2000);

			}
        }
            });
			

        
		 
			
 return false;
}
