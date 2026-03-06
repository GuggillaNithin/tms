import { isInWishlist, toggleWishlist } from "./wishlist.js";

(() => {
  const slides = [...document.querySelectorAll(".hero-bg-slider .hero-bg")];
  if (!slides.length) return;

  let index = 0;
  const intervalMs = 5000;

  function showSlide(nextIndex) {
    slides[index].classList.remove("active");
    index = (nextIndex + slides.length) % slides.length;
    slides[index].classList.add("active");
  }

  setInterval(() => {
    showSlide(index + 1);
  }, intervalMs);
})();

const grid = document.getElementById("bio-products-grid");
const title = document.getElementById("bio-products-title");
const count = document.getElementById("bio-products-count");

const BIO_CATEGORY_KEYS = [
  "bio-degradable-pvc",
  "bio-degradable",
  "biodegradable-pvc",
  "biodegradable",
  "eco-materials",
  "greenline"
];

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-");
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim()) return [value];
  return [];
}

function matchesBioProduct(product) {
  if (product?.bioDegradable === true || product?.bioPvc === true || product?.isEcoMaterial === true) {
    return true;
  }

  const checkValues = [
    ...toArray(product.category),
    ...toArray(product.categories),
    ...toArray(product.tags),
    ...toArray(product.collection),
    ...toArray(product.page)
  ].map(normalize);

  return checkValues.some((item) => BIO_CATEGORY_KEYS.includes(item));
}

function setWishlistButtonState(button, active) {
  const icon = button.querySelector("i");
  if (!icon) return;

  icon.classList.toggle("bi-heart-fill", active);
  icon.classList.toggle("bi-heart", !active);
  button.setAttribute("aria-pressed", String(active));
  button.title = active ? "Remove from Wishlist" : "Add to Wishlist";
}

function renderProducts(products) {
  if (!grid) return;

  if (title) {
    title.textContent = "Bio-Degradable Products";
  }

  if (count) {
    count.textContent = `${products.length} Products`;
  }

  if (!products.length) {
    grid.innerHTML = "<p>No products found.</p>";
    return;
  }

  const itemsMarkup = products.map((product) => {
    const primaryImage = product?.img?.thumbs?.[0] || product?.img?.singleImage || "";
    const hoverImage = product?.img?.thumbs?.[1] || primaryImage;

    return `
      <div class="product-item">
        <div class="product-image">
          <a href="single-product.html?id=${product.id}">
            <img src="${primaryImage}" class="img1" alt="${product.name}" loading="lazy" decoding="async">
            <img src="${hoverImage}" class="img2" alt="${product.name}" loading="lazy" decoding="async">
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
            <button type="button" class="add-to-wishlist" data-id="${product.id}" aria-label="Add to Wishlist">
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
    `;
  }).join("");

  grid.innerHTML = itemsMarkup;

  const wishlistButtons = grid.querySelectorAll(".add-to-wishlist");
  wishlistButtons.forEach((button) => {
    const id = Number(button.dataset.id);
    if (!id) return;
    setWishlistButtonState(button, isInWishlist(id));
  });
}

async function loadBioProducts() {
  if (!grid) return;

  try {
    const res = await fetch("./js/data.json");
    const products = await res.json();
    const bioProducts = Array.isArray(products) ? products.filter(matchesBioProduct) : [];
    renderProducts(bioProducts.slice(0, 4));
  } catch (error) {
    grid.innerHTML = "<p>Unable to load products right now.</p>";
    if (count) count.textContent = "";
    console.error("Failed to load bio products:", error);
  }
}

if (grid) {
  grid.addEventListener("click", (event) => {
    const wishlistButton = event.target.closest(".add-to-wishlist");
    if (!wishlistButton) return;
    event.preventDefault();
    event.stopPropagation();

    const productId = Number(wishlistButton.dataset.id);
    if (!productId) return;

    const active = toggleWishlist(productId);
    setWishlistButtonState(wishlistButton, active);
  });
}

loadBioProducts();
