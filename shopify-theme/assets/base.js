/* LUMEI Base JS */
document.addEventListener('DOMContentLoaded', function() {
  // Cart toggle
  var cartToggle = document.getElementById('cart-toggle');
  var cartDrawer = document.getElementById('cart-drawer');
  var cartOverlay = document.getElementById('cart-overlay');
  var cartClose = document.getElementById('cart-drawer-close');

  function openCart() {
    if (cartDrawer) cartDrawer.classList.add('is-open');
    if (cartOverlay) cartOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('is-open');
    if (cartOverlay) cartOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  if (cartToggle) cartToggle.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Mobile menu
  var menuToggle = document.getElementById('menu-toggle');
  var menuClose = document.getElementById('menu-close');
  var mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      if (mobileMenu) mobileMenu.classList.add('is-open');
      if (cartOverlay) cartOverlay.classList.add('is-visible');
    });
  }

  if (menuClose) {
    menuClose.addEventListener('click', function() {
      if (mobileMenu) mobileMenu.classList.remove('is-open');
      if (cartOverlay) cartOverlay.classList.remove('is-visible');
    });
  }

  // Update cart count
  window.updateCartCount = function(count) {
    var el = document.getElementById('cart-count');
    if (el) el.textContent = count;
  };
});

// Add to cart function
window.addToCart = function(variantId, quantity) {
  quantity = quantity || 1;
  
  return fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: parseInt(variantId), quantity: quantity })
  })
  .then(function(r) {
    if (!r.ok) throw new Error('Error');
    return r.json();
  })
  .then(function() {
    return fetch('/cart.js').then(function(r) { return r.json(); });
  })
  .then(function(cart) {
    window.updateCartCount(cart.item_count);
    
    var drawer = document.getElementById('cart-drawer');
    var overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.add('is-open');
    if (overlay) overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    
    // Reload page to update cart drawer content
    location.reload();
    
    return cart;
  });
};
