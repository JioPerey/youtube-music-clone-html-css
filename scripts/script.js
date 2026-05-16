// Quick Picks Section
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

// From Library Section
const playlistsContainer = document.querySelector('.playlists-container');
const libraryPrevButton = document.querySelector('.library-previous-button');
const libraryNextButton = document.querySelector('.library-next-button');

const playlistsScrollAmount = 200 * 2;

libraryPrevButton.addEventListener('click', () => {
  playlistsContainer.scrollBy({
    left: -scrollAmount, 
    behavior: 'smooth'
  });
});

libraryNextButton.addEventListener('click', () => {
  playlistsContainer.scrollBy({
    left: scrollAmount, 
    behavior: 'smooth'
  });
});
