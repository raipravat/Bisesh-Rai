// ===== DARK MODE TOGGLE =====
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved user preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  darkModeToggle.textContent = '☀️ Light Mode';
}

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  darkModeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('.main-header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without jumping
      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        location.hash = targetId;
      }
    }
  });
});

// ===== HERO PARALLAX EFFECT =====
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  const scrollPosition = window.pageYOffset;
  hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// ===== COCKTAIL FILTERING =====
const cocktails = [
  {
    name: "Smoky Old Fashioned",
    ingredients: "Bourbon, maple syrup, black walnut bitters, smoked rosemary",
    image: "assets/cocktails/smoky-old-fashioned.jpg",
    category: "whiskey"
  },
  {
    name: "Tropical Mule",
    ingredients: "Vodka, ginger beer, pineapple juice, lime, mint",
    image: "assets/cocktails/tropical-mule.jpg",
    category: "vodka"
  },
  {
    name: "Elderflower Gin Fizz",
    ingredients: "Gin, elderflower liqueur, lemon, soda",
    image: "assets/cocktails/gin-fizz.jpg",
    category: "gin"
  },
  {
    name: "Spiced Rum Punch",
    ingredients: "Dark rum, tropical juices, spices, grenadine",
    image: "assets/cocktails/rum-punch.jpg",
    category: "rum"
  },
  {
    name: "Smoky Margarita",
    ingredients: "Tequila, mezcal, lime, agave, orange liqueur",
    image: "assets/cocktails/smoky-margarita.jpg",
    category: "tequila"
  },
  {
    name: "Whiskey Sour",
    ingredients: "Bourbon, lemon juice, simple syrup, egg white",
    image: "assets/cocktails/whiskey-sour.jpg",
    category: "whiskey"
  }
];

const filterButtons = document.querySelectorAll('.filter-btn');
const cocktailContainer = document.getElementById('cocktailContainer');

function displayCocktails(filter = 'all') {
  cocktailContainer.innerHTML = '';
  
  const filteredCocktails = filter === 'all' 
    ? cocktails 
    : cocktails.filter(cocktail => cocktail.category === filter);
  
  filteredCocktails.forEach(cocktail => {
    const card = document.createElement('div');
    card.className = 'cocktail-card';
    card.innerHTML = `
      <img src="${cocktail.image}" alt="${cocktail.name}" loading="lazy">
      <div class="cocktail-info">
        <h3>${cocktail.name}</h3>
        <p>${cocktail.ingredients}</p>
      </div>
    `;
    cocktailContainer.appendChild(card);
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    displayCocktails(button.dataset.filter);
  });
});

// Initial display
displayCocktails();

// ===== TESTIMONIAL SLIDER =====
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentTestimonial = 0;
let autoSlideInterval;

function showTestimonial(index) {
  testimonials.forEach(testimonial => {
    testimonial.classList.remove('active');
    testimonial.style.animation = 'none';
    void testimonial.offsetWidth; // Trigger reflow
    testimonial.style.animation = null;
  });
  
  testimonials[index].classList.add('active');
  currentTestimonial = index;
}

function nextTestimonial() {
  const nextIndex = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(nextIndex);
}

function prevTestimonial() {
  const prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(prevIndex);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextTestimonial, 5000);
}

prevBtn.addEventListener('click', () => {
  clearInterval(autoSlideInterval);
  prevTestimonial();
  startAutoSlide();
});

nextBtn.addEventListener('click', () => {
  clearInterval(autoSlideInterval);
  nextTestimonial();
  startAutoSlide();
});

// Start auto-sliding
startAutoSlide();

// Pause on hover
const slider = document.querySelector('.testimonial-slider');
slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
slider.addEventListener('mouseleave', startAutoSlide);

// ===== FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Simple validation
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  
  if (!name || !email) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // In a real app, you would send this data to a server
  console.log('Form submitted:', { name, email });
  
  // Show success message
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
  successMessage.style.padding = '1rem';
  successMessage.style.backgroundColor = 'var(--accent)';
  successMessage.style.color = 'white';
  successMessage.style.borderRadius = '5px';
  successMessage.style.marginTop = '1rem';
  successMessage.style.textAlign = 'center';
  
  contactForm.appendChild(successMessage);
  contactForm.reset();
  
  // Remove message after 5 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
});

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== STICKY HEADER =====
const header = document.querySelector('.main-header');
const headerHeight = header.offsetHeight;
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.pageYOffset;
  
  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > headerHeight) {
    // Scrolling down
    header.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollPosition = currentScrollPosition;
});

// ===== LAZY LOADING IMAGES =====
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
  
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});