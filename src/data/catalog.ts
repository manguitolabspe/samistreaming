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
  price: number;
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
  price: number;
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
    name: 'Streaming',
    shortName: 'Streaming',
    description: 'Series, películas, anime y música en alta definición.',
    accentFrom: '#2563EB',
    accentTo: '#3B82F6',
  },
  {
    id: 'iptv',
    name: 'IPTV y Televisión Digital',
    shortName: 'IPTV y TV',
    description: 'Canales en vivo, deportes y contenido bajo demanda.',
    accentFrom: '#0EA5E9',
    accentTo: '#2563EB',
  },
  {
    id: 'software',
    name: 'Software y Productividad',
    shortName: 'Software',
    description: 'Herramientas esenciales para estudio, oficina y edición.',
    accentFrom: '#2563EB',
    accentTo: '#10B981',
  },
  {
    id: 'antivirus',
    name: 'Antivirus y Seguridad',
    shortName: 'Antivirus',
    description: 'Protección digital confiable para tus dispositivos.',
    accentFrom: '#10B981',
    accentTo: '#059669',
  },
  {
    id: 'diseno',
    name: 'Diseño y Creatividad',
    shortName: 'Diseño',
    description: 'Plataformas profesionales de diseño gráfico e ingeniería.',
    accentFrom: '#3B82F6',
    accentTo: '#6366F1',
  },
  {
    id: 'ia',
    name: 'Inteligencia Artificial',
    shortName: 'Inteligencia IA',
    description: 'Modelos avanzados para redacción, análisis y creación visual.',
    accentFrom: '#06B6D4',
    accentTo: '#2563EB',
  },
  {
    id: 'combos',
    name: 'Combos y Promociones',
    shortName: 'Combos',
    description: 'Packs combinados con ahorro real para tu día a día.',
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

/**
 * CATÁLOGO DE PRODUCTOS — SAMI STREAMING
 * Estructura uniforme para actualizar fácilmente precios, planes, disponibilidad y promociones.
 */
export const PRODUCTS: Product[] = [
  // ==================== STREAMING ====================
  {
    id: 'netflix',
    name: 'Netflix',
    brand: 'Netflix',
    categoryId: 'streaming',
    shortDescription:
      'Disfruta series originales, películas y documentales en calidad Ultra HD 4K desde tu televisor, celular o laptop.',
    description:
      'Accede al catálogo completo de series, películas y estrenos de Netflix con planes adaptados a tu uso personal o familiar. Coordinamos la entrega y activación directamente por WhatsApp.',
    price: 14.0,
    previousPrice: 18.0,
    duration: '1 mes',
    availability: 'Disponible',
    promoLabel: 'Precio promocional',
    featured: true,
    mostChosen: true,
    monogram: 'N',
    brandAccent: '#E50914',
    brandAccentSecondary: '#7F1D1D',
    imageUrl: '/assets/aistudio/file_000000009b6c820eaea23a11f8a48567_f48d1189.png',
    plans: [
      {id: 'nf-1m', name: '1 Perfil · 1 Mes', duration: '30 días', price: 14.0, previousPrice: 18.0},
      {id: 'nf-3m', name: '1 Perfil · 3 Meses', duration: '90 días', price: 39.0, previousPrice: 48.0},
      {id: 'nf-full', name: 'Cuenta Completa · 1 Mes', duration: '30 días', price: 48.0},
    ],
    features: [
      'Reproducción en calidad Full HD y Ultra HD 4K según dispositivo',
      'Compatible con Smart TV, Android, iOS, web y consolas',
      'Perfil personal con PIN de acceso',
      'Renovación sencilla al finalizar el periodo',
    ],
    includes: [
      'Credenciales de acceso al servicio según el plan elegido',
      'Guía rápida de inicio de sesión',
      'Acompañamiento por WhatsApp ante cualquier consulta',
    ],
    deliveryMode: 'Entrega digital directa por WhatsApp una vez confirmado el pago.',
    usageConditions: [
      'Usar únicamente en el perfil y cantidad de dispositivos contratados.',
      'No modificar correo ni contraseña en planes de perfil individual.',
      'Disponibilidad sujeta a confirmación al momento de la consulta.',
    ],
    warranty:
      'Garantía de funcionamiento durante el tiempo contratado, cumpliendo las condiciones de uso indicadas al momento de la compra.',
    faqs: [
      {
        question: '¿Funciona en Smart TV y celular?',
        answer: 'Sí, es compatible con televisores inteligentes, teléfonos Android, iPhone, tablets y computadoras.',
      },
      {
        question: '¿Puedo renovar al terminar el mes?',
        answer: 'Sí, solo debes escribirnos por WhatsApp antes del vencimiento para coordinar la renovación.',
      },
    ],
  },
  {
    id: 'disney-plus',
    name: 'Disney+',
    brand: 'Disney+',
    categoryId: 'streaming',
    shortDescription:
      'Todo el universo de Disney, Pixar, Marvel, Star Wars, National Geographic y deportes de ESPN en un solo lugar.',
    description:
      'Ideal para disfrutar en familia o seguir tus torneos deportivos favoritos. Accede a estrenos, clásicos y contenido en vivo con el plan que mejor se ajuste a ti.',
    price: 11.0,
    previousPrice: 14.0,
    duration: '1 mes',
    availability: 'Disponible',
    promoLabel: 'Oferta vigente',
    featured: true,
    mostChosen: true,
    monogram: 'D+',
    brandAccent: '#1D4ED8',
    brandAccentSecondary: '#0F172A',
    imageUrl: '/assets/aistudio/file_000000007ee8820eb3960b0d51cfdac6_fa1f8008.png',
    plans: [
      {id: 'dp-1m', name: '1 Perfil · Estándar (1 Mes)', duration: '30 días', price: 11.0, previousPrice: 14.0},
      {id: 'dp-prem', name: '1 Perfil · Premium con ESPN (1 Mes)', duration: '30 días', price: 15.0},
      {id: 'dp-3m', name: '1 Perfil · Premium (3 Meses)', duration: '90 días', price: 42.0},
    ],
    features: [
      'Catálogo de Disney, Pixar, Marvel, Star Wars y Star',
      'Opción Premium con eventos deportivos de ESPN en vivo',
      'Audio latino, subtitulado y calidad hasta 4K UHD',
      'Compatible con múltiples dispositivos modernos',
    ],
    includes: [
      'Acceso configurado según el plan seleccionado',
      'Soporte de activación por WhatsApp',
    ],
    deliveryMode: 'Entrega digital por WhatsApp tras verificar el pago.',
    usageConditions: [
      'Uso exclusivo en el perfil asignado y dentro del dispositivo contratado.',
      'Mantener los datos de acceso sin cambios en modalidad de perfil.',
    ],
    warranty: 'Cobertura de soporte y garantía por todo el periodo contratado.',
    faqs: [
      {
        question: '¿Incluye deportes en vivo de ESPN?',
        answer: 'El plan Premium incluye acceso a los canales y eventos deportivos de ESPN disponibles en la plataforma.',
      },
    ],
  },
  {
    id: 'max',
    name: 'Max',
    brand: 'Max',
    categoryId: 'streaming',
    shortDescription:
      'Series aclamadas de HBO, estrenos de Warner Bros., cine internacional, DC y documentales en alta definición.',
    description:
      'Disfruta producciones exclusivas de HBO, películas taquilleras y contenido para toda la familia en la plataforma Max con excelente calidad de imagen y sonido.',
    price: 10.0,
    duration: '1 mes',
    availability: 'Disponible',
    mostChosen: true,
    monogram: 'MX',
    brandAccent: '#2563EB',
    brandAccentSecondary: '#1E1B4B',
    plans: [
      {id: 'max-1m', name: '1 Perfil · Platino (1 Mes)', duration: '30 días', price: 10.0},
      {id: 'max-3m', name: '1 Perfil · Platino (3 Meses)', duration: '90 días', price: 27.0},
    ],
    features: [
      'Catálogo completo de HBO, Warner Bros., DC y Discovery',
      'Calidad de video hasta 4K UHD y audio envolvente',
      'Descargas disponibles en dispositivos móviles',
    ],
    includes: ['Acceso al servicio por el periodo elegido', 'Orientación en la activación vía WhatsApp'],
    deliveryMode: 'Envío de acceso por WhatsApp después de confirmar el pago.',
    usageConditions: [
      'Uso personal en el perfil asignado.',
      'Respetar la configuración del acceso entregado.',
    ],
    warranty: 'Garantía activa durante los días contratados bajo uso correcto.',
    faqs: [
      {
        question: '¿Tiene contenido en español latino?',
        answer: 'Sí, la gran mayoría de series y películas cuentan con audio en español latino y subtítulos.',
      },
    ],
  },
  {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    brand: 'Crunchyroll',
    categoryId: 'streaming',
    shortDescription:
      'El catálogo de anime más grande con estrenos en simultáneo desde Japón, sin anuncios y en alta definición.',
    description:
      'Sigue tus animes favoritos con episodios estreno poco después de su emisión en Japón, sin interrupciones publicitarias y con subtítulos y doblaje latino.',
    price: 9.0,
    duration: '1 mes',
    availability: 'Disponible',
    monogram: 'CR',
    brandAccent: '#F97316',
    brandAccentSecondary: '#7C2D12',
    plans: [
      {id: 'cr-1m', name: 'Mega Fan · 1 Perfil (1 Mes)', duration: '30 días', price: 9.0},
      {id: 'cr-3m', name: 'Mega Fan · 1 Perfil (3 Meses)', duration: '90 días', price: 24.0},
    ],
    features: [
      'Episodios sin anuncios en Full HD',
      'Simulcast con estrenos de temporada',
      'Acceso desde Smart TV, consola, web y móvil',
    ],
    includes: ['Acceso Mega Fan por la duración contratada', 'Asistencia inicial por WhatsApp'],
    deliveryMode: 'Entrega digital directa por WhatsApp.',
    usageConditions: ['Usar únicamente el perfil y dispositivo correspondiente al plan.'],
    warranty: 'Garantía vigente durante todo el mes o trimestre contratado.',
    faqs: [
      {
        question: '¿Los estrenos tienen subtítulos en español?',
        answer: 'Sí, los episodios en simulcast incluyen subtítulos en español y muchos títulos también ofrecen doblaje.',
      },
    ],
  },
  {
    id: 'prime-video',
    name: 'Prime Video',
    brand: 'Amazon Prime Video',
    categoryId: 'streaming',
    shortDescription:
      'Series exclusivas, cine reciente y clásicos imperdibles en una interfaz rápida compatible con todos tus dispositivos.',
    description:
      'Accede al catálogo de Amazon Prime Video con producciones originales, películas en 4K y descarga offline para ver donde quieras.',
    price: 10.0,
    duration: '1 mes',
    availability: 'Disponible',
    monogram: 'PV',
    brandAccent: '#0EA5E9',
    brandAccentSecondary: '#0C4A6E',
    plans: [
      {id: 'pv-1m', name: '1 Perfil · 1 Mes', duration: '30 días', price: 10.0},
      {id: 'pv-3m', name: '1 Perfil · 3 Meses', duration: '90 días', price: 27.0},
    ],
    features: [
      'Series originales y películas en HD / 4K',
      'Función X-Ray con información de escenas y reparto',
      'Compatible con Fire TV, Smart TV, móvil y PC',
    ],
    includes: ['Acceso configurado al servicio', 'Soporte de ingreso por WhatsApp'],
    deliveryMode: 'Entrega digital vía WhatsApp al confirmar el pago.',
    usageConditions: ['No realizar compras ni alquileres adicionales dentro de la cuenta compartida.'],
    warranty: 'Garantía por la duración contratada respetando las condiciones de uso.',
    faqs: [
      {
        question: '¿Puedo usarlo en mi TV y celular?',
        answer: 'Sí, funciona en la aplicación oficial de Prime Video en televisores, celulares y navegadores.',
      },
    ],
  },
  {
    id: 'spotify',
    name: 'Spotify',
    brand: 'Spotify',
    categoryId: 'streaming',
    shortDescription:
      'Escucha tu música y podcasts favoritos sin anuncios, con descargas sin conexión y audio de alta calidad.',
    description:
      'Disfruta reproducción ilimitada sin interrupciones publicitarias, saltos ilimitados y listas offline en tu propia cuenta o plan coordinado por WhatsApp.',
    price: 12.0,
    previousPrice: 16.0,
    duration: '1 mes',
    availability: 'Disponible',
    promoLabel: 'Más solicitado',
    featured: true,
    mostChosen: true,
    monogram: 'SP',
    brandAccent: '#10B981',
    brandAccentSecondary: '#064E3B',
    imageUrl: '/assets/aistudio/file_00000000df60820e86cd9ef3f01150b6_729b0f27.png',
    plans: [
      {id: 'sp-1m', name: 'Individual · 1 Mes', duration: '30 días', price: 12.0, previousPrice: 16.0},
      {id: 'sp-3m', name: 'Individual · 3 Meses', duration: '90 días', price: 33.0, previousPrice: 42.0},
      {id: 'sp-6m', name: 'Individual · 6 Meses', duration: '180 días', price: 62.0},
    ],
    features: [
      'Música y podcasts sin anuncios',
      'Descarga de playlists para escuchar sin internet',
      'Calidad de sonido alta y control total de reproducción',
    ],
    includes: ['Activación del plan Premium elegido', 'Guía y verificación por WhatsApp'],
    deliveryMode: 'Activación coordinada directamente por WhatsApp.',
    usageConditions: [
      'Confirmar por WhatsApp si se activará en tu cuenta personal o mediante nueva invitación.',
    ],
    warranty: 'Garantía durante el periodo contratado con soporte directo por WhatsApp.',
    faqs: [
      {
        question: '¿Conservo mis playlists?',
        answer: 'Sí, al consultarnos por WhatsApp te indicamos la modalidad ideal para mantener tus listas y favoritos.',
      },
    ],
  },

  // ==================== IPTV Y TELEVISIÓN DIGITAL ====================
  {
    id: 'magis-tv',
    name: 'Magis TV',
    brand: 'Magis TV',
    categoryId: 'iptv',
    shortDescription:
      'Televisión en vivo, deportes, canales internacionales y catálogo de películas y series en una sola aplicación.',
    description:
      'Disfruta entretenimiento continuo en Android TV, TV Box, Fire Stick y celulares Android con una interfaz ágil y canales organizados por categoría.',
    price: 15.0,
    previousPrice: 19.0,
    duration: '1 mes',
    availability: 'Disponible',
    promoLabel: 'Recomendado',
    featured: true,
    mostChosen: true,
    monogram: 'MT',
    brandAccent: '#3B82F6',
    brandAccentSecondary: '#1E3A8A',
    plans: [
      {id: 'mg-1m', name: '1 Mes · Hasta 3 dispositivos', duration: '30 días', price: 15.0, previousPrice: 19.0},
      {id: 'mg-3m', name: '3 Meses · Hasta 3 dispositivos', duration: '90 días', price: 42.0},
      {id: 'mg-6m', name: '6 Meses · Hasta 3 dispositivos', duration: '180 días', price: 78.0},
    ],
    features: [
      'Canales en vivo de noticias, cine, infantil y deportes',
      'Sección de películas y series bajo demanda (VOD)',
      'Compatible con Android TV, TV Box, Fire TV y smartphones Android',
    ],
    includes: [
      'Usuario y contraseña activos según el plan',
      'Guía paso a paso de instalación en tu dispositivo',
      'Acompañamiento por WhatsApp',
    ],
    deliveryMode: 'Entrega inmediata de credenciales e instrucciones por WhatsApp tras confirmar pago.',
    usageConditions: [
      'Se recomienda conexión a internet estable de al menos 15 Mbps.',
      'Respetar el límite de dispositivos simultáneos del plan.',
    ],
    warranty: 'Soporte técnico y garantía de acceso durante todo el tiempo contratado.',
    faqs: [
      {
        question: '¿En qué dispositivos funciona Magis TV?',
        answer: 'Funciona en celulares Android, Android TV, Google TV, TV Box y Amazon Fire TV Stick.',
      },
    ],
  },
  {
    id: 'stella-tv',
    name: 'Stella TV',
    brand: 'Stella TV',
    categoryId: 'iptv',
    shortDescription:
      'Plataforma de televisión digital con canales latinos, deportes en directo y contenido VOD en alta estabilidad.',
    description:
      'Alternativa práctica y fluida para disfrutar televisión por internet con buena calidad de transmisión y variedad de señales en vivo.',
    price: 14.0,
    duration: '1 mes',
    availability: 'Disponible',
    monogram: 'ST',
    brandAccent: '#0EA5E9',
    brandAccentSecondary: '#1E3A8A',
    plans: [
      {id: 'st-1m', name: 'Plan Estándar · 1 Mes', duration: '30 días', price: 14.0},
      {id: 'st-3m', name: 'Plan Estándar · 3 Meses', duration: '90 días', price: 39.0},
    ],
    features: [
      'Programación en vivo de entretenimiento y deportes',
      'Catálogo VOD actualizado',
      'Interfaz ordenada y rápida de navegar',
    ],
    includes: ['Credenciales activas', 'Instrucciones de instalación por WhatsApp'],
    deliveryMode: 'Envío digital por WhatsApp luego de validar tu pago.',
    usageConditions: ['Requiere conexión estable a internet para reproducción fluida.'],
    warranty: 'Garantía y acompañamiento activo durante el periodo contratado.',
    faqs: [
      {
        question: '¿Me ayudan a instalar la app en mi TV?',
        answer: 'Sí, te guiamos paso a paso por WhatsApp para dejarla lista en pocos minutos.',
      },
    ],
  },
  {
    id: 'oleada-tv',
    name: 'Oleada TV',
    brand: 'Oleada TV',
    categoryId: 'iptv',
    shortDescription:
      'Señales en vivo, canales deportivos, programación infantil y entretenimiento latino con conexión fluida.',
    description:
      'Servicio de televisión digital diseñado para quienes buscan variedad de canales y películas con navegación simple en dispositivos compatibles.',
    price: 14.0,
    duration: '1 mes',
    availability: 'Disponible',
    monogram: 'OT',
    brandAccent: '#06B6D4',
    brandAccentSecondary: '#164E63',
    plans: [
      {id: 'ol-1m', name: '1 Mes · 1 conexión', duration: '30 días', price: 14.0},
      {id: 'ol-3m', name: '3 Meses · 1 conexión', duration: '90 días', price: 38.0},
    ],
    features: [
      'Canales en vivo nacionales e internacionales',
      'Guía de programación y categorías organizadas',
      'Compatible con dispositivos Android y reproductores IPTV',
    ],
    includes: ['Acceso configurado', 'Asesoría de instalación por WhatsApp'],
    deliveryMode: 'Entrega digital vía WhatsApp al confirmar el pago.',
    usageConditions: ['Uso exclusivo según las conexiones contratadas.'],
    warranty: 'Garantía durante el plazo contratado con atención por WhatsApp.',
    faqs: [
      {
        question: '¿Puedo probar compatibilidad antes de comprar?',
        answer: 'Escríbenos por WhatsApp indicando el modelo de tu TV o dispositivo y te confirmamos compatibilidad.',
      },
    ],
  },
  {
    id: 'iptv-full-hd',
    name: 'IPTV Full HD',
    brand: 'IPTV Full HD',
    categoryId: 'iptv',
    shortDescription:
      'Lista IPTV multiplataforma compatible con Smart TV (Samsung, LG), Android TV, celulares y computadoras.',
    description:
      'Solución flexible mediante lista M3U o Xtream Codes para televisores Samsung, LG, Apple TV, Android y PC. Ideal si tu Smart TV no usa Android.',
    price: 16.0,
    duration: '1 mes',
    availability: 'Disponible',
    monogram: 'HD',
    brandAccent: '#2563EB',
    brandAccentSecondary: '#0F172A',
    plans: [
      {id: 'iptv-1m', name: '1 Conexión · 1 Mes', duration: '30 días', price: 16.0},
      {id: 'iptv-2c', name: '2 Conexiones · 1 Mes', duration: '30 días', price: 26.0},
      {id: 'iptv-3m', name: '1 Conexión · 3 Meses', duration: '90 días', price: 44.0},
    ],
    features: [
      'Compatible con Smart TV Samsung, LG, Roku compatible, Android y iOS',
      'Calidad HD y Full HD en canales y eventos en vivo',
      'Acceso mediante apps populares como IPTV Smarters o similares',
    ],
    includes: ['Datos de acceso Xtream / M3U', 'Asistencia de configuración en tu TV'],
    deliveryMode: 'Envío de configuración y guía por WhatsApp.',
    usageConditions: ['No compartir las credenciales fuera de las conexiones adquiridas.'],
    warranty: 'Garantía de estabilidad y soporte durante el periodo contratado.',
    faqs: [
      {
        question: '¿Sirve para Smart TV Samsung y LG?',
        answer: 'Sí, te indicamos qué reproductor oficial descargar desde la tienda de tu TV y cómo configurarlo.',
      },
    ],
  },

  // ==================== SOFTWARE Y PRODUCTIVIDAD ====================
  {
    id: 'office-365',
    name: 'Office 365',
    brand: 'Microsoft 365',
    categoryId: 'software',
    shortDescription:
      'Word, Excel, PowerPoint, Outlook y almacenamiento en la nube OneDrive para potenciar tu trabajo y estudios.',
    description:
      'Suite completa de productividad de Microsoft con aplicaciones siempre actualizadas y sincronización en múltiples dispositivos Windows, macOS, Android y iOS.',
    price: 25.0,
    previousPrice: 35.0,
    duration: '1 año',
    availability: 'Disponible',
    promoLabel: 'Ahorro anual',
    featured: true,
    mostChosen: true,
    monogram: '365',
    brandAccent: '#2563EB',
    brandAccentSecondary: '#1D4ED8',
    plans: [
      {id: 'o365-1y', name: 'Plan 1 Año · Hasta 5 dispositivos', duration: '12 meses', price: 25.0, previousPrice: 35.0},
      {id: 'o365-pers', name: 'Activación en tu correo · 1 Año', duration: '12 meses', price: 45.0},
    ],
    features: [
      'Incluye Word, Excel, PowerPoint, Outlook y OneNote',
      'Espacio en la nube OneDrive según modalidad elegida',
      'Compatible con Windows, Mac, tablets y celulares',
    ],
    includes: [
      'Activación o credenciales según plan seleccionado',
      'Guía de descarga oficial e instalación',
      'Soporte de activación por WhatsApp',
    ],
    deliveryMode: 'Entrega e instrucciones de activación por WhatsApp.',
    usageConditions: [
      'Respetar el número máximo de dispositivos del plan.',
      'Mantener respaldo de archivos personales importantes.',
    ],
    warranty: 'Garantía de activación y funcionamiento durante el periodo contratado.',
    faqs: [
      {
        question: '¿Funciona en Mac y Windows?',
        answer: 'Sí, es totalmente compatible con computadoras Windows, macOS, celulares y tablets.',
      },
    ],
  },
  {
    id: 'windows-11-pro',
    name: 'Windows 11 Pro',
    brand: 'Microsoft Windows',
    categoryId: 'software',
    shortDescription:
      'Licencia digital para activar Windows 11 Pro en tu PC o laptop con todas las funciones profesionales y actualizaciones.',
    description:
      'Activa tu sistema operativo de forma limpia y rápida para acceder a herramientas profesionales, seguridad avanzada y actualizaciones oficiales de Microsoft.',
    price: 35.0,
    duration: 'Licencia permanente (1 PC)',
    availability: 'Disponible',
    monogram: 'W11',
    brandAccent: '#0EA5E9',
    brandAccentSecondary: '#0369A1',
    plans: [
      {id: 'w11-oem', name: 'Licencia 1 PC · Activación digital', duration: 'Permanente en el equipo', price: 35.0},
      {id: 'w11-retail', name: 'Licencia Retail · Vinculable', duration: 'Permanente', price: 55.0},
    ],
    features: [
      'Activación directa en Windows 11 Pro (64 bits)',
      'Acceso completo a Windows Update y funciones Pro',
      'Soporte de verificación paso a paso por WhatsApp',
    ],
    includes: ['Clave digital de activación', 'Guía de activación y soporte por WhatsApp'],
    deliveryMode: 'Envío de clave digital e instrucciones vía WhatsApp.',
    usageConditions: [
      'Válida para la edición Windows 11 Pro (confirmar edición instalada antes de comprar).',
    ],
    warranty: 'Garantía de activación exitosa en el equipo especificado.',
    faqs: [
      {
        question: '¿Qué pasa si tengo Windows 11 Home?',
        answer: 'Te asesoramos por WhatsApp antes de la compra sobre cómo actualizar a la edición Pro o elegir la licencia adecuada.',
      },
    ],
  },
  {
    id: 'adobe-creative-cloud',
    name: 'Adobe Creative Cloud',
    brand: 'Adobe',
    categoryId: 'software',
    shortDescription:
      'Photoshop, Illustrator, Premiere Pro, After Effects y más de 20 aplicaciones creativas para proyectos profesionales.',
    description:
      'Potencia tu flujo de diseño, fotografía y edición de video con acceso a las aplicaciones esenciales de Adobe Creative Cloud y actualizaciones recientes.',
    price: 45.0,
    previousPrice: 59.0,
    duration: '1 mes',
    availability: 'Disponible',
    promoLabel: 'Especial creativos',
    featured: true,
    monogram: 'CC',
    brandAccent: '#EF4444',
    brandAccentSecondary: '#7F1D1D',
    plans: [
      {id: 'ad-1m', name: 'All Apps · 1 Mes', duration: '30 días', price: 45.0, previousPrice: 59.0},
      {id: 'ad-3m', name: 'All Apps · 3 Meses', duration: '90 días', price: 120.0},
    ],
    features: [
      'Photoshop, Illustrator, Premiere Pro, After Effects, InDesign y Lightroom',
      'Compatible con Windows y macOS',
      'Instalación desde la app oficial de Creative Cloud',
    ],
    includes: ['Acceso activado al plan Creative Cloud', 'Orientación de instalación por WhatsApp'],
    deliveryMode: 'Coordinación y activación digital por WhatsApp.',
    usageConditions: [
      'Consultar disponibilidad de activación en correo propio antes de concretar.',
    ],
    warranty: 'Garantía activa durante el periodo contratado.',
    faqs: [
      {
        question: '¿Se descargan las apps oficiales de Adobe?',
        answer: 'Sí, las aplicaciones se instalan directamente desde el gestor oficial de Adobe Creative Cloud.',
      },
    ],
  },
  {
    id: 'capcut-pro',
    name: 'CapCut Pro',
    brand: 'CapCut',
    categoryId: 'software',
    shortDescription:
      'Edición profesional de videos para redes sociales con subtítulos automáticos, efectos Pro y exportación sin marca de agua.',
    description:
      'Ideal para creadores de contenido, emprendedores y editores que necesitan transiciones avanzadas, plantillas premium y herramientas inteligentes en celular y PC.',
    price: 16.0,
    duration: '1 mes',
    availability: 'Disponible',
    mostChosen: true,
    monogram: 'CP',
    brandAccent: '#38BDF8',
    brandAccentSecondary: '#1E293B',
    plans: [
      {id: 'cc-1m', name: 'CapCut Pro · 1 Mes', duration: '30 días', price: 16.0},
      {id: 'cc-3m', name: 'CapCut Pro · 3 Meses', duration: '90 días', price: 44.0},
    ],
    features: [
      'Todos los efectos, filtros, fuentes y transiciones Pro',
      'Subtítulos automáticos y eliminación de fondo inteligente',
      'Exportación en alta resolución sin marca de agua',
    ],
    includes: ['Acceso a CapCut Pro por el tiempo elegido', 'Soporte de ingreso por WhatsApp'],
    deliveryMode: 'Entrega digital por WhatsApp una vez confirmado el pago.',
    usageConditions: ['Usar en la cantidad de dispositivos acordada en el plan.'],
    warranty: 'Garantía de funcionamiento durante todo el periodo contratado.',
    faqs: [
      {
        question: '¿Funciona tanto en celular como en PC?',
        answer: 'Sí, te confirmamos por WhatsApp la modalidad compatible con móvil y escritorio.',
      },
    ],
  },

  // ==================== ANTIVIRUS Y SEGURIDAD ====================
  {
    id: 'eset-nod32',
    name: 'ESET NOD32',
    brand: 'ESET',
    categoryId: 'antivirus',
    shortDescription:
      'Protección ligera y veloz contra virus, ransomware y amenazas web sin ralentizar el rendimiento de tu equipo.',
    description:
      'ESET NOD32 ofrece defensa proactiva de bajo consumo de recursos para mantener tu computadora y tus archivos protegidos durante todo el año.',
    price: 38.0,
    previousPrice: 48.0,
    duration: '1 año',
    availability: 'Disponible',
    promoLabel: 'Plan multi-equipo',
    featured: true,
    monogram: 'ES',
    brandAccent: '#10B981',
    brandAccentSecondary: '#065F46',
    plans: [
      {id: 'eset-1d', name: 'Plan de 1 dispositivo · 1 Año', duration: '12 meses', price: 38.0, previousPrice: 48.0},
      {id: 'eset-3d', name: 'Plan de 3 dispositivos · 1 Año', duration: '12 meses', price: 75.0, previousPrice: 92.0},
      {id: 'eset-5d', name: 'Plan de 5 dispositivos · 1 Año', duration: '12 meses', price: 109.0},
    ],
    features: [
      'Detección avanzada de malware, phishing y ransomware',
      'Bajo impacto en memoria y procesador',
      'Actualizaciones constantes de base de virus',
    ],
    includes: [
      'Licencia digital según cantidad de dispositivos seleccionada',
      'Enlace de descarga oficial y guía de activación',
    ],
    deliveryMode: 'Entrega de clave digital y guía por WhatsApp.',
    usageConditions: [
      'No exceder el número de dispositivos permitidos por el plan seleccionado.',
    ],
    warranty: 'Garantía de licencia activa durante todo el periodo anual contratado.',
    faqs: [
      {
        question: '¿Puedo instalarlo en varias laptops de mi casa?',
        answer: 'Sí, solo debes elegir el plan de 3 o 5 dispositivos según tus necesidades.',
      },
    ],
  },
  {
    id: 'kaspersky',
    name: 'Kaspersky',
    brand: 'Kaspersky',
    categoryId: 'antivirus',
    shortDescription:
      'Seguridad integral en tiempo real para navegación segura, pagos en línea y protección frente a amenazas digitales.',
    description:
      'Protege computadoras y teléfonos con defensa multicapa, bloqueo de sitios maliciosos y herramientas de optimización de privacidad.',
    price: 39.0,
    duration: '1 año',
    availability: 'Disponible',
    monogram: 'KS',
    brandAccent: '#10B981',
    brandAccentSecondary: '#047857',
    plans: [
      {id: 'kasp-1d', name: 'Plan de 1 dispositivo · 1 Año', duration: '12 meses', price: 39.0},
      {id: 'kasp-3d', name: 'Plan de 3 dispositivos · 1 Año', duration: '12 meses', price: 79.0},
      {id: 'kasp-5d', name: 'Plan de 5 dispositivos · 1 Año', duration: '12 meses', price: 115.0},
    ],
    features: [
      'Protección en tiempo real contra virus y troyanos',
      'Escudo para banca y compras en línea',
      'Compatible con Windows, macOS, Android y iOS',
    ],
    includes: ['Clave de licencia digital', 'Soporte para descarga y activación por WhatsApp'],
    deliveryMode: 'Entrega digital vía WhatsApp al confirmar el pago.',
    usageConditions: ['Activar dentro de la región compatible indicada al momento de entrega.'],
    warranty: 'Garantía durante el año completo de vigencia de la licencia.',
    faqs: [
      {
        question: '¿Sirve también para celulares Android?',
        answer: 'Sí, las licencias multi-dispositivo te permiten proteger tanto computadoras como teléfonos.',
      },
    ],
  },
  {
    id: 'mcafee',
    name: 'McAfee',
    brand: 'McAfee',
    categoryId: 'antivirus',
    shortDescription:
      'Antivirus completo con protección web, firewall inteligente y cuidado de identidad para tus equipos diarios.',
    description:
      'Mantén tus computadoras y dispositivos móviles resguardados frente a enlaces maliciosos, descargas peligrosas y vulnerabilidades de red.',
    price: 35.0,
    duration: '1 año',
    availability: 'Disponible',
    monogram: 'MC',
    brandAccent: '#EF4444',
    brandAccentSecondary: '#991B1B',
    plans: [
      {id: 'mc-1d', name: 'Plan de 1 dispositivo · 1 Año', duration: '12 meses', price: 35.0},
      {id: 'mc-3d', name: 'Plan de 3 dispositivos · 1 Año', duration: '12 meses', price: 69.0},
      {id: 'mc-5d', name: 'Plan de 5 dispositivos · 1 Año', duration: '12 meses', price: 98.0},
    ],
    features: [
      'Escaneo automático contra malware y spyware',
      'Navegación segura con alertas de sitios riesgosos',
      'Fácil administración desde tu cuenta',
    ],
    includes: ['Licencia digital según plan elegido', 'Asistencia en la instalación por WhatsApp'],
    deliveryMode: 'Entrega digital directa por WhatsApp.',
    usageConditions: ['Respetar el límite de dispositivos incluidos en tu licencia.'],
    warranty: 'Garantía vigente durante los 12 meses del plan.',
    faqs: [
      {
        question: '¿Cuánto tarda la activación?',
        answer: 'La instalación y activación suelen completarse en menos de 10 minutos con nuestra guía.',
      },
    ],
  },

  // ==================== DISEÑO Y CREATIVIDAD ====================
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    brand: 'Canva',
    categoryId: 'diseno',
    shortDescription:
      'Diseña piezas para redes sociales, presentaciones y material comercial con plantillas Pro, quitafondos y kit de marca.',
    description:
      'Desbloquea millones de recursos premium, redimensión mágica, eliminador de fondos en un clic y fuentes exclusivas para elevar la imagen de tus proyectos.',
    price: 10.0,
    previousPrice: 15.0,
    duration: '1 mes',
    availability: 'Disponible',
    promoLabel: 'Favorito emprendedores',
    featured: true,
    mostChosen: true,
    monogram: 'CV',
    brandAccent: '#06B6D4',
    brandAccentSecondary: '#2563EB',
    plans: [
      {id: 'cv-1m', name: 'Activación en tu correo · 1 Mes', duration: '30 días', price: 10.0, previousPrice: 15.0},
      {id: 'cv-3m', name: 'Activación en tu correo · 3 Meses', duration: '90 días', price: 24.0},
      {id: 'cv-1y', name: 'Activación en tu correo · 1 Año', duration: '12 meses', price: 59.0, previousPrice: 75.0},
    ],
    features: [
      'Activación directa con tu propio correo electrónico',
      'Eliminador de fondo y herramientas mágicas de diseño',
      'Acceso a fotos, vectores, videos y plantillas Pro',
    ],
    includes: ['Invitación / activación Pro a tu correo', 'Verificación rápida por WhatsApp'],
    deliveryMode: 'Envío de invitación directa a tu correo coordinada por WhatsApp.',
    usageConditions: ['Tus diseños permanecen privados dentro de tu cuenta personal de Canva.'],
    warranty: 'Garantía por toda la duración del plan contratado.',
    faqs: [
      {
        question: '¿Se activa en mi propia cuenta de Canva?',
        answer: 'Sí, solo necesitamos tu correo de Canva al coordinar por WhatsApp; nunca te pedimos tu contraseña.',
      },
    ],
  },
  {
    id: 'autocad',
    name: 'AutoCAD',
    brand: 'Autodesk',
    categoryId: 'diseno',
    shortDescription:
      'Software líder en diseño asistido por computadora (CAD) 2D y 3D para arquitectura, ingeniería y construcción.',
    description:
      'Trabaja con precisión en planos técnicos, modelado 3D y documentación profesional con activación coordinada y acompañamiento durante la instalación.',
    price: 65.0,
    duration: '1 año',
    availability: 'Disponible',
    monogram: 'AC',
    brandAccent: '#EF4444',
    brandAccentSecondary: '#991B1B',
    plans: [
      {id: 'ac-1y', name: 'Licencia Educacional / Activación · 1 Año', duration: '12 meses', price: 65.0},
      {id: 'ac-pack', name: 'AutoCAD + Complementos · 1 Año', duration: '12 meses', price: 89.0},
    ],
    features: [
      'Diseño de planos 2D y modelado 3D de alta precisión',
      'Compatible con versiones recientes en Windows y macOS',
      'Descarga desde la plataforma oficial de Autodesk',
    ],
    includes: ['Activación en tu cuenta Autodesk', 'Orientación técnica por WhatsApp'],
    deliveryMode: 'Activación digital coordinada vía WhatsApp.',
    usageConditions: ['Verificar requisitos de hardware de tu PC antes de instalar.'],
    warranty: 'Garantía de activación y soporte durante el periodo anual.',
    faqs: [
      {
        question: '¿Se activa en mi correo personal?',
        answer: 'Sí, coordinamos la activación vinculada directamente a tu cuenta de correo.',
      },
    ],
  },
  {
    id: 'civil-3d',
    name: 'Civil 3D',
    brand: 'Autodesk',
    categoryId: 'diseno',
    shortDescription:
      'Solución especializada para ingeniería civil, topografía, diseño de carreteras, superficies y obras de infraestructura.',
    description:
      'Optimiza el diseño de infraestructura y documentación BIM con Autodesk Civil 3D activado para tus proyectos académicos o profesionales.',
    price: 69.0,
    duration: '1 año',
    availability: 'Disponible',
    monogram: 'C3D',
    brandAccent: '#2563EB',
    brandAccentSecondary: '#1E3A8A',
    plans: [
      {id: 'c3d-1y', name: 'Activación Civil 3D · 1 Año', duration: '12 meses', price: 69.0},
    ],
    features: [
      'Herramientas especializadas para topografía, vialidad e hidráulica',
      'Flujos compatibles con metodología BIM y archivos DWG',
      'Descarga oficial para sistemas Windows 64 bits',
    ],
    includes: ['Activación anual en tu cuenta', 'Guía de descarga y soporte por WhatsApp'],
    deliveryMode: 'Coordinación y activación digital directa por WhatsApp.',
    usageConditions: ['Requiere sistema operativo Windows de 64 bits con hardware compatible.'],
    warranty: 'Garantía de activación y funcionamiento durante el periodo contratado.',
    faqs: [
      {
        question: '¿Me orientan si no sé qué versión elegir?',
        answer: 'Claro, escríbenos por WhatsApp las características de tu PC y te recomendamos la versión más estable.',
      },
    ],
  },

  // ==================== INTELIGENCIA ARTIFICIAL ====================
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    brand: 'OpenAI',
    categoryId: 'ia',
    shortDescription:
      'Acceso prioritario a los modelos más avanzados de IA para redacción, análisis de archivos, programación e imágenes.',
    description:
      'Acelera tu productividad diaria en estudios, negocios y creación de contenido con respuestas más rápidas, análisis de documentos y generación visual.',
    price: 29.0,
    previousPrice: 38.0,
    duration: '1 mes',
    availability: 'Disponible',
    promoLabel: 'Alta demanda',
    featured: true,
    mostChosen: true,
    monogram: 'GPT',
    brandAccent: '#10B981',
    brandAccentSecondary: '#064E3B',
    plans: [
      {id: 'gpt-shared', name: 'Plan Compartido · 1 Mes', duration: '30 días', price: 29.0, previousPrice: 38.0},
      {id: 'gpt-priv', name: 'Cuenta Privada · 1 Mes', duration: '30 días', price: 79.0},
    ],
    features: [
      'Acceso a modelos avanzados de razonamiento y conversación',
      'Carga de archivos PDF, hojas de cálculo e imágenes',
      'Generación de imágenes y asistentes personalizados',
    ],
    includes: ['Acceso según modalidad elegida', 'Instrucciones y soporte por WhatsApp'],
    deliveryMode: 'Entrega digital rápida vía WhatsApp tras confirmar pago.',
    usageConditions: [
      'En plan compartido, mantener un uso responsable y no alterar credenciales.',
      'El plan privado ofrece uso exclusivo e historial individual.',
    ],
    warranty: 'Garantía de acceso continuo durante los 30 días contratados.',
    faqs: [
      {
        question: '¿Cuál es la diferencia entre plan compartido y cuenta privada?',
        answer: 'El plan compartido es más económico y da acceso a las funciones Plus; la cuenta privada es de uso exclusivo para ti.',
      },
    ],
  },
  {
    id: 'claude-pro',
    name: 'Claude Pro',
    brand: 'Anthropic',
    categoryId: 'ia',
    shortDescription:
      'Inteligencia artificial sobresaliente para redacción natural, lectura de documentos extensos y desarrollo de código.',
    description:
      'Reconocido por su claridad en análisis de textos largos, investigación estructurada y asistencia en programación con mayor capacidad de uso.',
    price: 32.0,
    duration: '1 mes',
    availability: 'Consultar disponibilidad',
    monogram: 'CL',
    brandAccent: '#F59E0B',
    brandAccentSecondary: '#78350F',
    plans: [
      {id: 'cl-shared', name: 'Acceso Compartido · 1 Mes', duration: '30 días', price: 32.0},
      {id: 'cl-priv', name: 'Plan Privado · 1 Mes', duration: '30 días', price: 82.0},
    ],
    features: [
      'Alta precisión en redacción, resúmenes y análisis complejo',
      'Excelente rendimiento para código y proyectos técnicos',
      'Mayor límite de mensajes frente a la versión gratuita',
    ],
    includes: ['Acceso configurado según plan', 'Acompañamiento por WhatsApp'],
    deliveryMode: 'Coordinación directa por WhatsApp una vez confirmada disponibilidad y pago.',
    usageConditions: ['Sujeto a límites de uso propios de la plataforma y modalidad elegida.'],
    warranty: 'Garantía de soporte y acceso por la duración contratada.',
    faqs: [
      {
        question: '¿Por qué dice Consultar disponibilidad?',
        answer: 'Confirmamos cupos vigentes al instante por WhatsApp para garantizarte un acceso estable antes de realizar el pago.',
      },
    ],
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    brand: 'Midjourney',
    categoryId: 'ia',
    shortDescription:
      'Generación de imágenes e ilustraciones de nivel artístico y fotorrealista para diseño, publicidad y proyectos creativos.',
    description:
      'Crea conceptos visuales impactantes, fotografías de producto e ilustraciones profesionales a partir de descripciones de texto en segundos.',
    price: 34.0,
    duration: '1 mes',
    availability: 'Consultar disponibilidad',
    monogram: 'MJ',
    brandAccent: '#6366F1',
    brandAccentSecondary: '#312E81',
    plans: [
      {id: 'mj-std', name: 'Acceso Estándar · 1 Mes', duration: '30 días', price: 34.0},
      {id: 'mj-pro', name: 'Acceso Avanzado · 1 Mes', duration: '30 días', price: 58.0},
    ],
    features: [
      'Generación de imágenes de alta fidelidad y estética editorial',
      'Escalado, variaciones y control de estilos visuales',
      'Ideal para diseñadores, marketers y creadores visuales',
    ],
    includes: ['Acceso al plan elegido', 'Guía básica de uso y soporte por WhatsApp'],
    deliveryMode: 'Entrega e indicaciones de acceso vía WhatsApp.',
    usageConditions: ['Respetar las políticas de contenido de la plataforma.'],
    warranty: 'Garantía de acceso durante el periodo mensual contratado.',
    faqs: [
      {
        question: '¿Necesito saber usar Discord?',
        answer: 'Te guiamos por WhatsApp para usarlo desde la interfaz web o Discord según el plan disponible.',
      },
    ],
  },
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-cine-musica',
    name: 'Pack Cine y Música Mensual',
    categoryLabel: 'Entretenimiento',
    description:
      'Combina Netflix + Disney+ + Spotify en un solo pedido y ahorra frente a contratarlos por separado.',
    promoPrice: 32.0,
    previousPrice: 43.0,
    validity: 'Sujeto a vigencia mensual',
    imageUrl: MEDIA_ASSETS.promoEntertainment,
    highlights: [
      '3 plataformas líderes en un solo pack',
      'Entrega y activación rápida por WhatsApp',
      'Renovación coordinada en una misma fecha',
    ],
  },
  {
    id: 'promo-estudio-ia',
    name: 'Pack Productividad + IA',
    categoryLabel: 'Productividad e IA',
    description:
      'Equipa tu computadora y acelera tu trabajo diario con Office 365 (1 año) + ChatGPT Plus (1 mes) + Canva Pro (1 mes).',
    promoPrice: 54.0,
    previousPrice: 70.0,
    validity: 'Promoción disponible por temporada',
    imageUrl: MEDIA_ASSETS.promoProductivityAi,
    highlights: [
      'Ideal para universitarios y profesionales',
      'Incluye soporte guiado de activación',
      'Ahorro real en herramientas clave',
    ],
  },
  {
    id: 'promo-creador-digital',
    name: 'Pack Creador Digital Pro',
    categoryLabel: 'Diseño y Video',
    description:
      'Impulsa tus redes y proyectos audiovisuales con Canva Pro + CapCut Pro + Adobe Creative Cloud.',
    promoPrice: 62.0,
    previousPrice: 75.0,
    validity: 'Consultar cupos vigentes por WhatsApp',
    imageUrl: MEDIA_ASSETS.comboCreative,
    highlights: [
      'Todo para editar video y diseñar piezas comerciales',
      'Sin marcas de agua y con recursos premium',
      'Atención personalizada antes y después de la compra',
    ],
  },
];

export const COMBOS: ComboOffer[] = [
  {
    id: 'combo-entretenimiento',
    name: 'Combo de Entretenimiento',
    tagline: 'Series, películas y TV en vivo',
    description:
      'Reúne tus plataformas favoritas de cine, series y canales en vivo para disfrutar en familia durante todo el mes.',
    services: ['Netflix (1 perfil)', 'Disney+ (1 perfil)', 'Max (1 perfil)', 'Magis TV (1 mes)'],
    duration: '1 mes',
    promoPrice: 42.0,
    previousPrice: 50.0,
    imageUrl: MEDIA_ASSETS.promoEntertainment,
    accentColor: '#2563EB',
  },
  {
    id: 'combo-productividad',
    name: 'Combo de Productividad',
    tagline: 'Estudio, oficina y protección',
    description:
      'Deja lista tu laptop o PC para trabajar con fluidez, seguridad y herramientas inteligentes.',
    services: ['Office 365 (1 año)', 'ESET NOD32 (1 año · 1 PC)', 'ChatGPT Plus (1 mes)'],
    duration: 'Según servicio (1 mes a 1 año)',
    promoPrice: 79.0,
    previousPrice: 92.0,
    imageUrl: MEDIA_ASSETS.promoProductivityAi,
    accentColor: '#10B981',
  },
  {
    id: 'combo-diseno',
    name: 'Combo de Diseño',
    tagline: 'Creatividad y edición profesional',
    description:
      'Pensado para diseñadores, community managers y emprendedores que crean contenido visual todos los días.',
    services: ['Canva Pro (1 mes)', 'CapCut Pro (1 mes)', 'Adobe Creative Cloud (1 mes)'],
    duration: '1 mes',
    promoPrice: 62.0,
    previousPrice: 71.0,
    imageUrl: MEDIA_ASSETS.comboCreative,
    accentColor: '#3B82F6',
  },
  {
    id: 'combo-servicios-digitales',
    name: 'Combo de Servicios Digitales',
    tagline: 'Entretenimiento + Música + Diseño',
    description:
      'Un equilibrio práctico entre diversión y herramientas digitales cotidianas con un solo pago mensual.',
    services: ['Netflix (1 perfil)', 'Spotify Individual (1 mes)', 'Canva Pro (1 mes)'],
    duration: '1 mes',
    promoPrice: 31.0,
    previousPrice: 36.0,
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
      'Explora las categorías, revisa el precio, la duración y elige el plan que mejor se adapte a ti.',
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
      'Confirmamos disponibilidad, coordinamos el medio de pago por WhatsApp (billeteras digitales o transferencia) y te acompañamos en la activación.',
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
    description: 'Conoce los precios, características y condiciones antes de comprar.',
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
      'Todos los pagos se coordinan directamente por WhatsApp una vez confirmada la disponibilidad del servicio. Allí te indicamos los medios de pago vigentes y verificamos tu comprobante de forma segura.',
    showWhatsAppCta: true,
  },
  {
    id: 'tiempo-entrega',
    question: '¿Cuánto demora la entrega?',
    answer:
      'La entrega es digital y se realiza por WhatsApp una vez confirmado el pago. El tiempo exacto depende del tipo de servicio o activación, y siempre te lo informamos antes de concretar la compra.',
  },
  {
    id: 'garantia',
    question: '¿Todos los productos tienen garantía?',
    answer:
      'Cada servicio cuenta con condiciones y garantía aplicables según su modalidad y duración. Puedes revisar esta información en el detalle de cada producto y confirmarla con nuestro equipo antes de comprar.',
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
      'Puedes contactarnos en cualquier momento desde el botón de WhatsApp en la barra inferior, el botón flotante o desde cualquier producto del catálogo al número +51 941 842 880.',
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
        body: 'Los precios, promociones y combos mostrados tienen carácter informativo y pueden actualizarse sin previo aviso. Antes de concretar cualquier pago, nuestro equipo confirmará por WhatsApp la disponibilidad vigente y las condiciones del plan elegido.',
      },
      {
        heading: '3. Condiciones de uso y garantía',
        body: 'Cada servicio digital posee reglas específicas de activación y uso (cantidad de dispositivos, perfil o cuenta personal). La garantía aplicable rige durante el periodo contratado siempre que se respeten las condiciones comunicadas al momento de la entrega.',
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
