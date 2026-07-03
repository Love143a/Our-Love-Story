// ========== IMAGE DATA ==========
// Add your local file 'loval.jpg' to the same folder – it will appear first in the gallery!
const imageUrls = [
    'gopal wife.jpg', // <-- YOUR LOCAL IMAGE (place loval.jpg in the same folder)
    'Look.png',
    // '/image/Join.jpg',
    // '/image/marriage.png',
    // '/image/Red2027.jpeg',
    // '/image/Morning.jpg',
    // '/image/Black.png',

    'https://images.pexels.com/photos/29377845/pexels-photo-29377845.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6712046/pexels-photo-6712046.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/29382406/pexels-photo-29382406.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/32439850/pexels-photo-32439850.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/32532557/pexels-photo-32532557.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/29823310/pexels-photo-29823310.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/10947676/pexels-photo-10947676.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/37295422/pexels-photo-37295422.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/35733564/pexels-photo-35733564.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/12163309/pexels-photo-12163309.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/30151332/pexels-photo-30151332.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/19312170/pexels-photo-19312170.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/15396916/pexels-photo-15396916.jpeg?auto=compress&cs=tinysrgb&w=600'
];

// ========== LOADING SCREEN ==========
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('loader-progress');

let progress = 0;
const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;
    progressBar.style.width = progress + '%';
    if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 600);
    }
}, 200);

// Fallback
setTimeout(() => {
    if (!loadingScreen.classList.contains('hidden')) {
        progressBar.style.width = '100%';
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 400);
    }
}, 5000);

// ========== RENDER GALLERY ==========
const grid = document.getElementById('gallery-grid');

imageUrls.forEach((url, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    const caption = url === 'loval.jpg' ? '✨ My Special Moment' : `Romantic moment #${index}`;
    item.dataset.caption = caption;

    const img = document.createElement('img');
    img.src = url;
    img.alt = caption;
    img.loading = 'lazy';
    // If local image fails to load, show a gentle placeholder
    img.onerror = function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect width="400" height="500" fill="%23f0e1e1"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="20" fill="%23996666" text-anchor="middle" dy=".3em"%3E❤️ loval.jpg%3C/text%3E%3C/svg%3E';
    };

    item.appendChild(img);
    grid.appendChild(item);

    item.addEventListener('click', () => openLightbox(url, item.dataset.caption));
});

// ========== LIGHTBOX ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || 'A beautiful moment';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = 'auto';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// ========== NAV TOGGLE ==========
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// ========== ACTIVE LINK ON SCROLL ==========
const sections = document.querySelectorAll('section');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navAnchors.forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('href') === '#' + current) {
            anchor.classList.add('active');
        }
    });
});

// ========== FLOATING HEARTS (on home image) ==========
const heartsContainer = document.getElementById('floating-hearts');

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = '❤';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    heart.style.fontSize = (1.2 + Math.random() * 2) + 'rem';
    heart.style.animationDuration = (5 + Math.random() * 5) + 's';
    heart.style.animationDelay = (Math.random() * 3) + 's';
    heartsContainer.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

setInterval(createHeart, 800);
for (let i = 0; i < 6; i++) {
    setTimeout(createHeart, i * 300);
}

// ========== SCROLL REVEAL FOR GALLERY ITEMS ==========
const galleryItems = document.querySelectorAll('.gallery-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
        }
    });
}, { threshold: 0.1 });

galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.92)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});
