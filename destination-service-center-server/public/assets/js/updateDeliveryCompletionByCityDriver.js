
  
function updateDepartureTimeByCityDriver() {


	
	//<img id="img" height="150">
	

 
  
	var cityDriverId=document.getElementById('cityDriverId').innerHTML;

	$.get("/driver/"+cityDriverId, function(dataValue){

	
	//var DR=document.getElementById('DR').innerHTML;
	var DR=document.getElementById('drNoValue').innerHTML;


	var shipmentId=document.getElementById('shipmentId').innerHTML;
	var userName=dataValue.emailId;


	var datetime=$("#departureTimeOfCityDriverForm").val();
	
	var currentdate = new Date(); 
	/*
	var datetime = currentdate.getDate() + "/"
					+ (currentdate.getMonth()+1)  + "/" 
					+ currentdate.getFullYear() + " : "  
					+ currentdate.getHours() + ":"  
					+ currentdate.getMinutes() + ":" 
					+ currentdate.getSeconds();
*/


var data = 
{
"shipmentId":shipmentId,
"statusUpdate":"Shipment Delivered Successfully"

};

var drData = 
{

"deliveryId":DR,
"userName":userName,
"departureTime":datetime

};

//alert(JSON.stringify(drData))


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

		   

$.ajax({
   
dataType:"json",
contentType: 'application/json; charset=UTF-8',
// url:"/requestBOL?assetId="+assetId,		
url:"/delivery/receipt/citydriver/updatereceipt",	
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
				 
			window.location.href="consignment.html";
		}, 2000);

		}
	}
		});
		

	

	})
return false;
	
}
