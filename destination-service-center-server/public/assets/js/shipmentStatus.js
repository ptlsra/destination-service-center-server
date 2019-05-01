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

    function displayShipment(){
    
      
    
    
                if(currentStatus=="Created"){
                    
                   
                
                    // first transaction
                   //second transaction -- hasn't been executed at this stage
    
    
                    $('#shipmentDisplayContainer').append( `
                   
                    <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Create Shipment</span></img>
                     <div class="vl">
                     <span  id="shipmentCreated" class="fontsizecustomnew margintime"> </span>
                     <span  id="shipmentTxId" class="fontsizecustomnew margintx"> </span>
                     </div>
                    <img src="assets/img/circle.png"  class="b imageprop"> <span class="marginfortxData">Assign Road Driver for Shipment by SC1 admin </span></img>
                    <div class="vs">
                    <span  id="assignRoadDriver" class="fontsizecustomnew margintime"> </span>
                    <span  id="shipmentTxId2" class="fontsizecustomnew margintx"> </span>
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

                      
                   
                      </tr>

                      <tr>
                      <td>Consignee Name</td>
                      <td id="consigneeName" class="fontclassbold"></td>
                      <td>Consignee ID</td>
                      <td id="consigneeID" class="fontclassbold"></td>
                    
                      <td>Consignee Email</td>
                      <td id="consigneeEmail" class="fontclassbold"></td>

                      </tr>


                      <tr>
                      <td>Consignee PhoneNo</td>
                      <td id="consigneePhoneNo" class="fontclassbold"></td>
                      <td>Consignee ZipCode</td>
                      <td id="consigneeZipCode" class="fontclassbold"></td>
                    
                      <td>Consignee State</td>
                      <td id="consigneeState" class="fontclassbold"></td>
                      </tr>

                      <tr>
                      <td>Consignor Name</td>
                      <td id="consignorName" class="fontclassbold"></td>
                      <td>Consignor ID</td>
                      <td id="consignorID" class="fontclassbold"></td>
                    
                      <td>Consignor Email</td>
                      <td id="consignorEmail" class="fontclassbold"></td>

                      </tr>
              

                      <tr>
                      <td>Consignor PhoneNo</td>
                      <td id="consignorPhoneNo" class="fontclassbold"></td>
                      <td>Consignor ZipCode</td>
                      <td id="consignorZipCode" class="fontclassbold"></td>
                    
                      <td>Consignor State</td>
                      <td id="consignorState" class="fontclassbold"></td>
                      </tr>
                      
                      <tr>
                      <td colspan="2">Image Uploaded By Road Driver</td>
                      <td id="imageUploadedByRoadDriver" colspan="4"></td>
  
                   
  
                     
                     
                      </tr>
    
                     
                   
                    
                    </table>
    
                    <h6 class="marginleftcustom">BOL Details</h6>

                    <form id="assignRoadDriver"  onsubmit="return assignRoadDriver()" action="" method="post">
    
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
                    <td>Assign Road Driver</td>
                    <td colspan="3"><select id="assignRoadDriverForShipment" class="fullwidth" >
                    </select></td>
                    <td>Assign Trailer Number</td>
                    <td colspan="3">
                    <input type="number"  class="fullwidth" id="trailerNo" name="trailerNo" placeholeder="Enter Trailer No" required>

                    </td>
                   
                    </tr>
                    </table>
    
                    <input type="submit" value="Assign Road Driver To Shipment" class="btn adminBtn marginleftcustom" name="submitButton">
                    </form>
                  </div>
    
    
                  <div class="vs animated slideInUp slower">
                  </div>
                  
                  <img src="assets/img/circle.png"  class="b imageprop">  <span class="marginfortxData">Confirm Pickup by Road Driver </span></img>
                  <div class="vs">
                   <span  id="confirmPickupByRoadDriver" class="fontsizecustomnew margintime"> </span>
                 
               <span  id="shipmentTxId3" class="fontsizecustomnew margintx"> </span>
                  </div>
    
                   
                  <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow ">  <span class="marginfortxData">Shipment Delivered to Destination Service Center </span></img>
                  <div class="vs">
                         
                      <span  id="driverAtDestination" class="fontsizecustomnew margintime"> </span>
                 
                      <span  id="shipmentTxId5" class="fontsizecustomnew margintx"> </span>
                  </div> 
    
                  
              <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow ">  <span class="marginfortxData">Confirm Arrival Of Shipment Destination Service Center </span></img>
              <div class="vs">
                     
                  <span  id="shipmentAtDestination" class="fontsizecustomnew margintime"> </span>
             
                  <span  id="shipmentTxId6" class="fontsizecustomnew margintx"> </span>
              </div> 
    
    
              <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Assign City Driver by Destination Service Center </span></img>
                  <div class="vs animated slideInUp slower">
                         
                      <span  id="confirmArrivalofPickup" class="fontsizecustomnew margintime"> </span>
                 
                      <span  id="shipmentTxId7" class="fontsizecustomnew margintx"> </span>
                  </div> 
                  `);
    
    
                  
                }

                if(currentStatus=="Road_Driver_Assigned"){


                    $('#shipmentDisplayContainer').append( `
                   
                    <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Create Shipment</span></img>
                     <div class="vl">
                     <span  id="shipmentCreated" class="fontsizecustomnew margintime"> </span>
                     <span  id="shipmentTxId" class="fontsizecustomnew margintx"> </span>
                     </div>
                    <img src="assets/img/tick2.png"  class="b imageprop"> <span class="marginfortxData">Assign Road Driver for Shipment by SC1 admin </span></img>
                    <div class="vl">
                    <span  id="assignRoadDriver" class="fontsizecustomnew margintime"> </span>
                    <span  id="shipmentTxId2" class="fontsizecustomnew margintx"> </span>
                    </div>
                    <img src="assets/img/circle.png"  class="b imageprop">  <span class="marginfortxData">Confirm Pickup by Road Driver </span></img>
                    <div class="vs">
                     <span  id="confirmPickupByRoadDriver" class="fontsizecustomnew margintime"> </span>
                   
                 <span  id="shipmentTxId3" class="fontsizecustomnew margintx"> </span>
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

                      
                   
                      </tr>

                      <tr>
                      <td>Consignee Name</td>
                      <td id="consigneeName" class="fontclassbold"></td>
                      <td>Consignee ID</td>
                      <td id="consigneeID" class="fontclassbold"></td>
                    
                      <td>Consignee Email</td>
                      <td id="consigneeEmail" class="fontclassbold"></td>

                      </tr>


                      <tr>
                      <td>Consignee PhoneNo</td>
                      <td id="consigneePhoneNo" class="fontclassbold"></td>
                      <td>Consignee ZipCode</td>
                      <td id="consigneeZipCode" class="fontclassbold"></td>
                    
                      <td>Consignee State</td>
                      <td id="consigneeState" class="fontclassbold"></td>
                      </tr>

                      <tr>
                      <td>Consignor Name</td>
                      <td id="consignorName" class="fontclassbold"></td>
                      <td>Consignor ID</td>
                      <td id="consignorID" class="fontclassbold"></td>
                    
                      <td>Consignor Email</td>
                      <td id="consignorEmail" class="fontclassbold"></td>

                      </tr>
              

                      <tr>
                      <td>Consignor PhoneNo</td>
                      <td id="consignorPhoneNo" class="fontclassbold"></td>
                      <td>Consignor ZipCode</td>
                      <td id="consignorZipCode" class="fontclassbold"></td>
                    
                      <td>Consignor State</td>
                      <td id="consignorState" class="fontclassbold"></td>
                      </tr>
                      
    
    
                     
                   
                    
                    </table>
    
                    <h6 class="marginleftcustom">BOL Details</h6>

                    <form id="assignRoadDriver"  onsubmit="return assignRoadDriver()" action="" method="post">
    
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
                    </table>
    
                    </form>
                  </div>
    
    
                  <div class="vs animated slideInUp slower">
                  </div>
                  
                 
                   
                  <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow ">  <span class="marginfortxData">Shipment Delivered to Destination Service Center </span></img>
                  <div class="vs">
                         
                      <span  id="driverAtDestination" class="fontsizecustomnew margintime"> </span>
                 
                      <span  id="shipmentTxId5" class="fontsizecustomnew margintx"> </span>
                  </div> 
    
                  
              <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow ">  <span class="marginfortxData">Confirm Arrival Of Shipment Destination Service Center </span></img>
              <div class="vs">
                     
                  <span  id="shipmentAtDestination" class="fontsizecustomnew margintime"> </span>
             
                  <span  id="shipmentTxId6" class="fontsizecustomnew margintx"> </span>
              </div> 
    
    
              <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Assign City Driver by Destination Service Center </span></img>
                  <div class="vs animated slideInUp slower">
                         
                      <span  id="confirmArrivalofPickup" class="fontsizecustomnew margintime"> </span>
                 
                      <span  id="shipmentTxId7" class="fontsizecustomnew margintx"> </span>
                  </div> 
                  `);
    

                }



                if(currentStatus=="Pickup_Confirmed_by_Road_Driver"){


                    $('#shipmentDisplayContainer').append( `
                   
                    <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Create Shipment</span></img>
                     <div class="vl">
                     <span  id="shipmentCreated" class="fontsizecustomnew margintime"> </span>
                     <span  id="shipmentTxId" class="fontsizecustomnew margintx"> </span>
                     </div>
                    <img src="assets/img/tick2.png"  class="b imageprop"> <span class="marginfortxData">Assign Road Driver for Shipment by SC1 admin </span></img>
                    <div class="vl">
                    <span  id="assignRoadDriver" class="fontsizecustomnew margintime"> </span>
                    <span  id="shipmentTxId2" class="fontsizecustomnew margintx"> </span>
                    </div>
                    <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Confirm Pickup by Road Driver </span></img>
                    <div class="vl">
                     <span  id="confirmPickupByRoadDriver" class="fontsizecustomnew margintime"> </span>
                   
                 <span  id="shipmentTxId3" class="fontsizecustomnew margintx"> </span>
                    </div>

                    <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow ">  <span class="marginfortxData">Shipment Delivered to Destination Service Center </span></img>
              <div class="vs">
                     
                  <span  id="shipmentAtDestination" class="fontsizecustomnew margintime"> </span>
             
                  <span  id="shipmentTxId4" class="fontsizecustomnew margintx"> </span>
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

                      
                   
                      </tr>

                      <tr>
                      <td>Consignee Name</td>
                      <td id="consigneeName" class="fontclassbold"></td>
                      <td>Consignee ID</td>
                      <td id="consigneeID" class="fontclassbold"></td>
                    
                      <td>Consignee Email</td>
                      <td id="consigneeEmail" class="fontclassbold"></td>

                      </tr>


                      <tr>
                      <td>Consignee PhoneNo</td>
                      <td id="consigneePhoneNo" class="fontclassbold"></td>
                      <td>Consignee ZipCode</td>
                      <td id="consigneeZipCode" class="fontclassbold"></td>
                    
                      <td>Consignee State</td>
                      <td id="consigneeState" class="fontclassbold"></td>
                      </tr>

                      <tr>
                      <td>Consignor Name</td>
                      <td id="consignorName" class="fontclassbold"></td>
                      <td>Consignor ID</td>
                      <td id="consignorID" class="fontclassbold"></td>
                    
                      <td>Consignor Email</td>
                      <td id="consignorEmail" class="fontclassbold"></td>

                      </tr>
              

                      <tr>
                      <td>Consignor PhoneNo</td>
                      <td id="consignorPhoneNo" class="fontclassbold"></td>
                      <td>Consignor ZipCode</td>
                      <td id="consignorZipCode" class="fontclassbold"></td>
                    
                      <td>Consignor State</td>
                      <td id="consignorState" class="fontclassbold"></td>
                      </tr>
                      
    
    
                     
                   
                    
                    </table>
    
                    <h6 class="marginleftcustom">BOL Details</h6>

                    <form id="assignRoadDriver"  onsubmit="return assignRoadDriver()" action="" method="post">
    
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
                    <td colspan="2">Image Uploaded By Road Driver</td>
                    <td id="imageUploadedByRoadDriver" colspan="6"></td>

                 

                   
                   
                    </tr>
                    </table>
    
                    </form>
                  </div>
    
    
                  <div class="vs animated slideInUp slower">
                  </div>
                  
                 
                   
              
    
                 
                  
              <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow ">  <span class="marginfortxData">Confirm Arrival Of Shipment Destination Service Center </span></img>
              <div class="vs">
                     
                  <span  id="shipmentAtDestination" class="fontsizecustomnew margintime"> </span>
             
                  <span  id="shipmentTxId6" class="fontsizecustomnew margintx"> </span>
              </div> 
    
    
              <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Assign City Driver by Destination Service Center </span></img>
                  <div class="vs animated slideInUp slower">
                         
                      <span  id="confirmArrivalofPickup" class="fontsizecustomnew margintime"> </span>
                 
                      <span  id="shipmentTxId7" class="fontsizecustomnew margintx"> </span>
                  </div> 
                  `);
    

                }



                if(currentStatus=="Shipment_Delivered_by_Road_Driver"){


                    $('#shipmentDisplayContainer').append( `
                   
                    <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Create Shipment</span></img>
                     <div class="vl">
                     <span  id="shipmentCreated" class="fontsizecustomnew margintime"> </span>
                     <span  id="shipmentTxId" class="fontsizecustomnew margintx"> </span>
                     </div>
                    <img src="assets/img/tick2.png"  class="b imageprop"> <span class="marginfortxData">Assign Road Driver for Shipment by SC1 admin </span></img>
                    <div class="vl">
                    <span  id="assignRoadDriver" class="fontsizecustomnew margintime"> </span>
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
    

                    
              <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow ">  <span class="marginfortxData">Confirm Arrival Of Shipment Destination Service Center </span></img>
              <div class="vs">
                     
                  <span  id="shipmentAtDestination" class="fontsizecustomnew margintime"> </span>
             
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

                      
                   
                      </tr>

                      <tr>
                      <td>Consignee Name</td>
                      <td id="consigneeName" class="fontclassbold"></td>
                      <td>Consignee ID</td>
                      <td id="consigneeID" class="fontclassbold"></td>
                    
                      <td>Consignee Email</td>
                      <td id="consigneeEmail" class="fontclassbold"></td>

                      </tr>


                      <tr>
                      <td>Consignee PhoneNo</td>
                      <td id="consigneePhoneNo" class="fontclassbold"></td>
                      <td>Consignee ZipCode</td>
                      <td id="consigneeZipCode" class="fontclassbold"></td>
                    
                      <td>Consignee State</td>
                      <td id="consigneeState" class="fontclassbold"></td>
                      </tr>

                      <tr>
                      <td>Consignor Name</td>
                      <td id="consignorName" class="fontclassbold"></td>
                      <td>Consignor ID</td>
                      <td id="consignorID" class="fontclassbold"></td>
                    
                      <td>Consignor Email</td>
                      <td id="consignorEmail" class="fontclassbold"></td>

                      </tr>
              

                      <tr>
                      <td>Consignor PhoneNo</td>
                      <td id="consignorPhoneNo" class="fontclassbold"></td>
                      <td>Consignor ZipCode</td>
                      <td id="consignorZipCode" class="fontclassbold"></td>
                    
                      <td>Consignor State</td>
                      <td id="consignorState" class="fontclassbold"></td>
                      </tr>
                      
    
    
                     
                   
                    
                    </table>
    
                    <h6 class="marginleftcustom">BOL Details</h6>

                    <form id="assignRoadDriver"  onsubmit="return assignRoadDriver()" action="" method="post">
    
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
                    <td colspan="2">Image Uploaded By Road Driver</td>
                    <td id="imageUploadedByRoadDriver" colspan="6"></td>

                 

                   
                   
                    </tr>
                    </table>
    
                    </form>
                  </div>
    
    
                  <div class="vs animated slideInUp slower">
                  </div>
                  
                 
                   
              
    
                 
            
    
    
              <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Assign City Driver by Destination Service Center </span></img>
                  <div class="vs animated slideInUp slower">
                         
                      <span  id="confirmArrivalofPickup" class="fontsizecustomnew margintime"> </span>
                 
                      <span  id="shipmentTxId7" class="fontsizecustomnew margintx"> </span>
                  </div> 
                  `);
    

                }


                if(currentStatus=="Shipment_At_Destination_SC"){


                    $('#shipmentDisplayContainer').append( `
                   
                    <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Create Shipment</span></img>
                     <div class="vl">
                     <span  id="shipmentCreated" class="fontsizecustomnew margintime"> </span>
                     <span  id="shipmentTxId" class="fontsizecustomnew margintx"> </span>
                     </div>
                    <img src="assets/img/tick2.png"  class="b imageprop"> <span class="marginfortxData">Assign Road Driver for Shipment by SC1 admin </span></img>
                    <div class="vl">
                    <span  id="assignRoadDriver" class="fontsizecustomnew margintime"> </span>
                    <span  id="shipmentTxId2" class="fontsizecustomnew margintx"> </span>
                    </div>
                    <img src="assets/img/tick2.png"  class="b imageprop">  <span class="marginfortxData">Confirm Pickup by Road Driver </span></img>
                    <div class="vl">
                     <span  id="confirmPickupByRoadDriver" class="fontsizecustomnew margintime"> </span>
                   
                 <span  id="shipmentTxId3" class="fontsizecustomnew margintx"> </span>
                    </div>

                    <img src="assets/img/tick2.png" class="b imageprop  animated fadeIn slow ">  <span class="marginfortxData">Shipment Delivered to Destination Service Center </span></img>
              <div class="vl">
                     
                  <span  id="shipmentAtDestination" class="fontsizecustomnew margintime"> </span>
             
                  <span  id="shipmentTxId4" class="fontsizecustomnew margintx"> </span>
              </div> 
    

              <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Assign City Driver by Destination Service Center </span></img>
              <div class="vs animated slideInUp slower">
                     
                  <span  id="confirmArrivalofPickup" class="fontsizecustomnew margintime"> </span>
             
                  <span  id="shipmentTxId5" class="fontsizecustomnew margintx"> </span>
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

                      
                   
                      </tr>

                      <tr>
                      <td>Consignee Name</td>
                      <td id="consigneeName" class="fontclassbold"></td>
                      <td>Consignee ID</td>
                      <td id="consigneeID" class="fontclassbold"></td>
                    
                      <td>Consignee Email</td>
                      <td id="consigneeEmail" class="fontclassbold"></td>

                      </tr>


                      <tr>
                      <td>Consignee PhoneNo</td>
                      <td id="consigneePhoneNo" class="fontclassbold"></td>
                      <td>Consignee ZipCode</td>
                      <td id="consigneeZipCode" class="fontclassbold"></td>
                    
                      <td>Consignee State</td>
                      <td id="consigneeState" class="fontclassbold"></td>
                      </tr>

                      <tr>
                      <td>Consignor Name</td>
                      <td id="consignorName" class="fontclassbold"></td>
                      <td>Consignor ID</td>
                      <td id="consignorID" class="fontclassbold"></td>
                    
                      <td>Consignor Email</td>
                      <td id="consignorEmail" class="fontclassbold"></td>

                      </tr>
              

                      <tr>
                      <td>Consignor PhoneNo</td>
                      <td id="consignorPhoneNo" class="fontclassbold"></td>
                      <td>Consignor ZipCode</td>
                      <td id="consignorZipCode" class="fontclassbold"></td>
                    
                      <td>Consignor State</td>
                      <td id="consignorState" class="fontclassbold"></td>
                      </tr>
                      
    
    
                     
                   
                    
                    </table>
    
                    <h6 class="marginleftcustom">BOL Details</h6>

                    <form id="assignRoadDriver"  onsubmit="return assignRoadDriver()" action="" method="post">
    
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

                    document.getElementById('shipmentId').innerHTML=shipmentId;
                    document.getElementById('destination').innerHTML=response.dest;
                    document.getElementById('shipmentStatus').innerHTML=status;
                    document.getElementById('consigneeID').innerHTML=response.consigneeId;
                    document.getElementById('consignorID').innerHTML=response.customerId;
                    document.getElementById('bolId').innerHTML=response.billOfLadingId;

                    var imageData=response.ImageTracking.image;

                    var trailerNo=response.trailerNo;
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


            function getConsigneeDetails(){
                setTimeout(function(){
                var consigneeId=document.getElementById('consigneeID').innerHTML;

                $.get("/customer/"+consigneeId, function(response){

                
                


                    document.getElementById('consigneeName').innerHTML=response.firstName+" "+response.lastName;
                    document.getElementById('consigneeEmail').innerHTML=response.emailId;
                    document.getElementById('consigneePhoneNo').innerHTML=response.phoneNumber;
                    document.getElementById('consigneeZipCode').innerHTML=response.zipCode;
                    document.getElementById('consigneeState').innerHTML=response.state;


                });
            }, 1500);

            }

            function getConsignorDetails(){
                setTimeout(function(){
                var consignorId=document.getElementById('consignorID').innerHTML;

                $.get("/customer/"+consignorId, function(response){

                
                


                    document.getElementById('consignorName').innerHTML=response.firstName+" "+response.lastName;
                    document.getElementById('consignorEmail').innerHTML=response.emailId;
                    document.getElementById('consignorPhoneNo').innerHTML=response.phoneNumber;
                    document.getElementById('consignorZipCode').innerHTML=response.zipCode;
                    document.getElementById('consignorState').innerHTML=response.state;


                });
            }, 1500);

            }        


            function getBOLDetails(){
                setTimeout(function(){
                var bolId=document.getElementById('bolId').innerHTML;
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
            }, 1500);

            }        

          
            function getRoadDriver(){

                

            if(currentStatus=="Created"){
                
                    $('#assignRoadDriverForShipment').append($('<option>', { 
                        value: 'None',
                        text : 'None' 
                    }
                    
                    ));
            
                  $.getJSON("/servicecenter/driver/roaddrivers", function(response){ //replace with city driver for service centre
            
                       
                   
                 
            
                $.each(response, function (i, item) {
                    $('#assignRoadDriverForShipment').append($('<option>', { 
                        value: item.record.driverId,
                        text : item.record.firstName+' '+item.record.lastName 
                    }
                    
                    ));
                });
            });

            }else{
            //    $('#assignRoadDriverForShipment').hide();
               // $('#trailerNo').hide();
                
             //   document.getElementById('bolId').innerHTML=bolId;

           
            }
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

      displayShipmentDetails.prototype.callGetConsigneeDetails = function() {
        getConsigneeDetails()
        this.name = 'getConsigneeDetails';
        return this;
      };

      displayShipmentDetails.prototype.callGetConsignorDetails = function() {
        getConsignorDetails()
        this.name = 'getConsignorDetails';
        return this;
      };
    
      displayShipmentDetails.prototype.callBOLDetails = function() {
        getBOLDetails()
        this.name = 'getBOLDetails';
        return this;
      };

      displayShipmentDetails.prototype.callGetRoadDriver = function() {
        getRoadDriver()
        this.name = 'getRoadDriver';
        return this;
      };
    
      
   
  new displayShipmentDetails().callDisplayShipment().getShipmentTableDetails().callGetConsigneeDetails().callGetConsignorDetails().callBOLDetails().callGetRoadDriver();






})