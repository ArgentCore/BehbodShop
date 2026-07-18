
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('header');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

window.onscroll = () => {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

const searchInput = document.getElementById('live-search');
const searchClear = document.getElementById('search-clear');
const searchWrapper = document.querySelector('.search-wrapper');
const searchToggle = document.getElementById('search-toggle');
const headerCenter = document.querySelector('.header-center');

function normalizeText(t) {
    return (t||'').trim().toLowerCase();
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const q = normalizeText(e.target.value || '');
        if (q.length) searchWrapper.classList.add('not-empty');
        else searchWrapper.classList.remove('not-empty');

        productCards.forEach(card => {
            const title = normalizeText(card.querySelector('h3')?.textContent || '');
            const desc = normalizeText(card.getAttribute('data-desc') || '');
            const matches = title.includes(q) || desc.includes(q);
            const activeFilter = document.querySelector('.filter-btn.active');
            const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
            const categoryMatch = filter === 'all' || card.getAttribute('data-category') === filter;
            if ((q === '' || matches) && categoryMatch) {
                card.style.display = 'block';
                setTimeout(()=>{ card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 80);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(()=>{ card.style.display = 'none'; }, 250);
            }
        });
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchClear.blur();
    });
}

// جستجو در موبایل
if (searchToggle && window.innerWidth < 992) {
    searchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        headerCenter.classList.toggle('active');
        if (headerCenter.classList.contains('active')) {
            searchInput.focus();
        }
    });
}

const cartBtn = document.getElementById('cart-open');
const cartDrawer = document.getElementById('cart-drawer');
const cartClose = document.getElementById('cart-close');
const overlay = document.getElementById('overlay');
const cartCount = document.querySelector('.cart-btn span');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotalEl = document.getElementById('cart-total');
const cartEmpty = document.getElementById('cart-empty');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout');

let cart = {}; 

function formatToman(number) {
    if (!number && number !== 0) return '۰ تومان';
    const n = Number(number);
    return n.toLocaleString('fa-IR') + ' تومان';
}

function loadCart() {
    const saved = localStorage.getItem('behbod_cart_v1');
    if (saved) {
        try {
            cart = JSON.parse(saved);
        } catch(e) {
            cart = {};
        }
    } else cart = {};
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('behbod_cart_v1', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const totalCount = Object.values(cart).reduce((s, it) => s + (it.qty||0), 0);
    cartCount.textContent = totalCount;
    cartItemsList.innerHTML = '';
    if (totalCount === 0) {
        cartEmpty.classList.add('show');
    } else {
        cartEmpty.classList.remove('show');
        Object.values(cart).forEach(item => {
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <img src="${item.img}" alt="${item.title}" loading="lazy">
                <div class="meta">
                    <h4>${item.title}</h4>
                    <div class="price">${formatToman(item.price * item.qty)}</div>
                </div>
                <div class="actions">
                    <input type="number" class="cart-item-qty" value="${item.qty}" min="1" data-id="${item.id}" />
                    <button class="remove-item" data-id="${item.id}" title="حذف"><i class="ri-delete-bin-line"></i></button>
                </div>
            `;
            cartItemsList.appendChild(li);
        });
    }
    const totalPrice = Object.values(cart).reduce((s, it) => s + (it.price * it.qty), 0);
    cartTotalEl.textContent = formatToman(totalPrice);
}

function addToCart(product) {
    const id = product.id;
    if (!cart[id]) cart[id] = { ...product, qty: product.qty || 1 };
    else cart[id].qty += (product.qty || 1);
    saveCart();
    showNotification('محصول به سبد خرید اضافه شد!');
}

cartBtn.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    overlay.classList.add('active');
    cartDrawer.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
});

cartClose.addEventListener('click', closeCart);
overlay.addEventListener('click', () => { closeCart(); closeModal(); });

function closeCart() {
    cartDrawer.classList.remove('open');
    overlay.classList.remove('active');
    cartDrawer.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
}

clearCartBtn.addEventListener('click', () => {
    if (confirm('آیا مایل به خالی کردن سبد خرید هستید؟')) {
        cart = {};
        saveCart();
        showNotification('سبد خرید خالی شد.');
    }
});

checkoutBtn.addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
        alert('سبد خرید خالی است.');
        return;
    }
    alert('به صفحه تسویه هدایت می‌شوید (نمونه).');
});

cartItemsList.addEventListener('input', (e) => {
    if (e.target.matches('.cart-item-qty')) {
        const id = e.target.dataset.id;
        const val = parseInt(e.target.value) || 1;
        if (cart[id]) {
            cart[id].qty = val;
            saveCart();
        }
    }
});

cartItemsList.addEventListener('click', (e) => {
    if (e.target.closest('.remove-item')) {
        const id = e.target.closest('.remove-item').dataset.id;
        if (cart[id]) {
            delete cart[id];
            saveCart();
            showNotification('محصول از سبد حذف شد.');
        }
    }
});

const quickviewModal = document.getElementById('quickview-modal');
const quickviewImg = quickviewModal ? quickviewModal.querySelector('.modal-image img') : null;
const quickviewTitle = quickviewModal ? quickviewModal.querySelector('.modal-title') : null;
const quickviewDesc = quickviewModal ? quickviewModal.querySelector('.modal-desc') : null;
const quickviewPriceNow = quickviewModal ? quickviewModal.querySelector('.modal-price-now') : null;
const quickviewPriceOld = quickviewModal ? quickviewModal.querySelector('.modal-price-old') : null;
const quickviewQty = quickviewModal ? quickviewModal.querySelector('.modal-qty') : null;
const quickviewAdd = quickviewModal ? quickviewModal.querySelector('.modal-add') : null;
const quickviewClose = quickviewModal ? quickviewModal.querySelector('.modal-close') : null;

function openModal() {
    if (!quickviewModal) return;
    quickviewModal.setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');
}

function closeModal() {
    if (!quickviewModal) return;
    quickviewModal.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('active');
}

if (quickviewClose) quickviewClose.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeCart();
        headerCenter.classList.remove('active');
    }
});

document.querySelectorAll('.product-card').forEach(card => {
    const addBtn = card.querySelector('.add-to-cart');
    const quickBtn = card.querySelector('.quick-view');

    if (addBtn) {
        addBtn.addEventListener('click', (ev) => {
            ev.preventDefault();
            const product = {
                id: card.dataset.id || Date.now().toString(),
                title: card.dataset.title || (card.querySelector('h3') ? card.querySelector('h3').innerText : 'محصول'),
                price: Number(card.dataset.price || card.querySelector('.price')?.getAttribute('content') || 0),
                img: card.querySelector('img') ? card.querySelector('img').src : '',
                qty: 1
            };
            addToCart(product);
            
            addBtn.classList.add('added-to-cart');
            addBtn.innerHTML = '<i class="ri-check-line"></i>';
            setTimeout(() => {
                addBtn.classList.remove('added-to-cart');
                addBtn.innerHTML = '<i class="ri-shopping-cart-line"></i>';
            }, 500);
        });
    }

    if (quickBtn) {
        quickBtn.addEventListener('click', (ev) => {
            ev.preventDefault();
            const title = card.dataset.title || card.querySelector('h3')?.innerText;
            const price = Number(card.dataset.price || card.querySelector('.price')?.getAttribute('content') || 0);
            const old = Number(card.dataset.old || card.querySelector('.old-price')?.innerText?.replace(/[^\d]/g,'') || 0);
            const desc = card.dataset.desc || '';
            const img = card.querySelector('img') ? card.querySelector('img').src : '';

            if (quickviewImg) quickviewImg.src = img;
            if (quickviewTitle) quickviewTitle.innerText = title;
            if (quickviewDesc) quickviewDesc.innerText = desc;
            if (quickviewPriceNow) quickviewPriceNow.innerText = formatToman(price);
            if (quickviewPriceOld) quickviewPriceOld.innerText = old ? formatToman(old) : '';
            if (quickviewQty) quickviewQty.value = 1;

            if (quickviewAdd) {
                const newProduct = {
                    id: card.dataset.id || Date.now().toString(),
                    title,
                    price,
                    img
                };
                const clone = quickviewAdd.cloneNode(true);
                quickviewAdd.parentNode.replaceChild(clone, quickviewAdd);
                clone.addEventListener('click', () => {
                    newProduct.qty = Number(quickviewQty.value) || 1;
                    addToCart(newProduct);
                    closeModal();
                });
            }

            openModal();
        });
    }
});

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (email) {
            showNotification('ایمیل شما با موفقیت ثبت شد!');
            newsletterForm.reset();
        }
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="ri-checkbox-circle-line"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) notification.parentNode.removeChild(notification);
        }, 300);
    }, 3000);
}

if (typeof ScrollReveal === 'function') {
    const sr = ScrollReveal({
        distance: '50px',
        duration: 1000,
        delay: 100,
        reset: false,
        easing: 'ease-out'
    });

    sr.reveal('.hero-content', { origin: 'right' });
    sr.reveal('.hero-image', { origin: 'left' });
    sr.reveal('.feature', { interval: 100 });
    sr.reveal('.section-header', { origin: 'top' });
    sr.reveal('.product-card', { interval: 150 });
    sr.reveal('.about-image', { origin: 'left' });
    sr.reveal('.about-text', { origin: 'right' });
    sr.reveal('.testimonial-card', { interval: 150 });
    sr.reveal('.footer-section', { interval: 100 });
} else {
    // Fallback: if the ScrollReveal CDN failed to load, make sure content is still visible.
    console.warn('ScrollReveal not available - showing content without scroll animations.');
}

const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(isDark) {
    if (isDark) {
        root.classList.add('dark');
        localStorage.setItem('behbod_theme', 'dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="ri-sun-line"></i>';
    } else {
        root.classList.remove('dark');
        localStorage.setItem('behbod_theme', 'light');
        if (themeToggle) themeToggle.innerHTML = '<i class="ri-moon-line"></i>';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = root.classList.contains('dark');
        setTheme(!isDark);
    });
}

(function(){
    const saved = localStorage.getItem('behbod_theme');
    if (saved === 'dark') setTheme(true);
    else setTheme(false);
})();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
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

document.addEventListener('click', (e) => {
    if (headerCenter.classList.contains('active') && 
        !e.target.closest('.header-center') && 
        !e.target.closest('#search-toggle')) {
        headerCenter.classList.remove('active');
    }
});

loadCart();

document.addEventListener("DOMContentLoaded", () => {
  const spans = document.querySelectorAll(".hero-title.animate-blur span");
  spans.forEach((span, index) => {
    span.style.animationDelay = `${index * 0.25}s`; 
  });
});

document.querySelectorAll('.submenu a[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = link.getAttribute('data-filter');
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
        if (targetBtn) targetBtn.click();
        const productsSection = document.querySelector('#products');
        if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        menu.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 992) item.querySelector('.submenu').style.display = 'block';
    });
    item.addEventListener('mouseleave', () => {
        if (window.innerWidth > 992) item.querySelector('.submenu').style.display = 'none';
    });
});


let wishlist = JSON.parse(localStorage.getItem('behbod_wishlist') || '{}');

function restoreWishlistUI() {
    document.querySelectorAll('.wishlist').forEach(btn => {
        if (wishlist[btn.dataset.id]) btn.classList.add('active');
    });
}
restoreWishlistUI();

function toggleWishlist(id) {
    if (wishlist[id]) delete wishlist[id];
    else wishlist[id] = true;
    localStorage.setItem('behbod_wishlist', JSON.stringify(wishlist));
    const btn = document.querySelector(`[data-id="${id}"].wishlist`);
    if (btn) btn.classList.toggle('active');
    showNotification(wishlist[id] ? 'به علاقه‌مندی‌ها اضافه شد!' : 'از علاقه‌مندی‌ها حذف شد.');
}
document.addEventListener('click', (e) => {
    if (e.target.closest('.wishlist')) {
        const btn = e.target.closest('.wishlist');
        toggleWishlist(btn.dataset.id);
    }
});


let page = 1;
const productsGrid = document.querySelector('.products-grid');
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        loadMoreProducts();
    }
});
function loadMoreProducts() {
    const loader = document.querySelector('.loader');
    loader.classList.add('show');

    setTimeout(() => { 
        console.log('محصولات جدید لود شد (صفحه ' + page + ')'); 
        loader.classList.remove('show');
        page++;
    }, 1500);
}

function typewriter(el, text, speed = 100) {
    let i = 0;
    el.innerHTML = '';
    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Parallax ساده
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImg = document.querySelector('.hero-image img');
    if (heroImg) heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
});