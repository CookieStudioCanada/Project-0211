const form = document.querySelector("#add-product-form");
const productsContainer = document.querySelector("#products");
let products = [];

form.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const info = document.querySelector("#info").value;
  const quantity = document.querySelector("#quantity").value;
  const product = { name, price, info, quantity };
  products.push(product);
  renderProducts();
});

// Add search bar and search button
const searchBar = document.createElement("input");
searchBar.setAttribute("type", "text");
searchBar.setAttribute("placeholder", "Search for product");
const searchButton = document.createElement("button");
searchButton.textContent = "Search";

// Add search bar and search button to the form
form.appendChild(searchBar);
form.appendChild(searchButton);

searchButton.addEventListener("click", event => {
  event.preventDefault();
  const searchTerm = searchBar.value.toLowerCase();
  const searchedProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.info.toLowerCase().includes(searchTerm)
    );
  });
  renderProducts(searchedProducts);
});

function renderProducts(productList = products) {
  productsContainer.innerHTML = "";
  productList.forEach((product, index) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div>
        <h3>${product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Info: ${product.info}</p>
        <p>Quantity: ${product.quantity}</p>
      </div>
      <div>
        <button class="delete-button">X</button>
        <button class="modify-button">MOD</button>
      </div>
    `;
			const deleteButton = div.querySelector(".delete-button");
			deleteButton.addEventListener("click", () => {
				products.splice(index, 1);
				renderProducts();
			});
			const modifyButton = div.querySelector(".modify-button");
			modifyButton.addEventListener("click", () => {
				let modifiedProduct = window.prompt(`Enter modified product information in the following format:
				name,price,info,quantity`, `${product.name},${product.price},${product.info},${product.quantity}`);
				if (modifiedProduct) {
					modifiedProduct = modifiedProduct.split(",");
					product.name = modifiedProduct[0];
					product.price = modifiedProduct[1];
					product.info = modifiedProduct[2];
					product.quantity = modifiedProduct[3];
					renderProducts();
				}
			});
			productsContainer.appendChild(div);
		});
	}