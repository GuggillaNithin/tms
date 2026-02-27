import { getWishlistIds, removeFromWishlist, setWishlistIds } from "./wishlist.js";

const wishlistContainer = document.getElementById("wishlist-products");
const wishlistCount = document.getElementById("wishlist-count");
const clearAllButton = document.getElementById("clear-wishlist");

function formatCategory(category) {
  if (Array.isArray(category)) return category.join(", ");
  return category || "";
}

function createProductCard(product) {
  const secondImage = product.img.thumbs[1] || product.img.thumbs[0] || product.img.singleImage;

  return `
    <div class="product-item" data-id="${product.id}">
      <div class="product-image">
        <a href="single-product.html?id=${product.id}">
          <img src="${product.img.singleImage}" class="img1" alt="${product.name}" loading="lazy">
          <img src="${secondImage}" class="img2" alt="${product.name}" loading="lazy">
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

        <span class="product-discount">-${product.discount || 0}%</span>
        <p class="wishlist-category">${formatCategory(product.category)}</p>

        <div class="product-links">
          <button class="remove-wishlist-item" data-id="${product.id}" title="Remove from Wishlist">
            <i class="bi bi-trash-fill"></i>
          </button>
          <a href="single-product.html?id=${product.id}" title="View Product">
            <i class="bi bi-eye-fill"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderEmptyState() {
  wishlistContainer.innerHTML = `
    <div class="wishlist-empty">
      <h3>Your wishlist is empty</h3>
      <p>Add products from product cards or single product page.</p>
      <a href="shop.html" class="btn btn-primary">Browse Products</a>
    </div>
  `;
  wishlistCount.textContent = "0 products";
  clearAllButton.disabled = true;
}

function renderWishlist(products, wishlistIds) {
  const productById = new Map(products.map((product) => [Number(product.id), product]));
  const wishlistProducts = wishlistIds
    .map((id) => productById.get(Number(id)))
    .filter(Boolean);

  if (wishlistProducts.length !== wishlistIds.length) {
    const validIds = wishlistProducts.map((product) => Number(product.id));
    setWishlistIds(validIds);
  }

  if (wishlistProducts.length === 0) {
    renderEmptyState();
    return;
  }

  wishlistContainer.innerHTML = wishlistProducts.map(createProductCard).join("");
  wishlistCount.textContent = `${wishlistProducts.length} product${wishlistProducts.length > 1 ? "s" : ""}`;
  clearAllButton.disabled = false;
}

async function loadWishlistProducts() {
  try {
    const wishlistIds = getWishlistIds();
    if (wishlistIds.length === 0) {
      renderEmptyState();
      return;
    }

    const response = await fetch("js/data.json");
    const data = await response.json();
    const products = Array.isArray(data) ? data : data.products || [];

    renderWishlist(products, wishlistIds);
  } catch (error) {
    wishlistContainer.innerHTML = "<p>Could not load wishlist right now.</p>";
    wishlistCount.textContent = "0 products";
    clearAllButton.disabled = true;
  }
}

wishlistContainer.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-wishlist-item");
  if (!removeButton) return;

  const productId = Number(removeButton.dataset.id);
  removeFromWishlist(productId);
  loadWishlistProducts();
});

clearAllButton.addEventListener("click", () => {
  setWishlistIds([]);
  loadWishlistProducts();
});

loadWishlistProducts();

