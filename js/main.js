logged_user = localStorage.getItem("logged_in_user");
user_data = JSON.parse(document.getElementById(String(logged_user)));

if(logged_user == null){
    // if no user is logged in 
    // show login and signin
    document.getElementById("navbarSupportedContent").innerHTML = '<ul class="navbar-nav  mb-4 mb-lg-3" id="user-buttons">    <li class="nav-item">      <a class="nav-link  active" aria-current="page" href="signup.html">Signin</a>    </li>  <li class="nav-item">      <a class="nav-link" href="login.html">login</a> </li>  </ul>';
    
}   
else{
    // if an user is logged in 
    // show an avatar and a link to cartlist.html
    document.getElementById("navbarSupportedContent").innerHTML = '<div> <label for="to-cartlist"></label><a href="cartlist.html" id="to-cartlist"><img src="/Pictures/avatar.jpg" alt="avatar" id="avatar"></a></div>';
}  



products = JSON.parse(localStorage.getItem("products"));
if(products===null){
    products = [
        {
            id: 201,
            name: "ZebDuke",
            price: 1500,
        },
        {
            id: 202,
            name: "Havels Light",
            price: 300,
        },
        {
            id: 203,
            name: "Rolex Watch",
            price: 2000,
        },
        {
            id: 204,
            name: "American Tourister Bag",
            price: 3000,
        },
        {
            id: 205,
            name: "WildCraft Bag",
            price: 1800,
        },
    ];
    stringified_products = JSON.stringify(products);
    localStorage.setItem("products", stringified_products);
}
var j=0;
for(var i=0; i<products.length; i++){
    // get inner code on rack
    inner = document.getElementById("rack").innerHTML ;
    // add new rack-item div
    add = '<div class="rack-item col-3" id="'+String(i)+'" ></div>';
    inner = inner + add;
    // inject code in rack
    document.getElementById("rack").innerHTML = inner;
    var id = (products[j]).id;
    var name = (products[j]).name;
    var price = (products[j]).price;
    // create html code
    var html_code = '<div class="item-pic">  <img src="/Pictures/logo'+String(id)+'.png" alt="Item-pic"></div><div class="item-name">  <span>'+String(name)+'</span></div><div class="item-price">  <span>Price: '+String(price)+' &#36; </span></div><div class="save-it"><input type="button" value="Save it" id="add-'+String(id)+'-to-cart" onclick="save('+String(id)+')"></div>';
    // insert code in html item div
    document.getElementById(String(i)).innerHTML = html_code;
    j++;
    if(j==products.length){
        j=0;
    }
    // document.getElementById('add-'+String(id)+'-to-cart').addEventListener("click", function() {
        // save("this is id");
    // })
    
}


function save(id){
    logged_user = localStorage.getItem("logged_in_user");
    if(logged_user === null){
        alert("You are not logged in!");
        return 0;
    }

    user = localStorage.getItem(String(logged_user));
    user = JSON.parse(user);
    // console.log(user.cart);
    if(user.cart.length < 1){
        item = {
            id: id,
            quantity: 1,
        };
        user.cart.push(item);
    }
    else{
        for(var i=0;i<(user.cart).length;i++){
            if(user.cart[i].id === id){
                user.cart[i].quantity += 1;
                localStorage.setItem(logged_user,JSON.stringify(user));
                return 0;
            }
        }

        item = {
            id: id,
            quantity: 1,
        };
        user.cart.push(item);
    }
    localStorage.setItem(logged_user,JSON.stringify(user));

    return 0;

}





