import React from 'react';
import {ArrowUpRight, Check, Plus} from 'lucide-react';
import {CATEGORY_MAP, type Product} from '../data/catalog';
import {
  buildProductWhatsAppUrl,
  formatPrice,
  type InquiryItem,
} from '../utils/whatsapp';
import {ProductArtwork, WhatsAppIcon} from './BrandMark';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  isInInquiry?: boolean;
  onToggleInquiry?: (item: InquiryItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  isInInquiry = false,
  onToggleInquiry,
}) => {
  const category = CATEGORY_MAP[product.categoryId];
  const defaultPlan = product.plans[0];
  const defaultPlanName = defaultPlan ? defaultPlan.name : product.duration;
  const defaultPrice = defaultPlan ? defaultPlan.price : product.price;
  const inquiryKey = `${product.id}::${defaultPlan ? defaultPlan.id : 'base'}`;

  const savings =
    product.price !== null &&
    product.previousPrice &&
    product.previousPrice > product.price
      ? product.previousPrice - product.price
      : 0;

  const whatsappHref = buildProductWhatsAppUrl(
    product.name,
    defaultPlan ? defaultPlan.name : undefined,
    formatPrice(product.price)
  );

  return (
    <article className="group flex flex-col justify-between rounded-2xl bg-[#131C31] border border-white/[0.07] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6]/40 hover:shadow-[0_14px_34px_-14px_rgba(37,99,235,0.35)]">
      <div>
        {/* Clickable Artwork Header */}
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-xl cursor-pointer"
          aria-label={`Ver detalles de ${product.name}`}
        >
          <ProductArtwork product={product} size="card" />
        </button>

        {/* Clean Unboxed Metadata Row (Zero Static Pills) */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#94A3B8]">
          <span className="font-medium text-[#3B82F6]">{category.shortName}</span>
          <span aria-hidden="true">·</span>
          <span>{product.duration}</span>
          <span aria-hidden="true">·</span>
          <span
            className={
              product.availability === 'Disponible' ? 'text-[#10B981]' : 'text-amber-300'
            }
          >
            {product.availability}
          </span>
        </div>

        {/* Title & Optional Single Promo Text Kicker */}
        <div className="mt-2 flex items-baseline justify-between gap-2">
          <button
            type="button"
            onClick={() => onSelectProduct(product)}
            className="text-left focus-visible:outline-none focus-visible:underline cursor-pointer"
          >
            <h3 className="font-display text-lg font-bold text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
              {product.name}
            </h3>
          </button>
          {product.promoLabel && (
            <span className="text-xs font-medium text-[#10B981] shrink-0">
              {product.promoLabel}
            </span>
          )}
        </div>

        {/* Short Description */}
        <p className="mt-1.5 text-sm leading-relaxed text-[#94A3B8] line-clamp-2">
          {product.shortDescription}
        </p>
      </div>

      {/* Pricing & Actions Baseline */}
      <div className="mt-5 pt-4 border-t border-white/[0.06]">
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="block text-xs text-[#94A3B8]">
              {product.price !== null ? (product.plans.length > 1 ? 'Desde' : 'Precio') : 'Tarifa'}
            </span>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="font-display text-xl font-bold text-[#F8FAFC] tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.price !== null &&
                product.previousPrice &&
                product.previousPrice > product.price && (
                  <span className="text-xs text-[#94A3B8] line-through tabular-nums">
                    {formatPrice(product.previousPrice)}
                  </span>
                )}
              {savings > 0 && (
                <span className="text-xs font-semibold text-[#10B981] tabular-nums">
                  Ahorras {formatPrice(savings)}
                </span>
              )}
            </div>
          </div>
          {product.plans.length > 1 && (
            <span className="text-xs text-[#94A3B8] shrink-0">
              {product.plans.length} planes
            </span>
          )}
        </div>

        <div className="mt-4 space-y-2.5">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full rounded-xl bg-[#10B981] px-4 py-2.5 text-sm font-semibold text-[#04140E] hover:bg-[#34D399] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Consultar por WhatsApp</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onSelectProduct(product)}
              className="inline-flex items-center justify-center gap-1 min-h-[44px] w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs sm:text-sm font-medium text-[#F8FAFC] hover:border-[#3B82F6]/50 hover:bg-[#2563EB]/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Ver detalles</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
            </button>

            {onToggleInquiry && (
              <button
                type="button"
                onClick={() =>
                  onToggleInquiry({
                    key: inquiryKey,
                    productId: product.id,
                    productName: product.name,
                    planName: defaultPlanName,
                    price: defaultPrice,
                  })
                }
                className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] w-full rounded-xl border px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isInInquiry
                    ? 'border-[#3B82F6] bg-[#2563EB]/20 text-[#93C5FD]'
                    : 'border-white/10 bg-white/[0.03] text-[#CBD5E1] hover:border-[#3B82F6]/50 hover:text-white'
                }`}
              >
                {isInInquiry ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                    <span>Sumado</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                    <span>Sumar</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
