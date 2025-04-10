var data;
var ajax = new XMLHttpRequest();
var row = document.getElementsByClassName("row");
var cartBtn = document.getElementsByClassName("cartBtn");
var cartLink = document.getElementById("cart");

var searchBar = document.getElementById("searchBar");
var searchBtn = document.getElementById("searchBtn");
var lookFor, lookIn;

ajax.open("get", "https://fakestoreapi.com/products", true);
ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
        data = ajax.responseText;
        data = JSON.parse(data);
        display();
    }
}

ajax.send();

function display() {
    row[0].innerHTML = "";

    for (let i = 0; i < 20; i++) {
        let col = document.createElement("div");
        col.className = "col-md-3 border border-secondary bg-white mb-3";
        col.innerHTML = `
            <div class="item">
                <img class="img-fluid rounded-top" alt="">
                <hr>
                <h5 class="title"></h5>
                <div class="price text-primary fw-bold fs-4"></div>
                <div class="oldPrice text-decoration-line-through text-muted"></div>
                <div class="fw-bold fs-smaller">FREE Shipping</div>
                <button class="cartBtn" onclick="addToCart(${i + 1});">Add To Cart</button>
            </div>`;

        row[0].appendChild(col);

        // Set product data
        col.querySelector("img").src = data[i].image;
        col.querySelector(".title").innerHTML = data[i].title;
        col.querySelector(".price").innerHTML = data[i].price + " EGP";
        col.querySelector(".oldPrice").innerHTML = (parseFloat(data[i].price) + 10).toFixed(2) + " EGP";
    }
}


function addToCart(i) {
    let j = 0;
    if (localStorage.length > 0) {
        j = localStorage.length;
        localStorage.setItem("item#" + j, i);
    } else {
        localStorage.setItem("item#0", i);
    }
    j++;
}

searchBtn.onclick = displayTheSearch;
searchBar.onkeyup = displayTheSearch;

function displayTheSearch() {
    lookFor = searchBar.value.toLowerCase();
    row[0].innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        lookIn = data[i].title.toLowerCase();
        if (lookIn.includes(lookFor)) {
            console.log("you found " + data[i].title + "\n");

            let col = document.createElement("div");
            col.className = "col-md-3 border border-secondary bg-white mb-3";
            col.innerHTML = `
                <div class="item">
                    <img class="img-fluid rounded-top" alt="">
                    <hr>
                    <h5 class="title"></h5>
                    <div class="price text-primary fw-bold fs-4"></div>
                    <div class="oldPrice text-decoration-line-through text-muted"></div>
                    <div class="fw-bold fs-smaller">FREE Shipping</div>
                    <button class="cartBtn" onclick="addToCart(${i + 1});">Add To Cart</button>
                </div>`;

            row[0].appendChild(col);

            col.querySelector("img").src = data[i].image;
            col.querySelector(".title").innerHTML = data[i].title;
            col.querySelector(".price").innerHTML = data[i].price + " EGP";
            col.querySelector(".oldPrice").innerHTML = (parseFloat(data[i].price) + 10).toFixed(2) + " EGP";
        }
    }

    event.preventDefault();
}
