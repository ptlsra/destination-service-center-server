
  setTimeout(function(){
  
    var custId=localStorage.getItem("DestcustomerId");
  
    
    if(custId){
      $('#defaultLogin').hide();
        $('#registerCustomer').hide();

        if($("#customerName").length == 0) {
          location.reload(); 
          //it doesn't exist
        }else{

          document.getElementById("customerName").innerHTML = 'Welcome '+localStorage.getItem("DestcustomerFirstName")+" "+localStorage.getItem("DestcustomerLastName");
              
             
          //  location.reload(); 
             //alert("here")
             
             

            document.getElementById('FedexCustomerFirstName').innerHTML=localStorage.getItem("DestcustomerFirstName");
            document.getElementById('FedexCustomerLastName').innerHTML=localStorage.getItem("DestcustomerLastName");
            document.getElementById('FedexCustomerID').innerHTML=localStorage.getItem("DestcustomerId") ;
            document.getElementById('FedexCustomerPhoneNumber').innerHTML=localStorage.getItem("DestcustomerPhoneNo");

            document.getElementById('FedexCustomerEmailID').innerHTML=localStorage.getItem("DestcustomerEmailId") ;
        }
  
    }else{
  
    $('#loginSuccess').hide();
    $('#logOutOption').hide();
    $('#profileTab').hide();
  
    }
  }, 150);
  