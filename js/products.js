let product  = document.getElementsByClassName('product');
async function getProducts(){
    let response =await fetch('https://fakestoreapi.com/products');
    let data = await response.json()
    console.log(data);
    display(data)   
}
getProducts();

function display(data){
    let temp = "" ;
    data.map((product) => {
        const shortTitle = product.title.length > 35 ? 
        product.title.substring(0,35) + ".." :  product.title
        temp += `
        <div id=${product.id} class="col-md-2 product d-flex m-1" onclick="goToDetails(${product.id})">
        <div class="card d-flex flex-column justify-content-between h-100 p-1  w-100">

        <img id="productImg" class="w-100 p-0" src=${product.image} alt=${product.title}>
           <h5 id="productName"  class="my-2 fs-6" > ${shortTitle} </h5>
           <span id="price" class="text-success fw-bold mb-2" >${product.price} LE </span>
           <p id="productDescription" class="fw-bold text-warning mb-2">${product.category}</p>
           <button class="btn btn-success w-75 m-auto my-2" onclick="event.stopPropagation(); addToCart(${product.id})">Add to cart </button>
           </div>
           </div>
           `    })
        let productContainer = document.getElementById('productContainer');
        productContainer.innerHTML = temp;
}

  // to navigate to product details page when click on any product
async function goToDetails(id) {   
     window.location.href = `./details.html?id=${id}` ;
    }

//  to get the product id from the search and tell js  to use it in the details function to display the specific product data
document.addEventListener('DOMContentLoaded' , ()=>{
const param = new URLSearchParams(window.location.search); // hna b7ot el url search 3ndy fel mot8ayer dh 
const id = param.get("id");                                   // w b3den hena btal3 meno el id 3lshan hast5dmo fel details
if(id){
    getProductDetails(id); 
}
})
async function getProductDetails(id) {
    let detailedProduct = document.getElementById('detailedProduct')
    let response = await fetch(`https://fakestoreapi.com/products/${id}`)
    let details= await response.json();
    console.log(details)
    let temp =`
     <div class="container" >
          <div class="row ">
            <div class="productImg col-md-5">
                <div>
                    <img class="w-100 pb-1 pe-3" src=${details.image} alt= ${details.title}>
                </div>
            </div>
            <div class="details col-md-5  d-flex justify-content-center align-items-center ">
                <div  class="d-flex flex-column ">
                    <h3 class="py-2">${details.title}</h3>
                    <p class="text-secandery">${details.description}</p>
                    <p class="fw-bold text-success">${details.price} LE</p>
                    <p class="fw-bold text-warning">${details.rating.rate} <i class="fa-solid fa-star"></i></p>
                   <button class="btn btn-success w-100 m-auto my-2" onclick="addToCart(${details.id})" >Add to cart </button>
 
                </div>
            </div>
        </div>
  </div>
    `
    detailedProduct.innerHTML = temp;
}

async function addToCart(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
    let cart = JSON.parse(localStorage.getItem("cart"))  || []; 
    let existProducts = cart.find(item => item.id === product.id);

    if(existProducts){
        existProducts.quantity += 1
    }
    else{
        product.quantity =1;
        product.unitPrice = product.price;   // to save the unit price and use it in the increment and decrement
        cart.push(product)
    }
    localStorage.setItem("cart" , JSON.stringify(cart));
    window.alert('Product Added To You Cart Successfully')
    console.log(cart)
}
