import React, {useMemo, useState} from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Headphones,
  Layers,
  MessageSquare,
  Search,
  X,
} from 'lucide-react';
import {
  BRAND_BENEFITS,
  CATEGORIES,
  CATEGORY_MAP,
  COMBOS,
  MEDIA_ASSETS,
  PRODUCTS,
  PROMOTIONS,
  PURCHASE_STEPS,
  type CategoryId,
  type Product,
} from '../data/catalog';
import {
  buildComboWhatsAppUrl,
  buildGeneralWhatsAppUrl,
  buildPromoWhatsAppUrl,
  formatPrice,
  WHATSAPP_DISPLAY_NUMBER,
  type InquiryItem,
} from '../utils/whatsapp';
import {CategoryIcon, SamiLogoMark, WhatsAppIcon} from './BrandMark';
import type {AppView} from './NavbarAndBottomNav';
import {ProductCard} from './ProductCard';
import {PWAInstallButton} from './PWAInstallBanner';
import {ResilientImage} from './ResilientImage';

interface HomeViewProps {
  onNavigate: (view: AppView) => void;
  onSelectCategory: (categoryId: CategoryId) => void;
  onSelectProduct: (product: Product) => void;
  onSearchSubmit: (query: string) => void;
  inquiryKeys: Set<string>;
  onToggleInquiry: (item: InquiryItem) => void;
}

const BENEFIT_ICONS: Record<string, React.ReactNode> = {
  variedad: <Layers className="w-5 h-5 text-[#3B82F6]" />,
  atencion: <MessageSquare className="w-5 h-5 text-[#10B981]" />,
  informacion: <CheckCircle2 className="w-5 h-5 text-[#3B82F6]" />,
  acompanamiento: <Headphones className="w-5 h-5 text-[#10B981]" />,
};

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectCategory,
  onSelectProduct,
  onSearchSubmit,
  inquiryKeys,
  onToggleInquiry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showcaseTab, setShowcaseTab] = useState<'featured' | 'mostChosen'>('featured');

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((product) => {
      const cat = CATEGORY_MAP[product.categoryId];
      return (
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        cat.name.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q)
      );
    }).slice(0, 6);
  }, [searchQuery]);

  const showcaseProducts = useMemo(() => {
    if (showcaseTab === 'featured') {
      return PRODUCTS.filter((p) => p.featured).slice(0, 6);
    }
    return PRODUCTS.filter((p) => p.mostChosen).slice(0, 6);
  }, [showcaseTab]);

  const handleCategoryClick = (categoryId: CategoryId) => {
    if (categoryId === 'combos') {
      onNavigate('promotions');
      return;
    }
    onSelectCategory(categoryId);
  };

  return (
    <div className="space-y-12 md:space-y-20">
      {/* 1. COMPACT MOBILE-FIRST HERO BANNER + INSTANT SEARCH */}
      <section className="relative pt-4 md:pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#131C31] via-[#0D1528] to-[#080E1D] border border-white/[0.08] shadow-2xl">
            <div
              className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#2563EB]/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-5 lg:gap-8 p-4 sm:p-8 lg:p-10">
              {/* Left Copy Column */}
              <div className="lg:col-span-6 relative z-10 flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <SamiLogoMark className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" alt="" />
                  <p className="text-xs sm:text-sm font-semibold text-[#3B82F6] tracking-wide">
                    Tu mundo digital, en un solo lugar.
                  </p>
                </div>

                <h1 className="mt-2.5 font-display text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#F8FAFC] leading-[1.12] [text-wrap:balance]">
                  Todo tu mundo digital empieza aquí.
                </h1>

                <p className="mt-2.5 sm:mt-4 max-w-xl text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                  Entretenimiento, productividad, diseño e inteligencia artificial. Encuentra el
                  servicio que necesitas y solicítalo fácilmente por WhatsApp.
                </p>

                <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('catalog')}
                    className="inline-flex items-center justify-center gap-2 min-h-[46px] sm:min-h-[48px] rounded-xl bg-[#2563EB] px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-bold text-white hover:bg-[#3B82F6] active:scale-[0.98] transition-all shadow-lg shadow-[#2563EB]/25 whitespace-nowrap cursor-pointer"
                  >
                    <span>EXPLORAR CATÁLOGO</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Shown on tablet/desktop; on mobile WhatsApp is permanently anchored in bottom nav */}
                  <a
                    href={buildGeneralWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl border border-[#10B981]/50 bg-[#10B981]/10 px-6 py-3 text-sm font-bold text-[#10B981] hover:bg-[#10B981] hover:text-[#04140E] active:scale-[0.98] transition-all whitespace-nowrap"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>CONSULTAR POR WHATSAPP</span>
                  </a>

                  <PWAInstallButton variant="inline" />
                </div>
              </div>

              {/* Right Official Sami Streaming Brand Banner */}
              <div className="lg:col-span-6 relative z-10">
                <div className="w-full aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#060A14] shadow-2xl">
                  <ResilientImage
                    src={MEDIA_ASSETS.samiBanner}
                    alt="Sami Streaming — Tu plataforma de entretenimiento digital"
                    className="w-full h-full object-cover"
                    fallbackTitle="Sami Streaming"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. INSTANT SEARCH BAR DIRECTLY BELOW HERO */}
          <div className="mt-4 sm:mt-6 relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  onSearchSubmit(searchQuery.trim());
                }
              }}
              className="relative"
            >
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué servicio digital estás buscando?"
                aria-label="Buscar servicio digital por nombre, categoría o marca"
                className="w-full min-h-[52px] rounded-2xl bg-[#131C31] border border-white/10 pl-12 pr-24 py-3 text-sm sm:text-base text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#2563EB]/30 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-14 top-1/2 -translate-y-1/2 min-h-[40px] min-w-[40px] flex items-center justify-center text-[#94A3B8] hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[38px] rounded-xl bg-[#2563EB] px-4 text-xs sm:text-sm font-semibold text-white hover:bg-[#3B82F6] transition-colors cursor-pointer"
              >
                Buscar
              </button>
            </form>

            {/* Live Instant Search Preview */}
            {searchQuery.trim().length > 0 && (
              <div className="mt-3 rounded-2xl bg-[#131C31] border border-white/10 p-4 shadow-2xl">
                {searchResults.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                      <span>Resultados para &ldquo;{searchQuery}&rdquo;</span>
                      <button
                        type="button"
                        onClick={() => onSearchSubmit(searchQuery.trim())}
                        className="font-medium text-[#3B82F6] hover:underline cursor-pointer"
                      >
                        Ver en catálogo completo
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="flex items-center justify-between gap-3 rounded-xl bg-[#0B1222] border border-white/[0.06] px-3.5 py-3 text-left hover:border-[#3B82F6]/50 transition-colors cursor-pointer"
                        >
                          <div className="min-w-0">
                            <p className="font-display text-sm font-bold text-[#F8FAFC] truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-[#94A3B8] truncate">
                              {CATEGORY_MAP[product.categoryId].shortName} · {product.duration}
                            </p>
                          </div>
                          <span className="font-display text-sm font-bold text-[#10B981] tabular-nums shrink-0">
                            {formatPrice(product.price)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1">
                    <p className="text-sm text-[#94A3B8]">
                      No encontramos &ldquo;{searchQuery}&rdquo; en el catálogo visible. Consúltanos directamente por WhatsApp.
                    </p>
                    <a
                      href={buildGeneralWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 min-h-[42px] rounded-xl bg-[#10B981] px-4 py-2 text-xs font-bold text-[#04140E] whitespace-nowrap shrink-0"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      Consultar por WhatsApp
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES VISUAL GRID */}
      <section aria-labelledby="categories-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2
              id="categories-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]"
            >
              Explora por categoría
            </h2>
            <p className="mt-1 text-sm text-[#94A3B8]">
              Encuentra tus servicios favoritos organizados por necesidad.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('catalog')}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap cursor-pointer"
          >
            <span>Ver catálogo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.map((category) => {
            const count =
              category.id === 'combos'
                ? COMBOS.length
                : PRODUCTS.filter((p) => p.categoryId === category.id).length;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryClick(category.id)}
                className="group flex flex-col justify-between rounded-2xl bg-[#131C31] border border-white/[0.07] p-4 sm:p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6]/45 hover:bg-[#17223B] cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl text-white shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${category.accentFrom}, ${category.accentTo})`,
                    }}
                  >
                    <CategoryIcon categoryId={category.id} className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-[#94A3B8] tabular-nums">
                    {count} {count === 1 ? 'opción' : 'opciones'}
                  </span>
                </div>

                <div className="mt-3.5">
                  <h3 className="font-display text-sm sm:text-base font-bold text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED & MOST CHOSEN PRODUCTS */}
      <section aria-labelledby="featured-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2
              id="featured-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]"
            >
              {showcaseTab === 'featured' ? 'Productos destacados' : 'Los más elegidos'}
            </h2>
            <p className="mt-1 text-sm text-[#94A3B8]">
              Consulta directo por WhatsApp o usa &ldquo;Sumar&rdquo; para cotizar varios servicios en un solo mensaje.
            </p>
          </div>

          <div className="inline-flex items-center p-1 rounded-xl bg-[#131C31] border border-white/[0.08] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setShowcaseTab('featured')}
              className={`min-h-[40px] px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                showcaseTab === 'featured'
                  ? 'bg-[#2563EB] text-white'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Destacados
            </button>
            <button
              type="button"
              onClick={() => setShowcaseTab('mostChosen')}
              className={`min-h-[40px] px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                showcaseTab === 'mostChosen'
                  ? 'bg-[#2563EB] text-white'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Los más elegidos
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {showcaseProducts.map((product) => {
            const defaultPlan = product.plans[0];
            const key = `${product.id}::${defaultPlan ? defaultPlan.id : 'base'}`;
            return (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                isInInquiry={inquiryKeys.has(key)}
                onToggleInquiry={onToggleInquiry}
              />
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center justify-center gap-2 min-h-[46px] rounded-xl border border-white/15 bg-[#131C31] px-6 py-3 text-sm font-semibold text-[#F8FAFC] hover:border-[#3B82F6] hover:bg-[#192542] transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#3B82F6]" />
            <span>Ver los {PRODUCTS.length} servicios del catálogo</span>
          </button>
        </div>
      </section>

      {/* 5. HOW TO BUY IN 3 SIMPLE STEPS */}
      <section aria-labelledby="how-to-buy-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0D1426] border border-white/[0.08] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#10B981]">Compra simple y directa</p>
              <h2
                id="how-to-buy-heading"
                className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]"
              >
                ¿Cómo solicitar tu servicio en 3 pasos?
              </h2>
              <p className="mt-1.5 text-sm text-[#94A3B8]">
                Sin crear cuentas ni llenar formularios largos. Coordinas todo de forma segura por WhatsApp.
              </p>
            </div>
            <p className="text-xs sm:text-sm text-[#CBD5E1]">
              Pagos coordinados por WhatsApp · Billeteras digitales y transferencias
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {PURCHASE_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl bg-[#131C31] border border-white/[0.07] p-5"
              >
                <span className="font-display text-sm font-extrabold text-[#3B82F6] tabular-nums">
                  Paso {item.step}
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-[#F8FAFC]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-[#94A3B8] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROMOTIONS & COMBOS PREVIEW */}
      <section aria-labelledby="promos-preview-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2
              id="promos-preview-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]"
            >
              Promociones y combos disponibles
            </h2>
            <p className="mt-1 text-sm text-[#94A3B8]">
              Combina entretenimiento, productividad y diseño con tarifas especiales.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('promotions')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            <span>Ver todas las promociones</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <article className="lg:col-span-6 flex flex-col justify-between overflow-hidden rounded-2xl bg-[#131C31] border border-white/[0.08]">
            <div className="relative aspect-[16/9] overflow-hidden">
              <ResilientImage
                src={PROMOTIONS[0].imageUrl}
                alt={PROMOTIONS[0].name}
                className="w-full h-full object-cover"
                fallbackTitle={PROMOTIONS[0].name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131C31] via-[#131C31]/35 to-transparent" />
            </div>
            <div className="p-5 sm:p-6 -mt-8 relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-[#10B981]">
                  Promoción especial · {PROMOTIONS[0].validity}
                </p>
                <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                  {PROMOTIONS[0].name}
                </h3>
                <p className="mt-2 text-sm text-[#CBD5E1] leading-relaxed">
                  {PROMOTIONS[0].description}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-2xl font-extrabold text-[#F8FAFC] tabular-nums">
                    {formatPrice(PROMOTIONS[0].promoPrice)}
                  </span>
                  {PROMOTIONS[0].previousPrice && (
                    <span className="text-sm text-[#94A3B8] line-through tabular-nums">
                      {formatPrice(PROMOTIONS[0].previousPrice)}
                    </span>
                  )}
                </div>
                <a
                  href={buildPromoWhatsAppUrl(PROMOTIONS[0].name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-[#10B981] px-5 py-2.5 text-sm font-bold text-[#04140E] hover:bg-[#34D399] transition-colors whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Consultar promoción</span>
                </a>
              </div>
            </div>
          </article>

          <div className="lg:col-span-6 grid grid-cols-1 gap-5">
            {COMBOS.slice(0, 2).map((combo) => (
              <article
                key={combo.id}
                className="flex flex-col justify-between rounded-2xl bg-[#131C31] border border-white/[0.08] p-5 sm:p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-[#94A3B8]">
                    <span className="font-semibold text-[#3B82F6]">{combo.tagline}</span>
                    <span>{combo.duration}</span>
                  </div>
                  <h3 className="mt-1.5 font-display text-lg sm:text-xl font-bold text-[#F8FAFC]">
                    {combo.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#94A3B8] leading-relaxed">
                    {combo.services.join(' · ')}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-xl font-extrabold text-[#F8FAFC] tabular-nums">
                      {formatPrice(combo.promoPrice)}
                    </span>
                    <span className="text-xs text-[#94A3B8] line-through tabular-nums">
                      {formatPrice(combo.previousPrice)}
                    </span>
                  </div>
                  <a
                    href={buildComboWhatsAppUrl(combo.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl border border-[#10B981]/50 bg-[#10B981]/10 px-4 py-2 text-sm font-semibold text-[#10B981] hover:bg-[#10B981] hover:text-[#04140E] transition-colors whitespace-nowrap"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Solicitar combo</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE SAMI STREAMING */}
      <section aria-labelledby="benefits-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="benefits-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]"
          >
            ¿Por qué elegir Sami Streaming?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#94A3B8]">
            Un catálogo claro, sin trámites largos y con comunicación directa desde el primer mensaje.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRAND_BENEFITS.map((benefit) => (
            <div
              key={benefit.id}
              className="rounded-2xl bg-[#131C31] border border-white/[0.07] p-5 sm:p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08]">
                {BENEFIT_ICONS[benefit.id]}
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-[#F8FAFC]">
                {benefit.title}
              </h3>
              <p className="mt-1.5 text-sm text-[#94A3B8] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SAMI VIP & DIRECT WHATSAPP ATTENTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#131C31] to-[#0B1222] border border-[#2563EB]/30 p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-2.5">
                <SamiLogoMark className="w-6 h-6 shrink-0" alt="" />
                <span className="text-xs font-semibold text-[#3B82F6]">Programa de revendedores</span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold text-[#F8FAFC]">
                Sami VIP
              </h2>
              <p className="mt-2 text-sm text-[#CBD5E1] leading-relaxed">
                Lleva tu negocio digital al siguiente nivel con precios especiales, opciones mayoristas y atención preferencial.
              </p>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => onNavigate('vip')}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] w-full sm:w-auto rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white hover:bg-[#3B82F6] transition-colors cursor-pointer"
              >
                <span>Conocer Sami VIP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#0F2422] via-[#101C2F] to-[#131C31] border border-[#10B981]/30 p-6 sm:p-8">
            <div>
              <p className="text-xs font-semibold text-[#10B981]">
                Atención directa · {WHATSAPP_DISPLAY_NUMBER}
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] [text-wrap:balance]">
                ¿Listo para solicitar tu servicio digital?
              </h2>
              <p className="mt-2.5 max-w-xl text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                Escríbenos directamente por WhatsApp para consultar disponibilidad, resolver tus dudas y coordinar tu activación de forma rápida y personalizada.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] rounded-xl bg-[#10B981] px-6 py-3 text-sm font-bold text-[#04140E] hover:bg-[#34D399] active:scale-[0.98] transition-all whitespace-nowrap"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Escribir por WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => onNavigate('faq')}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-[#F8FAFC] hover:bg-white/[0.08] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Ver preguntas frecuentes</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
