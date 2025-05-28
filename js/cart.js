
let cartItem = document.getElementById('cartItem');
let cart     = JSON.parse(localStorage.getItem("cart") || []);
let bill     = document.getElementById('bill');
document.addEventListener("DOMContentLoaded" , displayCart()); // display the cart items once user located to the cart page

function displayCart(){
    if(cart.length  === 0 ){
cartItem.innerHTML  = `<h5 class="text-danger text-center"> Your Cart Is Empty ! Start Shopping</h5>` 
return;
}
else{
    let temp=``;
    cart.map((product) => {
        temp += `
        <div class="indiviualItem col-md-7 border border-1  my-2">
        <div id="item" >
            <div class="image">
                <img class="my-2" src=${product.image} alt=${product.title}>
                <p  >${product.title}</p>
                <p class="text-success fw-bold me-4 ">Quantity :${product.quantity} </p>
                <p class="text-success fw-bold me-4 ">  ${product.price} LE </p>
            </div>
            <div class="itemButtons mb-2">
            <button onclick="decrement(${product.id})" id="inc" class="btn btn-success fs-6" >-</button>
                <button onclick="increment(${product.id})" id="dec" class="btn btn-success fs-6 ">+</button>
                <button onclick="Delete(${product.id})" class="btn btn-danger deleteBtn fs-6"><i class="fa-solid fa-trash"></i></button>
                </div>
                <div>
                </div>
                </div>
                </div>
           `
        })
        cartItem.innerHTML =temp ;
        totalBill();
    }
}

function increment(id){     
    cart = cart.map((p) => {
        if(p.id === id) {
        p.quantity += 1 ;
        p.price = p.unitPrice * p.quantity ;  // unitprice refer to taklofet el item el wa7ed 
       }
       return p ;
    });
    localStorage.setItem("cart" , JSON.stringify(cart));
    displayCart();
    totalBill();
    // console.log("hi")
}
function decrement(id){
    cart = cart.map((p)=>{
        if(p.id === id  && p.quantity > 1 ) {
            p.quantity -= 1 ;
            p.price = p.unitPrice * p.quantity ;
        }
        return p;
    });
    localStorage.setItem("cart" , JSON.stringify(cart));
    displayCart();
    totalBill();
}

function Delete(id) {
   cart = cart.filter((item) => item.id !== id)  // to create new arr without deleted item 
    localStorage.setItem("cart" , JSON.stringify(cart) );
    displayCart();
    totalBill();
}

function totalBill(){
    allCartProduct = JSON.parse(localStorage.getItem("cart") )  // 7awelly kol el fel localstorage l arr of objects
    total = 0
    allCartProduct.map((item)=> {
        total = total + item.price;
        return total;
    })
    bill.innerHTML = `Your Bill : ${total} LE`
}