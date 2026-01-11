/* ===========================================
   LUMEI - Sistema de Variantes de Producto
   Actualización dinámica de precio e imágenes
   =========================================== */

(function() {
  'use strict';

  var ProductVariants = {
    product: null,
    currentVariant: null,

    init: function(productData) {
      this.product = productData;
      
      if (!this.product || !this.product.variants) return;

      // Obtener variante inicial
      var form = document.querySelector('form[action*="/cart/add"]');
      if (form) {
        var variantIdInput = form.querySelector('input[name="id"]');
        if (variantIdInput) {
          var currentId = parseInt(variantIdInput.value);
          this.currentVariant = this.product.variants.find(function(v) {
            return v.id === currentId;
          }) || this.product.variants[0];
          this.updateVariantDisplay();
        }
      }

      // Escuchar cambios en las opciones
      var optionInputs = document.querySelectorAll('.product-page__option-item input[type="radio"]');
      var self = this;
      
      optionInputs.forEach(function(input) {
        input.addEventListener('change', function() {
          self.handleOptionChange();
        });
      });
    },

    handleOptionChange: function() {
      var form = document.querySelector('form[action*="/cart/add"]');
      if (!form) return;

      var selectedOptions = [];
      var optionInputs = form.querySelectorAll('.product-page__option-item input[type="radio"]:checked');
      
      optionInputs.forEach(function(input) {
        selectedOptions.push(input.value);
      });

      // Encontrar la variante que coincide
      var matchedVariant = this.product.variants.find(function(variant) {
        return variant.options.length === selectedOptions.length &&
          variant.options.every(function(option, index) {
            return option === selectedOptions[index];
          });
      });

      if (matchedVariant) {
        this.selectVariant(matchedVariant);
      }
    },

    selectVariant: function(variant) {
      this.currentVariant = variant;
      this.updateVariantDisplay();
      this.updateForm(variant);
    },

    updateVariantDisplay: function() {
      if (!this.currentVariant) return;

      // Actualizar precio
      this.updatePrice(this.currentVariant);

      // Actualizar disponibilidad
      this.updateAvailability(this.currentVariant);

      // Actualizar imagen si existe
      this.updateImage(this.currentVariant);

      // Actualizar URL del formulario
      this.updateForm(this.currentVariant);
    },

    updatePrice: function(variant) {
      var priceEl = document.querySelector('.product-page__price-current');
      var comparePriceEl = document.querySelector('.product-page__price-compare');
      var priceContainer = document.querySelector('.product-page__price');
      
      if (!priceEl) return;

      var price = this.formatMoney(variant.price);
      var comparePrice = variant.compare_at_price && variant.compare_at_price > variant.price ? 
        this.formatMoney(variant.compare_at_price) : null;

      priceEl.textContent = price;

      if (comparePrice) {
        if (!comparePriceEl) {
          comparePriceEl = document.createElement('span');
          comparePriceEl.className = 'product-page__price-compare';
          if (priceContainer) {
            priceContainer.insertBefore(comparePriceEl, priceEl);
          }
        }
        comparePriceEl.textContent = comparePrice;
        comparePriceEl.style.display = 'inline';
      } else {
        if (comparePriceEl) {
          comparePriceEl.style.display = 'none';
        }
      }

      // Actualizar precio en el botón de añadir
      var submitBtn = document.querySelector('.product-page__submit');
      if (submitBtn) {
        var btnText = submitBtn.textContent.replace(/—\s*[0-9,.\s€]+/, '');
        submitBtn.textContent = btnText.trim() + ' — ' + price;
      }
    },

    updateAvailability: function(variant) {
      var badges = document.querySelector('.product-page__badges');
      if (!badges) return;

      var stockBadge = badges.querySelector('.badge--success');
      
      if (!variant.available) {
        if (stockBadge) {
          stockBadge.textContent = 'Agotado';
          stockBadge.classList.remove('badge--success');
          stockBadge.classList.add('badge--error');
        }
      } else {
        if (stockBadge) {
          stockBadge.textContent = 'En stock';
          stockBadge.classList.remove('badge--error');
          stockBadge.classList.add('badge--success');
        }
      }
    },

    updateImage: function(variant) {
      if (!variant.featured_image) return;

      var mainImage = document.getElementById('main-product-image');
      if (!mainImage) return;

      var newSrc = variant.featured_image.src || variant.featured_image;
      if (typeof newSrc === 'string' && newSrc.includes('?')) {
        newSrc = newSrc.split('?')[0];
      }
      
      // Fade out
      mainImage.style.opacity = '0';
      
      setTimeout(function() {
        mainImage.src = newSrc;
        mainImage.alt = variant.title || mainImage.alt;
        
        // Fade in
        setTimeout(function() {
          mainImage.style.opacity = '1';
        }, 50);
      }, 200);

      // Actualizar thumbnail activo
      var thumbnails = document.querySelectorAll('.product-page__thumb');
      thumbnails.forEach(function(thumb) {
        thumb.classList.remove('active');
        var thumbImg = thumb.querySelector('img');
        if (thumbImg && thumbImg.src.includes(newSrc.split('/').pop())) {
          thumb.classList.add('active');
        }
      });
    },

    updateForm: function(variant) {
      var form = document.querySelector('form[action*="/cart/add"]');
      if (!form) return;

      var variantIdInput = form.querySelector('input[name="id"]');
      if (variantIdInput) {
        variantIdInput.value = variant.id;
      }

      // Deshabilitar botón si no está disponible
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = !variant.available;
        if (!variant.available) {
          submitBtn.classList.add('is-disabled');
        } else {
          submitBtn.classList.remove('is-disabled');
        }
      }
    },

    formatMoney: function(cents) {
      var amount = (cents / 100).toFixed(2);
      return amount.replace('.', ',') + ' €';
    }
  };

  // Inicializar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos del producto desde el JSON
    var productData = null;
    
    // Buscar script tag con datos del producto
    var productScript = document.getElementById('product-json');
    if (productScript) {
      try {
        productData = JSON.parse(productScript.textContent);
      } catch (e) {
        console.error('Error parsing product data:', e);
      }
    }

    if (productData) {
      ProductVariants.init(productData);
    }
  });

  // Exponer globalmente
  window.ProductVariants = ProductVariants;
})();
