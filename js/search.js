function searchFunc(data) {

    const searchWrapper = document.querySelector(".search-result .results")
    if (!searchWrapper) return

    const searchInput = document.querySelector(".modal-search .search input")

    /* =========================
       FUNCTION TO RENDER ITEMS
    ========================== */

    function renderProducts(products) {

        if (!products || products.length === 0) {
            searchWrapper.innerHTML = `
                <div class="result-item" style="justify-content:center">
                    😔 Cannot find the Product 😔
                </div>
            `
            return
        }

        let result = ""

        products.slice(0, 6).forEach((item) => {

            // SAFE IMAGE ACCESS
            const image = item.img?.singleImage || "img/default.png"

            result += `
                <a href="single-product.html?id=${item.id}" class="result-item">
                    <img src="${image}" class="search-thumb" alt="" loading="lazy">
                    <div class="search-info">
                        <h4>${item.name}</h4>
                        <span class="search-sku">SKU : PD0016</span>
                    </div>
                </a>
            `
        })

        searchWrapper.innerHTML = result
    }

    /* =========================
       INITIAL RENDER (4 ITEMS)
    ========================== */

    renderProducts(data)

    /* =========================
       SEARCH EVENT
    ========================== */

    if (!searchInput) return

    searchInput.addEventListener("input", (e) => {

        const value = e.target.value.trim().toLowerCase()

        const filtered = data.filter(item =>
            item.name?.toLowerCase().includes(value)
        )

        renderProducts(filtered)
    })
}

export default searchFunc
