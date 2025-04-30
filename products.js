/**
 * Products data for Eros caps e-commerce store
 * Each product has a unique id, name, price, image URL, and optional badge
 */
const products = [
  {
    id: 1,
    name: "Classic Black",
    price: 39.99,
    image: "https://images.pexels.com/photos/844867/pexels-photo-844867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    badge: ""
  },
  {
    id: 2,
    name: "Urban Street",
    price: 44.99,
    image: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    name: "Vintage Gold",
    price: 49.99,
    image: "https://images.pexels.com/photos/1078821/pexels-photo-1078821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    badge: ""
  },
  {
    id: 4,
    name: "Sport Edition",
    price: 37.99,
    image: "https://images.pexels.com/photos/1070058/pexels-photo-1070058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 5,
    name: "Minimalist White",
    price: 42.99,
    image: "https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 6,
    name: "Denim Blue",
    price: 45.99,
    image: "https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    badge: ""
  }
];

/**
 * Formats a number as USD currency
 * @param {number} price - The price to format
 * @returns {string} The formatted price string
 */
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

/**
 * Creates HTML for a product card
 * @param {Object} product - The product data
 * @returns {string} HTML string for the product card
 */
function createProductCard(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <div class="product-actions">
          <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders all products to the product container
 */
function renderProducts() {
  const productsContainer = document.getElementById('products-container');
  
  if (!productsContainer) return;
  
  productsContainer.innerHTML = products.map(product => 
    createProductCard(product)
  ).join('');
  
  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);
      
      if (product) {
        // This function is defined in cart.js
        addToCart(product);
        showNotification('Item added to cart!');
      }
    });
  });
}

/**
 * Gets a product by its ID
 * @param {number} id - The product ID to find
 * @returns {Object|null} The product object or null if not found
 */
function getProductById(id) {
  return products.find(product => product.id === id) || null;
}

/**
 * Shows a notification message
 * @param {string} message - The message to display
 */
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.querySelector('p').textContent = message;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Initialize products when DOM is loaded
document.addEventListener('DOMContentLoaded', renderProducts);