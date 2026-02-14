function searchFunc(data) {
    const searchWrapper = document.querySelector(".search-result .results")
    let result = ""

    // INITIAL LIST
    data.slice(0,5).forEach((item) => {
        result += `
            <a href="single-product.html?id=${item.id}" class="result-item">
                <img src="${item.img.singleImage}" class="search-thumb" alt="">
                <div class="search-info">
                    <h4>${item.name}</h4>
                    <span class="search-sku">SKU : PD0016</span>
                    
                </div>  
            </a>    
        `
    })
    searchWrapper.innerHTML = result

    const searchInput = document.querySelector(".modal-search .search input")
    if (!searchInput) return

    searchInput.addEventListener("input", (e) => {
        const value = e.target.value.trim().toLowerCase()
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(value)
        )

        let result = ""

        if (filtered.length === 0) {
            searchWrapper.innerHTML = `
                <div class="result-item" style="justify-content:center">
                    😔 Cannot find the Product 😔
                </div>
            `
            return
        }

        filtered.forEach((item) => {
            result += `
                <a href="single-product.html?id=${item.id}" class="result-item">
                    <img src="${item.img.singleImage}" class="search-thumb" alt="">
                    <div class="search-info">
                        <h4>${item.name}</h4>
                        <span class="search-sku">SKU : PD0016</span>
                        
                    </div>  
                </a>    
            `
        })

        searchWrapper.innerHTML = result
    })
}

export default searchFunc
