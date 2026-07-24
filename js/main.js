/* ========================================
   PROJECT DATA
   ======================================== */
const projectsData = [
    {
        id: 1,
        title: 'Logimap',
        shortDesc: 'Project Sederhana untuk Distribusi Pangan.',
        image: 'assets/logimap.png',
        description: 'Frontend dibangun menggunakan vanilla JS dan Leaflet.js untuk peta, serta Chart.js untuk analitik. Backend didukung oleh MySQL dengan tabel yang dinormalisasi untuk data penerima, stok, dan transaksi. Dirancang agar dapat ditingkatkan skalanya (scalable)..',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        features: [
            'Peta Wilayah',
            'Tabel Distribusi',
            'Status Dsitribusi',
        ],
        liveLink: '#',
        githubLink: '#'
    },
    {
        id: 2,
        title: 'Next Project..?',
        shortDesc: 'Coming Soon.',
        image: 'assets/images/project-typing.jpg',
        description: 'Sedang Menunggu Project keren lainnya.',
        techStack: ['HTML', 'CSS', 'JavaScript, ...'],
        features: [
            'Lorem ipsum dolor sit amet',
            'Consectetur adipiscing elit',
            'Sed do eiusmod tempor incididunt',
            'Ut labore et dolore magna aliqua'
        ],
        liveLink: '#',
        githubLink: '#'
    },
    
];


/* ========================================
   NAVBAR - SCROLL EFFECT & MOBILE MENU
   ======================================== */
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link-mobile').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});


/* ========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


/* ========================================
   BACK TO TOP BUTTON
   ======================================== */
const backToTopBtn = document.getElementById('backToTop');
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


/* ========================================
   ACCORDION - EXPERIENCE SECTION
   ======================================== */
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        accordionItems.forEach(i => i.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});


/* ========================================
   PROJECTS - STACKED CARD DECK
   ======================================== */
const cardDeck = document.getElementById('cardDeck');
const deckDots = document.getElementById('deckDots');
const prevBtn = document.getElementById('prevCard');
const nextBtn = document.getElementById('nextCard');
let currentCardIndex = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;

// Render cards
function renderCards() {
    cardDeck.innerHTML = '';
    deckDots.innerHTML = '';
    
    projectsData.forEach((project, index) => {
        // Create card
        const card = document.createElement('div');
        card.className = 'deck-card';
        card.dataset.index = index;
        card.innerHTML = `
            <div class="deck-card-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'">
            </div>
            <h3 class="deck-card-title">${project.title}</h3>
            <p class="deck-card-desc">${project.shortDesc}</p>
            <div class="deck-card-tags">
                ${project.techStack.map(tech => `<span class="deck-card-tag">${tech}</span>`).join('')}
            </div>
            <button class="deck-card-btn" data-project="${index}">View Details</button>
        `;
        cardDeck.appendChild(card);
        
        // Create dot
        const dot = document.createElement('div');
        dot.className = 'deck-dot';
        dot.dataset.index = index;
        dot.addEventListener('click', () => goToCard(index));
        deckDots.appendChild(dot);
    });
    
    updateCardPositions();
    attachCardEvents();
}

// Update card positions based on current index
function updateCardPositions() {
    const cards = document.querySelectorAll('.deck-card');
    const dots = document.querySelectorAll('.deck-dot');
    const total = projectsData.length;
    
    cards.forEach((card, index) => {
        // Remove all position classes
        card.classList.remove('active', 'prev-1', 'prev-2', 'next-1', 'next-2', 'hidden-card');
        
        // Calculate relative position
        let relativePos = index - currentCardIndex;
        
        // Handle wrap-around
        if (relativePos > total / 2) relativePos -= total;
        if (relativePos < -total / 2) relativePos += total;
        
        // Assign position class
        if (relativePos === 0) {
            card.classList.add('active');
        } else if (relativePos === -1) {
            card.classList.add('prev-1');
        } else if (relativePos === -2) {
            card.classList.add('prev-2');
        } else if (relativePos === 1) {
            card.classList.add('next-1');
        } else if (relativePos === 2) {
            card.classList.add('next-2');
        } else {
            card.classList.add('hidden-card');
        }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCardIndex);
    });
}

// Navigate to specific card
function goToCard(index) {
    currentCardIndex = index;
    updateCardPositions();
}

// Next card
function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % projectsData.length;
    updateCardPositions();
}

// Previous card
function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + projectsData.length) % projectsData.length;
    updateCardPositions();
}

// Attach events to cards
function attachCardEvents() {
    // View Details buttons
    document.querySelectorAll('.deck-card-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectIndex = parseInt(btn.dataset.project);
            openProjectModal(projectIndex);
        });
    });
    
    // Click on card to bring to front
    document.querySelectorAll('.deck-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('deck-card-btn')) return;
            const index = parseInt(card.dataset.index);
            if (index !== currentCardIndex) {
                goToCard(index);
            }
        });
    });
    
    // Touch/Swipe support
    cardDeck.addEventListener('touchstart', handleTouchStart, { passive: true });
    cardDeck.addEventListener('touchmove', handleTouchMove, { passive: true });
    cardDeck.addEventListener('touchend', handleTouchEnd);
    
    // Mouse drag support
    cardDeck.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

// Touch handlers
function handleTouchStart(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
}

function handleTouchEnd() {
    if (!isDragging) return;
    isDragging = false;
    const diff = currentX - startX;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            prevCard();
        } else {
            nextCard();
        }
    }
    
    startX = 0;
    currentX = 0;
}

// Mouse drag handlers
function handleMouseDown(e) {
    isDragging = true;
    startX = e.clientX;
    cardDeck.style.cursor = 'grabbing';
}

function handleMouseMove(e) {
    if (!isDragging) return;
    currentX = e.clientX;
}

function handleMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    cardDeck.style.cursor = 'grab';
    
    const diff = currentX - startX;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            prevCard();
        } else {
            nextCard();
        }
    }
    
    startX = 0;
    currentX = 0;
}

// Button events
prevBtn.addEventListener('click', prevCard);
nextBtn.addEventListener('click', nextCard);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('projectModal').classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') prevCard();
        if (e.key === 'ArrowRight') nextCard();
    }
});


/* ========================================
   PROJECT MODAL
   ======================================== */
const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.querySelector('.modal-overlay');

function openProjectModal(index) {
    const project = projectsData[index];
    
    modalBody.innerHTML = `
        <h2 class="modal-title">${project.title}</h2>
        <p class="modal-subtitle">Personal Project</p>
        <div class="modal-image">
            <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'">
        </div>
        <p class="modal-description">${project.description}</p>
        
        <h3 class="modal-features-title">Key Features</h3>
        <ul class="modal-features">
            ${project.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        
        <h3 class="modal-features-title">Tech Stack</h3>
        <div class="modal-tech-stack">
            ${project.techStack.map(tech => `<span class="modal-tech-badge">${tech}</span>`).join('')}
        </div>
        
        <div class="modal-links">
            <a href="${project.liveLink}" target="_blank" class="modal-link modal-link-primary">
                🚀 Live Demo
            </a>
            <a href="${project.githubLink}" target="_blank" class="modal-link modal-link-secondary">
                💻 Source Code
            </a>
        </div>
    `;
    
    projectModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.add('hidden');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', closeProjectModal);

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
        closeProjectModal();
    }
});


/* ========================================
   INTERSECTION OBSERVER - FADE IN ANIMATION
   ======================================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});


/* ========================================
   INITIALIZATION
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
});