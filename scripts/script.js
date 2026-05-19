// Reusable carousel scroll function with button state management
function initCarousel(containerSelector, prevBtnSelector, nextBtnSelector, scrollAmount) {
  const container = document.querySelector(containerSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);

  // Safety check
  if (!container || !prevBtn || !nextBtn) {
    console.warn(`Carousel elements not found for: ${containerSelector}`);
    return;
  }

  // Function to update button states based on scroll position
  function updateButtonStates() {
    const { scrollLeft, scrollWidth, clientWidth } = container;
    
    // Disable prev button if at the start
    if (scrollLeft <= 0) {
      prevBtn.disabled = true;
      prevBtn.style.opacity = '0.5';
      prevBtn.style.cursor = 'not-allowed';
    } else {
      prevBtn.disabled = false;
      prevBtn.style.opacity = '1';
      prevBtn.style.cursor = 'pointer';
    }
    
    // Disable next button if at the end (with small tolerance for rounding)
    if (scrollLeft + clientWidth >= scrollWidth - 1) {
      nextBtn.disabled = true;
      nextBtn.style.opacity = '0.5';
      nextBtn.style.cursor = 'not-allowed';
    } else {
      nextBtn.disabled = false;
      nextBtn.style.opacity = '1';
      nextBtn.style.cursor = 'pointer';
    }
  }

  // Previous button click handler
  prevBtn.addEventListener('click', () => {
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
    // Update buttons after scroll animation completes
    setTimeout(updateButtonStates, 300);
  });

  // Next button click handler
  nextBtn.addEventListener('click', () => {
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    // Update buttons after scroll animation completes
    setTimeout(updateButtonStates, 300);
  });

  // Update buttons when user scrolls manually (drag/touch)
  container.addEventListener('scroll', updateButtonStates);

  // Initialize button states on page load
  updateButtonStates();
}

// Initialize all carousels
initCarousel('.video-cards-container', '.previous-button', '.next-button', 425 * 2);
initCarousel('.playlists-container', '.library-previous-button', '.library-next-button', 205 * 3);
initCarousel('.music-videos-grid', '.music-videos-prev-btn', '.music-videos-next-btn', 346 * 3);
initCarousel('.new-albums-grid', '.new-albums-prev-btn', '.new-albums-next-btn', 205 * 6)