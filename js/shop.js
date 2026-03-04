import { isInWishlist, toggleWishlist } from "./wishlist.js"

/* ================================
   READ CATEGORY FROM URL
================================ */
console.log("shop.js loaded")

const params = new URLSearchParams(window.location.search)
const category = params.get("category")
const CATEGORY_ALIASES = {
  "indoor-medias": "indoor-media",
  "outdoor-medias": "outdoor-media",
  "acrylic-fabrications": "acrylic-products-fabrication",
  "acrylic-fabrication": "acrylic-products-fabrication"
}
const normalizedCategory = category ? (CATEGORY_ALIASES[category] || category) : null

const CATEGORY_SEO = {
  "indoor-media": {
    title: "Indoor Advertising Media Dubai | Retail Display Solutions UAE",
    description: "High-quality indoor advertising media designed for retail stores, malls and commercial spaces to enhance customer engagement in UAE."
  },
  "outdoor-media": {
    title: "Outdoor Advertising Media Dubai | Branding Displays UAE",
    description: "Durable outdoor advertising media solutions including banners, signage and branding displays built for maximum visibility in Dubai."
  },
  "accessories": {
    title: "Advertising Display Accessories Dubai | Media Supplies UAE",
    description: "Complete range of advertising accessories and mounting solutions for signage, displays and branding installations across UAE."
  },
  "led-lcd-displays": {
    title: "LED & LCD Display Screens Dubai | Digital Signage UAE",
    description: "Advanced LED and LCD display solutions for advertising, retail branding and commercial communication across Dubai and UAE."
  },
  "display-items": {
    title: "Display Items | TMS Catalogue",
    description: "Discover display items like roll-up banners, pop-up displays, poster frames, lightboxes, and table display systems."
  },
  "display-stands": {
    title: "Display Stands | TMS Catalogue",
    description: "View our range of display stands including smart stands, wall shelves, hanging profiles, and other promotional stand solutions."
  },
  "acrylic-products-fabrication": {
    title: "Acrylic Display Stands Dubai | Custom Branding Displays UAE",
    description: "Premium acrylic stands and display solutions ideal for retail branding, exhibitions and promotional setups in Dubai."
  }
}

function applyCategorySeo() {
  const defaultSeo = {
    title: "TMS | Catalogue",
    description: "Explore our complete product catalogue of indoor media, outdoor media, LED displays, accessories, acrylic products, and display solutions."
  }

  const seo = normalizedCategory ? (CATEGORY_SEO[normalizedCategory] || defaultSeo) : defaultSeo
  document.title = seo.title

  let descriptionMeta = document.querySelector('meta[name="description"]')
  if (!descriptionMeta) {
    descriptionMeta = document.createElement("meta")
    descriptionMeta.setAttribute("name", "description")
    document.head.appendChild(descriptionMeta)
  }
  descriptionMeta.setAttribute("content", seo.description)
}

applyCategorySeo()
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
  const filteredProducts = normalizedCategory
  ? products.filter(p =>
      Array.isArray(p.category)
        ? p.category.includes(normalizedCategory)
        : p.category === normalizedCategory
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

  title.textContent = normalizedCategory
    ? normalizedCategory.replace(/-/g, " ").toUpperCase()
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
            
            <button class="add-to-wishlist" data-id="${product.id}">
              <i class="bi bi-heart"></i>
            </button>
            <a href="single-product.html?id=${product.id}">
              <i class="bi bi-eye-fill"></i>
            </a>
            <a href="#" class="share-product" data-product-name="${product.name}" data-product-url="single-product.html?id=${product.id}">
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
