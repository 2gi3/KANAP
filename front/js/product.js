// load a single product from http://localhost:3000/api/products/id api

// retrieve the product id from the url 
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id')

fetch(`https://murmuring-basin-08429.herokuapp.com/api/products/${id} `)
    .then(response => {
        response.json().then(product => {
            // console.log(product.price);

            price = product.price

            // tag the product div
            let imgDiv = document.getElementsByClassName('item__img')[0];
            imgDiv.innerHTML = `  <img src="${product.imageUrl}" alt="Photographie d'un canapé">  `;

            let productTitle = document.getElementById("title");
            productTitle.innerHTML = product.name;

            let productPrice = document.getElementById("price");
            productPrice.innerHTML = product.price;

            let productDescription = document.getElementById("description");
            productDescription.innerHTML = product.description;

            let colorsDropdown = document.getElementById("colors");
            product.colors.forEach(element => {
                colorsDropdown.innerHTML += `<option value="${element}">${element}</option>`;
            });
        })
    });

    document.getElementById("addToCart").addEventListener("click", ()  => { 

        let cart = localStorage.getItem("cart");
        color = document.getElementById("colors").value;       
        let quantity = document.getElementById("quantity").value;
        // check if color has been selected
        if (color ==""){
            alert("please select a color");
        } else {
            let products = [];
            // If a cart doesn't exist push object to array then store array in local storage
            if (cart == null){
                products.push( { _id:id, quantity:parseInt(quantity), color:color } )
                localStorage.setItem("cart", JSON.stringify(products))
            }else{
                // if there is already an object in the array then find if it hase same id
                cart = JSON.parse(localStorage.getItem("cart"));
                let index = cart.findIndex( object => object._id == id && object.color == color );
                // if id is the same then check color
                if (index != -1) {
                    // if color is the same then add 1 to quantity
                    
                        cart[index].quantity += parseInt(quantity); 
                      
                    
                }else{
                    cart.push( { _id:id, quantity:parseInt(quantity), color:color})
                }
                localStorage.setItem("cart", JSON.stringify(cart));
            }          

        }

    });



