import { getWishlistIds } from "./wishlist.js"

function sidebarFunc() {
    const btnOpenSidebar = document.querySelector("#btn-menu")
    const sidebar = document.querySelector("#sidebar")
    const btnCloseSidebar = document.querySelector("#close-sidebar")


    btnOpenSidebar.addEventListener("click", function () {
        sidebar.style.left = "0"

    })

    btnCloseSidebar.addEventListener("click", function () {
        sidebar.style.left = "-100%"
    })


    /* click outside start */
    document.addEventListener("click", (event) => {
        if (!event.composedPath().includes(sidebar) && !event.composedPath().includes(btnOpenSidebar)) {
            sidebar.style.left = "-100%"
        }
    })
    /* click outside end */
}

function searchModalFunc() {
    const btnOpenSearch = document.querySelector(".search-button")
    const modalSearch = document.getElementsByClassName("modal-search")
    const modalSearchWrapper = document.getElementsByClassName("modal-wrapper")
    const btnCloseModalSearch = document.querySelector("#close-modal-search")
    const searchInput = document.querySelector(".modal-search .search input")


    btnOpenSearch.addEventListener("click", function () {
        modalSearch[0].style.visibility = "visible"
        modalSearch[0].style.opacity = "1"
    })

    btnCloseModalSearch.addEventListener("click", function () {
        modalSearch[0].style.visibility = "hidden"
        modalSearch[0].style.opacity = "0"

    })

    /* click outside start */
    document.addEventListener("click", function (e) {
        if (!e.composedPath().includes(modalSearchWrapper) && !e.composedPath().includes(btnOpenSearch) && !e.composedPath().includes(searchInput)) {
            modalSearch[0].style.visibility = "hidden"
        }
    })
    /* click outside end */
}

function categoryInteraction() {
  const categories = document.querySelectorAll(".mega-category-list li")
  const productGroups = document.querySelectorAll(".mega-products-group")

  categories.forEach(category => {
    const key = category.dataset.category

    // DESKTOP hover
    category.addEventListener("mouseenter", () => {
      if (window.innerWidth < 992) return
      activateCategory(key, category)
    })

    // MOBILE click
    category.addEventListener("click", () => {
      if (window.innerWidth >= 992) return
      activateCategory(key, category)
      
    })
  })

  function activateCategory(key, category) {
    categories.forEach(c => c.classList.remove("active"))
    productGroups.forEach(p => p.classList.remove("active"))

    category.classList.add("active")
    document
      .querySelector(`.mega-products-group[data-category="${key}"]`)
      .classList.add("active")
  }
}




function shopToggleMobile() {
  const shopLink = document.querySelector(".shop-link")
  const shopItem = shopLink.closest(".menu-list-item")

  shopLink.addEventListener("click", (e) => {
    if (window.innerWidth < 992) {
      e.preventDefault()
      shopItem.classList.toggle("open")
    }
  })
}



function megaMenuInteraction() {
  const previewImg = document.querySelector(".mega-preview img")
  const categories = document.querySelectorAll(".mega-category-list li")
  const productGroups = document.querySelectorAll(".mega-products-group")

  categories.forEach(category => {
    const key = category.dataset.category
    const mobileSlot = category.querySelector(".mobile-submenu")

    /* ================= DESKTOP HOVER ================= */
    category.addEventListener("mouseenter", () => {
  if (window.innerWidth < 992) return

  categories.forEach(c => c.classList.remove("active"))
  productGroups.forEach(p => p.classList.remove("active"))

  category.classList.add("active")

  const activeGroup = document.querySelector(
    `.mega-products-group[data-category="${key}"]`
  )
  activeGroup?.classList.add("active")

  /* ✅ IMAGE SWITCH */
  if (previewImg) {
    previewImg.src = `img/categoryimg/${key}.webp`
  }
})


    /* ================= MOBILE ACCORDION ================= */
    category.addEventListener("click", (e) => {
  if (window.innerWidth >= 992) return
  e.preventDefault()
  e.stopPropagation()

  const isAlreadyOpen = category.classList.contains("active")

  // Close all categories
  categories.forEach(c => {
    c.classList.remove("active")
    const slot = c.querySelector(".mobile-submenu")
    if (slot) slot.innerHTML = ""
  })

  // If it was NOT open before, open it
  if (!isAlreadyOpen) {
    category.classList.add("active")

    const sourceGroup = document.querySelector(
      `.mega-products-group[data-category="${key}"]`
    )

    if (sourceGroup) {
      const clone = sourceGroup.cloneNode(true)
      clone.classList.add("mobile-group", "active")

      clone.addEventListener("click", (e) => {
        e.stopPropagation()
      })

      mobileSlot.appendChild(clone)
    }
  }
})

  })
  // Default image for first active category
  const defaultActive = document.querySelector(".mega-category-list li.active")
    if (defaultActive && previewImg) {
    previewImg.src = `img/categoryimg/${defaultActive.dataset.category}.webp`
  }

}

function wishlistLinksFunc() {
  const wishlistLinks = document.querySelectorAll(".header-right-links a")

  wishlistLinks.forEach((link) => {
    const hasHeartIcon = link.querySelector(".bi-heart, .bi-heart-fill")
    if (!hasHeartIcon) return

    link.classList.add("header-wishlist-link")
    link.setAttribute("href", "wishlist.html")
    link.setAttribute("aria-label", "Wishlist")

    let countElement = link.querySelector(".header-wishlist-count")
    if (!countElement) {
      countElement = document.createElement("span")
      countElement.className = "header-wishlist-count"
      link.appendChild(countElement)
    }

    const setCount = (count = getWishlistIds().length) => {
      countElement.textContent = String(count)
      countElement.style.display = count > 0 ? "flex" : "none"
    }

    setCount()

    window.addEventListener("wishlist:updated", (event) => {
      const nextCount = event.detail?.count
      setCount(Number.isFinite(nextCount) ? nextCount : getWishlistIds().length)
    })

    window.addEventListener("storage", (event) => {
      if (event.key === "wishlist") {
        setCount()
      }
    })
  })
}


function headerFunc() {
  sidebarFunc()
  shopToggleMobile()
  megaMenuInteraction()
  searchModalFunc()
  wishlistLinksFunc()
  
  
}


const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showNextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  setInterval(showNextSlide, 3000);

export default headerFunc()
