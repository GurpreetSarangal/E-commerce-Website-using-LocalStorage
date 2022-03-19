function calc_grand_total(){
    logged_user = localStorage.getItem("logged_in_user");
    user_data = JSON.parse(localStorage.getItem(logged_user));
    products = JSON.parse(localStorage.getItem("products"));
    var grand_total = 0;
    for(var i=0; i<user_data.cart.length; i++){
        for(var j=0; j<products.length; j++){
            if(products[j].id === user_data.cart[i].id){
                grand_total += user_data.cart[i].quantity * products[j].price;
            }
        }
    }
    document.getElementById("grand-total").innerHTML = '<h3>Your Total Amount is: '+grand_total+' &#36; </h3>';
}
function remove_one(id){
    logged_user = localStorage.getItem("logged_in_user");
    user_data = JSON.parse(localStorage.getItem(logged_user));
    for(var i=0; i<user_data.cart.length; i++){
        if(user_data.cart[i].id === id){
            user_data.cart[i].quantity -= 1;
            if(user_data.cart[i].quantity <= 0){
                user_data.cart.splice(i,1);
                var stringfied_user_data = JSON.stringify(user_data);
                localStorage.setItem(logged_user,stringfied_user_data);
                // calc_grand_total();
                document.location.reload();
                return 0;
            }
            document.getElementById("Qnt-"+String(id)).innerHTML = '<span>Quantity: '+(user_data.cart[i]).quantity+' </span>'
            stringfied_user_data = JSON.stringify(user_data);
            localStorage.setItem(logged_user,stringfied_user_data);
            calc_grand_total();
            break;
        }
    }

    return 0;
}
function sign_out(){
    localStorage.removeItem("logged_in_user");
    window.location.replace("index.html");
}

function add_one(id){
    logged_user = localStorage.getItem("logged_in_user");
    user_data = JSON.parse(localStorage.getItem(logged_user));
    for(var i=0; i<user_data.cart.length; i++){
        if(user_data.cart[i].id == id){
            user_data.cart[i].quantity += 1;
            localStorage.setItem(logged_user, JSON.stringify(user_data));

            document.getElementById('item-quantity').value = user_data.cart[i].quantity;
        }
    }
}

function remove_all(id){
    logged_user = localStorage.getItem("logged_in_user");
    user_data = JSON.parse(localStorage.getItem(logged_user));
    for(var i=0; i<user_data.cart.length; i++){
        if(user_data.cart[i].id === id){
            user_data.cart.splice(i,1);
                var stringfied_user_data = JSON.stringify(user_data);
                localStorage.setItem(logged_user,stringfied_user_data);
                // calc_grand_total();
                document.location.reload();
                return 0;
        }
    }

}

function generate_cart(){
    var products = JSON.parse(localStorage.getItem("products"));
    var logged_user = Number(localStorage.getItem("logged_in_user"));
    var user_data = JSON.parse(localStorage.getItem(String(logged_user)));
    if(user_data.cart.length <= 0){
        document.getElementById("heading").innerHTML = '<h2>Your Cart is Empty.</h2><a href="index.html">Start Shopping!!</a>';
        return;
    }
    initial_html = document.getElementById('rack').innerHTML;
    initial_html += '<ul id="cart-list"></ul>';
    document.getElementById('rack').innerHTML = initial_html;

    for(var i=0; i<user_data.cart.length; i++){
        var inner_li = document.getElementById("cart-list").innerHTML;
        var id = (user_data.cart[i]).id;
        inner_li += '<li class="rack-item" id="'+id+'" ></li>';
        document.getElementById("cart-list").innerHTML = inner_li;

        var quantity = (user_data.cart[i]).quantity;
        for(var j=0; j<products.length; j++){
            if(products[j].id === id){
                var name = products[j].name;
                var price = products[j].price;
                break;
            }
        }
        inner_div =  '<div class="list-item"><div><img src="./Pictures/logo'+id+'.png" alt="pic" class="item-img"></div><div class="item-name"><span>'+name+'</span></div><div class="quantity"><input type="button" class="inc-dec" value="  +  " onclick="add_one('+id+')"><input type="number" id="item-quantity" value="'+quantity+'"><input type="button" class="inc-dec" value="  -  " onclick="remove_one('+id+')"></div><div class="price"><span>&#36;'+price+'</span></div><div class="remove"><input type="button" value="Remove" onclick="remove_all('+id+')"></div></div>';
        document.getElementById(id).innerHTML = inner_div;
    }

    calc_grand_total();
}


generate_cart();