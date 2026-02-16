import { product1, product2 } from "./glide.js"


export let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")) : []


function addToCart(products) {
    const cartItem = document.querySelector(".header-cart-count")
    const buttons = [...document.getElementsByClassName("add-to-cart")]
    buttons.forEach((button) => {
        const inCart = cart.find((item) => item.id === Number(button.dataset.id))
        if (inCart) {
            button.setAttribute("disabled", "disabled")
        } else {
            button.addEventListener("click", function (e) {
                const id = e.target.dataset.id
                const findProduct = products.find((product) => product.id === Number(id))
                cart.push({ ...findProduct, quantity: 1 })
                localStorage.setItem("cart", JSON.stringify(cart))
                button.setAttribute("disabled", "disabled")
                cartItem.innerHTML = cart.length
            })
        }
    })
}



async function productFunc(products) {


    const productsContainer = document.getElementById("product-list")
    const productsContainer2 = document.getElementById("product-list-2")
    let results = ""

    products.forEach((product) => {
        results += `
<li class="product-item glide__slide">
  <div class="product-image">
    <a href="single-product.html?id=${product.id}">
      <img src="${product.img.singleImage}" class="img1" loading="lazy"/>
      <img src="${product.img.thumbs[1]}" class="img2" loading="lazy"/>
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
      <button class="add-to-cart" data-id="${product.id}">
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
</li>
`


    })

if (productsContainer) {
  productsContainer.innerHTML = results
}

if (productsContainer2) {
  productsContainer2.innerHTML = results
}


    addToCart(products)

    product1()

    product2()

    // productRoute()

    // productImageRoute()


}



export default productFunc