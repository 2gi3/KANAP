
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const orderId = urlParams.get('orderId');


  //Define the LoadCart Function
const loadCart = () => {

    // retreive local storage array
  let products = JSON.parse(localStorage.getItem("cart"));

  let totalPrice = document.getElementById("totalPrice");

  let totalArticles = document.getElementById("totalQuantity");

  let cart_quantity = 0;
  let cart_price = 0;
    //Loop through the producrt array fom local storage
    products.forEach(product => {


      fetch(`https://murmuring-basin-08429.herokuapp.com/api/products/${product._id} `)
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
                  <p> &euro; (${p.price})* ${product.quantity}</p>
                  <p> &euro;${p.price}</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Q té:</p>
                    <input id='${p._id}-${product.color}' type="number" class="itemQuantity" onchange="updateCart('${p._id}','${product.color}')" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" onclick="deleteItem('${p._id}','${product.color}')" >Delete</p>
                    
                  </div>
                </div>
              </div>
            </article>`;
            cart.innerHTML += cartItems;

            cart_quantity += parseInt(product.quantity);
            cart_price += parseInt(p.price) * parseInt(product.quantity);

            
         totalArticles.innerHTML = cart_quantity;

    
         totalPrice.innerHTML = cart_price;

          })
        });

        //End of foreach Loop
        //Modify the totalQuantity Element 
  
    });


  };


 

const deleteItem = (id, color) => {

  // retreive local storage array
  let products = JSON.parse(localStorage.getItem("cart"));
  // target id && color of item to be deleted
  let index = products.findIndex(entry => entry._id === id && entry.color===color);

  if (index != -1) {
    // remove item from array
    products.splice(index, 1); 
    // store new array back to local storage
    localStorage.setItem('cart', JSON.stringify(products));
  }

  //Update the cart
  //clearing the cart items element
  document.getElementById("cart__items").innerHTML = "";
  // reload element
  loadCart();
 
}

const updateCart = (id, color) => {

  // alert('updating');
  //retrieve the quantity
  let quantity = parseInt(document.getElementById(`${id}-${color}`).value);
  // retrieve the products array
  let products = JSON.parse(localStorage.getItem("cart"));
  // find the index of the product
  let index = products.findIndex(entry => entry._id == id && entry.color==color);
  // update the quantity
  if (index != -1) {
      products[index].quantity = quantity;
      products[index].price = parseInt(products[index].uPrice)*quantity;
  }
  // update local storage
  localStorage.setItem('cart', JSON.stringify(products));
  // clear the cart display
  document.getElementById("cart__items").innerHTML = "";
  // reload the cart and total
  loadCart();
 
  
};

//validate an Input
const validateInput = (Input) =>{
  console.log(Input);
  let value = document.getElementById(`${Input}`).value;
  let erroMsg = document.getElementById(`${Input}ErrorMsg`);
  erroMsg.innerHTML= "";
  let output = true;
  // check that first name is only letters
  const nameValue = document.getElementById(`firstName`).value;
  const firstNameErrorMsg= document.getElementById('firstNameErrorMsg');
  if (/[^a-zA-Z]/.test(nameValue)){
    firstNameErrorMsg.innerHTML =`Please kindly provide a first name that contains only letters`;
    output= false;
  }
  // check that last name has only letters
  const lastNameValue = document.getElementById(`lastName`).value;
  const lastNameErrorMsg= document.getElementById('lastNameErrorMsg');
  if (/[^a-zA-Z]/.test(lastNameValue)){
    lastNameErrorMsg.innerHTML =`Please kindly provide a last name that contains only letters`;
    output= false;
  }

  //Validate empty value
  if(value=="" ){
    erroMsg.innerHTML =`Please kindly provide the ${Input}`;
    output= false;
  }
  //Validate Lenght
  if(value.length <3){
    erroMsg.innerHTML +=` Please ensure the ${Input} is at least 3 characters `;
    output= false;
  }

  //Validate Email
  if(Input=="email"){
    const re = /\S+@\S+\.\S+/g;

    if(!re.test(value)){
      erroMsg.innerHTML +=` Please provide a valid email `;
      output= false;
    }
  }

  return output;
  
}

//Validate Function

const validateAll = (contact) =>{

  let output = true;

  for (const [key, value] of Object.entries(contact)) {

    if(validateInput(`${key}`)==false){
      output = false;
    }
  }
return output;
}

//Function that post the order 

const postOrder = () =>{

  /* CONTACT INPUTS */
let firstName = document.getElementById("firstName").value;
let name = document.getElementById("lastName").value;
let address = document.getElementById("address").value;
let city = document.getElementById("city").value;
let email = document.getElementById("email").value;

  contact ={firstName:firstName,lastName:name,address:address,city:city,email:email};
  let products = JSON.parse(localStorage.getItem("cart"));

  products.forEach((entry,index) =>{
    products[index]=entry._id;
  })

  let postData = {contact:contact,products:products}

  

  if(validateAll(contact)){

    
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
      };


    fetch('https://murmuring-basin-08429.herokuapp.com/api/products/order', options)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
        }).then(response => {
        console.log(response);

        window.location.href=window.location.origin+"/front/html/confirmation.html?orderId="+response.orderId ;
        
      
        }).catch(e => {
        console.log(e);
        });

  }


}

 ///FOR THE CONFIRMATION PAGE
 
if(orderId!=null){

      let orderSpan = document.getElementById('orderId');
      orderSpan.innerHTML = orderId;

      //clear the cart local storage
      localStorage.clear();

}else{

    //EXECUTE ONLY IN THE CART PAGE
    
      //Execute the LoadCart Function
      loadCart();

     

      let orderBtn = document.getElementById("order");

      orderBtn.addEventListener("click", (e)=>{

        postOrder();

        console.log("post");
      })

}

