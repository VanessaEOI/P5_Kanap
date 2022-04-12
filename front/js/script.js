// Get products from API
getProducts();

// Create products from above list
createProducts();

// Retrieve data from API
async function getProducts() {
    let products = await fetch('http://localhost:3000/api/products');
    console.log("Products successfully retrieved !")
    return products.json();
}

// Create tags and import products data
async function createProducts() {
    let result = await getProducts()
    .then( (product) => {
        // Create iteration for each product from list
        for (let i in product) {
        // OU (let i=0; i < product.length; i++)

            // Insert <a> in class .items
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            // Create URL with product id retrieved from API
            productLink.href = `product.html?id=${product[i]._id}`;

            // Insert <article>
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insert <img>
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            // Retrieve img and alt txt from API
            productImg.src = product[i].imageUrl;
            productImg.alt = product[i].altTxt;

            // Insert <h3>
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            // Add class .productName
            productName.classList.add("productName");
            // Add product name in h3 tag from API
            productName.innerHTML = product[i].name;

            // Insert <p>
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            // Add class .productDescription
            productDescription.classList.add("productName");
            // Add product description in p tag from API
            productDescription.innerHTML = product[i].description;

            console.log("New couch added !");
        }
    });
    console.log("All products have been created !");
}