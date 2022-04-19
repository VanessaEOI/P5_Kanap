let productLocalStorage = JSON.parse(localStorage.getItem("cart"));

if (!productLocalStorage) {

    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !";
    sectionCart.style.display = "none";

} else {

    for (let i=0; i < productLocalStorage.length; i++) {

        // Create <article> in <section> cart__items
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", productLocalStorage[i].idKanap);

        // Insert <div> for img
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";

        // Insert img
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = productLocalStorage[i].imgKanap;
        productImg.alt = productLocalStorage[i].altImg;
        
        // Insert <div> for item description
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";

        // Insert <div> for titlePrice
        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";
        
        // Insert <div> for h2
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = productLocalStorage[i].nameKanap;

        // Insert item color
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = productLocalStorage[i].colorKanap;
        productColor.style.fontSize = "20px";

        // Insert item price
        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = productLocalStorage[i].priceKanap + " €";

        // Insert <div> for settings
        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";

        // Insert <div> for settings qtty
        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        
        // Insert "Qté : "
        let productQty = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQty);
        productQty.innerHTML = "Qté : ";

        // Insertion quantity
        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = productLocalStorage[i].qttyKanap;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        // Insert <div> for settings delete
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        // Insert delete item
        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
        productSupprimer.addEventListener("click", (e) => {

            e.preventDefault;
        
            // Get color and id with delete btn
            let deleteId = productLocalStorage[i].idKanap;
            let deleteColor = productLocalStorage[i].colorKanap;

            // filter choosen item with delete btn
            productLocalStorage = productLocalStorage.filter( elt => elt.idKanap !== deleteId || elt.colorKanap !== deleteColor);

            // Sent new data in localStorage
            localStorage.setItem('cart', JSON.stringify(productLocalStorage));               

            // Deleting item alert
            alert('Votre article a bien été supprimé.');
            
            // If localStorage empty
            if (productLocalStorage.length === 0) {
                localStorage.clear();
            }

            //Refresh page
            location.reload();
        });
    }
}

function getTotals(){

    // Retrieve qtty
    let elemsQtt = document.getElementsByClassName('itemQuantity');
    let myLength = elemsQtt.length,
    totalQtt = 0;

    for (let i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }
    
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;

    // Retrieve total
    totalPrice = 0;
    for (let i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * productLocalStorage[i].priceKanap);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}

getTotals();


function modifQtty() {

    let qttyModifier = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttyModifier.length; k++){

        qttyModifier[k].addEventListener("change" , (event) => {

            event.preventDefault();

            // Select item to modify with color && ID
            let quantityModif = productLocalStorage[k].qttyKanap;
            let qttyModifValue = qttyModifier[k].valueAsNumber;
            
            const resultFind = productLocalStorage.find((el) => el.qttyModifValue !== quantityModif);

            resultFind.qttyKanap = qttyModifValue;
            productLocalStorage[k].qttyKanap = resultFind.qttyKanap;

            localStorage.setItem("cart", JSON.stringify(productLocalStorage));
        
            // refresh page
            location.reload();
        })
    }
}

modifQtty();


// Regex form
function getForm() {

    // Add Regex
    let form = document.querySelector(".cart__order__form");

    // Create regular expressions
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Listen modif firstName
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Listen modif lastName
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Listen modif address
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Listen modif city
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Listen modif email
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    // Validation firstname
    const validFirstName = function(inputFirstName) {

        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Validation lastname
    const validLastName = function(inputLastName) {

        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Validation address
    const validAddress = function(inputAddress) {

        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Validation city
    const validCity = function(inputCity) {

        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Validation email
    const validEmail = function(inputEmail) {

        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
}

getForm();

function postForm() {

    const order = document.getElementById('order');

    order.addEventListener('click', (event) => {

        event.preventDefault();
  
        // Retrieving form datas in an object
        const contact = {
            firstName : document.getElementById('firstName').value,
            lastName : document.getElementById('lastName').value,
            address : document.getElementById('address').value,
            city : document.getElementById('city').value,
            email : document.getElementById('email').value
        }

        // Create IDs array from localStorage
        let products = [];
        for (let i = 0; i<productLocalStorage.length;i++) {
            products.push(productLocalStorage[i].idKanap);
        }
        console.log(products);
  
        // Adding from datas & products in card in an object
        const sendFormData = {
            contact,
            products,
        }
  
        // Sending form & localStorage (sendFormData) to server
    
        const options = {
            method: 'POST',
            body: JSON.stringify(sendFormData),
            
            headers: { 
                'Content-Type': 'application/json',
            }
        };
  
        fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('orderId', data.orderId);
            document.location.href = 'confirmation.html?id='+ data.orderId;
        });
  
    }); // End eventListener postForm
  
} // End of sending postForm form

postForm();