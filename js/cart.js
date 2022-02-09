var products = JSON.parse(localStorage.getItem("products"));
var logged_user = Number(localStorage.getItem("logged_in_user"));
var user_data = JSON.parse(localStorage.getItem(String(logged_user)));

// s_out_button = document.getElementById("sign-out");
// s_user_button= document.getElementById("switch-user");

for(var i=0; i<user_data.cart.length; i++){
    var inner_div = document.getElementById("cart-list").innerHTML;
    var id = (user_data.cart[i]).id;
    inner_div += '<div class="rack-item col-3" id="'+id+'" ></div>';
    document.getElementById("cart-list").innerHTML = inner_div;

    var quantity = (user_data.cart[i]).quantity;
    for(var j=0; j<products.length; j++){
        if(products[j].id === id){
            var name = products[j].name;
            var price = products[j].price;
            break;
        }
    }
    inner_div =  '<div class="item-pic">  <img src="/logo'+String(id)+'.png" alt="Item-pic"></div><div class="item-name">  <span>'+String(name)+'</span></div> <div><span>Quantity: '+quantity+'</span></div><div class="item-price">  <span>Price: '+String(price)+'</span></div><div class="remove-it"><input type="button" value="Remove One" id="remove-one-'+String(id)+'-from-cart" onclick="remove_one('+String(id)+')"><input type="button" value="Remove All" id="remove-all-'+String(id)+'-from-cart" onclick="remove_all('+String(id)+')"></div>';
    document.getElementById(id).innerHTML = inner_div;
}

function sign_out(){
    localStorage.removeItem("logged_in_user");
    window.location.replace("index.html");
}
function switch_user(){
    window.location.replace("login.html");
}