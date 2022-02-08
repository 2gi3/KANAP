let products = JSON.parse(localStorage.getItem("cart"));
console.log(products);

products.forEach(product => {
    fetch(`http://localhost:3000/api/products/${product._id} `)
    .then(response => {
        response.json().then(p => {
            let cartItems = "";
            let cart = document.getElementById("cart__items");
            cartItems += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
              <img src="${p.imageUrl}" alt="Photo of a sofa">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${p.name}</h2>
                <p>${product.color} </p>
                <p> &euro; ${p.price}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Q té :${product.quantity} </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem" onclick="myFunction()" >Delete</p>
                  
                </div>
              </div>
            </div>
          </article>`;
          cart.innerHTML += cartItems;

        })
    });   
});

// attempt to make a function for totalPrice and totalQuantity
// let tally = (x) => {
// let a = 0;
// for (let i = 0; i < products.length; i++) {
//   a = parseInt(products[i].quantity) + a;
// };
// let b = document.getElementById(x);
// b.innerHTML = a;
// }

// tally(totalQuantity);

// total number of articles
let cart_quantity = 0;
for (let i = 0; i < products.length; i++) {
  // console.log(cart_quantity);
  cart_quantity = parseInt(products[i].quantity) + cart_quantity;
};
let totalArticles = document.getElementById("totalQuantity");
totalArticles.innerHTML = cart_quantity;

// total price
let cart_price = 0;
for (let i = 0; i < products.length; i++) {
  // console.log(cart_quantity);
  cart_price = parseInt(products[i].price) + cart_price;
};
let totalPrice = document.getElementById("totalPrice");
totalPrice.innerHTML = cart_price;



let myFunction = () => {
  alert('alerttest');
  }



