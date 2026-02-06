/* ================================
   READ CATEGORY FROM URL
================================ */
console.log("shop.js loaded")

const params = new URLSearchParams(window.location.search)
const category = params.get("category")

/* ================================
   LOAD PRODUCTS
================================ */
async function loadProducts() {
  const res = await fetch("./js/data.json")
  const products = await res.json()

  // filter by category
  const filteredProducts = category
    ? products.filter(p => p.category === category)
    : products

  renderProducts(filteredProducts)
}

/* ================================
   RENDER PRODUCTS
================================ */
function renderProducts(products) {
  const grid = document.getElementById("products-grid")
  grid.innerHTML = ""

  if (products.length === 0) {
    grid.innerHTML = "<p>No products found.</p>"
    return
  }

  // update title & count
  const title = document.getElementById("category-title")
  const count = document.getElementById("category-count")

  title.textContent = category
    ? category.replace(/-/g, " ").toUpperCase()
    : "Products"

  count.textContent = `${products.length} Products`

  products.forEach(product => {
    grid.innerHTML += `
      <div class="product-item">
        <div class="product-image">
          <a href="single-product.html?id=${product.id}">
            <img src="${product.img.thumbs[0]}" class="img1" alt="${product.name}">
            <img src="${product.img.thumbs[1] || product.img.thumbs[0]}" class="img2" alt="${product.name}">
          </a>
        </div>

        <div class="product-info">
          <a href="single-product.html?id=${product.id}" class="product-title">
            ${product.name}
          </a>

          <ul class="product-star">
            <li><i class="bi bi-star-fill"></i></li>
            <li><i class="bi bi-star-fill"></i></li>
            <li><i class="bi bi-star-fill"></i></li>
            <li><i class="bi bi-star-fill"></i></li>
            <li><i class="bi bi-star-half"></i></li>
          </ul>

          <div class="product-prices">
            <strong class="new-price">$${product.price.newPrice.toFixed(2)}</strong>
            <span class="old-price">$${product.price.oldPrice.toFixed(2)}</span>
          </div>

          <span class="product-discount">-${product.discount}%</span>

          <div class="product-links">
            <button>
              <i class="bi bi-basket-fill"></i>
            </button>
            <button>
              <i class="bi bi-heart-fill"></i>
            </button>
            <a href="single-product.html?id=${product.id}">
              <i class="bi bi-eye-fill"></i>
            </a>
            <a href="#">
              <i class="bi bi-share-fill"></i>
            </a>
          </div>
        </div>
      </div>
    `
  })
}


loadProducts()
