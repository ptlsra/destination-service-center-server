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
   // shipmentStatus.html?shipmentId=shi-400000001&shipmentStatus=Created
	var shipmentId = getUrlParameter('shipmentId');
    var currentStatus = getUrlParameter('shipmentStatus');



    setInterval(function(){

         
        $.get("/shipment/"+shipmentId, function(response){

        //console.log(response)

       
        var status=response.status;
        status = status.split(" ").join("_");

        if(currentStatus!=status){
           

            window.location.href="consignment.html"
        }

    });
},47000);
    


    function displayShipment(){
    
        $('#loadingModal').modal();

    
    
              
                    
                   
                
                    // first transaction
                   //second transaction -- hasn't been executed at this stage
    

             





                if(currentStatus=="Shipment_Delivered_by_Road_Driver"){


                    $('#shipmentCustomerContainer').append( `
                   
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

                    <form id="confirmArrivalAtDestinationCenter"  onsubmit="return confirmArrivalAtDestinationCenter()" action="" method="post">
    
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


                    $('#shipmentCustomerContainer').append( `
                   
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

                    <form id="assignCityDriverForDispatch"  onsubmit="return assignCityDriverForDispatch()" action="" method="post">
    
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
                    <td colspan="4">Shipment Image</td>
                    <td id="imageUploadedByRoadDriver" colspan="4"></td>
                    </tr>
                  
                    </table>

                    </form>
                  </div>
    
    
                 
                   
              
    
            
                  `);

                }

                  if(currentStatus=="City_Driver_Assigned_for_Dispatch" ||currentStatus=="Delivery_Receipt_created"){


                    $('#shipmentCustomerContainer').append( `
                   
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

                    <form id="assignCityDriverForDispatch"  onsubmit="return assignCityDriverForDispatch()" action="" method="post">
    
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
                    <td colspan="2">Shipment Image</td>
                    <td id="imageUploadedByRoadDriver" colspan="6"></td>
                   
                    </tr>

                    <tr>
                    <td colspan="2">Assign City Driver To Deliver Shipment</td>
                    <td colspan="2" id="cityDriverForShipment">

                    <td colspan="2">Delivery Receipt</td>
                    <td colspan="2" id="DR">
                    <td id="drNoValue" ></td>
                  
                    </td>

                
                   
                   
                    </tr>
                    </table>

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



                    if(currentStatus=="Ready_to_Deliver_Shipment" ){


                    $('#shipmentCustomerContainer').append( `
                   
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

                    <form id="signShipmentByConsignee"  onsubmit="return signShipmentByConsignee()" action="" method="post">
    
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
                    <td colspan="4">Assign City Driver To Deliver Shipment</td>
                    <td colspan="4" id="cityDriverForShipment">
                  
                    </td>

                
                   
                   
                    </tr>


                    <tr>
                    <td>Shipment Image</td>
                    <td id="imageUploadedByRoadDriver" ></td>

                    <td colspan="2">Delivery Receipt</td>
                    <td id="DR" colspan="2"></td>
                    <td id="drNoValue" ></td>


                    <td>Arrival Time</td>
                    <td ><input type="text" id="arrivalTimeOfCityDriver" readonly></td>

                   
                    </tr>
                    
                    </table>
                    <input type="submit" value="Approve and Confirm Delivery" class="btn btn-primary btn-block" name="submitButton">
                    </form>
                  </div>
    
    
                

                  <div class="vs animated slideInUp slower">
                  </div>

                  <img src="assets/img/circle.png"class="b imageprop  animated fadeIn slow "> <span class="marginfortxData">Update Sign from City Driver </span></img>
                  <div class="vs animated slideInUp slower">
                         
                      <span  id="updateSignFromCityDriver" class="fontsizecustomnew margintime"> </span>
                 
                      <span  id="shipmentTxId8" class="fontsizecustomnew margintx"> </span>
                  </div> 
                   
              
    
            
                  `);
    

                }






                if(currentStatus=="Received_Approval_from_Consignee" ){


                    $('#shipmentCustomerContainer').append( `
                   
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

                    <form id="signShipmentByConsignee"  onsubmit="return signShipmentByConsignee()" action="" method="post">
    
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
                    <td colspan="2">Assign City Driver To Deliver Shipment</td>
                    <td colspan="2" id="cityDriverForShipment">

                    <td colspan="2">Consignee Sign</td>
                    <td colspan="2" >True</td>

                
                   
                   
                    </tr>


                    <tr>
                    <td>Shipment Image</td>
                    <td id="imageUploadedByRoadDriver" ></td>

                    <td colspan="2">Delivery Receipt</td>
                    <td id="DR" colspan="2"></td>
                    <td id="drNoValue" ></td>


                    <td>Arrival Time</td>
                    <td ><input type="text" id="arrivalTimeOfCityDriver" readonly></td>

                   
                    </tr>
                    
                    </table>
                    </form>
                  </div>
    
    
                

                

                 
                   
              
    
            
                  `);
    

                }


                if(currentStatus=="Shipment_Delivered_Successfully" ){


                    $('#shipmentCustomerContainer').append( `
                   
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
              <div class="vl animated slideInUp slower">
                     
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

                    <form id="signShipmentByConsignee"  onsubmit="return signShipmentByConsignee()" action="" method="post">
    
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

                    </tr>

                  
                    <tr>
                    <td colspan="2">Assign City Driver To Deliver Shipment</td>
                    <td colspan="2" id="cityDriverForShipment">

                    <td colspan="2">Consignee Sign</td>
                    <td colspan="2">True</td>

                
                   
                   
                    </tr>


                    <tr>
                    <td>Shipment Image</td>
                    <td id="imageUploadedByRoadDriver" ></td>


                     <td colspan="2">Delivery Receipt</td>
                    <td id="DR" colspan="2"></td>
                    <td id="drNoValue" ></td>


                    <td>Arrival Time</td>
                    <td ><input type="text" id="arrivalTimeOfCityDriver" readonly></td>

                   
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

                setTimeout(function(){
                $.get("/shipment/"+shipmentId, function(response){

                    var status=response.status;
                    status = status.split("_").join(" ");

                    document.getElementById('shipmentId').innerHTML=shipmentId;
                    document.getElementById('destination').innerHTML=response.dest;
                    document.getElementById('shipmentStatus').innerHTML=status;
                    document.getElementById('consigneeID').innerHTML=response.consigneeId;
                    document.getElementById('consignorID').innerHTML=response.customerId;
                    //document.getElementById('bolId').innerHTML=response.billOfLadingId;


                document.getElementById('bolId').innerHTML='<a href=bolDetailsForCustomer.html?bolId='+response.billOfLadingId+'>'+response.billOfLadingId;
                getBOLDetails(response.billOfLadingId);


                    var imageData=response.ImageTracking.image;
                    
                    if(imageData){
                        document.getElementById('imageUploadedByRoadDriver').innerHTML='<a data-toggle="modal" href="#setImageModal">View Image</a>'
            
                        document.getElementById('setImageData').innerHTML='<img src=\"'+imageData+'\"width=\"400px\" height=\"150px\">'
                        

                    }

                    var drNo=response.delivey;

            
                      if(drNo){
                       // document.getElementById('DR').innerHTML=drNo;
                        document.getElementById('DR').innerHTML= '<a href=getDRDetails.html?drNo='+drNo+'>'+drNo;

                        document.getElementById('drNoValue').innerHTML= DR;
                       
                        document.getElementById('drNoValue').style.display = "none";   
                       // alert(drNo)
                        setTimeout(function(){
                        $.get("/delivery/receipt/"+drNo, function(data){

                     //   alert(JSON.stringify(data))
                        var departureTimeOfDriver=data.departureTimeOfDriver;

                     var customerSign=data.customerSign;
                            $('#arrivalTimeOfCityDriver').val(data.arrivalTimeOfDriver);

                          
                        
                            if(customerSign=="true"){
                                document.getElementById('consigneeSign').innerHTML=customerSign;

                            }
                            if(departureTimeOfDriver!=" "){
                                document.getElementById('dateOfDelivery').innerHTML=data.dateOfDelivery;
    
                                document.getElementById('departureTime').innerHTML=data.departureTimeOfDriver;
                                document.getElementById('driverSign').innerHTML=data.driverSign;
    
                            }

                    });
                },4000)
            }

                    var trailerNo=response.trailerNo;
                    if(trailerNo){
                        document.getElementById('assignRoadDriverForShipment').innerHTML=response.roadDriverName;
                        
                        document.getElementById('roadDriverEmail').innerHTML=response.roadDriverAddr;
                        document.getElementById('roadDriverId').innerHTML=response.roadDriverId;
                        document.getElementById('trailerNo').innerHTML=response.trailerNo;

                    }
                    var destCitydriverName=response.destCitydriverName;

                    if(destCitydriverName){
                        document.getElementById('cityDriverForShipment').innerHTML=response.destCitydriverName;

                    }
                    


                });
            }, 1500);
            }         



            function setHistory(){
                setTimeout(function(){
            
                $.get("/history/shipment/"+shipmentId, function(response){
                    // alert(JSON.stringify(response));
                    $('#loadingModal').modal('hide');

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
        
            },6500)
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
            }, 2000);

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
            }, 2500);

            }        


            function getBOLDetails(bolId){
                setTimeout(function(){
          //      var bolId=document.getElementById('bolId').innerHTML;
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

          
            function getCityDriver(){

                

            if(currentStatus=="Shipment_At_Destination_SC"){
                
                   
            
                  $.getJSON("/servicecenter/driver/citydrivers", function(response){ //replace with city driver for service centre
            
                       
                   
                 
            
                $.each(response, function (i, item) {
                    $('#assigCityDriverForShipment').append($('<option>', { 
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

      displayShipmentDetails.prototype.callGetCityDriver = function() {
        getCityDriver()
        this.name = 'getRoadDriver';
        return this;
      };
      displayShipmentDetails.prototype.callSetHistory = function() {
        setHistory()
        this.name = 'setHistory';
        return this;
      };
      
   
  //new displayShipmentDetails().callDisplayShipment().getShipmentTableDetails().callGetConsigneeDetails().callGetConsignorDetails().callBOLDetails().callGetCityDriver().callSetHistory();

  new displayShipmentDetails().callDisplayShipment().getShipmentTableDetails().callGetConsigneeDetails().callGetConsignorDetails().callGetCityDriver().callSetHistory();





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