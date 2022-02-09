// prevent default behavior
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
});

function validateEmail(elementValue){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue); 
  } 


function loginUser() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;

    if(!validateEmail(email)){
        alert("Not a Valid Email");
        return 0;
    }

    user_count = Number(localStorage.getItem("max-user-id"));

    for(var uid = 101; uid<=user_count; uid++){
        
        test_user = JSON.parse(localStorage.getItem(String(uid)));
        console.log(test_user.email,test_user.password);
        if(test_user.email === email && test_user.password === password){
            localStorage.setItem("logged_in_user",String(uid));
            // alert("you are logged in!!");
            window.location.replace("/index.html");
            return 0;
        }
    }

    alert("Your email is not registered.")



}