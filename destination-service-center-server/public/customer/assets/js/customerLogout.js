

$('#logoutModal').on('shown.bs.modal', function (e) {
    // do something...
    setTimeout(function(){
    localStorage.setItem("DestcustomerId","") 
              localStorage.setItem("DestcustomerEmailId","") 
              localStorage.setItem("DestcustomerFirstName","") 
              localStorage.setItem("DestcustomerLastName","") 
              localStorage.setItem("DestcustomerPhoneNo","") 
              window.location.href="index.html";
  
    },1000);
  
  })
  