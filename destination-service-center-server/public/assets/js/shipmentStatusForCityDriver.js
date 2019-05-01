$(document).ready(function(){
	




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
    var cityDriverId=localStorage.getItem("cityDriverId");


    setInterval(function(){

         
        $.get("/shipment/"+shipmentId, function(response){

        //console.log(response)

       
        var status=response.status;
        status = status.split(" ").join("_");

        if(currentStatus!=status){
            

            window.location.href="citydriver.html?driverId="+cityDriverId;
        }

    });
},35000);


    function displayShipment(){
    
      
    
        $('#loadingModal').modal();



                if(currentStatus=="City_Driver_Assigned_for_Dispatch" || currentStatus=="Delivery_Receipt_created"){

                    $('#shipmentDisplayContainer').append( `
                   
                    <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Create Shipment</span></img>
                     <div class="vl">
                     <span  id="shipmentCreated" class="fontsizecustomnew margintime"> </span>
                     <span  id="shipmentTxId" class="fontsizecustomnew margintx"> </span>
                     </div>
                    <img src="assets/img/tick2.png"  class="b imageprop"> <span class="marginfortxData">Assign Road Driver for Shipment by SC1 admin </span></img>
                    <div class="vl">
                    <span  id="assignRoadDriverData" class="fontsizecustomnew margintime"> </span>
                    <span  id="shipmentTxId2" class="fontsizecustomnew margintx"> </span>
                    </div>
                    <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Confirm Pickup by Road Driver </span></img>
                    <div class="vl">
                     <span  id="confirmPickupByRoadDriver" class="fontsizecustomnew margintime"> </span>
                   
                 <span  id="shipmentTxId3" class="fontsizecustomnew margintx"> </span>
                    </div>
      

                    <img src="assets/img/tick2.png"class="b imageprop  animated fadeIn slow ">  <span class="marginfortxData">Shipment Delivered to Destination Service Center </span></img>
                    <div class="vl">
                           
                        <span  id="shipmentAtDestination" class="fontsizecustomnew margintime"> </span>
                   
                        <span  id="shipmentTxId4" class="fontsizecustomnew margintx"> </span>
                    </div> 

                    <img src="assets/img/tick2.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Assign City Driver by Destination Service Center </span></img>
                    <div class="vl">
                           
                        <span  id="confirmArrivalofPickup" class="fontsizecustomnew margintime"> </span>
                   
                        <span  id="shipmentTxId5" class="fontsizecustomnew margintx"> </span>
                    </div> 
      
                    <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Update Delivery of Shipment to Consignee </span></img>
                    <div class="vs animated slideInUp slower">
                           
                        <span  id="updateDeliveryOfShipmnetToConsignee" class="fontsizecustomnew margintime"> </span>
                   
                        <span  id="shipmentTxId6" class="fontsizecustomnew margintx"> </span>
                    </div>
          
                  <div class="container">
    
    
                  <table class="table table-bordered marginleftcustom">
                    <tr>
                      <td>Shipment ID</td>
                      <td id="shipmentId" class="fontclassbold"></td>
                      <td>Destination</td>
                      <td id="destination" class="fontclassbold"></td>
                    
                      <td>Staus</td>
                      <td id="shipmentStatus" class="fontclassbold"></td>

              
                   
                    
                    </table>
    
                    <h6 class="marginleftcustom">BOL Details</h6>

                    <form id="updateShipmentDeliveryByCityDriver"  onsubmit="return updateShipmentDeliveryByCityDriver()" action="" method="post">
    
                    <table class="table table-bordered marginleftcustom">



                    <tr>
                    <td>BOL ID</td>
                    <td id="bolId" class="fontclassbold"></td>
                    <td>Delivery</td>
                    <td id="deliveryWindow" class="fontclassbold"></td>
                  
                    <td>Destination Service Center</td>
                    <td id="destinationId" class="fontclassbold"></td>

                    <td>Pickup ID</td>
                    <td id="pickupId" class="fontclassbold"></td>
                    </tr>

                    <tr>
                    <td>Source Service Center</td>
                    <td id="sourceId" class="fontclassbold"></td>
                    <td>Source Address</td>
                    <td id="sourceAddress" class="fontclassbold"></td>
                  
                    <td>Pieces</td>
                    <td id="pieces" class="fontclassbold"></td>

                    <td>Weight</td>
                    <td id="weight" class="fontclassbold"></td>
                    </tr>


                    <tr>
                    <td>Freight Description</td>
                    <td id="freightDescription" class="fontclassbold"></td>
                    <td>Freight Amount</td>
                    <td id="freightAmount" class="fontclassbold"></td>
                  
                    <td>Classification</td>
                    <td id="classification" class="fontclassbold"></td>

                    <td>Handling Unit</td>
                    <td id="handlingUnit" class="fontclassbold"></td>
                    </tr>

                    <tr>
                    <td>NMFC#</td>
                    <td id="nmfcItemNo" class="fontclassbold"></td>
                    <td>Package Description</td>
                    <td id="pkgDescription" class="fontclassbold"></td>
                  
                    <td>Package Type</td>
                    <td id="pkgType" class="fontclassbold"></td>

                    <td>Freight Service Type</td>
                    <td id="freightServiceType" class="fontclassbold">ECON</td>
                    </tr>
                    <tr>
                    <td>Road Driver Name</td>
                    <td id="assignRoadDriverForShipment"></td>

                    <td>Road Driver ID</td>
                    <td id="roadDriverId"></td>

                    <td>Road Driver Email</td>
                    <td id="roadDriverEmail"></td>
                    <td>Trailer Number</td>
                    <td id="trailerNo">

                    </td>
                   
                    </tr>

                    <tr>
                    <td>City Driver Name</td>
                    <td id="assignCityDriverForShipment" colspan="3"></td>

                    <td>City Driver ID</td>
                    <td id="cityDriverId" colspan="3"></td>

                

             
                   
                    </tr>

                    

                    <tr>
                    <td>Image By Road Driver</td>
                    <td id="imageUploadedByRoadDriver" ></td>

                    <td>Delivery Receipt</td>
                    <td id="DR" ></td>
                    <td id="drNoValue" ></td>


                    <td>Arrival Time</td>
                    <td ><input type="text" id="arrivalTimeOfCityDriver" placeholder="Update Arrival Time" required></td>

                    <td>Upload Image</td>
                   <td> <input type="file" id="uploadShipmentImageByCityDriver" required></td>

                    </tr>
                    </table>
                    <input type="submit" value="Confirm Delivery of Goods to Consignee" class="btn adminBtn marginleftcustom" name="submitButton">


                    </form>
                  </div>
    
                  <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Update Sign From Consignee </span></img>
                  <div class="vs animated slideInUp slower">
                         
                      <span  id="updateSignFromConsignee" class="fontsizecustomnew margintime"> </span>
                 
                      <span  id="shipmentTxId7" class="fontsizecustomnew margintx"> </span>
                  </div> 

                  <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Update Sign from City Driver </span></img>
                  <div class="vs animated slideInUp slower">
                         
                      <span  id="updateSignFromCityDriver" class="fontsizecustomnew margintime"> </span>
                 
                      <span  id="shipmentTxId8" class="fontsizecustomnew margintx"> </span>
                  </div> 
                   
              
              
                  `);
    

                }



                if(currentStatus=="Ready_to_Deliver_Shipment"){

                    $('#shipmentDisplayContainer').append( `
                   
                    <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Create Shipment</span></img>
                    <div class="vl">
                    <span  id="shipmentCreated" class="fontsizecustomnew margintime"> </span>
                    <span  id="shipmentTxId" class="fontsizecustomnew margintx"> </span>
                    </div>
                   <img src="assets/img/tick2.png"  class="b imageprop"> <span class="marginfortxData">Assign Road Driver for Shipment by SC1 admin </span></img>
                   <div class="vl">
                   <span  id="assignRoadDriverData" class="fontsizecustomnew margintime"> </span>
                   <span  id="shipmentTxId2" class="fontsizecustomnew margintx"> </span>
                   </div>
                   <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Confirm Pickup by Road Driver </span></img>
                   <div class="vl">
                    <span  id="confirmPickupByRoadDriver" class="fontsizecustomnew margintime"> </span>
                  
                <span  id="shipmentTxId3" class="fontsizecustomnew margintx"> </span>
                   </div>
     

                   <img src="assets/img/tick2.png"class="b imageprop  animated fadeIn slow ">  <span class="marginfortxData">Shipment Delivered to Destination Service Center </span></img>
                   <div class="vl">
                          
                       <span  id="shipmentAtDestination" class="fontsizecustomnew margintime"> </span>
                  
                       <span  id="shipmentTxId4" class="fontsizecustomnew margintx"> </span>
                   </div> 

                   <img src="assets/img/tick2.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Assign City Driver by Destination Service Center </span></img>
                   <div class="vl">
                          
                       <span  id="confirmArrivalofPickup" class="fontsizecustomnew margintime"> </span>
                  
                       <span  id="shipmentTxId5" class="fontsizecustomnew margintx"> </span>
                   </div> 
     
                   <img src="assets/img/tick2.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Update Delivery of Shipment to Consignee </span></img>
                   <div class="vl animated slideInUp slower">
                          
                       <span  id="updateDeliveryOfShipmnetToConsignee" class="fontsizecustomnew margintime"> </span>
                  
                       <span  id="shipmentTxId6" class="fontsizecustomnew margintx"> </span>
                   </div>

                    <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Update Sign From Consignee </span></img>
                    <div class="vs animated slideInUp slower">
                           
                        <span  id="updateSignFromConsignee" class="fontsizecustomnew margintime"> </span>
                   
                        <span  id="shipmentTxId7" class="fontsizecustomnew margintx"> </span>
                    </div> 
                  <div class="container">
    
    
                  <table class="table table-bordered marginleftcustom">
                    <tr>
                      <td>Shipment ID</td>
                      <td id="shipmentId" class="fontclassbold"></td>
                      <td>Destination</td>
                      <td id="destination" class="fontclassbold"></td>
                    
                      <td>Staus</td>
                      <td id="shipmentStatus" class="fontclassbold"></td>

              
                   
                    
                    </table>
    
                    <h6 class="marginleftcustom">BOL Details</h6>

                    <form id="updateShipmentDeliveryByCityDriver"  onsubmit="return updateShipmentDeliveryByCityDriver()" action="" method="post">
    
                    <table class="table table-bordered marginleftcustom">



                    <tr>
                    <td>BOL ID</td>
                    <td id="bolId" class="fontclassbold"></td>
                    <td>Delivery</td>
                    <td id="deliveryWindow" class="fontclassbold"></td>
                  
                    <td>Destination Service Center</td>
                    <td id="destinationId" class="fontclassbold"></td>

                    <td>Pickup ID</td>
                    <td id="pickupId" class="fontclassbold"></td>
                    </tr>

                    <tr>
                    <td>Source Service Center</td>
                    <td id="sourceId" class="fontclassbold"></td>
                    <td>Source Address</td>
                    <td id="sourceAddress" class="fontclassbold"></td>
                  
                    <td>Pieces</td>
                    <td id="pieces" class="fontclassbold"></td>

                    <td>Weight</td>
                    <td id="weight" class="fontclassbold"></td>
                    </tr>


                    <tr>
                    <td>Freight Description</td>
                    <td id="freightDescription" class="fontclassbold"></td>
                    <td>Freight Amount</td>
                    <td id="freightAmount" class="fontclassbold"></td>
                  
                    <td>Classification</td>
                    <td id="classification" class="fontclassbold"></td>

                    <td>Handling Unit</td>
                    <td id="handlingUnit" class="fontclassbold"></td>
                    </tr>

                    <tr>
                    <td>NMFC#</td>
                    <td id="nmfcItemNo" class="fontclassbold"></td>
                    <td>Package Description</td>
                    <td id="pkgDescription" class="fontclassbold"></td>
                  
                    <td>Package Type</td>
                    <td id="pkgType" class="fontclassbold"></td>

                    <td>Freight Service Type</td>
                    <td id="freightServiceType" class="fontclassbold"></td>
                    </tr>
                    <tr>
                    <td>Road Driver Name</td>
                    <td id="assignRoadDriverForShipment"></td>

                    <td>Road Driver ID</td>
                    <td id="roadDriverId"></td>

                    <td>Road Driver Email</td>
                    <td id="roadDriverEmail"></td>
                    <td>Trailer Number</td>
                    <td id="trailerNo">

                    </td>
                   
                    </tr>

                    <tr>
                    <td>City Driver Name</td>
                    <td id="assignCityDriverForShipment" colspan="3"></td>

                    <td>City Driver ID</td>
                    <td id="cityDriverId" colspan="3"></td>

                

             
                   
                    </tr>

                    

                    <tr>
                    <td>Shipment Image</td>
                    <td id="imageUploadedByRoadDriver" ></td>

                    <td  >Delivery Receipt</td>
                    <td id="DR" colspan="2"></td>
                    <td id="drNoValue" ></td>



                    <td colspan="2">Arrival Time</td>
                    <td ><input type="text" id="arrivalTimeOfCityDriver" readonly></td>

                   
                    </tr>
                    </table>


                    </form>
                  </div>
    
              

                  <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Update Sign from City Driver </span></img>
                  <div class="vs animated slideInUp slower">
                         
                      <span  id="updateSignFromCityDriver" class="fontsizecustomnew margintime"> </span>
                 
                      <span  id="shipmentTxId8" class="fontsizecustomnew margintx"> </span>
                  </div> 
                   
              
              
                  `);
    

                }



                if(currentStatus=="Received_Approval_from_Consignee" ){

                    $('#shipmentDisplayContainer').append( `
                   
                    <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Create Shipment</span></img>
                     <div class="vl">
                     <span  id="shipmentCreated" class="fontsizecustomnew margintime"> </span>
                     <span  id="shipmentTxId" class="fontsizecustomnew margintx"> </span>
                     </div>
                    <img src="assets/img/tick2.png"  class="b imageprop"> <span class="marginfortxData">Assign Road Driver for Shipment by SC1 admin </span></img>
                    <div class="vl">
                    <span  id="assignRoadDriverData" class="fontsizecustomnew margintime"> </span>
                    <span  id="shipmentTxId2" class="fontsizecustomnew margintx"> </span>
                    </div>
                    <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Confirm Pickup by Road Driver </span></img>
                    <div class="vl">
                     <span  id="confirmPickupByRoadDriver" class="fontsizecustomnew margintime"> </span>
                   
                 <span  id="shipmentTxId3" class="fontsizecustomnew margintx"> </span>
                    </div>
      

                    <img src="assets/img/tick2.png"class="b imageprop  animated fadeIn slow ">  <span class="marginfortxData">Shipment Delivered to Destination Service Center </span></img>
                    <div class="vl">
                           
                    <span  id="shipmentAtDestination" class="fontsizecustomnew margintime"> </span>
                   
                    <span  id="shipmentTxId4" class="fontsizecustomnew margintx"> </span>
                    </div> 

                    <img src="assets/img/tick2.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Assign City Driver by Destination Service Center </span></img>
                    <div class="vl">
                           
                        <span  id="confirmArrivalofPickup" class="fontsizecustomnew margintime"> </span>
                   
                        <span  id="shipmentTxId5" class="fontsizecustomnew margintx"> </span>
                    </div> 
      
                    <img src="assets/img/tick2.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Update Delivery of Shipment to Consignee </span></img>
                    <div class="vl">
                           
                        <span  id="updateDeliveryOfShipmnetToConsignee" class="fontsizecustomnew margintime"> </span>
                   
                        <span  id="shipmentTxId6" class="fontsizecustomnew margintx"> </span>
                    </div>
          

                    <img src="assets/img/tick2.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Update Sign From Consignee </span></img>
                    <div class="vl">
                           
                        <span  id="updateSignFromConsignee" class="fontsizecustomnew margintime"> </span>
                   
                        <span  id="shipmentTxId7" class="fontsizecustomnew margintx"> </span>
                    </div> 

                    <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Update Sign from City Driver </span></img>
                    <div class="vs animated slideInUp slower">
                           
                        <span  id="updateSignFromCityDriver" class="fontsizecustomnew margintime"> </span>
                   
                        <span  id="shipmentTxId8" class="fontsizecustomnew margintx"> </span>
                    </div> 
                  <div class="container">

                  
    
    
                  <table class="table table-bordered marginleftcustom">
                    <tr>
                      <td>Shipment ID</td>
                      <td id="shipmentId" class="fontclassbold"></td>
                      <td>Destination</td>
                      <td id="destination" class="fontclassbold"></td>
                    
                      <td>Staus</td>
                      <td id="shipmentStatus" class="fontclassbold"></td>

              
                   
                    
                    </table>
    
                    <h6 class="marginleftcustom">BOL Details</h6>

                    <form id="updateDepartureTimeByCityDriver"  onsubmit="return updateDepartureTimeByCityDriver()" action="" method="post">
    
                    <table class="table table-bordered marginleftcustom">



                    <tr>
                    <td>BOL ID</td>
                    <td id="bolId" class="fontclassbold"></td>
                    <td>Delivery</td>
                    <td id="deliveryWindow" class="fontclassbold"></td>
                  
                    <td>Destination Service Center</td>
                    <td id="destinationId" class="fontclassbold"></td>

                    <td>Pickup ID</td>
                    <td id="pickupId" class="fontclassbold"></td>
                    </tr>

                    <tr>
                    <td>Source Service Center</td>
                    <td id="sourceId" class="fontclassbold"></td>
                    <td>Source Address</td>
                    <td id="sourceAddress" class="fontclassbold"></td>
                  
                    <td>Pieces</td>
                    <td id="pieces" class="fontclassbold"></td>

                    <td>Weight</td>
                    <td id="weight" class="fontclassbold"></td>
                    </tr>


                    <tr>
                    <td>Freight Description</td>
                    <td id="freightDescription" class="fontclassbold"></td>
                    <td>Freight Amount</td>
                    <td id="freightAmount" class="fontclassbold"></td>
                  
                    <td>Classification</td>
                    <td id="classification" class="fontclassbold"></td>

                    <td>Handling Unit</td>
                    <td id="handlingUnit" class="fontclassbold"></td>
                    </tr>

                    <tr>
                    <td>NMFC#</td>
                    <td id="nmfcItemNo" class="fontclassbold"></td>
                    <td>Package Description</td>
                    <td id="pkgDescription" class="fontclassbold"></td>
                  
                    <td>Package Type</td>
                    <td id="pkgType" class="fontclassbold"></td>

                    <td>Freight Service Type</td>
                    <td id="freightServiceType" class="fontclassbold"></td>
                    </tr>
                    <tr>
                    <td>Road Driver Name</td>
                    <td id="assignRoadDriverForShipment"></td>

                    <td>Road Driver ID</td>
                    <td id="roadDriverId"></td>

                    <td>Road Driver Email</td>
                    <td id="roadDriverEmail"></td>
                    <td>Trailer Number</td>
                    <td id="trailerNo">

                    </td>
                   
                    </tr>

                    <tr>
                    <td>City Driver Name</td>
                    <td id="assignCityDriverForShipment" colspan="3"></td>

                    <td>City Driver ID</td>
                    <td id="cityDriverId" ></td>

                

                    <td>Customer Sign Received</td>
                    <td >True</td>
             
                   
                    </tr>

                    

                    <tr>
                    <td>Shipment Image</td>
                    <td id="imageUploadedByRoadDriver" ></td>

                    <td>Delivery Receipt</td>
                    <td id="DR" ></td>
                    <td id="drNoValue" ></td>



                    <td>Arrival Time</td>
                    <td ><input type="text" id="arrivalTimeOfCityDriver" ></td>

                    <td>Departure Time</td>
                    <td ><input type="text" id="departureTimeOfCityDriverForm" required></td>


                   
                    </tr>
                    </table>
                    <input type="submit" value="Confirm Completion Of Delivery" class="btn adminBtn marginleftcustom" name="submitButton">

                    </form>
                  </div>
    
              

                
                   
              
              
                  `);
    

                }



                if(currentStatus=="Shipment_Delivered_Successfully" ){

                    $('#shipmentDisplayContainer').append( `
                   
                    <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Create Shipment</span></img>
                     <div class="vl">
                     <span  id="shipmentCreated" class="fontsizecustomnew margintime"> </span>
                     <span  id="shipmentTxId" class="fontsizecustomnew margintx"> </span>
                     </div>
                    <img src="assets/img/tick2.png"  class="b imageprop"> <span class="marginfortxData">Assign Road Driver for Shipment by SC1 admin </span></img>
                    <div class="vl">
                    <span  id="assignRoadDriverData" class="fontsizecustomnew margintime"> </span>
                    <span  id="shipmentTxId2" class="fontsizecustomnew margintx"> </span>
                    </div>
                    <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Confirm Pickup by Road Driver </span></img>
                    <div class="vl">
                     <span  id="confirmPickupByRoadDriver" class="fontsizecustomnew margintime"> </span>
                   
                 <span  id="shipmentTxId3" class="fontsizecustomnew margintx"> </span>
                    </div>
      

                    <img src="assets/img/tick2.png"class="b imageprop  animated fadeIn slow ">  <span class="marginfortxData">Shipment Delivered to Destination Service Center </span></img>
                    <div class="vl">
                           
                    <span  id="shipmentAtDestination" class="fontsizecustomnew margintime"> </span>
                   
                    <span  id="shipmentTxId4" class="fontsizecustomnew margintx"> </span>
                    </div> 

                    <img src="assets/img/tick2.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Assign City Driver by Destination Service Center </span></img>
                    <div class="vl">
                           
                        <span  id="confirmArrivalofPickup" class="fontsizecustomnew margintime"> </span>
                   
                        <span  id="shipmentTxId5" class="fontsizecustomnew margintx"> </span>
                    </div> 
      
                    <img src="assets/img/tick2.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Update Delivery of Shipment to Consignee </span></img>
                    <div class="vl">
                           
                        <span  id="updateDeliveryOfShipmnetToConsignee" class="fontsizecustomnew margintime"> </span>
                   
                        <span  id="shipmentTxId6" class="fontsizecustomnew margintx"> </span>
                    </div>
          

                    <img src="assets/img/tick2.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Update Sign From Consignee </span></img>
                    <div class="vl">
                           
                        <span  id="updateSignFromConsignee" class="fontsizecustomnew margintime"> </span>
                   
                        <span  id="shipmentTxId7" class="fontsizecustomnew margintx"> </span>
                    </div> 

                    <img src="assets/img/tick2.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Update Sign from City Driver </span></img>
                    <div class="vl">
                           
                        <span  id="updateSignFromCityDriver" class="fontsizecustomnew margintime"> </span>
                   
                        <span  id="shipmentTxId8" class="fontsizecustomnew margintx"> </span>
                    </div> 
                  <div class="container">

                  
    
    
                  <table class="table table-bordered marginleftcustom">
                    <tr>
                      <td>Shipment ID</td>
                      <td id="shipmentId" class="fontclassbold"></td>
                      <td>Destination</td>
                      <td id="destination" class="fontclassbold"></td>
                    
                      <td>Staus</td>
                      <td id="shipmentStatus" class="fontclassbold"></td>

              
                   
                    
                    </table>
    
                    <h6 class="marginleftcustom">BOL Details</h6>

                    <form id="updateDepartureTimeByCityDriver"  onsubmit="return updateDepartureTimeByCityDriver()" action="" method="post">
    
                    <table class="table table-bordered marginleftcustom">



                    <tr>
                    <td>BOL ID</td>
                    <td id="bolId" class="fontclassbold"></td>
                    <td>Delivery</td>
                    <td id="deliveryWindow" class="fontclassbold"></td>
                  
                    <td>Destination Service Center</td>
                    <td id="destinationId" class="fontclassbold"></td>

                    <td>Pickup ID</td>
                    <td id="pickupId" class="fontclassbold"></td>
                    </tr>

                    <tr>
                    <td>Source Service Center</td>
                    <td id="sourceId" class="fontclassbold"></td>
                    <td>Source Address</td>
                    <td id="sourceAddress" class="fontclassbold"></td>
                  
                    <td>Pieces</td>
                    <td id="pieces" class="fontclassbold"></td>

                    <td>Weight</td>
                    <td id="weight" class="fontclassbold"></td>
                    </tr>


                    <tr>
                    <td>Freight Description</td>
                    <td id="freightDescription" class="fontclassbold"></td>
                    <td>Freight Amount</td>
                    <td id="freightAmount" class="fontclassbold"></td>
                  
                    <td>Classification</td>
                    <td id="classification" class="fontclassbold"></td>

                    <td>Handling Unit</td>
                    <td id="handlingUnit" class="fontclassbold"></td>
                    </tr>

                    <tr>
                    <td>NMFC#</td>
                    <td id="nmfcItemNo" class="fontclassbold"></td>
                    <td>Package Description</td>
                    <td id="pkgDescription" class="fontclassbold"></td>
                  
                    <td>Package Type</td>
                    <td id="pkgType" class="fontclassbold"></td>

                    <td>Freight Service Type</td>
                    <td id="freightServiceType" class="fontclassbold"></td>
                    </tr>
                    <tr>
                    <td>Road Driver Name</td>
                    <td id="assignRoadDriverForShipment"></td>

                    <td>Road Driver ID</td>
                    <td id="roadDriverId"></td>

                    <td>Road Driver Email</td>
                    <td id="roadDriverEmail"></td>
                    <td>Trailer Number</td>
                    <td id="trailerNo">

                    </td>
                   
                    </tr>

                    <tr>
                    <td>City Driver Name</td>
                    <td id="assignCityDriverForShipment" colspan="3"></td>

                    <td>City Driver ID</td>
                    <td id="cityDriverId" colspan="3"></td>

                

             
                   
                    </tr>

                    

                    <tr>
                    <td>Shipment Image</td>
                    <td id="imageUploadedByRoadDriver" ></td>

                    <td>Delivery Receipt</td>
                    <td id="DR" ></td>
                    <td id="drNoValue" ></td>


                    <td>Arrival Time</td>
                    <td ><input type="text" id="arrivalTimeOfCityDriver" ></td>

                    <td>Customer Sign Received</td>
                    <td > True</td>

                   
                    </tr>

                    <tr>
                    <td>Date Of Delivery</td>
                    <td id="dateOfDelivery" ></td>

                    <td>Departure Time</td>
                    <td id="departureTime" colspan="2"></td>


                    <td>Driver Sign</td>
                  
                    <td id="driverSign" colspan="2"></td>

                   
                    </tr>
                    </table>

                    </form>
                  </div>
    
              

                
                   
              
              
                  `);
    

                }
                
            }

  
            


            function getShipmentDetailsForTable(){


                $.get("/shipment/"+shipmentId, function(response){

                    var status=response.status;
                    status = status.split("_").join(" ");
            //        alert(status)
                    document.getElementById('shipmentId').innerHTML=shipmentId;
                    document.getElementById('destination').innerHTML=response.dest;
                    document.getElementById('shipmentStatus').innerHTML=status;
                //    document.getElementById('bolId').innerHTML=response.billOfLadingId;

                document.getElementById('bolId').innerHTML='<a href=bolForCityDriver.html?bolId='+response.billOfLadingId+'>'+response.billOfLadingId;
                getBOLDetails(response.billOfLadingId);

                    var imageData=response.ImageTracking.image;
                    var destCitydriverName=response.destCitydriverName;
                    var DR=response.delivey;

                    //Ready_to_Deliver_Shipment

                    
                    if(DR){
                       // document.getElementById('DR').innerHTML=DR;
                        document.getElementById('DR').innerHTML= '<a href=getDRDetailsForCityDriver.html?drNo='+DR+'>'+DR;
                       
                        document.getElementById('drNoValue').innerHTML= DR;
                       
                        document.getElementById('drNoValue').style.display = "none";                         
                        setTimeout(function(){
                        $.get("/delivery/receipt/"+DR, function(data){

                       // alert(JSON.stringify(data))
                        var arrivalTime=data.arrivalTimeOfDriver;
                        var departureTimeOfDriver=data.departureTimeOfDriver;

                        
                        if(arrivalTime){
                            $('#arrivalTimeOfCityDriver').val(data.arrivalTimeOfDriver);

                        }

                        var customerSign=data.customerSign;
                        
                       /* if(customerSign=="true"){
                            document.getElementById('consigneeSign').innerHTML=customerSign;

                        }*/
                        if(departureTimeOfDriver!=" "){
                            document.getElementById('dateOfDelivery').innerHTML=data.dateOfDelivery;

                            document.getElementById('departureTime').innerHTML=data.departureTimeOfDriver;
                            document.getElementById('driverSign').innerHTML=data.driverSign;

                        }
                        
                      


                    });
                },2000)

                    }
                    

                    var trailerNo=response.trailerNo;

                    if(destCitydriverName){
                     
    
                       
                        document.getElementById('assignCityDriverForShipment').innerHTML=response.destCitydriverName;

                        document.getElementById('cityDriverId').innerHTML=response.destinationcitydriverId;

                    }
                    if(trailerNo){
                        document.getElementById('assignRoadDriverForShipment').innerHTML=response.roadDriverName;
                        
                        document.getElementById('roadDriverEmail').innerHTML=response.roadDriverAddr;
                        document.getElementById('roadDriverId').innerHTML=response.roadDriverId;
                        document.getElementById('trailerNo').innerHTML=response.trailerNo;

                    }


                    if(imageData){
                        document.getElementById('imageUploadedByRoadDriver').innerHTML='<a data-toggle="modal" href="#setImageModal">View Image</a>'
            
            document.getElementById('setImageData').innerHTML='<img src=\"'+imageData+'\"width=\"400px\" height=\"150px\">'
                    }


                });
            }         


      


            function setHistory(){
                setTimeout(function(){
            
                $.get("/history/shipment/"+shipmentId, function(response){
                    $('#loadingModal').modal('hide');

                    // alert(JSON.stringify(response));
                    var index = 1;
                    $.each(response, function(i, item) {
            
            
                        var status=item.value.status;
                        status = status.split("_").join(" ");
                       // var bolId=item.value.bolId;
                       
                        if(status=="Created"){
                            document.getElementById('shipmentCreated').innerHTML=' - Executed at '+item.timestamp;
                            document.getElementById('shipmentTxId').innerHTML=' with txId: <button class="buttonLink" onclick=getTxDetails("'+item.txId+'")>'+item.txId+'</button>';
            
                        }
        
                        if(status=="Road Driver Assigned"){
                            document.getElementById('assignRoadDriverData').innerHTML=' - Executed at '+item.timestamp;
                            document.getElementById('shipmentTxId2').innerHTML=' with txId: <button class="buttonLink" onclick=getTxDetails("'+item.txId+'")>'+item.txId+'</button>';
            
                        }
        
                        if(status=="Pickup Confirmed by Road Driver"){
                            document.getElementById('confirmPickupByRoadDriver').innerHTML=' - Executed at '+item.timestamp;
                            document.getElementById('shipmentTxId3').innerHTML=' with txId: <button class="buttonLink" onclick=getTxDetails("'+item.txId+'")>'+item.txId+'</button>';
            
                        }
        
                      
        
                        if(status=="Shipment Delivered by Road Driver"){
                            document.getElementById('shipmentAtDestination').innerHTML=' - Executed at '+item.timestamp;
                            document.getElementById('shipmentTxId4').innerHTML=' with txId: <button class="buttonLink" onclick=getTxDetails("'+item.txId+'")>'+item.txId+'</button>';
            
                        }
        
                        if(status=="Shipment At Destination SC"){
                            document.getElementById('confirmArrivalofPickup').innerHTML=' - Executed at '+item.timestamp;
                            document.getElementById('shipmentTxId5').innerHTML=' with txId: <button class="buttonLink" onclick=getTxDetails("'+item.txId+'")>'+item.txId+'</button>';
            
                        }
        
                        if(status=="Ready to Deliver Shipment"){
                            document.getElementById('updateDeliveryOfShipmnetToConsignee').innerHTML=' - Executed at '+item.timestamp;
                            document.getElementById('shipmentTxId6').innerHTML=' with txId: <button class="buttonLink" onclick=getTxDetails("'+item.txId+'")>'+item.txId+'</button>';
            
                        }
        
                        if(status=="Received Approval from Consignee"){
                            document.getElementById('updateSignFromConsignee').innerHTML=' - Executed at '+item.timestamp;
                            document.getElementById('shipmentTxId7').innerHTML=' with txId: <button class="buttonLink" onclick=getTxDetails("'+item.txId+'")>'+item.txId+'</button>';
            
                        }
        
                        if(status=="Shipment Delivered Successfully"){
                            document.getElementById('updateSignFromCityDriver').innerHTML=' - Executed at '+item.timestamp;
                            document.getElementById('shipmentTxId8').innerHTML=' with txId: <button class="buttonLink" onclick=getTxDetails("'+item.txId+'")>'+item.txId+'</button>';
            
                        }
                        
                       
                        
                        
                    })
                })
        
            },4500)
            }


            function getBOLDetails(bolId){
                setTimeout(function(){
                //var bolId=document.getElementById('bolId').innerHTML;
                $.get("/billoflading/"+bolId, function(response){

                

                    document.getElementById('deliveryWindow').innerHTML=response.deliveryWindow.from+"-"+response.deliveryWindow.to;
                    document.getElementById('destinationId').innerHTML=response.destinationServiceCenterId;
                    document.getElementById('pickupId').innerHTML=response.purchaseOrderNumber;
                    document.getElementById('sourceId').innerHTML=response.sourceServiceCenterId;
                    document.getElementById('sourceAddress').innerHTML=response.sourceAddress;
                    document.getElementById('pieces').innerHTML=response.pieceCount;
                    document.getElementById('weight').innerHTML=response.weight;
                    document.getElementById('freightDescription').innerHTML=response.freightDescription;
                    document.getElementById('freightAmount').innerHTML=response.freightAmount;
                    document.getElementById('classification').innerHTML=response.freightDetails[0].classification;
                    document.getElementById('handlingUnit').innerHTML=response.freightDetails[0].handlingUnit;
                    document.getElementById('nmfcItemNo').innerHTML=response.freightDetails[0].nmfcItemNo;

                      document.getElementById('pkgDescription').innerHTML=response.freightDetails[0].packageDescription;
                    document.getElementById('pkgType').innerHTML=response.freightDetails[0].pkgType;

                 


                });
            }, 1000);

            }        

      

    var displayShipmentDetails = function() {
     
    };
    
    displayShipmentDetails.prototype.callDisplayShipment = function() {
      displayShipment()
      this.name = 'displayShipment';
      return this;
    };

    displayShipmentDetails.prototype.getShipmentTableDetails = function() {
        getShipmentDetailsForTable()
        this.name = 'getShipmentDetailsForTable';
        return this;
      };

   
    
      displayShipmentDetails.prototype.callBOLDetails = function() {
        getBOLDetails()
        this.name = 'getBOLDetails';
        return this;
      };
      displayShipmentDetails.prototype.callSetHistory = function() {
        setHistory()
        this.name = 'setHistory';
        return this;
      };
    
      
   
  //new displayShipmentDetails().callDisplayShipment().getShipmentTableDetails().callBOLDetails().callSetHistory();
  new displayShipmentDetails().callDisplayShipment().getShipmentTableDetails().callSetHistory();






})


function getTxDetails(txId) {
    //alert(txId)
    
    document.getElementById('txDetailsModalTxId').innerHTML=txId;
    $('#txDetailsModal').modal();

    $.get("/transaction/"+txId, function(response){

    console.log(response.transactionEnvelope.payload.header.channel_header.timestamp)
    console.log(response.transactionEnvelope.payload.header.channel_header.channel_id)
    console.log(response.transactionEnvelope.payload.header.signature_header.creator.Mspid)
    console.log(response.transactionEnvelope.payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[0].namespace)
    console.log(response.transactionEnvelope.payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[0].rwset.reads)
    console.log(response.transactionEnvelope.payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[0].rwset.writes)

    
    document.getElementById('txDetailsModalTimestamp').innerHTML=response.transactionEnvelope.payload.header.channel_header.timestamp;
    document.getElementById('txDetailsModalChannelId').innerHTML=response.transactionEnvelope.payload.header.channel_header.channel_id;
    document.getElementById('txDetailsModalExecutedBy').innerHTML=response.transactionEnvelope.payload.header.signature_header.creator.Mspid;

    

});
}