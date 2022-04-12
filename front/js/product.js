// Get product ID from URL
const idProduct = new URL(window.location.href).searchParams.get("id");
console.log(`Product ${idProduct} retrieved !`);

// Retrieving selectors in the product page
let imgProduct = document.querySelector(".item__img");
let img = document.createElement("img");
imgProduct.appendChild(img);

let titleProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
let colorsProduct = document.getElementById("colors");


getProduct();

// Retrieving product with the id
async function getProduct() {
    await fetch("http://localhost:3000/api/products/" + idProduct)
    
   .then((response) => response.json()) // Format response 

    // Inserting product data from id
   .then(product => {
       img.setAttribute("src", product.imageUrl);
       img.setAttribute("alt", product.altTxt);    
       titleProduct.innerHTML = product.name;
       priceProduct.innerHTML = product.price;
       descriptionProduct.innerHTML = product.description;
       document.title = product.name;

        // Create colors options
       for (let i=0; i < product.colors.length; i++) {
           let color = document.createElement("option");
           color.setAttribute("value", product.colors[i]);
           color.innerHTML = product.colors[i];
           colorsProduct.appendChild(color);
       }  
   })

   .catch((err) => console.log('Error : ' + err));          
}