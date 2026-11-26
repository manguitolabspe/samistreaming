export const WHATSAPP_NUMBER = '51941842880';
export const WHATSAPP_DISPLAY_NUMBER = '+51 941 842 880';

export interface InquiryItem {
  key: string;
  productId: string;
  productName: string;
  planName: string;
  price: number;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProductWhatsAppUrl(
  productName: string,
  planName?: string,
  priceFormatted?: string
): string {
  if (planName && priceFormatted) {
    return buildWhatsAppUrl(
      `Hola, Sami Streaming. Estoy interesado en ${productName} — ${planName} (${priceFormatted}). Quisiera conocer su disponibilidad y cómo puedo adquirirlo.`
    );
  }
  return buildWhatsAppUrl(
    `Hola, Sami Streaming. Estoy interesado en ${productName}. Quisiera conocer su disponibilidad y cómo puedo adquirirlo.`
  );
}

export function buildMultiInquiryWhatsAppUrl(items: InquiryItem[]): string {
  if (items.length === 0) {
    return buildGeneralWhatsAppUrl();
  }
  if (items.length === 1) {
    const item = items[0];
    return buildProductWhatsAppUrl(item.productName, item.planName, formatPrice(item.price));
  }
  const lines = items.map(
    (item) => `• ${item.productName} (${item.planName} — ${formatPrice(item.price)})`
  );
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return buildWhatsAppUrl(
    `Hola, Sami Streaming. Quisiera consultar disponibilidad y cómo adquirir los siguientes servicios:\n${lines.join('\n')}\nTotal referencial: ${formatPrice(total)}`
  );
}

export function buildPromoWhatsAppUrl(promoName: string): string {
  return buildWhatsAppUrl(
    `Hola, Sami Streaming. Quiero información sobre la promoción ${promoName}.`
  );
}

export function buildComboWhatsAppUrl(comboName: string): string {
  return buildWhatsAppUrl(
    `Hola, Sami Streaming. Me interesa el combo ${comboName}. ¿Me pueden brindar más información?`
  );
}

export function buildCatalogWhatsAppUrl(): string {
  return buildWhatsAppUrl(
    'Hola, Sami Streaming. He revisado su catálogo y quisiera recibir información sobre los servicios disponibles.'
  );
}

export function buildGeneralWhatsAppUrl(): string {
  return buildWhatsAppUrl('Hola, Sami Streaming. Necesito ayuda con un servicio.');
}

export function buildVipWhatsAppUrl(levelName?: string): string {
  if (levelName) {
    return buildWhatsAppUrl(
      `Hola, Sami Streaming. Estoy interesado en formar parte de Sami VIP (${levelName}) y quisiera conocer los requisitos, precios y beneficios para revendedores.`
    );
  }
  return buildWhatsAppUrl(
    'Hola, Sami Streaming. Estoy interesado en formar parte de Sami VIP y quisiera conocer los requisitos, precios y beneficios para revendedores.'
  );
}

export function formatPrice(amount: number): string {
  return `S/ ${amount.toFixed(2)}`;
}

export async function shareOrCopyLink(params: {
  title: string;
  text: string;
  hash: string;
}): Promise<'shared' | 'copied' | 'failed'> {
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  const url = `${baseUrl}#${params.hash}`;

  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title: params.title,
        text: params.text,
        url,
      });
      return 'shared';
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') {
        return 'failed';
      }
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(url);
      return 'copied';
    } catch {
      return 'failed';
    }
  }

  return 'failed';
}
