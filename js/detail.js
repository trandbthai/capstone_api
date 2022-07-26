import { renderProductItem } from "./index.js";

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("productid");
  console.log("params", myParam);

  // get data
  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product/getbyid?id=" + myParam,
    method: "GET",
  });

  promise.then(function (result) {
    console.log(result.data.content);
    var product = result.data.content;
    // showingProductTarget(product)
    console.log(product);
    showingProductTarget(product);
    renderProductItem(product.relatedProducts, "related-product-content");
  });
  promise.catch(function (err) {
    console.log("err", err);
  });

  document.getElementById("quantity-input").value = 1;
  quantityPlusMinus();
};

function quantityPlusMinus() {
  var quantityValue = +document.getElementById("quantity-input").value;

  document
    .getElementById("quantity-left-plus")
    .addEventListener("click", function (e) {
      e.preventDefault();
      quantityValue += 1;
      document.getElementById("quantity-input").value = quantityValue;
    });

  document
    .getElementById("quantity-right-minus")
    .addEventListener("click", function (e) {
      e.preventDefault;
      if (quantityValue > 0) {
        quantityValue -= 1;
        document.getElementById("quantity-input").value = quantityValue;
      }
    });
}

function showingProductTarget(product) {
  document.getElementById("target-img").src = product.image;
  document.getElementById("target-name").innerHTML = product.name;
  document.getElementById("target-description").innerHTML = product.description;
  //showing size
  var html = "";
  for (let i = 0; i < product.size.length; i++) {
    let size = product.size[i];
    html += `<button id=${size} class="size-item" onclick="changeBgColor(${size})">${size}</button>`;
  }

  document.getElementById("target-size").innerHTML = html;
  document.getElementById("target-price").innerHTML = product.price;
}

window.changeBgColor = (id) => {
  var btnActive = document.querySelector(".size-active");
  if (btnActive) {
    btnActive.classList.remove("size-active");
  }
  document.getElementById(id).classList.add("size-active");
};
