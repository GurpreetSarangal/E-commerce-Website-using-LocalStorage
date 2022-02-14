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
        alert("Password is too short");
        return 0;
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

    var admin_password = "iamthebosshere";
    if(password === admin_password){
        var super_user = {
            name: username,
            email: email_id,
            password: admin_password,
        }
        super_user_signin(super_user);
        return;
    }
        

    // getting userId from localstorage
    id = localStorage.getItem("max-user-id");
    if(id===null){
        id = 100;
        localStorage.setItem("max-user-id" , id);
    }

    
    // update the new user_count
    var id = Number(id)+1;
    localStorage.setItem("max-user-id" , id);
    
    

    var new_user = {

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

function super_user_signin(super_user){
    var last_su_id = Number(localStorage.getItem("max_su_id"));
    if(last_su_id === null){
        last_su_id = 4000;
        localStorage.setItem("max_su_id",last_su_id);
    }
    var new_su_id = last_su_id + 1;
    var all_admins = JSON.parse(localStorage.getItem("admins"));
    if(all_admins === null){
        all_admins = [
            {
                id: new_su_id,
                admin_name: super_user.name,
                password: super_user.password,
            }
        ];
        stringified_su = JSON.stringify(all_admins);
        localStorage.setItem("all_admins", stringified_su);
        document.location.replace("index.html");
        return;
    }

    for(var i=0; i<all_admins.length; i++){
        if(all_admins[i].id === super_user.id){
            alert("This Admin is already registered");
            document.getElementById("log").innerHTML = 'Try Logging in';
            return;
        }
    }
    super_user[id] = new_su_id;
    

    all_admins.push(super_user);
    stringified_all_su = JSON.stringify(all_admins);
    localStorage.setItem("all_admins", stringified_all_su);
    document.location.replace("index.html");

}