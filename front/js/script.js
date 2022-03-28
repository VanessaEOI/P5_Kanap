var a = document.createElement("a");
document.getElementById("items").appendChild(a);

/* Ajouter href a pour renvoi vers la page produit */

var article = document.createElement("article");
document.querySelector("#items > a").appendChild(article);

var img = document.createElement("img");
document.querySelector("#items > a > article").appendChild(img);

var h3 = document.createElement("h3");
h3.setAttribute("class","productName");
document.querySelector("#items > a > article").appendChild(h3);

var p = document.createElement("p");
p.setAttribute("class","productDescription");
document.querySelector("#items > a > article").appendChild(p);




function displayAvailableProducts(){
    fetch(" http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
        return res.json();
    }
})

.then(function(Products) {
    document
        .getElementById("items");
    })

.catch(function(err) {
    // Une erreur est survenue
    });
}

displayAvailableProducts();