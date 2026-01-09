import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShoppingBag, Check, ChevronLeft, Shield, Truck, RotateCcw } from 'lucide-react';
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

// Payment icons component - monochrome, muted
const PaymentIcons = () => (
  <div className="flex items-center justify-center gap-4 opacity-40">
    {/* Visa */}
    <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="currentColor">
      <path d="M17.6 11.2l-2.8 9.6h-2.4l-1.4-7.6c-.1-.4-.2-.5-.5-.7-.5-.3-1.4-.5-2.2-.7l.1-.6h3.8c.5 0 .9.3 1 .9l.9 5 2.4-5.9h2.4l.7 9.6h-2.3l-.5-7.2-2.3 7.2h-1.6l-1.3-7.6zm10.4 6.5c0-2.5-3.5-2.7-3.5-3.8 0-.3.3-.7 1-.8.3 0 1.3-.1 2.4.5l.4-2c-.6-.2-1.3-.4-2.2-.4-2.3 0-4 1.2-4 3 0 1.3 1.2 2 2.1 2.5.9.5 1.2.8 1.2 1.2 0 .7-.7 1-1.4 1-.6 0-1.3-.1-2.5-.7l-.5 2c.6.3 1.6.5 2.7.5 2.5 0 4.1-1.2 4.1-3zm6.1 3.1h2.1l-1.9-9.6h-2c-.4 0-.8.2-1 .6l-3.4 9h2.4l.5-1.3h2.9l.4 1.3zm-2.5-3.2l1.2-3.3.7 3.3h-1.9zm-8.8-6.4l-1.9 9.6h-2.3l1.9-9.6h2.3z"/>
    </svg>
    {/* Mastercard */}
    <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="currentColor">
      <circle cx="18" cy="16" r="8" fillOpacity="0.6"/>
      <circle cx="30" cy="16" r="8" fillOpacity="0.6"/>
    </svg>
    {/* PayPal */}
    <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.653h6.405c2.108 0 3.582.47 4.388 1.4.72.831.909 1.937.58 3.375l-.009.037v.325l.253.127c.21.106.376.237.504.392.234.282.383.637.448 1.052.066.428.046.937-.061 1.507-.123.654-.326 1.225-.6 1.697a3.77 3.77 0 0 1-.97 1.132c-.389.29-.842.506-1.347.64-.49.13-1.043.197-1.64.197H11.31a.932.932 0 0 0-.921.79l-.014.078-.553 3.512-.012.062a.932.932 0 0 1-.921.79H7.076z"/>
    </svg>
    {/* Apple Pay */}
    <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
    </svg>
  </div>
);

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

              {/* What's included - Below image on desktop */}
              <div className="hidden lg:block mt-10 p-6 rounded-2xl bg-card/50 border border-border/50">
                <p className="text-sm text-muted-foreground font-body mb-4 uppercase tracking-wider">Incluido en tu pedido</p>
                <ul className="space-y-3 text-sm text-foreground/70">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-muted-foreground" />
                    Lámpara LUMEI {selectedVariant.name}
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-muted-foreground" />
                    Cable USB-C de 2 metros
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-muted-foreground" />
                    Guía de cuidado del cristal
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-muted-foreground" />
                    Caja de presentación premium
                  </li>
                </ul>
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
              <div className="mb-8">
                <p className="text-3xl font-display font-light text-foreground">
                  €{selectedVariant.price}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Envío gratuito a España peninsular</p>
              </div>

              {/* Variant Selector */}
              <div className="mb-8">
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
                <p className="text-xs text-muted-foreground/60 mt-3">
                  Has elegido: <span className="text-foreground/70">{selectedVariant.name}</span> — {selectedVariant.description}
                </p>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                variant="premium"
                size="xl"
                className="w-full mb-3"
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

              {/* Secure checkout micro-copy */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60 mb-8">
                <Shield className="w-3.5 h-3.5" />
                <span>Pago seguro · Datos encriptados</span>
              </div>

              {/* Trust indicators - Refined */}
              <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-border/50">
                <div className="text-center">
                  <Truck className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-foreground/70 font-body">Envío 24-48h</p>
                  <p className="text-xs text-muted-foreground/60">Gratis en península</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-foreground/70 font-body">30 días</p>
                  <p className="text-xs text-muted-foreground/60">Devolución fácil</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-foreground/70 font-body">Garantía 2 años</p>
                  <p className="text-xs text-muted-foreground/60">Sin preocupaciones</p>
                </div>
              </div>

              {/* Payment methods */}
              <div className="mb-8">
                <p className="text-xs text-center text-muted-foreground/50 mb-3">Métodos de pago aceptados</p>
                <PaymentIcons />
              </div>

              {/* Guarantee message */}
              <div className="bg-card/30 rounded-xl p-5 mb-8 border border-border/30">
                <p className="text-sm text-foreground/70 font-body leading-relaxed text-center">
                  Si no encaja en tu espacio, puedes devolverlo. Sin preguntas.
                </p>
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
                      <li>• Peso: aproximadamente 1.2kg</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping" className="border-border">
                  <AccordionTrigger className="text-base font-body hover:no-underline">
                    Envío y entrega
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-3">
                    <p><strong className="text-foreground/80">España peninsular:</strong> Envío gratuito. Entrega en 24-48h laborables.</p>
                    <p><strong className="text-foreground/80">Baleares y Canarias:</strong> Coste calculado al finalizar. Entrega en 3-5 días.</p>
                    <p><strong className="text-foreground/80">Portugal:</strong> Desde 5€. Entrega en 2-4 días.</p>
                    <p className="text-xs text-muted-foreground/60 pt-2">Recibirás un email de confirmación con el número de seguimiento.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns" className="border-border">
                  <AccordionTrigger className="text-base font-body hover:no-underline">
                    Devoluciones y garantía
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-3">
                    <p><strong className="text-foreground/80">30 días para devolver:</strong> Si no es lo que esperabas, contacta con nosotros. Te gestionamos la recogida sin coste adicional.</p>
                    <p><strong className="text-foreground/80">Garantía de 2 años:</strong> Cubre defectos de fabricación. El cristal natural puede tener variaciones únicas que no se consideran defectos.</p>
                    <p className="text-xs text-muted-foreground/60 pt-2">Escríbenos a hola@lumei.es para cualquier consulta.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="care" className="border-border">
                  <AccordionTrigger className="text-base font-body hover:no-underline">
                    Cuidado del producto
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>Limpia suavemente con un paño seco. Evita productos químicos. El cristal de amatista es natural y cada pieza es única en forma y tonalidad.</p>
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
