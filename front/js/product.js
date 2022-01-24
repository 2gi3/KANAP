// load a single product from http://localhost:3000/api/products/id api

// retreive the product id from the url 
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id')



fetch(`http://localhost:3000/api/products/${id} `)
    .then(response => {
        response.json().then(product => {
            console.log(product);
            // let productHTML ='';

            // tag the product div
            let imgDiv = document.getElementsByClassName('item__img')[0];

            imgDiv.innerHTML = `  <img src="${product.imageUrl}" alt="Photographie d'un canapé">  `;

            let productTitle = document.getElementById("title");

            productTitle.innerHTML =product.name;

            // loop through the array to build the html to be added to our dom
            // data.forEach(product =>{
            //     productHTML +=` 
            //     <a href="./product.html?id=${product._id}">
            //     <article>
            //       <img src="${product.imageUrl}" alt="${product.altTxt}">
            //       <h3 class="productName">${product.name}</h3>
            //       <p class="productDescription">${product.description}</p>
            //     </article>
            //   </a>
            //     `;

            // });
            // modify the content of the div with the html produced
        //    productsDiv.innerHTML = productHTML;
       
        })
    })