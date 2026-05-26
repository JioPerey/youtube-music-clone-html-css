function initCarousel(containerSelector, prevBtnSelector, nextBtnSelector, options = {}) {
  const container = document.querySelector(containerSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);

  if (!container || !prevBtn || !nextBtn) {
    console.warn(`Carousel elements not found for: ${containerSelector}`);
    return;
  }

  const config = {
    cardsToScroll: options.cardsToScroll || 1,
    cardSelector: options.cardSelector || null,
    breakpoints: options.breakpoints || null,
    ...options
  };

  function getCurrentCardsToScroll() {
    if (!config.breakpoints) {
      return typeof config.cardsToScroll === 'number' 
        ? config.cardsToScroll 
        : 1;
    }

    const width = window.innerWidth;
    
    const sortedBreakpoints = Object.keys(config.breakpoints)
      .map(Number)
      .sort((a, b) => b - a);
    
    for (let breakpoint of sortedBreakpoints) {
      if (width >= breakpoint) {
        return config.breakpoints[breakpoint].cardsToScroll || 1;
      }
    }
    
    const smallestBreakpoint = sortedBreakpoints[sortedBreakpoints.length - 1];
    return config.breakpoints[smallestBreakpoint].cardsToScroll || 1;
  }

  function getScrollAmount() {
    let firstCard;
    
    if (config.cardSelector) {
      firstCard = container.querySelector(config.cardSelector);
    } else {
      firstCard = container.firstElementChild;
    }
    
    if (!firstCard) {
      console.warn(`No cards found in ${containerSelector}`);
      return 300;
    }

    const containerStyles = window.getComputedStyle(container);
    const gap = parseFloat(containerStyles.gap) || parseFloat(containerStyles.columnGap) || 0;
    
    const cardWidth = firstCard.offsetWidth;
    
    const currentCardsToScroll = getCurrentCardsToScroll();
    
    const scrollAmount = (cardWidth + gap) * currentCardsToScroll;
    
    return scrollAmount;
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
    const scrollAmount = getScrollAmount();
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(updateButtonStates, 300);
  });

  nextBtn.addEventListener('click', () => {
    const scrollAmount = getScrollAmount();
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(updateButtonStates, 300);
  });

  container.addEventListener('scroll', updateButtonStates);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateButtonStates();
    }, 250);
  });

  updateButtonStates();
}

initCarousel('.video-cards-container', '.previous-button', '.next-button', {
  breakpoints: {
    0: { cardsToScroll: 1 },
    768: { cardsToScroll: 2 },
    1024: { cardsToScroll: 4 }
  }
});

initCarousel('.playlists-container', '.library-previous-button', '.library-next-button', {
  breakpoints: {
    0: { cardsToScroll: 2 },
    768: { cardsToScroll: 3 },
    1024: { cardsToScroll: 4 }
  }
});

initCarousel('.music-videos-grid', '.music-videos-prev-btn', '.music-videos-next-btn', {
  breakpoints: {
    0: { cardsToScroll: 1 },
    768: { cardsToScroll: 2 },
    1024: { cardsToScroll: 4 }
  }
});

initCarousel('.new-albums-grid', '.new-albums-prev-btn', '.new-albums-next-btn', {
  breakpoints: {
    0: { cardsToScroll: 2 },
    768: { cardsToScroll: 3 },
    1024: { cardsToScroll: 4 }
  }
});

initCarousel('.moods-grid', '.moods-prev-btn', '.moods-next-btn', {
  cbreakpoints: {
    0: { cardsToScroll: 2 },
    768: { cardsToScroll: 3 },
    1024: { cardsToScroll: 4 }
  }
});


// SIDEBAR FUNCTIONS

function toggleSidebar() {
  document.body.classList.toggle('sidebar-expanded');
  
  const isNowExpanded = document.body.classList.contains('sidebar-expanded');
  
  if (isNowExpanded) {
    localStorage.setItem('sidebarState', 'expanded');
  } else {
    localStorage.setItem('sidebarState', 'collapsed');
  }
}

function isMobile() {
  return window.innerWidth <= 768;
}

function setupSidebarAutoCollapse() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMobile() && document.body.classList.contains('sidebar-expanded')) {
        document.body.classList.remove('sidebar-expanded');
        localStorage.setItem('sidebarState', 'collapsed');
      }
    });
  });
}

function setupMobileOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);
  
  overlay.addEventListener('click', () => {
    document.body.classList.remove('sidebar-expanded');
    localStorage.setItem('sidebarState', 'collapsed');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupSidebarAutoCollapse();
  setupMobileOverlay();
});