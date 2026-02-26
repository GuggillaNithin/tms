import { product3 } from "./glide.js"
import { thumbsActiveFunc } from "./single-product/thumbsActive.js"
import zoomFunc from "./single-product/zoom.js"
import colorsFunc from "./single-product/colors.js"
import valuesFunc from "./single-product/values.js"
import tabsFunc from "./single-product/tabs.js"
import commentsfunc from "./single-product/comments.js"

/* ================================
   READ PRODUCT ID FROM URL
================================ */
const params = new URLSearchParams(window.location.search)
const productId = Number(params.get("id"))

/* ================================
   LOAD PRODUCT FROM JSON
================================ */
async function loadProduct() {
  const res = await fetch("js/data.json")
  const data = await res.json()

  console.log("DATA.JSON CONTENT →", data)
  console.log("IS ARRAY →", Array.isArray(data))

  let products

  // ✅ SUPPORT BOTH STRUCTURES
  if (Array.isArray(data)) {
    products = data
  } else if (Array.isArray(data.products)) {
    products = data.products
  } else {
    throw new Error("Unsupported data.json structure")
  }

  const findProduct = products.find(p => p.id === productId)

  if (!findProduct) {
    document.querySelector(".single-product").innerHTML =
      "<h2>Product not found</h2>"
    return
  }

  renderProduct(findProduct)
}



loadProduct()

function renderProduct(findProduct) {

  /* TITLE */
  document.querySelector(".product-title").textContent = findProduct.name

  // /* PRICES */
  // document.querySelector(".old-price").textContent =
  //   `$${findProduct.price.oldPrice.toFixed(2)}`
  // document.querySelector(".new-price").textContent =
  //   `$${findProduct.price.newPrice.toFixed(2)}`

  /* SHORT DESCRIPTION */
  document.querySelector(".product-description").textContent =
    findProduct.shortDescription

  /* MAIN IMAGE */
  document.getElementById("single-image").src =
    findProduct.img.singleImage

  /* THUMBNAILS */
  const galleryThumbs = document.querySelector(".gallery-thumbs")
  galleryThumbs.innerHTML = ""

  findProduct.img.thumbs.forEach(img => {
  galleryThumbs.innerHTML += `
    <li class="glide__slide">
      <img src="${img}" class="img-fluid" alt="" loading="lazy">
    </li>
  `
})


  /* COLORS */
  // const colorsWrapper = document.querySelector(".colors-wrapper")
  // colorsWrapper.innerHTML = ""

  // findProduct.colors.forEach(color => {
  //   colorsWrapper.innerHTML += `
  //     <div class="color-wrapper">
  //       <label class="${color}-color">
  //         <input type="radio" name="product-color">
  //       </label>
  //     </div>
  //   `
  // })

  /* SIZES */
  const sizesWrapper = document.querySelector(".values-list")
  sizesWrapper.innerHTML = ""

  findProduct.sizes.forEach(size => {
    sizesWrapper.innerHTML += `<span>${size}</span>`
  })

  /* CATEGORIES */
  document.querySelector(".product-category").innerHTML =
    findProduct.categories.map(cat => `<a href="#">${cat}</a>`).join(", ")

  /* TAGS */
  document.querySelector(".product-tags-list").innerHTML =
    findProduct.tags.map(tag => `<a href="#">${tag}</a>`).join(", ")

  /* DESCRIPTION TAB */
  document.getElementById("desc").innerHTML =
    findProduct.description.map(p => `<p>${p}</p>`).join("")

  /* ADDITIONAL INFORMATION */
  const infoBody = document.querySelector(".additional-info-body")
infoBody.innerHTML = ""

Object.entries(findProduct.additionalInformation).forEach(([key, value]) => {

  let formattedValue = ""

  // 1️⃣ If value is ARRAY
  if (Array.isArray(value)) {

    // If array of objects (Model Variants case)
    if (typeof value[0] === "object") {

      const headers = Object.keys(value[0])

      formattedValue = `
        <table class="model-variants-table">
          <thead>
            <tr>
              ${headers.map(h => `<th>${h}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${value.map(item => `
              <tr>
                ${headers.map(h => `<td>${item[h] ?? "-"}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      `

    } else {
      // If array of strings
      formattedValue = `
        <ul>
          ${value.map(item => `<li>${item}</li>`).join("")}
        </ul>
      `
    }

  }

  // 2️⃣ If value is OBJECT (rare case)
  else if (typeof value === "object" && value !== null) {

    formattedValue = `
      <table>
        ${Object.entries(value).map(([k, v]) => `
          <tr>
            <td>${k}</td>
            <td>${v}</td>
          </tr>
        `).join("")}
      </table>
    `
  }

  // 3️⃣ If value is STRING or NUMBER
  else {
    formattedValue = `<p>${value}</p>`
  }

  infoBody.innerHTML += `
    <tr>
      <th>${key}</th>
      <td>${formattedValue}</td>
    </tr>
  `
})

//   /* ADD TO CART */
// const cart = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : []

// const btnAddCart = document.getElementById("add-to-cart")
// const quantity = document.getElementById("quantity")
// const cartItem = document.querySelector(".header-cart-count")

// const findCart = cart.find(item => item.id === findProduct.id)

// if (findCart) {
//   btnAddCart.disabled = true
//   btnAddCart.style.opacity = 0.4
// } else {
//   btnAddCart.onclick = () => {
//     cart.push({ ...findProduct, quantity: Number(quantity.value) })
//     localStorage.setItem("cart", JSON.stringify(cart))
//     btnAddCart.disabled = true
//     btnAddCart.style.opacity = 0.4
//     cartItem.textContent = cart.length
//   }
// }


  /* PLUGINS */
  thumbsActiveFunc()
  product3()
  zoomFunc()
  colorsFunc()
  valuesFunc()
  tabsFunc()
  commentsfunc()
}







