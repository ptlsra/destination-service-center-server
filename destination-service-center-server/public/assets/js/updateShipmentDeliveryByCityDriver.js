

  
function updateShipmentDeliveryByCityDriver() {

	var files = document.getElementById('uploadShipmentImageByCityDriver').files;
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
		//<img id="img" height="150">
		

		var arrivalTimeOfCityDriver=$('#arrivalTimeOfCityDriver').val()
	 


	

		var shipmentId=document.getElementById('shipmentId').innerHTML;
	var cityDriverId = document.getElementById('cityDriverId').innerHTML;
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
 
var drNo=document.getElementById('drNoValue').innerHTML;

var contentType = 'image/png';

var readerResult=reader.result;
//readerResult.split('data:image/png;base64').join('')
var b64Data = readerResult;

//var blob = b64toBlob(b64Data, contentType);
//var blobUrl = URL.createObjectURL(blob);

//var img = document.createElement('img');
//img.src = blobUrl;
		
var data = 
{
"shipmentId":shipmentId,
"time":timeValue,
"uploadedBy":cityDriverId,
"comments":"City Driver Delivered Up Shipment",
"image":b64Data,
"statusUpdate":"Ready to Deliver Shipment"
};

var drData = 
{

	"recId" :drNo,
	"dateofdelivery":today,
	"arrivaltimeofdriver":arrivalTimeOfCityDriver
	
};



//alert(JSON.stringify(data))
   $.ajax({
   	
       dataType:"json",
       contentType: 'application/json; charset=UTF-8',
      // url:"/requestBOL?assetId="+assetId,		
      url:"/shipment/driver/roaddriver/updateshipment/",	
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
          document.getElementById("txHashstatus").innerHTML = txId; 
   //    $('#success').modal(); // hode register driver modal

			   
   
$.ajax({
   	
	dataType:"json",
	contentType: 'application/json; charset=UTF-8',
   // url:"/requestBOL?assetId="+assetId,		
   url:"/delivery/receipt/updadeCityDriver",	
   data: JSON.stringify(drData),
	type:"PUT",
	global:false,
	async:false, 
	success: function(response){

		var txId=response.txId;
        var success=response.success;
		if(success==true){
			setTimeout(function(){ 
							
			
						$('#pending').hide();
						var txId=response.txId;
						var success=response.success;
				
						if(success==true){
						  document.getElementById("txHashstatus").innerHTML = txId; 
						  $('#success').modal(); 
    		   
    		   setTimeout(function(){ 
                   
				window.location.href="citydriver.html?driverId="+cityDriverId;
    	              
    	           }, 2000);


					}else{
						document.getElementById("txFailMessage").innerHTML = 'Transaction has failed.Please try again later.'; 
						$('#txFail').modal(); 
			  
						  setTimeout(function(){ 
								 
							window.location.href="citydriver.html?driverId="+cityDriverId;
						}, 2000);
					}
				
			
			}, 5000);

		   }
		
		}
	
		});

		  
        
          
			}
			
			else{
				document.getElementById("txFailMessage").innerHTML = 'Transaction has failed.Please try again later.'; 
			$('#txFail').modal(); 
  
			  setTimeout(function(){ 
					 
					 window.location.href="citydriver.html?driverId="+cityDriverId;
				  }, 2000);

			}
        }
            });
			

        
	} 
		
 return false;
		
}
