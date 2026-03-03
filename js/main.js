import headerFunc from "./header.js"
import productFunc from "./product.js"
import searchFunc from "./search.js"

//! add product to localstorage start



(async function () {

    const response = await fetch("js/data.json")
    const data = await response.json()

    // store all products in localStorage
    if (data) {
        localStorage.setItem("products", JSON.stringify(data))
    }

    /* =============================
       SELECT 2 PRODUCTS PER CATEGORY
    ============================== */

    const categories = ["indoor-media", "outdoor-media", "led-lcd-displays", "display"]

    let selectedProducts = []

    categories.forEach(category => {
        const filtered = data
            .filter(product => product.category === category)
            .slice(0, 2)   // take first 2

        selectedProducts = [...selectedProducts, ...filtered]
    })

    /* =============================
       RENDER ONLY 8 PRODUCTS
    ============================== */

    productFunc(selectedProducts)

    searchFunc(data)   // search should still use all products

})()


//! add product to localstorage end



//! add cartItem to localstorage start

// const cartItem = document.querySelector(".header-cart-count")

// cartItem.innerHTML = localStorage.getItem("cart")
//     ? JSON.parse(localStorage.getItem("cart")).length
//     : "0"

//! add cartItem to localstorage end


//! modal dialog start

const modal = document.querySelector(".modal-dialog");
const modalContent = document.querySelector(".modal-content");
const btnModalClose = document.querySelector(".modal-close");
const MODAL_SHOWN_KEY = "siteModalShown";

// Show only once across the whole website
if (modal && !localStorage.getItem(MODAL_SHOWN_KEY)) {
    setTimeout(() => {
        modal.classList.add("show");
        localStorage.setItem(MODAL_SHOWN_KEY, "true");
    }, 6000);
}

// Close button
if (btnModalClose) {
    btnModalClose.addEventListener("click", () => {
        modal.classList.remove("show");
    });
}

// Close when clicking outside content
if (modal && modalContent) {
    modal.addEventListener("click", (e) => {
        if (!modalContent.contains(e.target)) {
            modal.classList.remove("show");
        }
    });
}



//! modal dialog end
