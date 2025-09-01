// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    navToggle.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Market Items Data
const marketItems = [
    {
        id: 1,
        title: "WoW Gold",
        price: "$2.99",
        image: "https://via.placeholder.com/300x200/4f46e5/ffffff?text=WoW+Gold",
        game: "World of Warcraft",
        rating: 4.9
    },
    {
        id: 2,
        title: "CS2 Skin Dragon Lore",
        price: "$15.50",
        image: "https://via.placeholder.com/300x200/ec4899/ffffff?text=CS2+Skin",
        game: "Counter-Strike 2",
        rating: 4.8
    },
    {
        id: 3,
        title: "Dota 2 Items Bundle",
        price: "$7.25",
        image: "https://via.placeholder.com/300x200/10b981/ffffff?text=Dota+Items",
        game: "Dota 2",
        rating: 4.7
    }
];

// Render Market Items
function renderMarketItems() {
    const marketGrid = document.querySelector('.market-grid');
    marketGrid.innerHTML = marketItems.map(item => `
        <div class="market-item card-hover" data-aos="fade-up">
            <div class="item-image">
                <img src="${item.image}" alt="${item.title}">
                <div class="item-game">${item.game}</div>
            </div>
            <div class="item-content">
                <h3>${item.title}</h3>
                <div class="item-price">${item.price}</div>
                <div class="item-rating">
                    ${'★'.repeat(Math.floor(item.rating))}${item.rating % 1 ? '½' : ''}
                    <span>(${item.rating})</span>
                </div>
                <button class="btn btn-primary">
                    <i class="fas fa-shopping-cart"></i>
                    Купить сейчас
                </button>
            </div>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMarketItems();
    createParticles();
    initAnimations();
});

// Particles Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 6 + 4}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        particle.style.opacity = Math.random() * 0.6 + 0.2;
        
        particlesContainer.appendChild(particle);
    }
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Filter Functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Here you would filter the market items
    });
});

// Add to Cart Animation
function addToCartAnimation(button) {
    button.classList.add('adding');
    setTimeout(() => {
        button.classList.remove('adding');
    }, 1000);
}

// Real-time Stats Counter
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize counters when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElements = entry.target.querySelectorAll('.stat-number');
            statElements.forEach(stat => {
                const value = parseInt(stat.textContent);
                animateValue(stat, 0, value, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

statsObserver.observe(document.querySelector('.hero-stats'));
