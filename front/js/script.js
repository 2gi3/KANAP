// load all products from http://localhost:3000/api/products  api

fetch('https://murmuring-basin-08429.herokuapp.com/api/products')
    .then(response => {
        response.json().then(data => {
            console.log(data);
            let productHTML ='';

            // tag the product div
            productsDiv = document.getElementById('items');

            // loop through the array to build the html to be added to our dom
            data.forEach(product =>{
                productHTML +=` 
                <a href="./product.html?id=${product._id}">
                <article>
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                  <h3 class="productName">${product.name}</h3>
                  <p class="productDescription">${product.description}</p>
                </article>
              </a>
                `;

            });
            // modify the content of the div with the html produced
           productsDiv.innerHTML = productHTML;
       
        })
    })





