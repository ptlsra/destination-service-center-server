
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
   // shipmentStatus.html?shipmentId=shi-300000001&shipmentStatus=Created
	var shipmentId = getUrlParameter('shipmentId');
    var currentStatus = getUrlParameter('shipmentStatus');


    if(currentStatus=="City_Driver_Assigned_for_Dispatch" ){






var delData = 
{
"shipmentId":shipmentId
};






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

                                                 
                       
               
                                  }
                                }            
                                            
                                            
                                            
                                })
                            }

 

