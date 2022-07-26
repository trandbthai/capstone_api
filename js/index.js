export function renderProductItem(arrProduct, idBody) {
  var html = "";

  for (let i = 0; i < arrProduct.length; i++) {
    var product = arrProduct[i];
    html += `
      <div class="product-col col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <div class="product-item">
              <div class="product-img">
                <img src="${product.image}" alt="${product.id}" />
              </div>
              <div class="product-details">
                <p class="product-name">${product.name}</p>
                <span class="product-description">${
                  product.description.length > 100
                    ? product.description.substring(0, 100) + "..."
                    : product.description
                }</span>
              </div>
              <div class="product-action">
                <a href="./detail.html?productid=${
                  product.id
                }" target="_blank" class="product-buy">Buy now</a>
                <span class="product-price">$${product.price}</span>
              </div>
              </div>
            </div>
      `;
  }
  document.getElementById(idBody).innerHTML = html;
}

function getDataProduct() {
  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product",
    method: "GET",
  });

  //
  promise.then(function (result) {
    console.log(result.data.content);
    renderProductItem(result.data.content, "featureBody");
  });
}

window.onload = function () {
  getDataProduct();
};
