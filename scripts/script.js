function initCarousel(containerSelector, prevBtnSelector, nextBtnSelector, scrollAmount) {
  const container = document.querySelector(containerSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);

  if (!container || !prevBtn || !nextBtn) {
    console.warn(`Carousel elements not found for: ${containerSelector}`);
    return;
  }

  function updateButtonStates() {
    const { scrollLeft, scrollWidth, clientWidth } = container;

    if (scrollLeft <= 0) {
      prevBtn.disabled = true;
      prevBtn.style.opacity = '0.5';
      prevBtn.style.cursor = 'not-allowed';
    } else {
      prevBtn.disabled = false;
      prevBtn.style.opacity = '1';
      prevBtn.style.cursor = 'pointer';
    }
    
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

  prevBtn.addEventListener('click', () => {
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(updateButtonStates, 300);
  });

  nextBtn.addEventListener('click', () => {
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(updateButtonStates, 300);
  });

  container.addEventListener('scroll', updateButtonStates);

  updateButtonStates();
}

initCarousel('.video-cards-container', '.previous-button', '.next-button', 404);
initCarousel('.playlists-container', '.library-previous-button', '.library-next-button', 205 * 2);
initCarousel('.music-videos-grid', '.music-videos-prev-btn', '.music-videos-next-btn', 346);
initCarousel('.new-albums-grid', '.new-albums-prev-btn', '.new-albums-next-btn', 205 * 2)
initCarousel('.moods-grid', '.moods-prev-btn', '.moods-next-btn', 260 * 2)


function toggleSidebar() {
  document.body.classList.toggle('sidebar-expanded');
  
  const isNowExpanded = document.body.classList.contains('sidebar-expanded');
  
  if (isNowExpanded) {
    localStorage.setItem('sidebarState', 'expanded');
  } else {
    localStorage.setItem('sidebarState', 'collapsed');
  }
}