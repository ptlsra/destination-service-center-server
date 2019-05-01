$(document).ready(function(){
	

	var tempLists=[];
	var dataSets=[];


    



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
    
	var shipmentId = getUrlParameter('shipmentId');
    
    
    document.getElementById('txHistoryTile').innerHTML="Transaction History for Shipment Id "+shipmentId;



// replace service center value

$.get("/history/shipment/"+shipmentId, function(response){
    // alert(JSON.stringify(response));
    var index = 1;
    $.each(response, function(i, item) {

            //alert(JSON.stringify(item));

            //item.timeStamp;

            var imageData=item.value.ImageTracking.image;

        
            var shipperName=item.value.shipperName;
            shipperName = shipperName.split("_").join(" ");

          
            

            tempLists.push(index,'<a href=# data-toggle="tooltip" title='+item.txId+'>'+item.txId.substring(0,20)+'...',item.timestamp,shipperName,item.value.billOfLadingId,item.value.delivey,item.value.status,'<button type="button" class="buttonLink" onclick=setImageFunction("'+imageData+'")>View</button>');
            index++;
            dataSets.push(tempLists);
            tempLists=[];
            //alert(dataSet);		               
        
    });

    $('#shipmentHistory').dataTable( {
        data: dataSets,
        columns: [
            { title: "SNo" },
            { title: "Transaction ID" },
            { title: "TimeStamp" },
            { title: "Shipper" },
            { title: "BOL ID" },
            { title: "DR" },
            { title: "Status" },
            { title: "Image" },
        ]
    } );
} );
});


function setImageFunction(imageData){

//alert(imageData)
if(imageData){
    document.getElementById('setImageData').innerHTML='<img src=\"'+imageData+'\"width=\"400px\" height=\"150px\">'

    $('#setImageModal').modal()
}
else{
    document.getElementById('setImageData').innerHTML='No image'

    $('#setImageModal').modal()
}

}