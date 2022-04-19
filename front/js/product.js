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
       for (let i = 0; i < product.colors.length; i++) {
           let color = document.createElement("option");
           color.setAttribute("value", product.colors[i]);
           color.innerHTML = product.colors[i];
           colorsProduct.appendChild(color);
       }  
   })

   .catch((err) => console.log('Error : ' + err));          
}

//  Add article to cart
let addToCartBtn  = document.getElementById("addToCart");
addToCartBtn .addEventListener("click", addToCart);

function addToCart() {
    const chooseColor = document.querySelector("#colors");
    const chooseQtty = document.querySelector("#quantity");

    if (chooseQtty.value > 0 && chooseQtty.value <=100 && chooseQtty.value != 0 && chooseColor.value != 0) { 
        if (localStorage.getItem("cart")) {
            let productCart = JSON.parse(localStorage.getItem("cart"));
            let colorKanap = document.querySelector("#colors").value;
            let qttyKanap = document.querySelector("#quantity").value;
            const resultFind = productCart.find( (el) => el.idKanap === idProduct && el.colorKanap === colorKanap);
            //If item already in the card
            if (resultFind) {
                let newQuantity = parseInt(qttyKanap) + parseInt(resultFind.qttyKanap);
                resultFind.qttyKanap = newQuantity;
                localStorage.setItem("cart", JSON.stringify(productCart));
            //If item not already in the cart
            } else {                    
                let productCart = JSON.parse(localStorage.getItem("cart"));
                let nameKanap = document.querySelector("#title").textContent;
                let colorKanap = document.querySelector("#colors").value;
                let qttyKanap = document.querySelector("#quantity").value;
                let imgKanap = img.src; 
                let altImg = img.alt;
                let priceKanap = document.querySelector("#price").textContent;
                let productCartObj = {
                    idKanap : idProduct,
                    nameKanap : nameKanap,
                    colorKanap : colorKanap,
                    qttyKanap  : qttyKanap,
                    imgKanap : imgKanap,
                    altImg : altImg,
                    priceKanap : priceKanap
                };
                productCart.push(productCartObj);
                let objCart = JSON.stringify(productCart);
                localStorage.setItem("cart", objCart);
                alert("Ajouté au panier !");
            }
        } else {
            let productCart = [];
            let nameKanap = document.querySelector("#title").textContent;
            let colorKanap = document.querySelector("#colors").value;
            let qttyKanap = document.querySelector("#quantity").value;
            let imgKanap = img.src; 
            let altImg = img.alt;
            let priceKanap = document.querySelector("#price").textContent;
            let productCartObj = {
                idKanap : idProduct,
                nameKanap : nameKanap,
                colorKanap : colorKanap,
                qttyKanap  : qttyKanap,
                imgKanap : imgKanap,
                altImg : altImg,
                priceKanap : priceKanap
            };
            productCart.push(productCartObj);
            let objCart = JSON.stringify(productCart);
            localStorage.setItem("cart", objCart);
            alert("Ajouté au panier !");    
        }
    }
}