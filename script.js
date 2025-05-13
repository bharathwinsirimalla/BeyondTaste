// Product data
const productData = {
    categories: [
        {
            id: 1,
            name: "Sweets",
            items: [
                { id: 1, name: "Gulab Jamun", description: "Sweet milk dumplings in sugar syrup", price: 299, image: "gulab-jamun.jpg", weight: "500g", isFestive: false },
                { id: 2, name: "Rasmalai", description: "Soft cottage cheese patties in sweet milk", price: 349, image: "rasmalai.jpg", weight: "500g", isFestive: false },
                { id: 3, name: "Kheer", description: "Traditional rice pudding", price: 249, image: "kheer.jpg", weight: "500g", isFestive: false },
                { id: 4, name: "Jalebi", description: "Crispy spiral sweet in sugar syrup", price: 199, image: "jalebi.jpg", weight: "250g", isFestive: false },
                { id: 5, name: "Ladoo", description: "Sweet round balls made of gram flour", price: 299, image: "ladoo.jpg", weight: "500g", isFestive: false }
            ]
        },
        {
            id: 2,
            name: "Snacks",
            items: [
                { id: 6, name: "Samosa", description: "Crispy pastry filled with spiced potatoes and peas", price: 149, image: "samosa.jpg", weight: "4 pieces", isFestive: false },
                { id: 7, name: "Kachori", description: "Flaky pastry with spiced lentil filling", price: 169, image: "kachori.jpg", weight: "4 pieces", isFestive: false },
                { id: 8, name: "Namkeen", description: "Assorted savory snacks mix", price: 199, image: "namkeen.jpg", weight: "500g", isFestive: false },
                { id: 9, name: "Mathri", description: "Crispy savory crackers", price: 179, image: "mathri.jpg", weight: "250g", isFestive: false },
                { id: 10, name: "Pakora", description: "Crispy vegetable fritters", price: 199, image: "pakora.jpg", weight: "6 pieces", isFestive: false }
            ]
        },
        {
            id: 3,
            name: "Festive Special",
            items: [
                { id: 11, name: "Diwali Special Box", description: "Assorted sweets and snacks for Diwali", price: 999, image: "diwali-box.jpg", weight: "1kg", isFestive: true },
                { id: 12, name: "Holi Special Box", description: "Colorful sweets and snacks for Holi", price: 899, image: "holi-box.jpg", weight: "1kg", isFestive: true },
                { id: 13, name: "Rakhi Special Box", description: "Premium sweets for Rakhi", price: 799, image: "rakhi-box.jpg", weight: "750g", isFestive: true },
                { id: 14, name: "Wedding Special Box", description: "Luxury assortment for special occasions", price: 1499, image: "wedding-box.jpg", weight: "2kg", isFestive: true }
            ]
        }
    ]
};

// DOM Elements
const productContainer = document.querySelector('.grid');
const searchInput = document.querySelector('input[type="text"]');
const categoryTabs = document.querySelectorAll('.category-tab');
const cartButton = document.querySelector('a[href="orders.html"]');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutButton = document.getElementById('checkoutButton');
const paymentModal = document.getElementById('paymentModal');
const closePayment = document.getElementById('closePayment');
const paymentForm = document.getElementById('payment-form');
const paymentSection = document.getElementById('paymentSection');
const backToCart = document.getElementById('backToCart');

// Format price in Indian Rupees
function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

// Render products
function renderProducts(category = 'all') {
    const filteredCategories = category === 'all' 
        ? productData.categories 
        : productData.categories.filter(cat => cat.name.toLowerCase().includes(category));

    productContainer.innerHTML = filteredCategories.map(category => `
        <div class="menu-card bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6">
                <h2 class="category-title text-2xl font-bold text-gray-900 mb-4">${category.name}</h2>
                <div class="space-y-4">
                    ${category.items.map(item => `
                        <div class="menu-item p-4 rounded-lg hover:bg-gray-50 ${item.isFestive ? 'festive-item' : ''}">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold text-gray-900">${item.name}</h3>
                                    <p class="text-gray-600 mt-1">${item.description}</p>
                                    <p class="text-sm text-gray-500 mt-1">Weight: ${item.weight}</p>
                                </div>
                                <div class="text-right">
                                    <span class="price-tag text-lg font-bold text-blue-600">${formatPrice(item.price)}</span>
                                    <button 
                                        onclick="addToCart(${item.id})"
                                        class="mt-2 bg-red-800 text-yellow-400 px-3 py-1 rounded-lg hover:bg-red-700 text-sm">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Menu Items Data
const menuItems = [
    {
        id: 1,
        name: "Gulab Jamun",
        category: "Sweets",
        price: 299,
        image: "images/gulab-jamun.jpg",
        description: "Sweet milk dumplings in sugar syrup"
    },
    {
        id: 2,
        name: "Rasmalai",
        category: "Sweets",
        price: 349,
        image: "images/rasmalai.jpg",
        description: "Soft cottage cheese patties in sweet milk"
    },
    {
        id: 3,
        name: "Kheer",
        category: "Sweets",
        price: 249,
        image: "images/kheer.jpg",
        description: "Traditional rice pudding"
    },
    {
        id: 4,
        name: "Jalebi",
        category: "Sweets",
        price: 199,
        image: "images/jalebi.jpg",
        description: "Crispy spiral sweet in sugar syrup"
    },
    {
        id: 5,
        name: "Ladoo",
        category: "Sweets",
        price: 299,
        image: "images/ladoo.jpg",
        description: "Sweet round balls made of gram flour"
    },
    {
        id: 6,
        name: "Samosa",
        category: "Snacks",
        price: 149,
        image: "images/samosa.jpg",
        description: "Crispy pastry filled with spiced potatoes and peas"
    },
    {
        id: 7,
        name: "Kachori",
        category: "Snacks",
        price: 169,
        image: "images/kachori.jpg",
        description: "Flaky pastry with spiced lentil filling"
    },
    {
        id: 8,
        name: "Namkeen",
        category: "Snacks",
        price: 199,
        image: "images/namkeen.jpg",
        description: "Assorted savory snacks mix"
    },
    {
        id: 9,
        name: "Mathri",
        category: "Snacks",
        price: 179,
        image: "images/mathri.jpg",
        description: "Crispy savory crackers"
    },
    {
        id: 10,
        name: "Pakora",
        category: "Snacks",
        price: 199,
        image: "images/pakora.jpg",
        description: "Crispy vegetable fritters"
    },
    {
        id: 11,
        name: "Poori",
        category: "Snacks",
        price: 199,
        image: "images/pakora.jpg",
        description: "Crispy vegetable fritters"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        updateCartCount();
        showNotification('Item added to cart!');
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex-1">
                <h3 class="font-semibold">${item.name}</h3>
                <p class="text-gray-600">₹${item.price}</p>
            </div>
            <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" 
                            class="w-8 h-8 flex items-center justify-center bg-red-100 text-red-800 rounded-full hover:bg-red-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                        </svg>
                    </button>
                    <span class="w-8 text-center">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})"
                            class="w-8 h-8 flex items-center justify-center bg-red-100 text-red-800 rounded-full hover:bg-red-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                    </button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-600 hover:text-red-800">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = 50;
    const total = subtotal + delivery;

    if (cartSubtotal) cartSubtotal.textContent = `₹${subtotal}`;
    if (cartTotal) cartTotal.textContent = `₹${total}`;
}

function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(itemId);
        return;
    }
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        updateCartCount();
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartCount();
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Menu filtering and display
function filterMenu(category) {
    const menuGrid = document.querySelector('.menu-section');
    if (!menuGrid) return;

    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="relative h-48">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                <div class="absolute top-2 right-2 bg-red-800 text-yellow-400 px-3 py-1 rounded-full text-sm">
                    ${item.category}
                </div>
            </div>
            <div class="p-4">
                <h3 class="text-xl font-semibold text-red-800">${item.name}</h3>
                <p class="text-gray-600 mt-2">${item.description}</p>
                <div class="flex items-center justify-between mt-4">
                    <span class="text-xl font-bold text-red-800">₹${item.price}</span>
                    <button onclick="addToCart(${item.id})" 
                            class="bg-red-800 text-yellow-400 px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Category tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize menu with all items
    filterMenu('all');

    // Add click handlers for category tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => {
                t.classList.remove('active', 'bg-red-800', 'text-yellow-400');
                t.classList.add('bg-red-700', 'text-yellow-100');
            });
            
            // Add active class to clicked tab
            this.classList.add('active', 'bg-red-800', 'text-yellow-400');
            this.classList.remove('bg-red-700', 'text-yellow-100');
            
            // Filter menu items
            filterMenu(this.dataset.category);
        });
    });

    // Initialize menu if on menu page
    if (document.getElementById('menuContainer')) {
        initializeMenu();
    }
    
    // Initialize contact page if on contact page
    if (document.getElementById('reviewsContainer')) {
        initializeContactPage();
    }

    // Cart functionality
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCartBtn = document.getElementById('closeCart');
    const checkoutButton = document.getElementById('checkoutButton');
    const paymentForm = document.getElementById('paymentForm');
    const backToCart = document.getElementById('backToCart');
    const paymentDetailsForm = document.getElementById('paymentDetailsForm');

    // Ensure cart starts hidden
    if (cartSidebar) {
        cartSidebar.style.display = 'none';
        cartSidebar.classList.add('-translate-x-full');
    }

    if (cartIcon && cartSidebar) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            cartSidebar.style.display = 'block';
            setTimeout(() => {
                cartSidebar.classList.remove('-translate-x-full');
            }, 10);
            updateCart(); // Update cart contents when opened
        });
    }

    if (closeCartBtn && cartSidebar) {
        closeCartBtn.addEventListener('click', function() {
            cartSidebar.classList.add('-translate-x-full');
            setTimeout(() => {
                cartSidebar.style.display = 'none';
            }, 300); // Match the transition duration
        });
    }

    // Handle checkout button click
    if (checkoutButton && paymentForm) {
        checkoutButton.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }
            
            // Hide cart and show payment form
            cartSidebar.classList.add('-translate-x-full');
            setTimeout(() => {
                cartSidebar.style.display = 'none';
                paymentForm.style.display = 'block';
                setTimeout(() => {
                    paymentForm.classList.remove('translate-x-full');
                }, 10);
            }, 300);

            // Update payment amount
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 50;
            document.getElementById('paymentAmount').textContent = total;
        });
    }

    // Handle back to cart button
    if (backToCart && paymentForm && cartSidebar) {
        backToCart.addEventListener('click', function() {
            paymentForm.classList.add('translate-x-full');
            setTimeout(() => {
                paymentForm.style.display = 'none';
                cartSidebar.style.display = 'block';
                setTimeout(() => {
                    cartSidebar.classList.remove('-translate-x-full');
                }, 10);
            }, 300);
        });
    }

    // Handle payment form submission
    if (paymentDetailsForm) {
        paymentDetailsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const cardNumber = document.getElementById('cardNumber').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;
            const cardHolderName = document.getElementById('cardHolderName').value;

            // Basic validation
            if (!validateCardNumber(cardNumber) || !validateExpiryDate(expiryDate) || !validateCVV(cvv)) {
                showNotification('Please enter valid card details', 'error');
                return;
            }

            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = 'Processing...';
            submitButton.disabled = true;

            // Simulate payment processing
            setTimeout(() => {
                // Clear cart
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                
                // Reset form
                this.reset();
                
                // Show success message
                showNotification('Payment successful! Your order has been placed.', 'success');
                
                // Hide payment form
                paymentForm.classList.add('translate-x-full');
                setTimeout(() => {
                    paymentForm.style.display = 'none';
                }, 300);
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Initialize cart count
    updateCartCount();
});

// Card validation functions
function validateCardNumber(number) {
    // Remove spaces and dashes
    number = number.replace(/[\s-]/g, '');
    // Check if it's a valid 16-digit number
    return /^\d{16}$/.test(number);
}

function validateExpiryDate(date) {
    // Check if it matches MM/YY format
    if (!/^\d{2}\/\d{2}$/.test(date)) return false;
    
    const [month, year] = date.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    // Check if month is valid (1-12)
    if (month < 1 || month > 12) return false;
    
    // Check if year is valid (current year or future)
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    
    return true;
}

function validateCVV(cvv) {
    // Check if it's a valid 3 or 4 digit number
    return /^\d{3,4}$/.test(cvv);
}

// Customer reviews
const reviews = [
    {
        name: "Priya Sharma",
        rating: 5,
        comment: "The best traditional sweets I've ever tasted! The Gulab Jamun is absolutely divine.",
        date: "2024-03-15"
    },
    {
        name: "Rajesh Patel",
        rating: 5,
        comment: "Authentic flavors that remind me of my grandmother's cooking. The Ladoo is perfect!",
        date: "2024-03-10"
    },
    {
        name: "Meera Gupta",
        rating: 4,
        comment: "Great variety of snacks and sweets. The packaging is beautiful and the taste is amazing.",
        date: "2024-03-05"
    },
    {
        name: "Amit Kumar",
        rating: 5,
        comment: "The Rasmalai is to die for! Will definitely order again for family gatherings.",
        date: "2024-03-01"
    },
    {
        name: "Neha Singh",
        rating: 4,
        comment: "Love their traditional snacks collection. The Mathri is crispy and perfectly spiced.",
        date: "2024-02-28"
    },
    {
        name: "Vikram Malhotra",
        rating: 5,
        comment: "Best place for authentic Indian sweets. The Kheer is rich and creamy, just like homemade.",
        date: "2024-02-25"
    }
];

// Customer reviews display
function displayReviews() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = reviews.map(review => `
        <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-center mb-4">
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-red-800">${review.name}</h3>
                    <p class="text-gray-500 text-sm">${new Date(review.date).toLocaleDateString()}</p>
                </div>
                <div class="flex text-yellow-400">
                    ${Array(review.rating).fill('★').join('')}
                </div>
            </div>
            <p class="text-gray-600">${review.comment}</p>
        </div>
    `).join('');
}

// Contact form handling
function initializeContactPage() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            showNotification('Thank you for your feedback!');
            this.reset();
        });
    }

    // Display reviews on contact page
    displayReviews();
}

// Initialize page based on current page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact page if on contact page
    if (document.querySelector('#feedbackForm')) {
        initializeContactPage();
    }
});

// Mobile menu and dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');

    // Hamburger menu toggle
    if (hamburgerMenu && dropdownMenu) {
        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('hidden');
            this.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburgerMenu.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.add('hidden');
                hamburgerMenu.classList.remove('active');
            }
        });

        // Close dropdown when clicking a link
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                dropdownMenu.classList.add('hidden');
                hamburgerMenu.classList.remove('active');
            });
        });
    }
}); 