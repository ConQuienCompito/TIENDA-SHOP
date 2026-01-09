/* ==========================
   LUMEI - Scripts principales
   ========================== */

document.addEventListener('DOMContentLoaded', function() {
  // Toast notification
  window.showToast = function(message, type) {
    type = type || 'success';
    var toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    toast.innerHTML = '<span>' + message + '</span>';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--color-bg-card);color:var(--color-text);padding:16px 24px;border-radius:var(--radius-md);border:1px solid var(--color-border);z-index:9999;animation:fadeInUp 0.3s ease';
    document.body.appendChild(toast);
    setTimeout(function() {
      toast.style.animation = 'fadeIn 0.3s ease reverse';
      setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
  };
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
  
  // Intersection Observer for animations
  if ('IntersectionObserver' in window) {
    var animatedElements = document.querySelectorAll('[data-animate]');
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
  }
});

// Cart functions
window.updateCartCount = function(count) {
  var countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = count;
  }
};

window.addToCart = function(variantId, quantity) {
  quantity = quantity || 1;
  
  return fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: parseInt(variantId), quantity: quantity })
  })
  .then(function(response) {
    if (!response.ok) throw new Error('Error adding to cart');
    return response.json();
  })
  .then(function(item) {
    return fetch('/cart.js').then(function(r) { return r.json(); });
  })
  .then(function(cart) {
    window.updateCartCount(cart.item_count);
    
    var drawer = document.getElementById('cart-drawer');
    var overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.add('is-open');
    if (overlay) overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    
    if (typeof window.refreshCartDrawer === 'function') {
      window.refreshCartDrawer();
    }
    
    return cart;
  });
};

window.updateCartItem = function(key, quantity) {
  return fetch('/cart/change.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: key, quantity: quantity })
  })
  .then(function(response) { return response.json(); })
  .then(function(cart) {
    window.updateCartCount(cart.item_count);
    return cart;
  });
};

window.removeFromCart = function(key) {
  return window.updateCartItem(key, 0);
};
