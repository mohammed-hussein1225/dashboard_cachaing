// add class active
const links = document.querySelectorAll("ul li a");
const currentPage = window.location.pathname.split("/").pop();
links.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

const bar = document.querySelector(".title-content .bar ");
const menu = document.querySelector(".menu");
bar.onclick = function () {
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
};
menu.onclick = function () {
  menu.style.display = "none";
};

// on click menu open menu

// ################################################################################################################

let price = document.querySelector(".containerInput .input_price");
let amount = document.querySelector(".containerInput .input_amount");
let name_product = document.querySelector(".containerInput .input_name");

let array = [];

// get data from local storage
if (localStorage.getItem("product")) {
  array = JSON.parse(localStorage.getItem("product"));
}

// trigger function
get_data_from_localStorage();

function add_row_to_table(data) {
  if (document.querySelector("#table") == undefined) return;

  let table = document.querySelector("#table");

  for (let i = 0; i < data.length; i++) {
    let tbody = document.querySelector("tbody");
    let tr = document.createElement("tr");

    let deleteBtn = document.createElement("td");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.id = "deleteBtn";
    deleteBtn.setAttribute("data-id", data[i].id);

    let name_td = document.createElement("td");
    name_td.textContent = data[i].name;

    let amount_td = document.createElement("td");
    amount_td.textContent = data[i].amount;

    let price_td = document.createElement("td");
    price_td.textContent = data[i].price;

    let total_price_td = document.createElement("td");
    total_price_td.innerHTML = Number(data[i].amount * data[i].price);

    tr.appendChild(name_td);
    tr.appendChild(amount_td);
    tr.appendChild(price_td);
    tr.appendChild(total_price_td);
    tr.appendChild(deleteBtn);

    tbody.appendChild(tr);
    table.appendChild(tbody);
  }
}

delete_product();

function delete_product() {
  let array = JSON.parse(localStorage.getItem("product")) || [];
  let deleteBtns = document.querySelectorAll("#deleteBtn");

  deleteBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      let id = btn.getAttribute("data-id");

      array = array.filter((product) => product.id !== id);
      //  remove product from Array
      array.splice(index, 1);
      // update local storage
      window.localStorage.setItem("product", JSON.stringify(array));
      // remove  product from page
      btn.parentElement.remove();
      total();
    });
  });
}

total();

function total() {
  document.getElementById("total-products");
  let total_amount = 0;
  let total_price = 0;
  let array = JSON.parse(localStorage.getItem("product")) || [];
  for (let i = 0; i < array.length; i++) {
    total_amount += Number(array[i].amount);
    total_price += Number(array[i].price * array[i].amount);
  }

  if (document.getElementById("total-products") == undefined) return;
  document.getElementById("total-products").innerHTML = total_amount;

  if (document.getElementById("total-price") == undefined) return;
  document.getElementById("total-price").innerHTML = total_price;
}

//  Add data to array
function add_data_to_array(name_input, amount_input, price_input) {
  const data = {
    name: name_input,
    price: price_input,
    amount: amount_input,
    id: Math.random(),
  };
  array.push(data);

  add_data_to_local_storage(array);
}

function get_data_from_localStorage() {
  let data = window.localStorage.getItem("product");
  if (data) {
    let product = JSON.parse(data);
    add_row_to_table(product);
  }
}

//  set data to Local Storage
function add_data_to_local_storage(data) {
  localStorage.setItem("product", JSON.stringify(data));
}

// trigger function
check();

function check() {
  // console.log(document.querySelector(".containerInput input"));
  if (document.querySelector(".containerInput input") == undefined) return;
  if (
    name_product.value.trim() !== "" &&
    price.value.trim() !== "" &&
    amount.value.trim() !== ""
  ) {
  }

  if (document.getElementById("add_product") == undefined) return;

  document
    .getElementById("add_product")
    .addEventListener("click", function (event) {
      if (
        name_product.value.trim() !== "" &&
        price.value.trim() !== "" &&
        amount.value.trim() !== ""
      ) {
        add_data_to_array(
          name_product.value.trim(),
          amount.value.trim(),
          price.value.trim()
        );

        name_product.value = "";
        price.value = "";
        amount.value = "";
      } else {
        event.preventDefault();
        alert("Please fill in all fields.");
      }
    });
}

show_products();
function show_products() {
  let container = document.querySelector(".product-content");
  for (let i = 0; i < array.length; i++) {
    // console.log(array[i]);
    let div = document.createElement("div");
    div.className = "div_product";

    let img = document.createElement("img");
    img.src = "image/tiger.jpg";
    let p_name = document.createElement("p");
    p_name.innerHTML = `name: ${array[i].name}`;

    let p_price = document.createElement("p");
    p_price.innerHTML = `price: ${array[i].price} `;

    div.appendChild(img);
    div.appendChild(p_name);
    div.appendChild(p_price);
    container.appendChild(div);
  }
}
