

  
function updatePickupStatusByCityDriver() {

	var files = document.getElementById('uploadPickupImage').files;
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

	 
	var pickupId=document.getElementById('pickupIdforForm').innerHTML;

	var bolId=document.getElementById('bolId').innerHTML;
	
	var pickupArrivalTime=$('#pickupArrivalTime').val();
	var pickupDepartureTime=$('#pickupDepartureTime').val();
	var weightOfPickup=$('#weightOfPickup').val();
	var pieceCount=$('#pieceCount').val();
	var handlingUnit=$('#handlingUnit').val();
	var pkgType=$('#pkgType').val();
	var packageDescription=$('#packageDescription').val();
	var nmfcItemNo=$('#nmfcItemNo').val();

	var freightAmount=$('#freightAmount').val();

	var freightTerms=$('#freightTerms').val();

	var freightDescription=$('#freightDescription').val();


	var userName=localStorage.getItem('cityDriverEmailId')
	var cityDriverId=localStorage.getItem('cityDriverId')

	

	
var pickupStatus="Pickup Confirmed By City Driver";
var trailerNo="Not Existing";
var hm="No";
var classification="generic"

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
 


var data = {
	"bolId":bolId,
	"trailerNo":trailerNo,
	"pickupArrivalTime":pickupArrivalTime,
	"pickupDepartTime":pickupDepartureTime,
	"pickupStatus":pickupStatus,
	"weight":weightOfPickup,
	"pickupDate":pickupDate,
	"pieceCount":pieceCount,
	"handlingUnit":handlingUnit,
	"pkgType":pkgType,
	"pieces":pieceCount,
	"hm":hm,
	"packageDescription":packageDescription,
	"nmfcItemNo":nmfcItemNo,
	"classification":classification,
	"userName":userName,
	"freightAmount":freightAmount,
	"freightTerms":freightTerms,
	"freightDescription":freightDescription
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
	"comments":"Uploading Pickup Images",
	"imageData":b64Data,
	"userName":userName
};

//alert(imagedata)
var pickupStatusData={
		"pickupId":pickupId,
		"pickupStatus":pickupStatus,
		"userName":userName
	  }
	  


//alert(JSON.stringify(data))
   $.ajax({
   	
       dataType:"json",
       contentType: 'application/json; charset=UTF-8',
      // url:"/requestBOL?assetId="+assetId,		
      url:"/billoflading/citydriver/updatepickup",	
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
   url:"/pickup/pickupimage",	
   data: JSON.stringify(imagedata),
	type:"PUT",
	global:false,
	async:false, 
	success: function(response){

		var txId=response.txId;
        var success=response.success;
		if(success==true){
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
						$('#pending').hide();
						var txId=responseData.txId;
						var success=responseData.success;
				
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
				}
				})
			}, 8000);

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
