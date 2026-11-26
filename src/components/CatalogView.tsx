import React, {useMemo, useState} from 'react';
import {Check, ExternalLink, FileCheck2, Search, X} from 'lucide-react';
import {
  CATEGORIES,
  CATEGORY_MAP,
  COMBOS,
  IMPORTANT_NOTES,
  PRODUCTS,
  SOFTOPIA_PARTNER,
  type CategoryId,
  type Product,
} from '../data/catalog';
import {
  buildCatalogWhatsAppUrl,
  buildComboWhatsAppUrl,
  formatPrice,
  type InquiryItem,
} from '../utils/whatsapp';
import {CategoryIcon, WhatsAppIcon} from './BrandMark';
import {ProductCard} from './ProductCard';
import {ResilientImage} from './ResilientImage';

type CatalogSortMode = 'featured' | 'offers' | 'priceAsc' | 'priceDesc';

interface CatalogViewProps {
  selectedCategory: CategoryId | 'all';
  searchQuery: string;
  onSelectCategory: (cat: CategoryId | 'all') => void;
  onSearchChange: (q: string) => void;
  onSelectProduct: (product: Product) => void;
  inquiryKeys: Set<string>;
  onToggleInquiry: (item: InquiryItem) => void;
}

const SORT_OPTIONS: {id: CatalogSortMode; label: string}[] = [
  {id: 'featured', label: 'Destacados'},
  {id: 'offers', label: 'Con oferta'},
  {id: 'priceAsc', label: 'Menor precio'},
  {id: 'priceDesc', label: 'Mayor precio'},
];

export const CatalogView: React.FC<CatalogViewProps> = ({
  selectedCategory,
  searchQuery,
  onSelectCategory,
  onSearchChange,
  onSelectProduct,
  inquiryKeys,
  onToggleInquiry,
}) => {
  const [sortMode, setSortMode] = useState<CatalogSortMode>('featured');

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && selectedCategory !== 'combos') {
        if (product.categoryId !== selectedCategory) return false;
      }
      if (sortMode === 'offers') {
        const hasDiscount =
          Boolean(product.price !== null && product.previousPrice && product.previousPrice > product.price) ||
          Boolean(product.promoLabel) ||
          product.plans.some((pl) => pl.price !== null && pl.previousPrice && pl.previousPrice > pl.price);
        if (!hasDiscount) return false;
      }
      if (!q) return true;
      const cat = CATEGORY_MAP[product.categoryId];
      return (
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        cat.name.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q)
      );
    });

    if (sortMode === 'priceAsc') {
      return [...list].sort(
        (a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY)
      );
    }
    if (sortMode === 'priceDesc') {
      return [...list].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    }
    return list;
  }, [selectedCategory, searchQuery, sortMode]);

  const filteredCombos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return COMBOS;
    return COMBOS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.services.some((s) => s.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const activeCategoryInfo =
    selectedCategory !== 'all' ? CATEGORY_MAP[selectedCategory] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 space-y-7">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-[#3B82F6]">Catálogo digital</p>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F8FAFC]">
            {activeCategoryInfo ? activeCategoryInfo.name : 'Todos los servicios'}
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-[#94A3B8] max-w-2xl">
            {activeCategoryInfo
              ? activeCategoryInfo.description
              : 'Explora nuestras categorías, compara planes, suma varios servicios o consulta directamente por WhatsApp.'}
          </p>
        </div>

        <a
          href={buildCatalogWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl border border-[#10B981]/45 bg-[#10B981]/10 px-4 py-2.5 text-sm font-semibold text-[#10B981] hover:bg-[#10B981] hover:text-[#04140E] transition-colors whitespace-nowrap self-start md:self-auto"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>Consultar catálogo</span>
        </a>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-3.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="¿Qué servicio digital estás buscando?"
            aria-label="Filtrar productos del catálogo"
            className="w-full min-h-[50px] rounded-2xl bg-[#131C31] border border-white/10 pl-12 pr-12 py-3 text-sm sm:text-base text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#2563EB]/30 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Limpiar filtro de búsqueda"
              className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[40px] min-w-[40px] flex items-center justify-center text-[#94A3B8] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filtrar por categoría"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'all'}
            onClick={() => onSelectCategory('all')}
            className={`inline-flex items-center gap-2 min-h-[44px] rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer border ${
              selectedCategory === 'all'
                ? 'bg-[#2563EB] border-[#3B82F6] text-white'
                : 'bg-[#131C31] border-white/[0.08] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20'
            }`}
          >
            Todos ({PRODUCTS.length})
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectCategory(cat.id)}
                className={`inline-flex items-center gap-2 min-h-[44px] rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#2563EB] border-[#3B82F6] text-white'
                    : 'bg-[#131C31] border-white/[0.08] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20'
                }`}
              >
                <CategoryIcon categoryId={cat.id} className="w-4 h-4 shrink-0" />
                <span>{cat.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Sort & Offer Controls */}
        {selectedCategory !== 'combos' && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-xs text-[#94A3B8] tabular-nums">
              Mostrando {filteredProducts.length}{' '}
              {filteredProducts.length === 1 ? 'servicio' : 'servicios'}
            </p>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {SORT_OPTIONS.map((opt) => {
                const active = sortMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSortMode(opt.id)}
                    className={`min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                      active
                        ? 'bg-[#172546] border-[#3B82F6]/60 text-[#F8FAFC]'
                        : 'bg-transparent border-white/[0.08] text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Results Grid */}
      {selectedCategory === 'combos' ? (
        filteredCombos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCombos.map((combo) => (
              <article
                key={combo.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl bg-[#131C31] border border-white/[0.08]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <ResilientImage
                    src={combo.imageUrl}
                    alt={combo.name}
                    className="w-full h-full object-cover"
                    fallbackTitle={combo.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131C31] via-[#131C31]/30 to-transparent" />
                </div>
                <div className="p-5 sm:p-6 -mt-6 relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-[#3B82F6] font-semibold">
                      {combo.tagline} · {combo.duration}
                    </p>
                    <h2 className="mt-1 font-display text-xl font-bold text-[#F8FAFC]">
                      {combo.name}
                    </h2>
                    <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
                      {combo.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {combo.services.map((service, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-[#CBD5E1]">
                          <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-display text-2xl font-extrabold text-[#F8FAFC] tabular-nums">
                        {formatPrice(combo.promoPrice)}
                      </span>
                      <span className="text-sm text-[#94A3B8] line-through tabular-nums">
                        {formatPrice(combo.previousPrice)}
                      </span>
                    </div>
                    <a
                      href={buildComboWhatsAppUrl(combo.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-[#10B981] px-5 py-2.5 text-sm font-bold text-[#04140E] hover:bg-[#34D399] transition-colors whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Solicitar por WhatsApp</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyCatalogState
            searchQuery={searchQuery}
            onReset={() => {
              onSearchChange('');
              onSelectCategory('all');
              setSortMode('featured');
            }}
          />
        )
      ) : filteredProducts.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((product) => {
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

          {selectedCategory === 'software' && (
            <div className="rounded-2xl bg-[#131C31] border border-[#3B82F6]/30 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5 max-w-2xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/20 text-[#3B82F6] shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#3B82F6]">
                    {SOFTOPIA_PARTNER.categoryLabel}
                  </p>
                  <h3 className="mt-0.5 font-display text-base sm:text-lg font-bold text-[#F8FAFC]">
                    {SOFTOPIA_PARTNER.headline}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {SOFTOPIA_PARTNER.description}
                  </p>
                </div>
              </div>
              <a
                href={SOFTOPIA_PARTNER.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3B82F6] transition-colors whitespace-nowrap shrink-0"
              >
                <span>{SOFTOPIA_PARTNER.ctaLabel}</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>
          )}
        </div>
      ) : (
        <EmptyCatalogState
          searchQuery={searchQuery}
          onReset={() => {
            onSearchChange('');
            onSelectCategory('all');
            setSortMode('featured');
          }}
        />
      )}
      {/* Important Commercial Notes */}
      <div className="rounded-2xl bg-[#0D1426] border border-white/[0.07] p-5">
        <p className="font-display text-sm font-bold text-[#F8FAFC]">Información importante</p>
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#94A3B8]">
          {IMPORTANT_NOTES.map((note, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const EmptyCatalogState: React.FC<{searchQuery: string; onReset: () => void}> = ({
  searchQuery,
  onReset,
}) => (
  <div className="rounded-3xl bg-[#131C31] border border-white/[0.08] p-8 sm:p-12 text-center max-w-xl mx-auto">
    <h2 className="font-display text-xl font-bold text-[#F8FAFC]">
      No encontramos resultados
    </h2>
    <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
      {searchQuery
        ? `No hay coincidencias exactas para "${searchQuery}". Puedes limpiar el filtro o consultarnos directamente por WhatsApp.`
        : 'No hay servicios en esta selección en este momento.'}
    </p>
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
      <button
        type="button"
        onClick={onReset}
        className="min-h-[44px] w-full sm:w-auto rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC] hover:bg-white/[0.08] transition-colors cursor-pointer"
      >
        Ver todos los servicios
      </button>
      <a
        href={buildCatalogWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto rounded-xl bg-[#10B981] px-5 py-2.5 text-sm font-bold text-[#04140E] hover:bg-[#34D399] transition-colors"
      >
        <WhatsAppIcon className="w-4 h-4" />
        <span>Consultar por WhatsApp</span>
      </a>
    </div>
  </div>
);
