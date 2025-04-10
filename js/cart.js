var xhr = new XMLHttpRequest();
var data;
var items;
var price = document.getElementsByClassName("price");
var totalPrice = document.getElementById("totPrice");
var total = 0;
var deleteCounter = 0;
var card = document.querySelector("section");
xhr.open("Get", "https://fakestoreapi.com/products", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        data = xhr.responseText;
        data = JSON.parse(data);
        CheckOutDisplay();
    }
}
xhr.send();
function CheckOutDisplay() {
    total = 0;
    card.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
        items = localStorage.getItem("item#" + (i));

        card.innerHTML += `<div class="itemsSelected">
                        <div class="card">
                            <img src="" alt="">
                            <div class="information">
                                <div class="details">
                                    <span class="title">Lenovo laptop 15'6 inch Lorem ipsum dolor sit amet. Lorem ipsum
                                        dolor
                                        sit
                                        amet
                                        consectetur adipisicing elit. Ex, nisi!</span>
                                    <div class="price text-primary fw-bold fs-4">10.666 EGP</div>
                                    <div class="fw-bold fs-smaller">FREE Shipping</div>
                                    <br>
                                    <div class="text-muted">
                                        <span>Category:</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="category">
                                            Books</span>
                                        <br>
                                        <span>Rating:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                                            class="rating">
                                            3.9</span>
                                    </div>
                                </div>
                                <div class="quantity">
                                    <span>QTY</span>
                                    <select name="qty" class="qtyNo">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                            <hr>
                            <a href="#" class="deleteItem" data-index="${i}">Delete</a>

                    </div>`
        document.images[i].src = data[items - 1].image;
        document.getElementsByClassName("title")[i].innerHTML = data[items - 1].title;
        price[i].innerHTML = data[items - 1].price + " EGP";
        total = total + (data[items - 1].price) * document.getElementsByClassName("qtyNo")[i].value;
        document.getElementsByClassName("category")[i].innerHTML = data[items - 1].category;
        document.getElementsByClassName("rating")[i].innerHTML = data[items - 1].rating.rate;
    }
    showTotalPrice();
    document.querySelectorAll(".deleteItem").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const index = parseInt(btn.getAttribute("data-index"));
            deleteItem(index);
        });
    });
}
function deleteItem(i) {

    var products = [];
    for (let h = 0; h < localStorage.length; h++) {
        products.push({ no: h, id: (localStorage.getItem("item#" + h)) })
    }
    products.splice(i, 1);
    localStorage.clear();
    for (let k = 0; k < products.length; k++) {
        localStorage.setItem("item#" + k, products[k].id);
    }
    CheckOutDisplay();
}
function showTotalPrice() {
    console.log("total is " + total);
    totalPrice.innerHTML = total.toFixed(3);
}



