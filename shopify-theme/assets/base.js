/* ===========================================
   LUMEI - Sistema JavaScript Mejorado
   Carrito AJAX, Variantes, y UX
   =========================================== */

(function() {
  'use strict';

  // ===========================================
  // UTILIDADES
  // ===========================================
  
  var utils = {
    // Fetch con manejo de errores
    fetchJSON: function(url, options) {
      options = options || {};
      return fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })
      .then(function(response) {
        if (!response.ok) {
          return response.json().then(function(err) {
            throw new Error(err.description || 'Error en la petición');
          });
        }
        return response.json();
      });
    },

    // Mostrar notificación
    showNotification: function(message, type) {
      type = type || 'success';
      var notification = document.createElement('div');
      notification.className = 'notification notification--' + type;
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(function() {
        notification.classList.add('is-visible');
      }, 10);
      
      setTimeout(function() {
        notification.classList.remove('is-visible');
        setTimeout(function() {
          notification.remove();
        }, 300);
      }, 3000);
    },

    // Obtener elementos del DOM
    $: function(selector, context) {
      context = context || document;
      return context.querySelector(selector);
    },
    
    $$: function(selector, context) {
      context = context || document;
      return Array.from(context.querySelectorAll(selector));
    }
  };

  // ===========================================
  // SISTEMA DE CARRITO AJAX
  // ===========================================
  
  var Cart = {
    // Obtener carrito actual
    get: function() {
      return utils.fetchJSON('/cart.js');
    },

    // Añadir producto al carrito
    add: function(variantId, quantity, properties) {
      quantity = quantity || 1;
      properties = properties || {};
      
      return utils.fetchJSON('/cart/add.js', {
        method: 'POST',
        body: JSON.stringify({
          id: parseInt(variantId),
          quantity: quantity,
          properties: properties
        })
      });
    },

    // Actualizar cantidad de un item
    update: function(line, quantity) {
      return utils.fetchJSON('/cart/change.js', {
        method: 'POST',
        body: JSON.stringify({
          line: line,
          quantity: quantity
        })
      });
    },

    // Eliminar item del carrito
    remove: function(line) {
      return Cart.update(line, 0);
    },

    // Actualizar contador del carrito
    updateCount: function(count) {
      var cartCountEl = document.getElementById('cart-count');
      if (cartCountEl) {
        cartCountEl.textContent = count;
        if (count > 0) {
          cartCountEl.classList.add('has-items');
        } else {
          cartCountEl.classList.remove('has-items');
        }
      }
    },

    // Renderizar carrito drawer
    renderDrawer: function(cart) {
      var drawer = document.getElementById('cart-drawer');
      var drawerContent = document.getElementById('cart-drawer-content');
      var drawerFooter = drawer ? drawer.querySelector('.cart-drawer__footer') : null;
      
      if (!drawerContent) return;

      if (cart.item_count === 0) {
        drawerContent.innerHTML = '<div class="cart-drawer__empty">' +
          '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">' +
          '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>' +
          '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>' +
          '<h3>Tu carrito está vacío</h3>' +
          '<p>Descubre nuestras lámparas</p>' +
          '<a href="/collections/all" class="btn btn--primary">Ver colección</a>' +
          '</div>';
        if (drawerFooter) drawerFooter.style.display = 'none';
        return;
      }

      if (drawerFooter) drawerFooter.style.display = 'block';

      var itemsHTML = '<div class="cart-drawer__items">';
      cart.items.forEach(function(item, index) {
        var imageUrl = item.image || '';
        var variantTitle = item.variant_title && item.variant_title !== 'Default Title' ? item.variant_title : '';
        var linePrice = item.final_line_price || item.line_price || 0;
        var lineNumber = item.line || (index + 1);
        
        itemsHTML += '<div class="cart-drawer__item" data-line="' + lineNumber + '" data-key="' + (item.key || '') + '">' +
          '<a href="' + item.url + '" class="cart-drawer__item-image">' +
          (imageUrl ? '<img src="' + imageUrl + '" alt="' + (item.product_title || item.title || '') + '" loading="lazy">' : '') +
          '</a>' +
          '<div class="cart-drawer__item-info">' +
          '<a href="' + item.url + '" class="cart-drawer__item-title">' + (item.product_title || item.title || '') + '</a>' +
          (variantTitle ? '<p class="cart-drawer__item-variant">' + variantTitle + '</p>' : '') +
          '<div class="cart-drawer__item-bottom">' +
          '<div class="cart-drawer__item-qty-controls">' +
          '<button type="button" class="cart-drawer__qty-btn" data-action="decrease" aria-label="Disminuir cantidad">−</button>' +
          '<span class="cart-drawer__item-qty">' + item.quantity + '</span>' +
          '<button type="button" class="cart-drawer__qty-btn" data-action="increase" aria-label="Aumentar cantidad">+</button>' +
          '</div>' +
          '<span class="cart-drawer__item-price">' + Cart.formatMoney(linePrice) + '</span>' +
          '</div>' +
          '</div>' +
          '<button type="button" class="cart-drawer__remove" data-action="remove" aria-label="Eliminar">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
          '<polyline points="3 6 5 6 21 6"></polyline>' +
          '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>' +
          '</button>' +
          '</div>';
      });
      itemsHTML += '</div>';

      drawerContent.innerHTML = itemsHTML;

      // Actualizar footer si existe
      if (drawerFooter) {
        var subtotalEls = drawerFooter.querySelectorAll('.cart-drawer__subtotal span');
        if (subtotalEls.length > 1) {
          subtotalEls[subtotalEls.length - 1].textContent = Cart.formatMoney(cart.total_price);
        }
      }

      // Añadir event listeners a los controles
      Cart.bindDrawerControls();
    },

    // Formatear dinero (Shopify devuelve precios en centavos)
    formatMoney: function(cents) {
      var amount = (cents / 100).toFixed(2);
      return amount.replace('.', ',') + ' €';
    },

    // Vincular controles del drawer
    bindDrawerControls: function() {
      var drawer = document.getElementById('cart-drawer');
      if (!drawer) return;

      // Botones de cantidad
      drawer.querySelectorAll('[data-action="increase"], [data-action="decrease"]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          var item = this.closest('.cart-drawer__item');
          var line = parseInt(item.dataset.line);
          var qtyEl = item.querySelector('.cart-drawer__item-qty');
          var currentQty = parseInt(qtyEl.textContent);
          var newQty = this.dataset.action === 'increase' ? currentQty + 1 : Math.max(0, currentQty - 1);

          Cart.update(line, newQty)
            .then(function() {
              return Cart.get();
            })
            .then(function(cart) {
              Cart.renderDrawer(cart);
              Cart.updateCount(cart.item_count);
              utils.showNotification(newQty === 0 ? 'Producto eliminado' : 'Carrito actualizado', 'success');
            })
            .catch(function(err) {
              utils.showNotification(err.message || 'Error al actualizar el carrito', 'error');
            });
        });
      });

      // Botón eliminar
      drawer.querySelectorAll('[data-action="remove"]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          var item = this.closest('.cart-drawer__item');
          var line = parseInt(item.dataset.line);

          Cart.remove(line)
            .then(function() {
              return Cart.get();
            })
            .then(function(cart) {
              Cart.renderDrawer(cart);
              Cart.updateCount(cart.item_count);
              utils.showNotification('Producto eliminado', 'success');
            })
            .catch(function(err) {
              utils.showNotification(err.message || 'Error al eliminar el producto', 'error');
            });
        });
      });
    },

    // Refrescar carrito completo
    refresh: function() {
      return Cart.get()
        .then(function(cart) {
          Cart.renderDrawer(cart);
          Cart.updateCount(cart.item_count);
          return cart;
        })
        .catch(function(err) {
          console.error('Error al refrescar carrito:', err);
        });
    }
  };

  // ===========================================
  // CART DRAWER
  // ===========================================
  
  var CartDrawer = {
    init: function() {
      var cartToggle = document.getElementById('cart-toggle');
      var cartDrawer = document.getElementById('cart-drawer');
      var cartOverlay = document.getElementById('cart-overlay');
      var cartClose = document.getElementById('cart-drawer-close');

      if (cartToggle) {
        cartToggle.addEventListener('click', function(e) {
          e.preventDefault();
          CartDrawer.open();
        });
      }

      if (cartClose) {
        cartClose.addEventListener('click', function(e) {
          e.preventDefault();
          CartDrawer.close();
        });
      }

      if (cartOverlay) {
        cartOverlay.addEventListener('click', function(e) {
          if (e.target === cartOverlay) {
            CartDrawer.close();
          }
        });
      }

      // Cerrar con ESC
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && cartDrawer && cartDrawer.classList.contains('is-open')) {
          CartDrawer.close();
        }
      });
    },

    open: function() {
      var cartDrawer = document.getElementById('cart-drawer');
      var cartOverlay = document.getElementById('cart-overlay');
      
      Cart.refresh().then(function() {
        if (cartDrawer) cartDrawer.classList.add('is-open');
        if (cartOverlay) cartOverlay.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
      });
    },

    close: function() {
      var cartDrawer = document.getElementById('cart-drawer');
      var cartOverlay = document.getElementById('cart-overlay');
      
      if (cartDrawer) cartDrawer.classList.remove('is-open');
      if (cartOverlay) cartOverlay.classList.remove('is-visible');
      document.body.style.overflow = '';
    }
  };

  // ===========================================
  // MOBILE MENU
  // ===========================================
  
  var MobileMenu = {
    init: function() {
      var menuToggle = document.getElementById('menu-toggle');
      var menuClose = document.getElementById('menu-close');
      var mobileMenu = document.getElementById('mobile-menu');
      var cartOverlay = document.getElementById('cart-overlay');

      if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
          e.preventDefault();
          if (mobileMenu) mobileMenu.classList.add('is-open');
          if (cartOverlay) cartOverlay.classList.add('is-visible');
          document.body.style.overflow = 'hidden';
        });
      }

      if (menuClose) {
        menuClose.addEventListener('click', function(e) {
          e.preventDefault();
          if (mobileMenu) mobileMenu.classList.remove('is-open');
          if (cartOverlay) cartOverlay.classList.remove('is-visible');
          document.body.style.overflow = '';
        });
      }

      if (cartOverlay) {
        cartOverlay.addEventListener('click', function(e) {
          if (e.target === cartOverlay && mobileMenu && mobileMenu.classList.contains('is-open')) {
            mobileMenu.classList.remove('is-open');
            cartOverlay.classList.remove('is-visible');
            document.body.style.overflow = '';
          }
        });
      }
    }
  };

  // ===========================================
  // INICIALIZACIÓN
  // ===========================================
  
  document.addEventListener('DOMContentLoaded', function() {
    CartDrawer.init();
    MobileMenu.init();
    Cart.refresh();

    // Exponer funciones globales
    window.LUMEI = {
      Cart: Cart,
      CartDrawer: CartDrawer,
      utils: utils
    };
  });

  // ===========================================
  // FUNCIÓN GLOBAL PARA AÑADIR AL CARRITO
  // ===========================================
  
  window.addToCart = function(variantId, quantity, properties) {
    quantity = quantity || 1;
    
    var submitBtn = document.querySelector('[type="submit"][name="add"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
    }

    return Cart.add(variantId, quantity, properties)
      .then(function(item) {
        utils.showNotification('Producto añadido al carrito', 'success');
        Cart.refresh();
        CartDrawer.open();
        return item;
      })
      .catch(function(err) {
        utils.showNotification(err.message || 'Error al añadir el producto', 'error');
        throw err;
      })
      .finally(function() {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
        }
      });
  };
})();
