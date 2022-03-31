//Get available products
getProducts();


//Create products from above list
createProducts();

async function getProducts() {
    let products = await fetch('http://localhost:3000/api/products');
    console.log("Products successfully retrieved !")
    return products.json();
}

async function createProducts() {
    let result = await getProducts()
    .then( (product) => {
        for (let i=0; i < product.length; i++) {		

            // Insert <a>
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${product[i]._id}`;

            // Insert <article>
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insert <img>
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = product[i].imageUrl;
            productImg.alt = product[i].altTxt;

            // Insert <h3>
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = product[i].name;

            // Insert <p>
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = product[i].description;
        }
    });
    console.log("Products have been created !");

}