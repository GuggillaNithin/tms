
let slideIndex = 1
const SLIDE_INTERVAL_MS = 7000

showSlides(slideIndex)

setInterval(() => {
    showSlides(slideIndex += 1)
}, SLIDE_INTERVAL_MS)

function plusSlide(n) {
    showSlides((slideIndex += n)) // (slideIndex = slideIndex + n )
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {

    const slides = document.getElementsByClassName("slider-item")
    const dots = document.getElementsByClassName("slider-dot")


    if (n > slides.length) {
        slideIndex = 1
    }

    if (n == 0) {
        slideIndex += slides.length
    }


    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "")
    }


    slides[slideIndex - 1].style.display = "flex"
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active"
    }
}




