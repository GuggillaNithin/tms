import { isInWishlist, toggleWishlist } from "./wishlist.js"

/* ================================
   READ CATEGORY FROM URL
================================ */
console.log("shop.js loaded")

const params = new URLSearchParams(window.location.search)
const category = params.get("category")
const grid = document.getElementById("products-grid")

function setWishlistButtonState(button, active) {
  const icon = button.querySelector("i")
  if (!icon) return

  icon.classList.toggle("bi-heart-fill", active)
  icon.classList.toggle("bi-heart", !active)
  button.setAttribute("aria-pressed", String(active))
  button.title = active ? "Remove from Wishlist" : "Add to Wishlist"
}

/* ================================
   LOAD PRODUCTS
================================ */
async function loadProducts() {
  const res = await fetch("./js/data.json")
  const products = await res.json()

  // filter by category
  const filteredProducts = category
  ? products.filter(p =>
      Array.isArray(p.category)
        ? p.category.includes(category)
        : p.category === category
    )
  : products

  renderProducts(filteredProducts)
}

/* ================================
   RENDER PRODUCTS
================================ */
function renderProducts(products) {
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
            <img src="${product.img.thumbs[0]}" class="img1" alt="${product.name}" loading="lazy">
            <img src="${product.img.thumbs[1] || product.img.thumbs[0]}" class="img2" alt="${product.name}" loading="lazy">
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

          

          <span class="product-discount">-${product.discount}%</span>

          <div class="product-links">
            <button>
              <i class="bi bi-basket-fill"></i>
            </button>
            <button class="add-to-wishlist" data-id="${product.id}">
              <i class="bi bi-heart"></i>
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

  const wishlistButtons = grid.querySelectorAll(".add-to-wishlist")
  wishlistButtons.forEach((button) => {
    const id = Number(button.dataset.id)
    if (!id) return
    setWishlistButtonState(button, isInWishlist(id))
  })
}

grid.addEventListener("click", (event) => {
  const wishlistButton = event.target.closest(".add-to-wishlist")
  if (!wishlistButton) return

  const productId = Number(wishlistButton.dataset.id)
  if (!productId) return

  const active = toggleWishlist(productId)
  setWishlistButtonState(wishlistButton, active)
})


loadProducts()
