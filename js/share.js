document.addEventListener("click", async function (e) {

    const shareBtn = e.target.closest("#share-product");
    if (!shareBtn) return;

    e.preventDefault();

    const productName =
        document.querySelector(".product-title")?.innerText ||
        "Check this product";

    const productUrl = window.location.href;

    if (navigator.share) {
        try {
            await navigator.share({
                title: productName,
                text: `Hi! Check this product: ${productName}`,
                url: productUrl
            });
        } catch (error) {
            console.log("Sharing cancelled");
        }
    } else {
        const shareUrl =
            `https://wa.me/?text=${encodeURIComponent(productName + " " + productUrl)}`;
        window.open(shareUrl, "_blank");
    }
});