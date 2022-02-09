// prevent default behavior
document.getElementById("signin-form").addEventListener("submit", function (e) {
    e.preventDefault();
});

function validateEmail(elementValue){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue); 
  } 

function signinUser(){
    var username = document.getElementById("uname").value;
    var password = document.getElementById("pass").value;
    var re_pass = document.getElementById("re-pass").value;
    var email_id = document.getElementById("email").value

    if(password != re_pass){
        alert("Password don't match")
        return null;
    }
    // check if the email is valid or not
    if(!validateEmail(email_id)){
        alert("not a valid email")
        return null;
    }
    if(password.length < 8){
        alert("Password is too short")
        return 0;
    }

    // getting userId from localstorage
    id = localStorage.getItem("max-user-id");
    if(id===null){
        id = 100;
        localStorage.setItem("max-user-id" , id);
    }

    // now check if the email is already registered?
    for(var uid = 101; uid<=id; uid++){
        
        user = JSON.parse(localStorage.getItem(String(uid)))
        // console.log(uid,"  ",user);
        if(user.email === email_id){
            alert("This Email is already registered!!");
            return 0;
        }
    }
    // update the new user_count
    id = Number(id)+1;
    localStorage.setItem("max-user-id" , id);
    
    

    new_user = {

        uname : username,
        userID : id,
        password : password,
        email : email_id,
        cart : [],
    }
    // console.log(users[uname]);
    // console.log(users.userID)
    // console.log(users[password]);
    
    stringified_user = JSON.stringify(new_user);
    localStorage.setItem(new_user.userID,stringified_user);
    localStorage.setItem("logged_in_user",new_user.userID);
    
    window.location.replace("/index.html");

}
