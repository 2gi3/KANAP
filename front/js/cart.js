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
                <h2>Name of the product</h2>
                <p>Green</p>
                <p>€42.00</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Delete</p>
                </div>
              </div>
            </div>
          </article>`;
          cart.innerHTML += cartItems;
        })
    });


    
});