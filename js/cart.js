products = JSON.parse(localStorage.getItem("products"));
logged_user = Number(localStorage.getItem("logged_in_user"));
user_cart = JSON.parse(localStorage.getItem("cart-"+String(logged_user)));

s_out_button = document.getElementById("sign-out");
s_user_button= document.getElementById("switch-user");


function sign_out(){
    localStorage.removeItem("logged_in_user");
    window.location.reload();
}
function switch_user(){
    localStorage.removeItem("logged_in_user");
    window.location.replace("login.html");
}

