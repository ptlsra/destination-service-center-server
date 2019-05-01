

  
function assignCityDriverForDispatch() {

  

	
	

        var shipmentId=document.getElementById('shipmentId').innerHTML;
    
    
        var cityDriverId=$('#assigCityDriverForShipment').val();
    
    
    
        setTimeout(function(){
            $.get("/driver/"+cityDriverId, function(response){
    
            var driverName=response.firstName+" "+response.lastName;
            var cityDriverAdd=response.emailId;
            
    var data = 
    {
    "shipmentId":shipmentId,
    "destinationCityDriverId":cityDriverId,
    "destcityDriverName":driverName,
    "statusUpdate":"City Driver Assigned for Dispatch"
    };

    var delData = 
    {
    "shipmentId":shipmentId
    };
    
    
         $('#pending').modal(); 
    
    
       $.ajax({
           
           dataType:"json",
           contentType: 'application/json; charset=UTF-8',
          // url:"/requestBOL?assetId="+assetId,		
          url:"/shipment/driver/cityDriver",	
          data: JSON.stringify(data),
           type:"PUT",
           global:false,
           async:false, 
           
                        success: function(responseData){
                          
                            var success=responseData.success;
                    
                            if(success==true){


                                setTimeout(function(){ 

                                $.ajax({
           
                                    dataType:"json",
                                    contentType: 'application/json; charset=UTF-8',
                                   // url:"/requestBOL?assetId="+assetId,		
                                   url:"/delivery/receipt",	
                                   data: JSON.stringify(delData),
                                    type:"POST",
                                    global:false,
                                    async:false, 
                                    
                                                 success: function(responseValue){
                                                    
                                                    var txId=responseValue.txId;
                                                    var success=responseValue.success;

                                                    if(success==true){
                                                     //   alert(JSON.stringify(responseValue))

                                                     $('#pending').hide(); 
                              document.getElementById("txHashstatus").innerHTML = txId; 
                              $('#success').modal(); 
                   
                   setTimeout(function(){ 
                       
                    window.location.href="allShipments.html"; 
                     }, 4000);   	 
                                                    }
                                                    else{
                                                        document.getElementById("txFailMessage").innerHTML = 'Transaction has failed.Please try again later.'; 
                                                        $('#txFail').modal(); 
                                              
                                                          setTimeout(function(){ 
                                                                 
                                                            window.location.href="allShipments.html";
                                                        }, 2500);

                                                 }
                                                
                                                }
                                                
                                    })


                                }, 2500);   	          
                      
    
    
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
    