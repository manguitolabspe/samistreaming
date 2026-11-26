export type CategoryId =
  | 'streaming'
  | 'iptv'
  | 'software'
  | 'antivirus'
  | 'diseno'
  | 'ia'
  | 'combos';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
  accentFrom: string;
  accentTo: string;
}

export interface ProductPlan {
  id: string;
  name: string;
  duration: string;
  price: number | null;
  previousPrice?: number;
  note?: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  categoryId: CategoryId;
  shortDescription: string;
  description: string;
  price: number | null;
  previousPrice?: number;
  duration: string;
  availability: 'Disponible' | 'Consultar disponibilidad';
  promoLabel?: string;
  featured?: boolean;
  mostChosen?: boolean;
  monogram: string;
  brandAccent: string;
  brandAccentSecondary: string;
  imageUrl?: string;
  plans: ProductPlan[];
  features: string[];
  includes: string[];
  deliveryMode: string;
  usageConditions: string[];
  warranty: string;
  faqs: ProductFaq[];
}

export interface Promotion {
  id: string;
  name: string;
  categoryLabel: string;
  description: string;
  promoPrice: number;
  previousPrice?: number;
  validity?: string;
  imageUrl: string;
  highlights: string[];
}

export interface ComboOffer {
  id: string;
  name: string;
  tagline: string;
  description: string;
  services: string[];
  duration: string;
  promoPrice: number;
  previousPrice: number;
  imageUrl: string;
  accentColor: string;
}

export interface VipLevel {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  highlights: string[];
  recommended?: boolean;
}

export const MEDIA_ASSETS = {
  samiBanner: '/assets/aistudio/file_000000002594820ea4501abcf874195a_ef6f39f2.png',
  heroHub: '/src/assets/images/hero_digital_hub_1795359728133.jpg',
  promoEntertainment: '/src/assets/images/promo_entertainment_pack_1795359727939.jpg',
  promoProductivityAi: '/src/assets/images/promo_productivity_ai_1795359727654.jpg',
  samiVipReseller: '/src/assets/images/sami_vip_reseller_1795359728098.jpg',
  comboCreative: '/src/assets/images/combo_creative_suite_1795359728177.jpg',
} as const;

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'streaming',
    name: 'Streaming, Música y Deportes',
    shortName: 'Streaming',
    description: 'Series, películas, anime, música y deportes en vivo.',
    accentFrom: '#2563EB',
    accentTo: '#3B82F6',
  },
  {
    id: 'iptv',
    name: 'IPTV y Otras Plataformas',
    shortName: 'IPTV y TV',
    description: 'IPTV, Max Player, Flujo, Estela y OEDA para tu TV o celular.',
    accentFrom: '#0EA5E9',
    accentTo: '#2563EB',
  },
  {
    id: 'software',
    name: 'Software y Servicios Digitales',
    shortName: 'Software',
    description: 'Office 365, Windows, CapCut, iLovePDF, Duolingo y números virtuales.',
    accentFrom: '#2563EB',
    accentTo: '#10B981',
  },
  {
    id: 'diseno',
    name: 'Diseño y Creatividad',
    shortName: 'Diseño',
    description: 'Canva Pro y soluciones profesionales de Autodesk.',
    accentFrom: '#3B82F6',
    accentTo: '#6366F1',
  },
  {
    id: 'antivirus',
    name: 'Antivirus y Seguridad',
    shortName: 'Antivirus',
    description: 'Licencias anuales ESET y otras soluciones de seguridad digital.',
    accentFrom: '#10B981',
    accentTo: '#059669',
  },
  {
    id: 'ia',
    name: 'Inteligencia Artificial',
    shortName: 'Inteligencia IA',
    description: 'ChatGPT y Claude en modalidad de cuentas compartidas.',
    accentFrom: '#06B6D4',
    accentTo: '#2563EB',
  },
  {
    id: 'combos',
    name: 'Combos y Promociones',
    shortName: 'Combos',
    description: 'Packs combinados pensados para ahorrar en tus servicios.',
    accentFrom: '#10B981',
    accentTo: '#2563EB',
  },
];

export const CATEGORY_MAP: Record<CategoryId, CategoryInfo> = CATEGORIES.reduce(
  (acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  },
  {} as Record<CategoryId, CategoryInfo>
);

export const IMPORTANT_NOTES = [
  'Todos los precios están expresados en soles (S/).',
  'Consultar disponibilidad antes de realizar el pedido.',
  'Algunas plataformas trabajan con cuentas compartidas.',
  'Consultar condiciones de entrega y activación por WhatsApp.',
];

/**
 * LISTA OFICIAL DE PRECIOS — SAMI STREAMING
 * Estructura uniforme para actualizar fácilmente precios, planes y disponibilidad.
 */
export const PRODUCTS: Product[] = [
  // ==================== 1. STREAMING, MÚSICA Y DEPORTES ====================
  {
    id: 'netflix',
    name: 'Netflix',
    brand: 'Netflix',
    categoryId: 'streaming',
    shortDescription:
      'Series exclusivas, grandes películas y estrenos cada semana en planes de 1 mes, 3 meses o cuenta completa + Bot.',
    description:
      'Accede al catálogo completo de series, películas y estrenos de Netflix con planes por perfil (1 o 3 meses) o cuenta completa con Bot. Coordinamos disponibilidad y entrega por WhatsApp.',
    price: 18.0,
    duration: '1 mes',
    availability: 'Disponible',
    promoLabel: 'Plan 3 meses disponible',
    featured: true,
    mostChosen: true,
    monogram: 'N',
    brandAccent: '#E50914',
    brandAccentSecondary: '#7F1D1D',
    imageUrl: '/assets/aistudio/file_000000009b6c820eaea23a11f8a48567_f48d1189.png',
    plans: [
      {id: 'nf-1m', name: 'Perfil por 1 mes', duration: '1 mes', price: 18.0},
      {id: 'nf-3m', name: 'Perfil por 3 meses', duration: '3 meses', price: 38.0, previousPrice: 54.0},
      {id: 'nf-full', name: 'Cuenta completa + Bot', duration: '1 mes', price: 48.0},
    ],
    features: [
      'Perfil individual por 1 o 3 meses, o cuenta completa + Bot',
      'Compatible con Smart TV, Android, iOS, web y consolas',
      'Calidad de reproducción hasta Ultra HD 4K según dispositivo',
      'Renovación sencilla directamente por WhatsApp',
    ],
    includes: [
      'Acceso configurado según el plan elegido',
      'Guía rápida de inicio de sesión',
      'Acompañamiento por WhatsApp ante cualquier consulta',
    ],
    deliveryMode: 'Entrega digital por WhatsApp una vez confirmada disponibilidad y pago.',
    usageConditions: [
      'Usar únicamente en el perfil y dispositivos incluidos en tu plan.',
      'No modificar correo ni contraseña en planes de perfil compartido.',
      'Consultar disponibilidad y condiciones vigentes antes de realizar el pedido.',
    ],
    warranty:
      'Garantía de funcionamiento durante el tiempo contratado cumpliendo las condiciones de uso.',
    faqs: [
      {
        question: '¿Funciona en Smart TV y celular?',
        answer: 'Sí, es compatible con televisores inteligentes, teléfonos Android, iPhone, tablets y computadoras.',
      },
      {
        question: '¿Qué incluye la cuenta completa + Bot?',
        answer: 'Acceso completo con soporte mediante Bot para códigos; consúltanos por WhatsApp para explicarte todos los detalles.',
      },
    ],
  },
  {
    id: 'disney-plus',
    name: 'Disney+',
    brand: 'Disney+',
    categoryId: 'streaming',
    shortDescription:
      'Fantasía, héroes y aventuras de Disney, Pixar, Marvel, Star Wars y deportes de ESPN en planes Estándar, Premium o 3 meses.',
    description:
      'Disfruta estrenos, clásicos y eventos deportivos de ESPN en vivo con planes Estándar, Premium o trimestral. Consulta disponibilidad directamente por WhatsApp.',
    price: 12.0,
    duration: '1 mes',
    availability: 'Disponible',
    featured: true,
    mostChosen: true,
    monogram: 'D+',
    brandAccent: '#1D4ED8',
    brandAccentSecondary: '#0F172A',
    imageUrl: '/assets/aistudio/file_000000007ee8820eb3960b0d51cfdac6_fa1f8008.png',
    plans: [
      {id: 'dp-std', name: 'Estándar · 1 mes', duration: '1 mes', price: 12.0},
      {id: 'dp-prem', name: 'Premium · 1 mes', duration: '1 mes', price: 15.0},
      {id: 'dp-3m', name: 'Plan 3 meses', duration: '3 meses', price: 48.0},
    ],
    features: [
      'Catálogo de Disney, Pixar, Marvel, Star Wars y National Geographic',
      'Opción Premium con eventos deportivos de ESPN',
      'Audio latino, subtitulado y alta definición',
      'Compatible con múltiples dispositivos',
    ],
    includes: ['Acceso según el plan elegido', 'Soporte de ingreso y activación por WhatsApp'],
    deliveryMode: 'Entrega digital por WhatsApp tras confirmar disponibilidad y pago.',
    usageConditions: [
      'Uso en el perfil y modalidad contratada.',
      'Consultar condiciones de entrega y activación por WhatsApp.',
    ],
    warranty: 'Garantía de soporte y funcionamiento durante el periodo contratado.',
    faqs: [
      {
        question: '¿Cuál es la diferencia entre Estándar y Premium?',
        answer: 'El plan Premium amplía la oferta deportiva de ESPN y mejora la calidad de video/audio disponible.',
      },
    ],
  },
  {
    id: 'spotify',
    name: 'Spotify',
    brand: 'Spotify',
    categoryId: 'streaming',
    shortDescription:
      'Música para cada momento sin anuncios, con tus playlists y reproducción sin límites en planes de 3 y 6 meses.',
    description:
      'Escucha millones de canciones y podcasts sin anuncios ni interrupciones. Se entrega cuenta. Consultar precio y detalles según modalidad por WhatsApp.',
    price: 33.0,
    duration: '3 meses',
    availability: 'Disponible',
    promoLabel: '3 y 6 meses',
    featured: true,
    mostChosen: true,
    monogram: 'SP',
    brandAccent: '#10B981',
    brandAccentSecondary: '#064E3B',
    imageUrl: '/assets/aistudio/file_00000000df60820e86cd9ef3f01150b6_729b0f27.png',
    plans: [
      {id: 'sp-3m', name: 'Plan 3 meses (Se entrega cuenta)', duration: '3 meses', price: 33.0},
      {id: 'sp-6m', name: 'Plan 6 meses (Se entrega cuenta)', duration: '6 meses', price: 68.0},
    ],
    features: [
      'Música y podcasts sin anuncios',
      'Descargas para escuchar sin conexión',
      'Audio de alta calidad en celular, PC y Smart TV',
      'Se entrega cuenta lista para usar (consultar modalidad)',
    ],
    includes: ['Cuenta configurada por el periodo elegido', 'Acompañamiento inicial por WhatsApp'],
    deliveryMode: 'Entrega digital de cuenta coordinada por WhatsApp.',
    usageConditions: [
      'Se entrega cuenta; consultar precio y condiciones según modalidad antes de pedir.',
    ],
    warranty: 'Garantía de funcionamiento durante el periodo contratado.',
    faqs: [
      {
        question: '¿Cómo se entrega el servicio de Spotify?',
        answer: 'Se entrega cuenta según la modalidad elegida. Escríbenos por WhatsApp para confirmar detalles y disponibilidad.',
      },
    ],
  },
  {
    id: 'hbo-max',
    name: 'HBO Max',
    brand: 'HBO Max',
    categoryId: 'streaming',
    shortDescription:
      'Series aclamadas de HBO, cine de Warner Bros., DC y estrenos en planes Estándar, Premium o 3 meses.',
    description:
      'Accede a las producciones originales de HBO, películas taquilleras y documentales en plan Estándar, Premium o ahorro de 3 meses.',
    price: 15.0,
    duration: '1 mes',
    availability: 'Disponible',
    mostChosen: true,
    monogram: 'MAX',
    brandAccent: '#2563EB',
    brandAccentSecondary: '#1E1B4B',
    plans: [
      {id: 'max-std', name: 'Estándar · 1 mes', duration: '1 mes', price: 15.0},
      {id: 'max-prem', name: 'Premium · 1 mes', duration: '1 mes', price: 20.0},
      {id: 'max-3m', name: 'Plan 3 meses', duration: '3 meses', price: 38.0, previousPrice: 45.0},
    ],
    features: [
      'Catálogo completo de HBO, Warner Bros., DC y Discovery',
      'Opciones Estándar, Premium y trimestral',
      'Audio latino, subtítulos y alta definición',
    ],
    includes: ['Acceso al plan elegido', 'Orientación de ingreso vía WhatsApp'],
    deliveryMode: 'Entrega digital por WhatsApp al confirmar disponibilidad y pago.',
    usageConditions: [
      'Uso en la modalidad y perfil contratado.',
      'No modificar datos de acceso en cuentas compartidas.',
    ],
    warranty: 'Garantía activa durante el periodo contratado.',
    faqs: [
      {
        question: '¿Tiene contenido en español latino?',
        answer: 'Sí, cuenta con audio latino y subtítulos en español en la mayoría de su catálogo.',
      },
    ],
  },
  {
    id: 'prime-video',
    name: 'Prime Video',
    brand: 'Prime Video',
    categoryId: 'streaming',
    shortDescription:
      'Series originales, películas recientes y clásicos en planes de 1 mes o 3 meses.',
    description:
      'Disfruta todo el entretenimiento de Amazon Prime Video desde tu Smart TV, celular o computadora con opción mensual o trimestral.',
    price: 15.0,
    duration: '1 mes',
    availability: 'Disponible',
    monogram: 'PV',
    brandAccent: '#F97316',
    brandAccentSecondary: '#7C2D12',
    plans: [
      {id: 'pv-1m', name: 'Plan 1 mes', duration: '1 mes', price: 15.0},
      {id: 'pv-3m', name: 'Plan 3 meses', duration: '3 meses', price: 38.0, previousPrice: 45.0},
    ],
    features: [
      'Series originales y cine en HD / 4K',
      'Compatible con Smart TV, Fire TV, móvil y PC',
      'Descargas offline en dispositivos móviles',
    ],
    includes: ['Acceso por la duración seleccionada', 'Asistencia por WhatsApp'],
    deliveryMode: 'Entrega digital por WhatsApp tras confirmar pago.',
    usageConditions: ['No realizar alquileres o compras adicionales dentro de cuentas compartidas.'],
    warranty: 'Garantía por el tiempo contratado respetando las condiciones de uso.',
    faqs: [
      {
        question: '¿Funciona en televisores y celulares?',
        answer: 'Sí, puedes iniciar sesión en la app oficial de Prime Video en TV, móvil o navegador.',
      },
    ],
  },
  {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    brand: 'Crunchyroll',
    categoryId: 'streaming',
    shortDescription:
      'Anime sin anuncios y estrenos en simulcast con Plan Básico mensual o Super Fan de 3 meses.',
    description:
      'Sigue tus animes favoritos con subtítulos y doblaje latino en HD, eligiendo entre el Plan Básico o el pack Super Fan de 3 meses.',
    price: 10.0,
    duration: '1 mes',
    availability: 'Disponible',
    monogram: 'CR',
    brandAccent: '#9333EA',
    brandAccentSecondary: '#3B0764',
    plans: [
      {id: 'cr-bas', name: 'Plan básico · 1 mes', duration: '1 mes', price: 10.0},
      {id: 'cr-3m', name: 'Super Fan · 3 meses', duration: '3 meses', price: 30.0},
    ],
    features: [
      'Episodios sin anuncios en alta definición',
      'Estrenos de temporada en simulcast',
      'Compatible con Smart TV, consola, web y móvil',
    ],
    includes: ['Acceso según plan seleccionado', 'Soporte por WhatsApp'],
    deliveryMode: 'Entrega digital vía WhatsApp al confirmar disponibilidad y pago.',
    usageConditions: ['Usar únicamente el perfil y modalidad contratada.'],
    warranty: 'Garantía vigente durante el periodo contratado.',
    faqs: [
      {
        question: '¿Incluye subtítulos en español?',
        answer: 'Sí, los episodios cuentan con subtítulos en español y muchos títulos también tienen doblaje latino.',
      },
    ],
  },
  {
    id: 'paramount-plus',
    name: 'Paramount+',
    brand: 'Paramount+',
    categoryId: 'streaming',
    shortDescription:
      'Películas de Paramount, series exclusivas, MTV, Nickelodeon y contenido familiar en planes de 1 o 3 meses.',
    description:
      'Explora cine clásico y actual, series originales y programación infantil con Paramount+ en plan mensual o trimestral.',
    price: 15.0,
    duration: '1 mes',
    availability: 'Disponible',
    monogram: 'P+',
    brandAccent: '#2563EB',
    brandAccentSecondary: '#1E3A8A',
    plans: [
      {id: 'par-1m', name: 'Plan 1 mes', duration: '1 mes', price: 15.0},
      {id: 'par-3m', name: 'Plan 3 meses', duration: '3 meses', price: 38.0, previousPrice: 45.0},
    ],
    features: [
      'Cine de Paramount, series originales y contenido familiar',
      'Reproducción en HD desde Smart TV, celular y web',
      'Opción ahorro de 3 meses',
    ],
    includes: ['Acceso configurado según plan', 'Soporte de activación por WhatsApp'],
    deliveryMode: 'Entrega digital por WhatsApp al confirmar disponibilidad y pago.',
    usageConditions: ['Usar respetando la modalidad del plan entregado.'],
    warranty: 'Garantía durante el tiempo contratado.',
    faqs: [
      {
        question: '¿Se puede ver en Smart TV y celular?',
        answer: 'Sí, funciona en la aplicación oficial de Paramount+ en dispositivos compatibles.',
      },
    ],
  },
  {
    id: 'vix',
    name: 'ViX',
    brand: 'ViX',
    categoryId: 'streaming',
    shortDescription:
      'Novelas, series originales en español, cine latino y fútbol en vivo en una sola plataforma.',
    description:
      'Disfruta el mayor catálogo de entretenimiento en español con estrenos, novelas exclusivas y eventos deportivos.',
    price: 12.0,
    duration: '1 mes',
    availability: 'Disponible',
    monogram: 'VIX',
    brandAccent: '#F97316',
    brandAccentSecondary: '#9A3412',
    plans: [{id: 'vix-1m', name: 'Plan 1 mes', duration: '1 mes', price: 12.0}],
    features: [
      'Series y películas en español sin anuncios',
      'Programación en vivo y novelas destacadas',
      'Compatible con Smart TV, Android, iOS y web',
    ],
    includes: ['Acceso al servicio por 1 mes', 'Acompañamiento por WhatsApp'],
    deliveryMode: 'Entrega digital por WhatsApp tras confirmar pago.',
    usageConditions: ['Consultar disponibilidad y modalidad antes de confirmar el pedido.'],
    warranty: 'Garantía activa durante el periodo contratado.',
    faqs: [
      {
        question: '¿Funciona en mi televisor o celular?',
        answer: 'Sí, puedes usar la app oficial de ViX en televisores inteligentes, teléfonos y tablets.',
      },
    ],
  },
  {
    id: 'dazn',
    name: 'DAZN',
    brand: 'DAZN',
    categoryId: 'streaming',
    shortDescription:
      'Acceso a deportes en vivo, boxeo, fútbol internacional y eventos deportivos destacados.',
    description:
      'Sigue partidos, veladas de boxeo y competiciones deportivas internacionales en vivo y bajo demanda desde tus dispositivos.',
    price: 18.0,
    duration: '1 mes',
    availability: 'Disponible',
    mostChosen: true,
    monogram: 'DZ',
    brandAccent: '#EAB308',
    brandAccentSecondary: '#422006',
    plans: [
      {id: 'dazn-1m', name: 'Acceso a deportes y partidos · 1 mes', duration: '1 mes', price: 18.0},
    ],
    features: [
      'Eventos deportivos y partidos en directo',
      'Repeticiones y resúmenes bajo demanda',
      'Compatible con Smart TV, móvil, tablet y PC',
    ],
    includes: ['Acceso configurado al servicio', 'Soporte por WhatsApp'],
    deliveryMode: 'Entrega digital vía WhatsApp tras confirmar disponibilidad y pago.',
    usageConditions: ['Consultar cobertura de torneos vigentes y modalidad de acceso antes de pedir.'],
    warranty: 'Garantía de acceso durante el periodo contratado.',
    faqs: [
      {
        question: '¿Qué deportes puedo ver en DAZN?',
        answer: 'Partidos, boxeo y competiciones disponibles según la programación de la plataforma; consúltanos por WhatsApp si buscas un evento específico.',
      },
    ],
  },

  // ==================== 2. IPTV Y OTRAS PLATAFORMAS ====================
  {
    id: 'iptv',
    name: 'IPTV',
    brand: 'IPTV',
    categoryId: 'iptv',
    shortDescription:
      'Canales en vivo, deportes, cine y contenido bajo demanda en planes de 1 mes o 3 meses.',
    description:
      'Disfruta televisión digital por internet con canales nacionales, internacionales, deportes y películas compatibles con Smart TV, TV Box, Android y PC.',
    price: 10.0,
    duration: '1 mes',
    availability: 'Disponible',
    featured: true,
    mostChosen: true,
    monogram: 'TV',
    brandAccent: '#2563EB',
    brandAccentSecondary: '#0F172A',
    plans: [
      {id: 'iptv-1m', name: 'IPTV · 1 mes', duration: '1 mes', price: 10.0},
      {id: 'iptv-3m', name: 'IPTV · 3 meses', duration: '3 meses', price: 28.0, previousPrice: 30.0},
    ],
    features: [
      'Canales en vivo de deportes, noticias, cine e infantil',
      'Compatible con Smart TV, Android TV, TV Box y celulares',
      'Guía paso a paso para configurar en tu dispositivo',
    ],
    includes: ['Credenciales de acceso IPTV', 'Acompañamiento de configuración por WhatsApp'],
    deliveryMode: 'Entrega digital de credenciales y guía por WhatsApp.',
    usageConditions: [
      'Se recomienda conexión a internet estable.',
      'Respetar la cantidad de conexiones incluidas en el plan.',
    ],
    warranty: 'Soporte y garantía de funcionamiento durante el periodo contratado.',
    faqs: [
      {
        question: '¿Me ayudan a instalarlo en mi Smart TV?',
        answer: 'Sí, te indicamos por WhatsApp qué aplicación descargar y cómo ingresar tus datos en minutos.',
      },
    ],
  },
  {
    id: 'max-player',
    name: 'Max Player',
    brand: 'Max Player',
    categoryId: 'iptv',
    shortDescription:
      'Televisión digital, canales en vivo y entretenimiento bajo demanda en planes de 1 mes o 4 meses.',
    description:
      'Plataforma de reproducción y TV digital con interfaz ágil, canales en vivo y contenido VOD en modalidad mensual o pack de 4 meses.',
    price: 15.0,
    duration: '1 mes',
    availability: 'Disponible',
    monogram: 'MP',
    brandAccent: '#0EA5E9',
    brandAccentSecondary: '#0C4A6E',
    plans: [
      {id: 'mp-1m', name: 'Max Player · 1 mes', duration: '1 mes', price: 15.0},
      {id: 'mp-4m', name: 'Max Player · 4 meses', duration: '4 meses', price: 40.0, previousPrice: 60.0},
    ],
    features: [
      'Canales en vivo y catálogo de películas y series',
      'Opción ahorro de 4 meses',
      'Interfaz rápida y fácil de usar',
    ],
    includes: ['Acceso activo según el plan elegido', 'Instrucciones de instalación por WhatsApp'],
    deliveryMode: 'Entrega digital directa por WhatsApp tras confirmar pago.',
    usageConditions: ['Consultar dispositivos compatibles antes de concretar el pedido.'],
    warranty: 'Garantía y soporte durante el tiempo contratado.',
    faqs: [
      {
        question: '¿Cuánto ahorro con el plan de 4 meses?',
        answer: 'El plan de 4 meses cuesta S/ 40.00 en total frente a S/ 60.00 pagando mes a mes.',
      },
    ],
  },
  {
    id: 'flujo',
    name: 'Flujo',
    brand: 'Flujo TV',
    categoryId: 'iptv',
    shortDescription:
      'Televisión en vivo, deportes y catálogo de películas y series en una app fluida para dispositivos Android.',
    description:
      'Accede a programación en vivo, eventos deportivos y contenido bajo demanda desde Android TV, TV Box, Fire TV Stick o celular Android.',
    price: 18.0,
    duration: '1 mes',
    availability: 'Disponible',
    mostChosen: true,
    monogram: 'FL',
    brandAccent: '#3B82F6',
    brandAccentSecondary: '#1E3A8A',
    plans: [{id: 'fl-1m', name: 'Flujo · 1 mes', duration: '1 mes', price: 18.0}],
    features: [
      'Canales en vivo, deportes y catálogo VOD',
      'Ideal para Android TV, Google TV, TV Box y Fire TV',
      'Guía rápida de instalación incluida',
    ],
    includes: ['Credenciales activas', 'Soporte de instalación por WhatsApp'],
    deliveryMode: 'Entrega digital por WhatsApp tras confirmar pago.',
    usageConditions: ['Requiere conexión estable a internet y dispositivo compatible.'],
    warranty: 'Garantía de acceso durante el mes contratado.',
    faqs: [
      {
        question: '¿Funciona en Fire TV Stick y TV Box?',
        answer: 'Sí, te enviamos por WhatsApp las instrucciones de instalación para tu dispositivo.',
      },
    ],
  },
  {
    id: 'estela',
    name: 'Estela',
    brand: 'Estela TV',
    categoryId: 'iptv',
    shortDescription:
      'Plataforma de TV digital con canales latinos, deportes y entretenimiento bajo demanda.',
    description:
      'Disfruta canales en directo y catálogo de películas con estabilidad y acompañamiento directo por WhatsApp para la instalación.',
    price: 20.0,
    duration: '1 mes',
    availability: 'Disponible',
    monogram: 'ET',
    brandAccent: '#06B6D4',
    brandAccentSecondary: '#164E63',
    plans: [{id: 'est-1m', name: 'Estela · 1 mes', duration: '1 mes', price: 20.0}],
    features: [
      'Señales en vivo de deportes, cine y entretenimiento',
      'Catálogo VOD actualizado',
      'Soporte de configuración por WhatsApp',
    ],
    includes: ['Acceso activo por 1 mes', 'Guía de instalación'],
    deliveryMode: 'Entrega digital vía WhatsApp al confirmar disponibilidad y pago.',
    usageConditions: ['Verificar compatibilidad de tu TV o dispositivo por WhatsApp antes de pedir.'],
    warranty: 'Garantía activa durante el periodo contratado.',
    faqs: [
      {
        question: '¿Me ayudan a configurarlo?',
        answer: 'Sí, te orientamos paso a paso por WhatsApp hasta dejarlo funcionando.',
      },
    ],
  },
  {
    id: 'oeda',
    name: 'OEDA',
    brand: 'OEDA',
    categoryId: 'iptv',
    shortDescription:
      'Servicio de televisión digital y entretenimiento. Consulta disponibilidad, planes y precio vigente por WhatsApp.',
    description:
      'Consulta por WhatsApp la disponibilidad actual, dispositivos compatibles y tarifa vigente del servicio OEDA.',
    price: null,
    duration: 'Según plan',
    availability: 'Consultar disponibilidad',
    monogram: 'OE',
    brandAccent: '#6366F1',
    brandAccentSecondary: '#1E1B4B',
    plans: [{id: 'oeda-consult', name: 'Consultar plan y precio', duration: 'Según plan', price: null}],
    features: [
      'Atención personalizada para verificar compatibilidad',
      'Confirmación directa de precio y duración vigente',
      'Guía de instalación incluida al contratar',
    ],
    includes: ['Asesoría directa por WhatsApp', 'Acceso según modalidad acordada'],
    deliveryMode: 'Coordinación y entrega digital directa por WhatsApp.',
    usageConditions: ['Sujeto a disponibilidad y condiciones informadas al momento de la consulta.'],
    warranty: 'Condiciones de garantía confirmadas por WhatsApp antes de concretar.',
    faqs: [
      {
        question: '¿Por qué el precio figura como Consultar?',
        answer: 'Te confirmamos por WhatsApp la tarifa y disponibilidad del día antes de realizar cualquier pago.',
      },
    ],
  },

  // ==================== 3. INTELIGENCIA ARTIFICIAL ====================
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    brand: 'OpenAI',
    categoryId: 'ia',
    shortDescription:
      'Inteligencia artificial avanzada para redacción, análisis de archivos, estudios y programación en cuenta compartida.',
    description:
      'Aprovecha funciones avanzadas de ChatGPT para tus estudios, trabajo y creación de contenido. Modalidad de cuenta compartida con soporte por WhatsApp.',
    price: 29.0,
    duration: '1 mes',
    availability: 'Disponible',
    featured: true,
    mostChosen: true,
    monogram: 'GPT',
    brandAccent: '#10B981',
    brandAccentSecondary: '#064E3B',
    plans: [{id: 'gpt-shared', name: 'Cuenta compartida · 1 mes', duration: '1 mes', price: 29.0}],
    features: [
      'Modalidad de cuenta compartida',
      'Ideal para redacción, análisis de documentos, código e ideas',
      'Acceso rápido con guía de ingreso por WhatsApp',
    ],
    includes: ['Acceso a cuenta compartida por 1 mes', 'Orientación inicial por WhatsApp'],
    deliveryMode: 'Entrega digital por WhatsApp al confirmar disponibilidad y pago.',
    usageConditions: [
      'Modalidad de cuenta compartida: respetar uso responsable y no alterar credenciales.',
      'Consultar disponibilidad y condiciones antes de realizar el pedido.',
    ],
    warranty: 'Garantía de acceso y soporte durante el periodo contratado.',
    faqs: [
      {
        question: '¿Cómo funciona la modalidad de cuenta compartida?',
        answer: 'Te entregamos acceso configurado y te indicamos las reglas de uso por WhatsApp para que disfrutes el servicio sin inconvenientes.',
      },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    brand: 'Anthropic',
    categoryId: 'ia',
    shortDescription:
      'IA sobresaliente para redacción natural, lectura de textos extensos y programación en cuenta compartida.',
    description:
      'Accede a Claude en modalidad de cuenta compartida para impulsar tus proyectos de escritura, investigación y código.',
    price: 38.0,
    duration: '1 mes',
    availability: 'Disponible',
    monogram: 'CL',
    brandAccent: '#F59E0B',
    brandAccentSecondary: '#78350F',
    plans: [{id: 'cl-shared', name: 'Cuenta compartida · 1 mes', duration: '1 mes', price: 38.0}],
    features: [
      'Modalidad de cuenta compartida',
      'Destacado en redacción profesional, análisis largo y código',
      'Soporte de acceso por WhatsApp',
    ],
    includes: ['Acceso a cuenta compartida por 1 mes', 'Acompañamiento por WhatsApp'],
    deliveryMode: 'Entrega digital por WhatsApp tras confirmar disponibilidad y pago.',
    usageConditions: [
      'Modalidad de cuenta compartida; no modificar datos ni configuraciones de la cuenta.',
    ],
    warranty: 'Garantía de acceso durante el mes contratado.',
    faqs: [
      {
        question: '¿Es cuenta compartida?',
        answer: 'Sí, el servicio de Inteligencia Artificial trabaja en modalidad de cuenta compartida.',
      },
    ],
  },

  // ==================== 4. SOFTWARE Y SERVICIOS DIGITALES ====================
  {
    id: 'office-365',
    name: 'Office 365',
    brand: 'Microsoft 365',
    categoryId: 'software',
    shortDescription:
      'Word, Excel, PowerPoint y herramientas de productividad por 1 año o activación en tu cuenta personal.',
    description:
      'Equipa tu computadora con la suite completa de Office 365 eligiendo el plan anual estándar (S/ 80) o activación directamente en tu cuenta personal (S/ 150).',
    price: 80.0,
    duration: '1 año',
    availability: 'Disponible',
    featured: true,
    mostChosen: true,
    monogram: '365',
    brandAccent: '#2563EB',
    brandAccentSecondary: '#1D4ED8',
    plans: [
      {id: 'o365-1y', name: 'Plan 1 año', duration: '1 año', price: 80.0},
      {id: 'o365-pers', name: 'Activación en cuenta personal · 1 año', duration: '1 año', price: 150.0},
    ],
    features: [
      'Word, Excel, PowerPoint, Outlook y aplicaciones de Microsoft 365',
      'Opción de activación directa en tu propia cuenta personal',
      'Compatible con Windows, macOS, tablets y celulares',
    ],
    includes: ['Activación según modalidad elegida', 'Guía de instalación y soporte por WhatsApp'],
    deliveryMode: 'Entrega e instrucciones de activación por WhatsApp.',
    usageConditions: ['Consultar condiciones de entrega y activación según el plan elegido.'],
    warranty: 'Garantía de activación y funcionamiento durante el año contratado.',
    faqs: [
      {
        question: '¿Funciona en Mac y Windows?',
        answer: 'Sí, es compatible con Windows, macOS y dispositivos móviles.',
      },
    ],
  },
  {
    id: 'windows',
    name: 'Windows',
    brand: 'Microsoft Windows',
    categoryId: 'software',
    shortDescription:
      'Licencia digital permanente o licencia por dispositivo para activar Windows en tu PC o laptop.',
    description:
      'Activa Windows de forma rápida y segura eligiendo entre licencia permanente (S/ 60) o licencia por dispositivo (S/ 80) con acompañamiento por WhatsApp.',
    price: 60.0,
    duration: 'Permanente',
    availability: 'Disponible',
    monogram: 'WIN',
    brandAccent: '#0EA5E9',
    brandAccentSecondary: '#0369A1',
    plans: [
      {id: 'win-perm', name: 'Licencia permanente', duration: 'Permanente', price: 60.0},
      {id: 'win-dev', name: 'Licencia por dispositivo', duration: 'Por dispositivo', price: 80.0},
    ],
    features: [
      'Activación limpia con soporte paso a paso',
      'Acceso completo a funciones y actualizaciones de Windows',
      'Confirmación previa de la edición instalada en tu PC',
    ],
    includes: ['Clave digital de activación', 'Asesoría de instalación por WhatsApp'],
    deliveryMode: 'Envío de clave digital e instrucciones por WhatsApp.',
    usageConditions: ['Confirmar por WhatsApp la versión/edición de Windows antes de comprar.'],
    warranty: 'Garantía de activación exitosa en tu equipo.',
    faqs: [
      {
        question: '¿Me ayudan a saber qué licencia necesita mi PC?',
        answer: 'Sí, escríbenos por WhatsApp y te guiamos antes de realizar el pago.',
      },
    ],
  },
  {
    id: 'capcut',
    name: 'CapCut',
    brand: 'CapCut',
    categoryId: 'software',
    shortDescription:
      'Edición profesional de video con cuenta lista para usar o cuenta con funciones de IA por 1 mes.',
    description:
      'Crea videos profesionales para redes sociales sin marcas de agua, con efectos Pro y herramientas de inteligencia artificial.',
    price: 20.0,
    duration: '1 mes',
    availability: 'Disponible',
    monogram: 'CP',
    brandAccent: '#38BDF8',
    brandAccentSecondary: '#1E293B',
    plans: [
      {id: 'cc-std', name: 'Cuenta · 1 mes', duration: '1 mes', price: 20.0},
      {id: 'cc-ia', name: 'Cuenta con IA · 1 mes', duration: '1 mes', price: 20.0},
    ],
    features: [
      'Efectos, plantillas, subtítulos automáticos y exportación limpia',
      'Opción de cuenta con funciones de IA por 1 mes',
      'Ideal para creadores de contenido y emprendedores',
    ],
    includes: ['Acceso a cuenta según modalidad elegida', 'Soporte de ingreso por WhatsApp'],
    deliveryMode: 'Entrega digital por WhatsApp tras confirmar pago.',
    usageConditions: ['Consultar dispositivos compatibles y condiciones de uso antes de pedir.'],
    warranty: 'Garantía de funcionamiento durante el mes contratado.',
    faqs: [
      {
        question: '¿Cuál es la diferencia entre Cuenta y Cuenta con IA?',
        answer: 'Ambas cuestan S/ 20.00; al escribirnos por WhatsApp te indicamos cuál se ajusta mejor a tu flujo de edición.',
      },
    ],
  },
  {
    id: 'ilovepdf',
    name: 'iLovePDF',
    brand: 'iLovePDF',
    categoryId: 'software',
    shortDescription:
      'Convierte, comprime, une, firma y edita archivos PDF sin límites en modalidad de cuenta compartida.',
    description:
      'Ahorra tiempo en trámites, trabajos y documentos de oficina con todas las herramientas premium de iLovePDF en cuenta compartida.',
    price: 15.0,
    duration: 'Según plan',
    availability: 'Disponible',
    monogram: 'PDF',
    brandAccent: '#EF4444',
    brandAccentSecondary: '#7F1D1D',
    plans: [{id: 'pdf-shared', name: 'Cuenta compartida', duration: 'Consultar vigencia', price: 15.0}],
    features: [
      'Conversión ilimitada entre PDF, Word, Excel y PowerPoint',
      'Compresión avanzada, OCR y edición de documentos',
      'Acceso web desde cualquier computadora o celular',
    ],
    includes: ['Acceso a cuenta compartida', 'Soporte por WhatsApp'],
    deliveryMode: 'Entrega digital vía WhatsApp al confirmar disponibilidad y pago.',
    usageConditions: ['Modalidad de cuenta compartida; no almacenar documentos privados permanentes.'],
    warranty: 'Garantía de funcionamiento durante el periodo informado.',
    faqs: [
      {
        question: '¿Necesito instalar algún programa?',
        answer: 'Puedes usarlo directamente desde tu navegador web sin instalaciones complicadas.',
      },
    ],
  },
  {
    id: 'duolingo-super',
    name: 'Duolingo Super',
    brand: 'Duolingo',
    categoryId: 'software',
    shortDescription:
      'Aprende idiomas sin anuncios, con vidas ilimitadas y práctica personalizada por 1 año en tu propio correo.',
    description:
      'Activa Duolingo Super por 1 año completo directamente vinculado a tu correo electrónico para conservar tu racha y progreso.',
    price: 45.0,
    duration: '1 año',
    availability: 'Disponible',
    monogram: 'DUO',
    brandAccent: '#22C55E',
    brandAccentSecondary: '#14532D',
    plans: [{id: 'duo-1y', name: '1 año a tu correo', duration: '1 año', price: 45.0}],
    features: [
      'Activación directa a tu correo electrónico personal',
      'Vidas ilimitadas y sin interrupciones publicitarias',
      'Conservas tu progreso, ligas y racha actual',
    ],
    includes: ['Activación anual a tu correo', 'Verificación y soporte por WhatsApp'],
    deliveryMode: 'Activación digital coordinada por WhatsApp con tu correo.',
    usageConditions: ['Solo requiere tu correo de cuenta Duolingo; nunca compartas tu contraseña.'],
    warranty: 'Garantía durante los 12 meses de vigencia.',
    faqs: [
      {
        question: '¿Mantengo mi racha y avance actual?',
        answer: 'Sí, al activarse directamente en tu correo conservas todo tu historial y progreso.',
      },
    ],
  },
  {
    id: 'numeros-virtuales-colombia',
    name: 'Números virtuales WhatsApp (Colombia)',
    brand: 'Servicios Digitales',
    categoryId: 'software',
    shortDescription:
      'Número virtual de Colombia para activar y gestionar WhatsApp o WhatsApp Business en tu emprendimiento.',
    description:
      'Obtén un número virtual de Colombia para configurar WhatsApp en proyectos comerciales, atención al cliente o líneas secundarias.',
    price: 15.0,
    duration: 'Activación',
    availability: 'Disponible',
    monogram: 'CO',
    brandAccent: '#10B981',
    brandAccentSecondary: '#064E3B',
    plans: [
      {id: 'nv-co', name: 'Número virtual WhatsApp (Colombia)', duration: 'Activación', price: 15.0},
    ],
    features: [
      'Activación rápida guiada por WhatsApp',
      'Útil para líneas comerciales y atención en WhatsApp Business',
      'Soporte durante el proceso de verificación',
    ],
    includes: ['Gestión del número virtual y código de activación', 'Orientación por WhatsApp'],
    deliveryMode: 'Coordinación en tiempo real por WhatsApp para completar la activación.',
    usageConditions: [
      'Consultar disponibilidad y recomendaciones de seguridad (verificación en dos pasos) antes de activar.',
    ],
    warranty: 'Garantía de activación exitosa al momento de la entrega.',
    faqs: [
      {
        question: '¿Cómo recibo el código de activación?',
        answer: 'Coordinamos contigo en línea por WhatsApp para completar la verificación en el momento.',
      },
    ],
  },
  {
    id: 'verificacion-digital-fraudes',
    name: 'Verificación Digital y Prevención de Fraudes',
    brand: 'Seguridad y Validación',
    categoryId: 'software',
    shortDescription:
      'Validación legal de tiendas online, RUC en fuentes públicas, análisis de enlaces sospechosos y auditoría de tu propia seguridad digital.',
    description:
      'Evita estafas antes de comprar o hacer negocios por internet. Revisamos información comercial en fuentes públicas oficiales (RUC/SUNAT, antigüedad de dominio y reputación pública), analizamos enlaces sospechosos y realizamos auditorías de exposición de tu propio correo o cuentas.',
    price: 10.0,
    duration: 'Por informe',
    availability: 'Disponible',
    monogram: 'VD',
    brandAccent: '#3B82F6',
    brandAccentSecondary: '#0F172A',
    plans: [
      {
        id: 'vd-basica',
        name: 'Verificación básica · RUC, tienda o enlace',
        duration: '1 consulta',
        price: 10.0,
      },
      {
        id: 'vd-completa',
        name: 'Informe completo · Validación comercial y seguridad',
        duration: '1 informe',
        price: 20.0,
      },
    ],
    features: [
      'Validación de RUC, estado de empresa y registros comerciales en fuentes públicas oficiales',
      'Evaluación de tiendas online, dominios y enlaces para prevenir phishing y estafas',
      'Auditoría de privacidad y filtraciones de tus propias cuentas o correos (a solicitud del titular)',
    ],
    includes: [
      'Resumen claro de hallazgos y nivel de confiabilidad por WhatsApp',
      'Recomendaciones prácticas para comprar o proteger tus cuentas con seguridad',
    ],
    deliveryMode: 'Entrega del resumen o informe digital directamente por WhatsApp.',
    usageConditions: [
      'Servicio 100% legal basado únicamente en fuentes públicas oficiales, validación comercial o revisión autorizada de tus propias cuentas.',
      'No se realizan búsquedas ni exposición de datos privados de terceros.',
    ],
    warranty: 'Atención clara y entrega verificada del informe acordado por WhatsApp.',
    faqs: [
      {
        question: '¿Qué diferencia hay entre la verificación básica y el informe completo?',
        answer:
          'La verificación básica (S/ 10) valida un enlace, tienda online o RUC puntual en fuentes públicas. El informe completo (S/ 20) suma análisis de reputación comercial, señales de fraude y revisión de seguridad para tus propias cuentas.',
      },
      {
        question: '¿Se consultan datos privados de personas?',
        answer:
          'No. Trabajamos únicamente con fuentes públicas oficiales de empresas, análisis técnico de dominios/enlaces o auditorías de seguridad solicitadas por el propio titular.',
      },
    ],
  },

  // ==================== 5. DISEÑO Y CREATIVIDAD ====================
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    brand: 'Canva',
    categoryId: 'diseno',
    shortDescription:
      'Diseña como profesional con plantillas Pro, eliminador de fondo y recursos premium en planes de 1 mes, 1 año o 3 años.',
    description:
      'Desbloquea todas las herramientas de Canva Pro para tus redes sociales, presentaciones y marca con planes de 1 mes (S/ 10), 1 año (S/ 30) o 3 años (S/ 90).',
    price: 10.0,
    duration: '1 mes',
    availability: 'Disponible',
    promoLabel: 'Desde S/ 10',
    featured: true,
    mostChosen: true,
    monogram: 'CV',
    brandAccent: '#06B6D4',
    brandAccentSecondary: '#2563EB',
    plans: [
      {id: 'cv-1m', name: 'Canva Pro · 1 mes', duration: '1 mes', price: 10.0},
      {id: 'cv-1y', name: 'Canva Pro · 1 año', duration: '1 año', price: 30.0},
      {id: 'cv-3y', name: 'Canva Pro · 3 años', duration: '3 años', price: 90.0},
    ],
    features: [
      'Eliminador de fondo, redimensión mágica y kit de marca',
      'Millones de fotos, videos, íconos y plantillas Pro',
      'Opciones de 1 mes, 1 año y 3 años',
    ],
    includes: ['Activación del plan elegido', 'Soporte y verificación por WhatsApp'],
    deliveryMode: 'Entrega y activación coordinada por WhatsApp.',
    usageConditions: ['Consultar modalidad de activación en correo personal por WhatsApp.'],
    warranty: 'Garantía por toda la duración del plan contratado.',
    faqs: [
      {
        question: '¿Cuál es el plan más conveniente?',
        answer: 'El plan de 1 año a S/ 30.00 es el más elegido por emprendedores y estudiantes por su gran ahorro.',
      },
    ],
  },
  {
    id: 'autodesk',
    name: 'Autodesk',
    brand: 'Autodesk',
    categoryId: 'diseno',
    shortDescription:
      'AutoCAD, Civil 3D, Revit y herramientas de ingeniería en paquete por 1 año o activación a tu correo por 2 años.',
    description:
      'Accede al ecosistema de diseño e ingeniería de Autodesk (AutoCAD, Civil 3D y más) con paquete anual (S/ 80) o activación directa al correo del cliente por 2 años (S/ 150).',
    price: 80.0,
    duration: '1 año',
    availability: 'Disponible',
    monogram: 'CAD',
    brandAccent: '#2563EB',
    brandAccentSecondary: '#1E3A8A',
    plans: [
      {id: 'adk-1y', name: 'Paquete por 1 año', duration: '1 año', price: 80.0},
      {id: 'adk-2y', name: 'Activación al correo del cliente · 2 años', duration: '2 años', price: 150.0},
    ],
    features: [
      'Acceso a herramientas de arquitectura, ingeniería y diseño CAD',
      'Opción de activación directa al correo del cliente por 2 años',
      'Descarga desde la plataforma oficial de Autodesk',
    ],
    includes: ['Activación según plan elegido', 'Orientación técnica por WhatsApp'],
    deliveryMode: 'Activación digital coordinada vía WhatsApp.',
    usageConditions: ['Verificar requisitos de tu PC y programas necesarios antes de confirmar.'],
    warranty: 'Garantía de activación y vigencia durante el periodo contratado.',
    faqs: [
      {
        question: '¿Incluye AutoCAD y Civil 3D?',
        answer: 'Sí, consúltanos por WhatsApp los programas específicos que necesitas para confirmarte el paquete exacto.',
      },
    ],
  },

  // ==================== 6. ANTIVIRUS Y SEGURIDAD ====================
  {
    id: 'eset',
    name: 'ESET – Licencias por 1 año',
    brand: 'ESET',
    categoryId: 'antivirus',
    shortDescription:
      'Protección antivirus ligera y confiable durante 1 año completo para 1, 3 o 5 dispositivos.',
    description:
      'Protege tus computadoras y equipos contra virus, ransomware y amenazas web con licencias ESET por 1 año para 1 dispositivo (S/ 50), 3 dispositivos (S/ 138) o 5 dispositivos (S/ 180).',
    price: 50.0,
    duration: '1 año',
    availability: 'Disponible',
    promoLabel: '1, 3 o 5 equipos',
    featured: true,
    monogram: 'ES',
    brandAccent: '#10B981',
    brandAccentSecondary: '#065F46',
    plans: [
      {id: 'eset-1d', name: '1 dispositivo · 1 año', duration: '1 año', price: 50.0},
      {id: 'eset-3d', name: '3 dispositivos · 1 año', duration: '1 año', price: 138.0},
      {id: 'eset-5d', name: '5 dispositivos · 1 año', duration: '1 año', price: 180.0},
    ],
    features: [
      'Protección en tiempo real contra malware, phishing y ransomware',
      'Bajo consumo de recursos para no lentear tu PC',
      'Planes de 1, 3 y 5 dispositivos por 1 año completo',
    ],
    includes: ['Licencia digital ESET por 1 año', 'Guía de descarga oficial y activación por WhatsApp'],
    deliveryMode: 'Entrega digital de clave y guía por WhatsApp.',
    usageConditions: ['Respetar el número de dispositivos del plan contratado.'],
    warranty: 'Garantía de licencia activa durante todo el año contratado.',
    faqs: [
      {
        question: '¿Sirve para varias laptops en casa u oficina?',
        answer: 'Sí, puedes elegir el plan de 3 dispositivos (S/ 138) o 5 dispositivos (S/ 180).',
      },
    ],
  },
  {
    id: 'otros-antivirus',
    name: 'Otros antivirus',
    brand: 'Seguridad Digital',
    categoryId: 'antivirus',
    shortDescription:
      'Otras marcas de antivirus disponibles (como Kaspersky o McAfee) con licencia anual desde S/ 50.',
    description:
      '¿Prefieres otra marca de antivirus para tu computadora? Consúltanos por WhatsApp la marca disponible que necesitas y te brindamos la licencia y guía de activación.',
    price: 50.0,
    duration: '1 año',
    availability: 'Consultar disponibilidad',
    monogram: 'AV',
    brandAccent: '#059669',
    brandAccentSecondary: '#064E3B',
    plans: [{id: 'av-otros', name: 'Licencia anual · Consultar marca', duration: '1 año', price: 50.0}],
    features: [
      'Protección contra amenazas web, virus y spyware',
      'Consulta marcas disponibles al instante por WhatsApp',
      'Soporte durante la instalación y activación',
    ],
    includes: ['Licencia digital según marca elegida', 'Acompañamiento por WhatsApp'],
    deliveryMode: 'Entrega digital por WhatsApp tras confirmar disponibilidad y pago.',
    usageConditions: ['Consultar marca y compatibilidad antes de realizar el pago.'],
    warranty: 'Garantía vigente durante el periodo de la licencia contratada.',
    faqs: [
      {
        question: '¿Qué marcas tienen disponibles?',
        answer: 'Escríbenos por WhatsApp indicando el antivirus que buscas y te confirmamos stock inmediato.',
      },
    ],
  },
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-trimestral-netflix',
    name: 'Ahorro Trimestral Netflix (3 Meses)',
    categoryLabel: 'Streaming',
    description:
      'Lleva tu perfil de Netflix por 3 meses completos a S/ 38.00 en lugar de pagar S/ 54.00 mes a mes.',
    promoPrice: 38.0,
    previousPrice: 54.0,
    validity: 'Consultar disponibilidad vigente',
    imageUrl: '/assets/aistudio/file_000000009b6c820eaea23a11f8a48567_f48d1189.png',
    highlights: [
      'Ahorro real de S/ 16.00 frente al pago mensual',
      '3 meses continuos sin preocuparte por renovar cada mes',
      'Entrega y soporte directo por WhatsApp',
    ],
  },
  {
    id: 'promo-canva-anual',
    name: 'Canva Pro por 1 Año Completo',
    categoryLabel: 'Diseño y Creatividad',
    description:
      'Diseña durante los 12 meses del año por solo S/ 30.00 en lugar de pagar mes a mes.',
    promoPrice: 30.0,
    previousPrice: 120.0,
    validity: 'Tarifa oficial vigente',
    imageUrl: MEDIA_ASSETS.comboCreative,
    highlights: [
      'Ideal para emprendedores, estudiantes y creadores',
      'Todas las plantillas y herramientas Pro incluidas',
      'También disponible plan de 3 años a S/ 90.00',
    ],
  },
  {
    id: 'promo-max-player-4m',
    name: 'Pack Max Player 4 Meses',
    categoryLabel: 'IPTV y TV Digital',
    description:
      'Disfruta 4 meses de televisión digital con Max Player por S/ 40.00 (ahorras S/ 20.00 frente al plan mensual).',
    promoPrice: 40.0,
    previousPrice: 60.0,
    validity: 'Consultar disponibilidad vigente',
    imageUrl: MEDIA_ASSETS.promoEntertainment,
    highlights: [
      '4 meses de entretenimiento por un solo pago',
      'Guía de instalación paso a paso incluida',
      'Atención personalizada por WhatsApp',
    ],
  },
];

export const COMBOS: ComboOffer[] = [
  {
    id: 'combo-entretenimiento',
    name: 'Combo de Entretenimiento',
    tagline: 'Series, películas y TV en vivo',
    description:
      'Reúne las plataformas más solicitadas de cine, series y TV digital en una sola consulta por WhatsApp.',
    services: ['Netflix Perfil (1 mes)', 'Disney+ Estándar (1 mes)', 'IPTV (1 mes)'],
    duration: '1 mes',
    promoPrice: 38.0,
    previousPrice: 40.0,
    imageUrl: MEDIA_ASSETS.promoEntertainment,
    accentColor: '#2563EB',
  },
  {
    id: 'combo-productividad',
    name: 'Combo de Productividad e IA',
    tagline: 'Estudio, oficina e inteligencia artificial',
    description:
      'Combina herramientas de oficina, inteligencia artificial y diseño anual para maximizar tu rendimiento.',
    services: ['Office 365 (1 año)', 'ChatGPT Compartido (1 mes)', 'Canva Pro (1 año)'],
    duration: '1 mes a 1 año según servicio',
    promoPrice: 135.0,
    previousPrice: 139.0,
    imageUrl: MEDIA_ASSETS.promoProductivityAi,
    accentColor: '#10B981',
  },
  {
    id: 'combo-diseno',
    name: 'Combo Creador y Diseño',
    tagline: 'Diseño gráfico, video y documentos',
    description:
      'Pensado para emprendedores y creadores de contenido que diseñan y editan todos los días.',
    services: ['Canva Pro (1 año)', 'CapCut con IA (1 mes)', 'iLovePDF Compartido'],
    duration: 'Según servicio',
    promoPrice: 62.0,
    previousPrice: 65.0,
    imageUrl: MEDIA_ASSETS.comboCreative,
    accentColor: '#3B82F6',
  },
  {
    id: 'combo-servicios-digitales',
    name: 'Combo Música y Cine (3 Meses)',
    tagline: 'Ahorro trimestral en entretenimiento',
    description:
      'Disfruta 3 meses completos de series, películas y música sin anuncios con una sola coordinación.',
    services: ['Netflix Perfil (3 meses)', 'Spotify (3 meses)'],
    duration: '3 meses',
    promoPrice: 69.0,
    previousPrice: 71.0,
    imageUrl: MEDIA_ASSETS.heroHub,
    accentColor: '#0EA5E9',
  },
];

export const VIP_BENEFITS = [
  {
    title: 'Precios especiales',
    description: 'Accede a tarifas diferenciadas que te permiten obtener un margen competitivo en cada venta.',
  },
  {
    title: 'Opciones de compra mayorista',
    description: 'Adquiere paquetes y lotes de servicios digitales adaptados al ritmo de tu cartera de clientes.',
  },
  {
    title: 'Variedad de servicios',
    description: 'Ofrece streaming, IPTV, software, antivirus, diseño e inteligencia artificial desde un solo proveedor.',
  },
  {
    title: 'Atención preferencial',
    description: 'Canal ágil por WhatsApp para consultas, entregas y acompañamiento comercial continuo.',
  },
  {
    title: 'Promociones exclusivas',
    description: 'Entérate primero de ofertas especiales y combos pensados para impulsar tus campañas.',
  },
  {
    title: 'Oportunidades de reventa',
    description: 'Escala tu emprendimiento digital a tu propio ritmo y construye ingresos recurrentes.',
  },
];

export const VIP_LEVELS: VipLevel[] = [
  {
    id: 'vip-inicial',
    name: 'VIP INICIAL',
    subtitle: 'Para quienes desean comenzar',
    description:
      'Ideal si estás iniciando tu negocio de servicios digitales y quieres empezar con compras flexibles y orientación comercial.',
    highlights: [
      'Acceso a tarifas iniciales de revendedor',
      'Catálogo variado desde tus primeros pedidos',
      'Acompañamiento para tus primeras ventas',
    ],
  },
  {
    id: 'vip-pro',
    name: 'VIP PRO',
    subtitle: 'Para revendedores frecuentes',
    description:
      'Diseñado para emprendedores con pedidos constantes que buscan mejores márgenes y prioridad en la atención.',
    highlights: [
      'Mejores precios por recurrencia semanal o mensual',
      'Atención preferencial por WhatsApp',
      'Acceso anticipado a promociones y combos',
    ],
    recommended: true,
  },
  {
    id: 'vip-mayorista',
    name: 'VIP MAYORISTA',
    subtitle: 'Para quienes buscan trabajar con un volumen mayor',
    description:
      'Pensado para distribuidores consolidados que gestionan un alto volumen de clientes y buscan condiciones mayoristas.',
    highlights: [
      'Escala de precios mayoristas por volumen',
      'Coordinación directa para pedidos grandes',
      'Condiciones comerciales personalizadas',
    ],
  },
];

export const SOFTOPIA_PARTNER = {
  name: 'Softopia Perú',
  url: 'https://softopiaperu.vercel.app',
  categoryLabel: 'Solución empresarial · Facturación electrónica',
  headline: '¿Tienes un negocio y necesitas facturación electrónica?',
  description:
    'Conoce Softopia Perú, nuestra plataforma especializada en facturación electrónica para emprendedores, negocios y empresas en todo el Perú.',
  ctaLabel: 'Visitar Softopia Perú',
} as const;

export const PURCHASE_STEPS = [
  {
    step: '01',
    title: 'Elige tu servicio y plan',
    description:
      'Explora las categorías, revisa el precio en soles, la duración y elige el plan que mejor se adapte a ti.',
  },
  {
    step: '02',
    title: 'Escríbenos por WhatsApp',
    description:
      'Con un solo toque se abre WhatsApp con tu consulta lista. También puedes sumar varios servicios en un mismo mensaje.',
  },
  {
    step: '03',
    title: 'Coordina tu pago y activa',
    description:
      'Confirmamos disponibilidad, condiciones de entrega y medio de pago por WhatsApp, y te acompañamos en la activación.',
  },
];

export const BRAND_BENEFITS = [
  {
    id: 'variedad',
    title: 'Variedad de servicios',
    description: 'Encuentra diferentes soluciones digitales en un solo lugar.',
  },
  {
    id: 'atencion',
    title: 'Atención personalizada',
    description: 'Resolvemos tus consultas directamente por WhatsApp.',
  },
  {
    id: 'informacion',
    title: 'Información clara',
    description: 'Conoce los precios en soles, características y condiciones antes de comprar.',
  },
  {
    id: 'acompanamiento',
    title: 'Acompañamiento',
    description: 'Te orientamos durante el proceso de compra y activación.',
  },
];

export const GENERAL_FAQS: {
  id: string;
  question: string;
  answer: string;
  showWhatsAppCta?: boolean;
}[] = [
  {
    id: 'como-comprar',
    question: '¿Cómo puedo comprar un producto?',
    answer:
      'Explora el catálogo, elige el servicio y el plan que necesitas y presiona el botón "Consultar por WhatsApp" o "Solicitar por WhatsApp". Se abrirá una conversación con el mensaje preparado para confirmar disponibilidad y finalizar tu pedido.',
  },
  {
    id: 'como-pagar',
    question: '¿Cómo realizo el pago?',
    answer:
      'Todos los precios están expresados en soles (S/) y los pagos se coordinan directamente por WhatsApp una vez confirmada la disponibilidad del servicio.',
    showWhatsAppCta: true,
  },
  {
    id: 'tiempo-entrega',
    question: '¿Cuánto demora la entrega?',
    answer:
      'La entrega es digital y se coordina por WhatsApp una vez confirmado el pago. Las condiciones de entrega y activación se indican claramente antes de concretar cada pedido.',
  },
  {
    id: 'garantia',
    question: '¿Todos los productos tienen garantía?',
    answer:
      'Cada servicio cuenta con condiciones y garantía aplicables según su modalidad y duración. Ten en cuenta que algunas plataformas trabajan con cuentas compartidas.',
  },
  {
    id: 'renovacion',
    question: '¿Cómo puedo renovar mi servicio?',
    answer:
      'Solo escríbenos por WhatsApp uno o dos días antes de la fecha de vencimiento indicando el servicio que tienes activo. Coordinaremos tu renovación de manera rápida.',
    showWhatsAppCta: true,
  },
  {
    id: 'revendedor',
    question: '¿Cómo puedo convertirme en revendedor?',
    answer:
      'Ingresa a la sección Sami VIP y presiona "Quiero ser revendedor". Te atenderemos por WhatsApp para explicarte los niveles disponibles (VIP Inicial, VIP Pro y VIP Mayorista), requisitos y precios preferenciales.',
    showWhatsAppCta: true,
  },
  {
    id: 'atencion',
    question: '¿Cómo puedo recibir atención?',
    answer:
      'Puedes contactarnos en cualquier momento desde el botón de WhatsApp en la barra inferior o desde cualquier producto del catálogo al número +51 941 842 880.',
    showWhatsAppCta: true,
  },
];

export const LEGAL_DOCS = {
  terms: {
    title: 'Términos y condiciones',
    updated: 'Información comercial vigente',
    sections: [
      {
        heading: '1. Alcance del catálogo digital',
        body: 'Sami Streaming opera esta aplicación web como catálogo informativo y vitrina comercial. No se procesan pagos ni se crean cuentas de usuario dentro de la plataforma; toda consulta, verificación de disponibilidad, pago y entrega se coordina directamente por WhatsApp.',
      },
      {
        heading: '2. Precios y disponibilidad',
        body: 'Todos los precios están expresados en soles (S/) y tienen carácter informativo. Consultar disponibilidad antes de realizar cualquier pedido; nuestro equipo confirmará por WhatsApp la disponibilidad y condiciones vigentes.',
      },
      {
        heading: '3. Modalidad de cuentas y garantía',
        body: 'Algunas plataformas trabajan con cuentas compartidas y otras con activación directa al correo o licencia digital. La garantía aplicable rige durante el periodo contratado cumpliendo las condiciones comunicadas al momento de la entrega.',
      },
      {
        heading: '4. Marcas y servicios',
        body: 'Los nombres comerciales mencionados se utilizan únicamente con fines descriptivos para identificar los servicios consultados. Sami Streaming solo ofrece servicios conforme a su disponibilidad y autorización legítima.',
      },
    ],
  },
  privacy: {
    title: 'Política de privacidad',
    updated: 'Privacidad y protección de consultas',
    sections: [
      {
        heading: '1. Navegación sin registro',
        body: 'Esta plataforma es pública y no requiere crear cuentas, contraseñas ni completar formularios personales dentro del sitio web para explorar el catálogo.',
      },
      {
        heading: '2. Comunicación por WhatsApp',
        body: 'Cuando decides contactarnos mediante los enlaces de WhatsApp, la conversación se realiza directamente a través de la aplicación de WhatsApp al número +51 941 842 880 bajo sus propios estándares de mensajería.',
      },
      {
        heading: '3. Uso de la información proporcionada',
        body: 'Los datos que nos compartas voluntariamente por WhatsApp (como el correo necesario para activar un servicio o tu comprobante de pago) se utilizan exclusivamente para gestionar tu pedido, activar tu servicio y brindarte soporte.',
      },
      {
        heading: '4. Conservación y consultas',
        body: 'No compartimos ni vendemos tus datos de contacto a terceros. Si tienes alguna consulta sobre tus datos o atención comercial, puedes escribirnos directamente por WhatsApp.',
      },
    ],
  },
};
