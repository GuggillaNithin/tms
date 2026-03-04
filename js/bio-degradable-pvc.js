(() => {
  const slides = [...document.querySelectorAll(".hero-bg-slider .hero-bg")];
  if (!slides.length) return;

  let index = 0;
  const intervalMs = 5000;

  function showSlide(nextIndex) {
    slides[index].classList.remove("active");
    index = (nextIndex + slides.length) % slides.length;
    slides[index].classList.add("active");
  }

  setInterval(() => {
    showSlide(index + 1);
  }, intervalMs);
})();
