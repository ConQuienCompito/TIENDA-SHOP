import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShoppingBag, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const PRODUCT_IMAGE = "https://customer-assets.emergentagent.com/job_6124748f-9cf1-498a-bc35-1136535c2dc5/artifacts/35uqwoz6_image.png";

const variants = {
  calma: {
    id: 'calma',
    name: 'CALMA',
    description: 'Para quienes buscan silencio en la luz.',
    longDescription: 'Una luz púrpura suave que invita a la introspección. No ilumina tu espacio, define tu momento.',
    color: 'lamp-purple',
    colorHsl: '270 60% 60%',
    price: '149',
  },
  enfoque: {
    id: 'enfoque',
    name: 'ENFOQUE',
    description: 'Para quienes piensan mejor en azul.',
    longDescription: 'Una luz fría y clara que acompaña la concentración. No es una lámpara de trabajo, es un estado mental.',
    color: 'lamp-blue',
    colorHsl: '200 80% 55%',
    price: '149',
  },
  profundo: {
    id: 'profundo',
    name: 'PROFUNDO',
    description: 'Para quienes prefieren la calidez.',
    longDescription: 'Una luz ámbar que abraza el espacio. No es decoración, es presencia.',
    color: 'lamp-warm',
    colorHsl: '35 90% 60%',
    price: '149',
  },
};

export default function ProductPage() {
  const { variant = 'calma' } = useParams();
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState(variants[variant] || variants.calma);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (variants[variant]) {
      setSelectedVariant(variants[variant]);
    }
  }, [variant]);

  const handleVariantChange = (variantId) => {
    setSelectedVariant(variants[variantId]);
    navigate(`/producto/${variantId}`, { replace: true });
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      toast.success(`LUMEI ${selectedVariant.name} añadido al carrito`, {
        description: 'Tu elección dice más de lo que crees.',
      });
    }, 800);
  };

  const getGlowStyle = () => {
    return {
      boxShadow: `0 0 100px 20px hsl(${selectedVariant.colorHsl} / 0.25)`,
    };
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <button 
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-body flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver
            </button>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Product Image */}
            <div className="relative">
              <div 
                className="relative aspect-square rounded-3xl overflow-hidden bg-card flex items-center justify-center transition-all duration-700"
                style={getGlowStyle()}
              >
                <img
                  src={PRODUCT_IMAGE}
                  alt={`LUMEI ${selectedVariant.name}`}
                  className="w-full h-full object-contain p-8 transition-opacity duration-500"
                />
                
                {/* Subtle glow overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at center, hsl(${selectedVariant.colorHsl} / 0.2), transparent 70%)`,
                  }}
                />
              </div>

              {/* Image navigation dots */}
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentImageIndex === idx 
                        ? 'bg-foreground w-6' 
                        : 'bg-foreground/30 hover:bg-foreground/50'
                    }`}
                    aria-label={`Ver imagen ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-24">
              {/* Variant Name as Hero */}
              <div className="mb-8">
                <p className="text-sm tracking-ultra uppercase text-muted-foreground mb-3 font-body">
                  LUMEI
                </p>
                <h1 
                  className="text-5xl sm:text-6xl font-display font-light mb-4 transition-colors duration-500"
                  style={{ color: `hsl(${selectedVariant.colorHsl})` }}
                >
                  {selectedVariant.name}
                </h1>
                <p className="text-xl text-foreground/80 font-body font-light leading-relaxed">
                  {selectedVariant.longDescription}
                </p>
              </div>

              {/* Price */}
              <div className="mb-10">
                <p className="text-3xl font-display font-light text-foreground">
                  €{selectedVariant.price}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Envío gratuito</p>
              </div>

              {/* Variant Selector */}
              <div className="mb-10">
                <p className="text-sm text-muted-foreground mb-4 font-body uppercase tracking-wider">
                  Elige tu luz
                </p>
                <div className="flex gap-3">
                  {Object.values(variants).map((v) => (
                    <button
                      key={v.id}
                      onClick={() => handleVariantChange(v.id)}
                      className={`relative w-14 h-14 rounded-full transition-all duration-300 ${
                        selectedVariant.id === v.id 
                          ? 'ring-2 ring-foreground ring-offset-4 ring-offset-background scale-110' 
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: `hsl(${v.colorHsl})` }}
                      aria-label={`Seleccionar ${v.name}`}
                    >
                      {selectedVariant.id === v.id && (
                        <Check className="w-5 h-5 absolute inset-0 m-auto text-background" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                variant="premium"
                size="xl"
                className="w-full mb-6"
              >
                {isAdding ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Añadiendo...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5" />
                    Añadir al carrito
                  </span>
                )}
              </Button>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-10">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Envío 24-48h
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Garantía 2 años
                </span>
              </div>

              {/* Details Accordion */}
              <Accordion type="single" collapsible className="border-t border-border">
                <AccordionItem value="specs" className="border-border">
                  <AccordionTrigger className="text-base font-body hover:no-underline">
                    Especificaciones
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <ul className="space-y-2">
                      <li>• Dimensiones: 28cm x 12cm x 12cm</li>
                      <li>• Material: Cristal de amatista natural</li>
                      <li>• LED de bajo consumo incluido</li>
                      <li>• Cable USB-C de 2m</li>
                      <li>• 3 modos de luz ajustables</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping" className="border-border">
                  <AccordionTrigger className="text-base font-body hover:no-underline">
                    Envío y devoluciones
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="mb-2">Envío gratuito a toda España peninsular en 24-48h laborables.</p>
                    <p>Devoluciones aceptadas en los primeros 30 días. Contacta con nosotros para iniciar el proceso.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="care" className="border-border">
                  <AccordionTrigger className="text-base font-body hover:no-underline">
                    Cuidado del producto
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>Limpia suavemente con un paño seco. Evita productos químicos. El cristal de amatista es natural y cada pieza es única.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
