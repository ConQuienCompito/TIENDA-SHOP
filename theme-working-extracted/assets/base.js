/* ===========================================
   LUMEI Base JS - v2.0
   Clean, encapsulated, no side effects
   =========================================== */

(function() {
  'use strict';

  // Namespace
  window.LUMEI = window.LUMEI || {};

  /* =========================================
     CART DRAWER
     ========================================= */
  
  function initCartDrawer() {
    var cartToggle = document.getElementById('cart-toggle');
    var cartDrawer = document.getElementById('cart-drawer');
    var cartOverlay = document.getElementById('cart-overlay');
    var cartClose = document.getElementById('cart-drawer-close');

    if (!cartDrawer) return;

    function openCart() {
      cartDrawer.classList.add('is-open');
      cartDrawer.setAttribute('aria-hidden', 'false');
      if (cartOverlay) cartOverlay.classList.add('is-visible');
      if (cartToggle) cartToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      
      setTimeout(function() {
        if (cartClose) cartClose.focus();
      }, 100);
    }

    function closeCart() {
      cartDrawer.classList.remove('is-open');
      cartDrawer.setAttribute('aria-hidden', 'true');
      if (cartOverlay) cartOverlay.classList.remove('is-visible');
      if (cartToggle) cartToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      
      if (cartToggle) cartToggle.focus();
    }

    if (cartToggle) {
      cartToggle.addEventListener('click', function(e) {
        e.preventDefault();
        openCart();
      });
    }
    
    if (cartClose) {
      cartClose.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
      cartOverlay.addEventListener('click', closeCart);
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && cartDrawer.classList.contains('is-open')) {
        closeCart();
      }
    });

    // Expose globally
    window.LUMEI.openCart = openCart;
    window.LUMEI.closeCart = closeCart;
  }

  /* =========================================
     MOBILE MENU
     ========================================= */
  
  function initMobileMenu() {
    var menuToggle = document.getElementById('menu-toggle');
    var mobileMenu = document.getElementById('mobile-menu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', function() {
      var isOpen = mobileMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    var mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* =========================================
     CART FUNCTIONS
     ========================================= */
  
  window.updateCartCount = function(count) {
    var el = document.getElementById('cart-count');
    if (el) el.textContent = count;
  };

  window.addToCart = function(variantId, quantity) {
    quantity = quantity || 1;
    
    return fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: parseInt(variantId, 10), quantity: quantity })
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Error adding to cart');
      }
      return response.json();
    })
    .then(function() {
      return fetch('/cart.js').then(function(r) { return r.json(); });
    })
    .then(function(cart) {
      window.updateCartCount(cart.item_count);
      
      if (window.LUMEI && window.LUMEI.openCart) {
        window.LUMEI.openCart();
      }
      
      return refreshCartDrawer().then(function() {
        return cart;
      });
    });
  };

  function refreshCartDrawer() {
    return fetch('/?section_id=cart-drawer')
      .then(function(response) { return response.text(); })
      .then(function(html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var newDrawer = doc.getElementById('cart-drawer');
        var currentDrawer = document.getElementById('cart-drawer');
        
        if (newDrawer && currentDrawer) {
          var wasOpen = currentDrawer.classList.contains('is-open');
          currentDrawer.innerHTML = newDrawer.innerHTML;
          if (wasOpen) currentDrawer.classList.add('is-open');
          
          var closeBtn = currentDrawer.querySelector('#cart-drawer-close');
          if (closeBtn && window.LUMEI && window.LUMEI.closeCart) {
            closeBtn.addEventListener('click', window.LUMEI.closeCart);
          }
        }
      })
      .catch(function(err) {
        console.error('LUMEI: Error refreshing cart drawer', err);
      });
  }

  /* =========================================
     INIT ON DOM READY
     ========================================= */
  
  document.addEventListener('DOMContentLoaded', function() {
    initCartDrawer();
    initMobileMenu();
  });

})();
