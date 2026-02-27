const WISHLIST_KEY = "wishlist";

export function getWishlistIds() {
  const raw = localStorage.getItem(WISHLIST_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(Number).filter(Number.isFinite);
  } catch (error) {
    return [];
  }
}

export function setWishlistIds(ids) {
  const normalizedIds = [...new Set(ids.map(Number).filter(Number.isFinite))];
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(normalizedIds));
  window.dispatchEvent(
    new CustomEvent("wishlist:updated", {
      detail: { count: normalizedIds.length }
    })
  );
}

export function isInWishlist(id) {
  return getWishlistIds().includes(Number(id));
}

export function addToWishlist(id) {
  const productId = Number(id);
  const wishlist = getWishlistIds();
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    setWishlistIds(wishlist);
  }
  return true;
}

export function removeFromWishlist(id) {
  const productId = Number(id);
  const wishlist = getWishlistIds().filter((itemId) => itemId !== productId);
  setWishlistIds(wishlist);
  return false;
}

export function toggleWishlist(id) {
  return isInWishlist(id) ? removeFromWishlist(id) : addToWishlist(id);
}
