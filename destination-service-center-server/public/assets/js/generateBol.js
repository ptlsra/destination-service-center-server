function generateBOL() {
  
   

var purchaseOrderNumber=document.getElementById('pickupIdforForm').innerHTML;
//var purchaseOrderNumber=document.getElementById('assignedServiceCenterForForm').innerHTML;
var shipperName=document.getElementById('consignorsNameForForm').innerHTML;
var shipperAccountNumber=document.getElementById('customerIdforForm').innerHTML;


var shipperAddress=document.getElementById('consignorsEmailForForm').innerHTML;

var consigneeName=document.getElementById('consigneeNameForForm').innerHTML;
var consigneeAddress=document.getElementById('consigneeEmailForForm').innerHTML;

var customerAddress=document.getElementById('consignorsAddress').innerHTML;

var receiverAddress=document.getElementById('consigneeAddress').innerHTML;

var consigneePhoneNo=document.getElementById('consigneePhoneNo').innerHTML;

//alert(consigneePhoneNo)
var consigneeAccountNumber=document.getElementById('consigneeId').innerHTML;

var shipperPhoneNumber=document.getElementById('consignorsPhoneNo').innerHTML;

document.getElementById('pickupWindowForForm').innerHTML;

document.getElementById('deliveryWindowForForm').innerHTML;
var pickupStatus="Generated BOL"


var cityDriver=$('#assignCityDriverForPickup').val();
 


var data = {
	"purchaseOrderNumber":purchaseOrderNumber,
	"shipperName":shipperName,
	"shipperAccountNumber":shipperAccountNumber,
	"shipperAddress":shipperAddress,
	"shipperAttentionTo":"",
	"shipperPhoneNumber":shipperPhoneNumber,
	"shipperSignature":"false",
	"consigneeName":consigneeName,
	"consigneeAddress":consigneeAddress,
	"consigneeAccountNumber":consigneeAccountNumber,
	"consigneeAttentionTo":"",
	"consigneePhoneNumber":consigneePhoneNo,
	"cityDriverId":cityDriver,
	"pickupArrivalTime":"",
	"pickupDepartTime":"",
	"freightTerms":"nil",
	"freightAmount":"0",
	"pickupStatus":pickupStatus,
	"sourceAddress":customerAddress,
	"destinationAddress":receiverAddress
};

   $.ajax({
   	
       dataType:"json",
       contentType: 'application/json; charset=UTF-8',
      // url:"/requestBOL?assetId="+assetId,		
      url:"/billoflading",	
      data: JSON.stringify(data),
       type:"POST",
       global:false,
       async:false, 
       success: function(result){

        
      
        var txId=result.txId;
        var success=result.success;

        if(success==true){
          document.getElementById("txHashstatus").innerHTML = txId; 
       $('#success').modal(); // hode register driver modal

    		   
    		   setTimeout(function(){ 
                   
    	              window.location.href="allPickupRequestForServiceCenter.html";
    	              
    	           }, 2000);
    		   			
    	   
    		   
    	   }else{
          document.getElementById("txFailMessage").innerHTML = 'Transaction has failed.Please try again later.'; 
          $('#txFail').modal(); 

            setTimeout(function(){ 
                   
                   window.location.href="allPickupRequestForServiceCenter.html";
                }, 2000);
          
            }
        }
            });
			

        
		  
			
 return false;
}