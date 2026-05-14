const carousel = document.querySelector('.video-cards-container');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.previous-button');

const scrollAmount = 398 * 2; 

nextButton.addEventListener('click', () => {
  carousel.scrollBy({
    left: scrollAmount, 
    behavior: 'smooth'
  });
});

prevButton.addEventListener('click', () => {
  carousel.scrollBy({
    left: -scrollAmount, 
    behavior: 'smooth'
  });
});