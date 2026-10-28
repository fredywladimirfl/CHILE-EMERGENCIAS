// ===== Chile Preparado - App JS (con regiones) =====

const STORAGE_KEYS = {
  kit: 'chilePrep_kit',
  plan: 'chilePrep_plan',
  docs: 'chilePrep_docs',
  notes: 'chilePrep_notes',
  review: 'chilePrep_review',
  theme: 'chilePrep_theme',
  region: 'chilePrep_region',
  comuna: 'chilePrep_comuna'
};

// ===== Datos por región =====
const REGIONS = {
  arica: {
    name: 'Arica y Parinacota',
    risks: [
      { id: 'sismo', level: 'high', label: 'Sismos' },
      { id: 'tsunami', level: 'high', label: 'Tsunami (costa)' },
      { id: 'volcan', level: 'medium', label: 'Volcanes (Tacora, etc.)' },
      { id: 'aluvion', level: 'medium', label: 'Aluviones en quebradas' }
    ],
    tips: 'Zona de alta sismicidad y riesgo de tsunami en la costa. Conoce las zonas de evacuación del SHOA. En precordillera presta atención a quebradas tras lluvias intensas.',
    volcanoes: ['Volcán Tacora (monitoreado)'],
    priority: ['sismo', 'tsunami', 'volcan', 'aluvion']
  },
  tarapaca: {
    name: 'Tarapacá',
    risks: [
      { id: 'sismo', level: 'high', label: 'Sismos' },
      { id: 'tsunami', level: 'high', label: 'Tsunami (costa)' },
      { id: 'aluvion', level: 'medium', label: 'Aluviones' },
      { id: 'clima', level: 'medium', label: 'Clima extremo (desierto)' }
    ],
    tips: 'Alta actividad sísmica. En Iquique y costa prioriza rutas de evacuación por tsunami. En zonas de quebradas vigila posibles aluviones tras precipitaciones.',
    volcanoes: ['Isluga (monitoreado)'],
    priority: ['sismo', 'tsunami', 'aluvion']
  },
  antofagasta: {
    name: 'Antofagasta',
    risks: [
      { id: 'sismo', level: 'high', label: 'Sismos' },
      { id: 'tsunami', level: 'high', label: 'Tsunami (costa)' },
      { id: 'aluvion', level: 'medium', label: 'Aluviones en quebradas' },
      { id: 'clima', level: 'medium', label: 'Clima extremo' }
    ],
    tips: 'Zona sísmica importante. Costa con riesgo de tsunami. Quebradas pueden activarse con lluvias intensas (aunque son poco frecuentes).',
    volcanoes: ['Varios en el altiplano (monitoreados por Sernageomin)'],
    priority: ['sismo', 'tsunami', 'aluvion']
  },
  atacama: {
    name: 'Atacama',
    risks: [
      { id: 'sismo', level: 'high', label: 'Sismos' },
      { id: 'aluvion', level: 'high', label: 'Aluviones / Inundaciones' },
      { id: 'tsunami', level: 'medium', label: 'Tsunami (costa)' },
      { id: 'clima', level: 'medium', label: 'Clima extremo' }
    ],
    tips: 'Históricamente afectada por aluviones e inundaciones en eventos de precipitación intensa. Mantén vigilancia en quebradas y cauces. Costa con riesgo de tsunami.',
    volcanoes: [],
    priority: ['sismo', 'aluvion', 'inundacion', 'tsunami']
  },
  coquimbo: {
    name: 'Coquimbo',
    risks: [
      { id: 'sismo', level: 'high', label: 'Sismos' },
      { id: 'tsunami', level: 'high', label: 'Tsunami (costa)' },
      { id: 'aluvion', level: 'medium', label: 'Aluviones' },
      { id: 'inundacion', level: 'medium', label: 'Inundaciones' }
    ],
    tips: 'Alta sismicidad y costa expuesta a tsunami. En valles y precordillera vigila posibles aluviones e inundaciones con sistemas frontales.',
    volcanoes: [],
    priority: ['sismo', 'tsunami', 'aluvion', 'inundacion']
  },
  valparaiso: {
    name: 'Valparaíso',
    risks: [
      { id: 'sismo', level: 'high', label: 'Sismos' },
      { id: 'tsunami', level: 'high', label: 'Tsunami (costa)' },
      { id: 'incendio', level: 'high', label: 'Incendios forestales (verano)' },
      { id: 'aluvion', level: 'medium', label: 'Aluviones / Remoción' },
      { id: 'tornado', level: 'medium', label: 'Vientos fuertes' }
    ],
    tips: 'Costa con alto riesgo de tsunami. En cerros y quebradas hay riesgo de remoción en masa e incendios forestales en verano. Mantén limpios los entornos de vegetación.',
    volcanoes: [],
    priority: ['sismo', 'tsunami', 'aluvion', 'tornado']
  },
  metropolitana: {
    name: 'Metropolitana (Santiago)',
    risks: [
      { id: 'sismo', level: 'high', label: 'Sismos' },
      { id: 'aluvion', level: 'high', label: 'Aluviones (precordillera)' },
      { id: 'inundacion', level: 'high', label: 'Inundaciones' },
      { id: 'tornado', level: 'medium', label: 'Tornados / Vientos extremos' },
      { id: 'clima', level: 'medium', label: 'Clima extremo' }
    ],
    tips: 'En octubre 2026 se registraron aluviones, inundaciones y tornados inusuales. Comunas de precordillera (Las Condes, Lo Barnechea, Puente Alto, San José de Maipo, etc.) tienen mayor riesgo de remoción en masa. Mantén canaletas limpias y conoce rutas hacia zonas altas.',
    volcanoes: ['Ninguno activo cercano de alto riesgo inmediato'],
    priority: ['sismo', 'aluvion', 'inundacion', 'tornado']
  },
  ohiggins: {
    name: "O'Higgins",
    risks: [
      { id: 'sismo', level: 'high', label: 'Sismos' },
      { id: 'aluvion', level: 'high', label: 'Aluviones' },
      { id: 'inundacion', level: 'medium', label: 'Inundaciones' },
      { id: 'tornado', level: 'medium', label: 'Tornados / Vientos' },
      { id: 'volcan', level: 'low', label: 'Volcanes (distantes)' }
    ],
    tips: 'Recientemente afectada por tornados (ej. Requínoa). También hay riesgo de aluviones e inundaciones con lluvias intensas. Mantente atento a alertas meteorológicas.',
    volcanoes: [],
    priority: ['sismo', 'aluvion', 'tornado', 'inundacion']
  },
  maule: {
    name: 'Maule',
    risks: [
      { id: 'sismo', level: 'high', label: 'Sismos' },
      { id: 'inundacion', level: 'high', label: 'Inundaciones' },
      { id: 'aluvion', level: 'medium', label: 'Aluviones' },
      { id: 'volcan', level: 'medium', label: 'Volcanes (cercanos al sur)' },
      { id: 'tsunami', level: 'medium', label: 'Tsunami (costa)' }
    ],
    tips: 'Riesgo de inundaciones en ríos y esteros. Costa con peligro de tsunami. Zonas cercanas a la cordillera pueden verse afectadas por actividad volcánica del sur.',
    volcanoes: ['Influencia posible de complejos más al sur'],
    priority: ['sismo', 'inundacion', 'aluvion', 'tsunami']
  },
  nuble: {
    name: 'Ñuble',
    risks: [
      { id: 'sismo', level: 'high', label: 'Sismos' },
      { id: 'volcan', level: 'high', label: 'Volcanes (Nevados de Chillán)' },
      { id: 'inundacion', level: 'medium', label: 'Inundaciones' },
      { id: 'aluvion', level: 'medium', label: 'Aluviones / Lahares' }
    ],
    tips: 'Nevados de Chillán está activo (alerta técnica amarilla reciente con pulsos eruptivos). Comunidades cercanas (Pinto, Coihueco y otras) deben seguir reportes de Sernageomin y SENAPRED. Riesgo de lahares en cauces.',
    volcanoes: ['Nevados de Chillán (activo – alerta amarilla reciente)'],
    priority: ['sismo', 'volcan', 'aluvion', 'inundacion']
  },
  biobio: {
    name: 'Biobío',
    risks: [
      { id: 'sismo', level: 'high', label: 'Sismos' },
      { id: 'volcan', level: 'high', label: 'Volcanes (varios)' },
      { id: 'inundacion', level: 'high', label: 'Inundaciones' },
      { id: 'tsunami', level: 'medium', label: 'Tsunami (costa)' },
      { id: 'aluvion', level: 'medium', label: 'Aluviones / Lahares' }
    ],
    tips: 'Presencia de volcanes activos en la zona y alto riesgo de inundaciones en ríos. Costa con peligro de tsunami. Mantén atención a reportes de Sernageomin.',
    volcanoes: ['Complejos volcánicos de la zona (monitoreados)'],
    priority: ['sismo', 'volcan', 'inundacion', 'tsunami']
  },
  araucania: {
    name: 'La Araucanía',
    risks: [
      { id: 'sismo', level: 'high', label: 'Sismos' },
      { id: 'volcan', level: 'high', label: 'Volcanes (Villarrica, Llaima, etc.)' },
      { id: 'inundacion', level: 'medium', label: 'Inundaciones' },
      { id: 'aluvion', level: 'medium', label: 'Lahares / Aluviones' }
    ],
    tips: 'Una de las zonas con mayor densidad de volcanes activos (Villarrica, Llaima y otros). Conoce los mapas de peligros y rutas de evacuación. Riesgo de lahares en cauces.',
    volcanoes: ['Villarrica', 'Llaima', 'Otros monitoreados'],
    priority: ['sismo', 'volcan', 'aluvion', 'inundacion']
  },
  rios: {
    name: 'Los Ríos',
    risks: [
      { id: 'sismo', level: 'high', label: 'Sismos' },
      { id: 'volcan', level: 'high', label: 'Volcanes (Mocho-Choshuenco, etc.)' },
      { id: 'inundacion', level: 'medium', label: 'Inundaciones' },
      { id: 'tsunami', level: 'medium', label: 'Tsunami (costa)' }
    ],
    tips: 'Volcanes activos en la zona. Costa con riesgo de tsunami. Inundaciones posibles en períodos de altas precipitaciones.',
    volcanoes: ['Mocho-Choshuenco y otros'],
    priority: ['sismo', 'volcan', 'inundacion', 'tsunami']
  },
  lagos: {
    name: 'Los Lagos',
    risks: [
      { id: 'sismo', level: 'high', label: 'Sismos' },
      { id: 'volcan', level: 'high', label: 'Volcanes (Calbuco, Osorno, etc.)' },
      { id: 'tsunami', level: 'medium', label: 'Tsunami (costa)' },
      { id: 'inundacion', level: 'medium', label: 'Inundaciones' }
    ],
    tips: 'Varios volcanes activos históricos (Calbuco, Osorno). Costa y fiordos con riesgo de tsunami. Mantén atención a alertas de Sernageomin.',
    volcanoes: ['Calbuco', 'Osorno', 'Otros'],
    priority: ['sismo', 'volcan', 'tsunami', 'inundacion']
  },
  aysen: {
    name: 'Aysén',
    risks: [
      { id: 'sismo', level: 'medium', label: 'Sismos' },
      { id: 'volcan', level: 'medium', label: 'Volcanes' },
      { id: 'clima', level: 'high', label: 'Clima extremo / Aislamiento' },
      { id: 'inundacion', level: 'medium', label: 'Inundaciones / Crecidas' }
    ],
    tips: 'Zona de menor densidad poblacional pero con riesgo de aislamiento por clima extremo, crecidas y actividad volcánica/sísmica. Prepárate para períodos sin conectividad.',
    volcanoes: ['Varios en la zona cordillerana'],
    priority: ['clima', 'sismo', 'volcan', 'inundacion']
  },
  magallanes: {
    name: 'Magallanes',
    risks: [
      { id: 'sismo', level: 'medium', label: 'Sismos' },
      { id: 'clima', level: 'high', label: 'Clima extremo / Vientos' },
      { id: 'tsunami', level: 'low', label: 'Tsunami (bajo en general)' }
    ],
    tips: 'Clima extremo y vientos fuertes son el riesgo más frecuente. Sismicidad presente. Preparación para frío intenso y posibles interrupciones de servicios.',
    volcanoes: [],
    priority: ['clima', 'sismo', 'tornado']
  }
};

// Coordenadas aproximadas de regiones (centroides simples para geolocalización)
const REGION_COORDS = {
  arica: { lat: -18.5, lon: -69.5 },
  tarapaca: { lat: -20.2, lon: -69.5 },
  antofagasta: { lat: -23.6, lon: -70.4 },
  atacama: { lat: -27.4, lon: -70.3 },
  coquimbo: { lat: -30.0, lon: -71.2 },
  valparaiso: { lat: -33.0, lon: -71.5 },
  metropolitana: { lat: -33.45, lon: -70.65 },
  ohiggins: { lat: -34.4, lon: -71.0 },
  maule: { lat: -35.5, lon: -71.5 },
  nuble: { lat: -36.6, lon: -72.1 },
  biobio: { lat: -37.0, lon: -72.5 },
  araucania: { lat: -38.7, lon: -72.5 },
  rios: { lat: -39.8, lon: -73.0 },
  lagos: { lat: -41.5, lon: -73.0 },
  aysen: { lat: -45.5, lon: -72.5 },
  magallanes: { lat: -53.0, lon: -71.0 }
};


// ===== Comunas por región (principales + riesgos específicos) =====
const COMUNAS = {
  metropolitana: [
    { id: 'santiago', name: 'Santiago', risks: 'Sismos altos. Suelo variable con posible amplificación.', coords: [-33.4489, -70.6693] },
    { id: 'las-condes', name: 'Las Condes', risks: 'Aluviones y remoción en masa (Quebrada Honda y precordillera). Sismos.', coords: [-33.4081, -70.5483] },
    { id: 'lo-barnechea', name: 'Lo Barnechea', risks: 'Alto riesgo de aluviones y remociones. Ruta a Farellones.', coords: [-33.3500, -70.5167] },
    { id: 'puente-alto', name: 'Puente Alto', risks: 'Aluviones e inundaciones en precordillera. Sismos.', coords: [-33.6117, -70.5758] },
    { id: 'san-jose-maipo', name: 'San José de Maipo', risks: 'Muy alto riesgo de aluviones, lahares y remociones.', coords: [-33.6333, -70.3500] },
    { id: 'penalolen', name: 'Peñalolén', risks: 'Aluviones en quebradas. Sismos.', coords: [-33.4833, -70.5333] },
    { id: 'la-florida', name: 'La Florida', risks: 'Aluviones e inundaciones en sectores altos.', coords: [-33.5225, -70.5978] },
    { id: 'la-reina', name: 'La Reina', risks: 'Aluviones en sectores de precordillera. Sismos.', coords: [-33.4500, -70.5333] },
    { id: 'vitacura', name: 'Vitacura', risks: 'Aluviones en precordillera. Sismos.', coords: [-33.3906, -70.5750] },
    { id: 'colina', name: 'Colina', risks: 'Aluviones y remociones. Crecimiento urbano.', coords: [-33.2000, -70.6750] },
    { id: 'pirque', name: 'Pirque', risks: 'Alto riesgo de aluviones e inundaciones.', coords: [-33.6333, -70.5667] },
    { id: 'maipu', name: 'Maipú', risks: 'Sismos. Inundaciones en sectores bajos.', coords: [-33.5094, -70.7578] },
    { id: 'pudahuel', name: 'Pudahuel', risks: 'Sismos. Zona industrial y aeropuerto.', coords: [-33.4444, -70.7656] },
    { id: 'cerro-navia', name: 'Cerro Navia', risks: 'Sismos. Densidad poblacional alta.', coords: [-33.4222, -70.7350] },
    { id: 'quilicura', name: 'Quilicura', risks: 'Sismos. Crecimiento industrial y residencial.', coords: [-33.3550, -70.7280] },
    { id: 'huechuraba', name: 'Huechuraba', risks: 'Aluviones en quebradas. Sismos.', coords: [-33.3680, -70.6370] },
    { id: 'recoleta', name: 'Recoleta', risks: 'Sismos. Densidad alta.', coords: [-33.4060, -70.6400] },
    { id: 'independencia', name: 'Independencia', risks: 'Sismos. Edificación mixta.', coords: [-33.4150, -70.6650] },
    { id: 'nunoa', name: 'Ñuñoa', risks: 'Sismos. Densidad poblacional alta.', coords: [-33.4569, -70.5978] },
    { id: 'providencia', name: 'Providencia', risks: 'Sismos. Edificación densa.', coords: [-33.4319, -70.6094] },
    { id: 'macul', name: 'Macul', risks: 'Sismos. Cercanía a precordillera.', coords: [-33.4900, -70.6000] },
    { id: 'san-miguel', name: 'San Miguel', risks: 'Sismos.', coords: [-33.4990, -70.6510] },
    { id: 'la-cisterna', name: 'La Cisterna', risks: 'Sismos.', coords: [-33.5280, -70.6630] },
    { id: 'el-bosque', name: 'El Bosque', risks: 'Sismos.', coords: [-33.5630, -70.6680] },
    { id: 'san-bernardo', name: 'San Bernardo', risks: 'Sismos. Inundaciones posibles.', coords: [-33.5920, -70.6990] },
    { id: 'buin', name: 'Buin', risks: 'Sismos. Riesgo hídrico en sectores rurales.', coords: [-33.7330, -70.7430] },
    { id: 'paine', name: 'Paine', risks: 'Sismos. Zona rural y agrícola.', coords: [-33.8070, -70.7410] },
    { id: 'melipilla', name: 'Melipilla', risks: 'Sismos. Inundaciones en valle.', coords: [-33.6890, -71.2150] },
    { id: 'talagante', name: 'Talagante', risks: 'Sismos. Inundaciones posibles.', coords: [-33.6650, -70.9280] },
    { id: 'penaflor', name: 'Peñaflor', risks: 'Sismos.', coords: [-33.6060, -70.8770] },
    { id: 'otra-rm', name: 'Otra comuna RM', risks: 'Riesgo sísmico general. Consulta SENAPRED local.', coords: [-33.45, -70.65] }
  ],
  valparaiso: [
    { id: 'valparaiso', name: 'Valparaíso', risks: 'Sismos + Tsunami. Incendios en cerros. Vientos.', coords: [-33.0472, -71.6127] },
    { id: 'vina', name: 'Viña del Mar', risks: 'Sismos + Tsunami. Alta densidad costera.', coords: [-33.0153, -71.5500] },
    { id: 'concon', name: 'Concón', risks: 'Sismos + Tsunami. Costa.', coords: [-32.9250, -71.5120] },
    { id: 'quillota', name: 'Quillota', risks: 'Sismos. Inundaciones en valle.', coords: [-32.8833, -71.2500] },
    { id: 'san-antonio', name: 'San Antonio', risks: 'Sismos + Tsunami (puerto).', coords: [-33.5950, -71.6128] },
    { id: 'quilpue', name: 'Quilpué', risks: 'Sismos. Crecimiento urbano.', coords: [-33.0470, -71.4420] },
    { id: 'villa-alemana', name: 'Villa Alemana', risks: 'Sismos.', coords: [-33.0440, -71.3730] },
    { id: 'limache', name: 'Limache', risks: 'Sismos. Inundaciones posibles.', coords: [-32.9830, -71.2670] },
    { id: 'olmue', name: 'Olmué', risks: 'Sismos. Zona de cerros.', coords: [-32.9990, -71.1860] },
    { id: 'casablanca', name: 'Casablanca', risks: 'Sismos. Zona agrícola.', coords: [-33.3200, -71.4110] },
    { id: 'los-andes', name: 'Los Andes', risks: 'Sismos. Cordillera y pasos fronterizos.', coords: [-32.8330, -70.5980] },
    { id: 'san-felipe', name: 'San Felipe', risks: 'Sismos. Valle del Aconcagua.', coords: [-32.7500, -70.7250] },
    { id: 'la-ligua', name: 'La Ligua', risks: 'Sismos. Costa y valle.', coords: [-32.4500, -71.2320] },
    { id: 'petorca', name: 'Petorca', risks: 'Sismos. Sequía e inundaciones puntuales.', coords: [-32.2510, -70.9390] },
    { id: 'otra-valpo', name: 'Otra comuna Valparaíso', risks: 'Riesgo sísmico y costero según ubicación.', coords: [-33.0, -71.5] }
  ],
  nuble: [
    { id: 'chillan', name: 'Chillán', risks: 'Sismos. Influencia de Nevados de Chillán.', coords: [-36.6067, -72.1034] },
    { id: 'chillan-viejo', name: 'Chillán Viejo', risks: 'Sismos. Cercanía a volcán.', coords: [-36.6280, -72.1450] },
    { id: 'pinto', name: 'Pinto', risks: 'Alto riesgo volcánico (Nevados de Chillán). Lahares.', coords: [-36.7000, -71.9000] },
    { id: 'coihueco', name: 'Coihueco', risks: 'Alto riesgo volcánico (Nevados de Chillán).', coords: [-36.6167, -71.8333] },
    { id: 'san-carlos', name: 'San Carlos', risks: 'Sismos. Influencia volcánica.', coords: [-36.4250, -71.9580] },
    { id: 'bulnes', name: 'Bulnes', risks: 'Sismos.', coords: [-36.7420, -72.2980] },
    { id: 'yungay', name: 'Yungay', risks: 'Sismos. Zona agrícola.', coords: [-37.1200, -72.0130] },
    { id: 'otra-nuble', name: 'Otra comuna Ñuble', risks: 'Monitorear alertas de Sernageomin.', coords: [-36.6, -72.1] }
  ],
  biobio: [
    { id: 'concepcion', name: 'Concepción', risks: 'Sismos altos. Tsunami en costa. Inundaciones.', coords: [-36.8270, -73.0503] },
    { id: 'talcahuano', name: 'Talcahuano', risks: 'Sismos + Tsunami (puerto).', coords: [-36.7167, -73.1167] },
    { id: 'san-pedro', name: 'San Pedro de la Paz', risks: 'Sismos. Cercanía a costa.', coords: [-36.8410, -73.1030] },
    { id: 'chiguayante', name: 'Chiguayante', risks: 'Sismos.', coords: [-36.9040, -73.0330] },
    { id: 'los-angeles', name: 'Los Ángeles', risks: 'Sismos. Influencia volcánica.', coords: [-37.4667, -72.3500] },
    { id: 'coronel', name: 'Coronel', risks: 'Sismos + Tsunami.', coords: [-37.0290, -73.1450] },
    { id: 'lota', name: 'Lota', risks: 'Sismos + Tsunami.', coords: [-37.0940, -73.1620] },
    { id: 'tomé', name: 'Tomé', risks: 'Sismos + Tsunami.', coords: [-36.6170, -72.9580] },
    { id: 'penco', name: 'Penco', risks: 'Sismos + Tsunami.', coords: [-36.7380, -72.9950] },
    { id: 'otra-biobio', name: 'Otra comuna Biobío', risks: 'Riesgo sísmico y volcánico según sector.', coords: [-37.0, -72.5] }
  ],
  araucania: [
    { id: 'temuco', name: 'Temuco', risks: 'Sismos. Cercanía a volcanes (Villarrica, Llaima).', coords: [-38.7359, -72.5904] },
    { id: 'padre-las-casas', name: 'Padre Las Casas', risks: 'Sismos. Influencia volcánica.', coords: [-38.7660, -72.6000] },
    { id: 'villarrica', name: 'Villarrica', risks: 'Alto riesgo volcánico (Volcán Villarrica). Lahares.', coords: [-39.2850, -72.2278] },
    { id: 'pucon', name: 'Pucón', risks: 'Alto riesgo volcánico (Villarrica). Turismo y evacuación.', coords: [-39.2820, -71.9780] },
    { id: 'angol', name: 'Angol', risks: 'Sismos. Zona de transición.', coords: [-37.7950, -72.7160] },
    { id: 'victoria', name: 'Victoria', risks: 'Sismos.', coords: [-38.2330, -72.3330] },
    { id: 'otra-araucania', name: 'Otra comuna Araucanía', risks: 'Monitorear volcanes activos.', coords: [-38.7, -72.5] }
  ],
  ohiggins: [
    { id: 'rancagua', name: 'Rancagua', risks: 'Sismos. Inundaciones posibles.', coords: [-34.1708, -70.7444] },
    { id: 'machali', name: 'Machalí', risks: 'Sismos. Precordillera.', coords: [-34.1810, -70.6490] },
    { id: 'requinoa', name: 'Requínoa', risks: 'Sismos + tornados/vientos extremos (eventos recientes).', coords: [-34.2833, -70.8167] },
    { id: 'rengo', name: 'Rengo', risks: 'Sismos. Valle central.', coords: [-34.4070, -70.8680] },
    { id: 'san-fernando', name: 'San Fernando', risks: 'Sismos. Inundaciones en valle.', coords: [-34.5833, -70.9833] },
    { id: 'santa-cruz', name: 'Santa Cruz', risks: 'Sismos. Zona vitivinícola.', coords: [-34.6390, -71.3660] },
    { id: 'pichilemu', name: 'Pichilemu', risks: 'Sismos + Tsunami (costa).', coords: [-34.3880, -72.0140] },
    { id: 'otra-ohiggins', name: "Otra comuna O'Higgins", risks: 'Riesgo sísmico y de vientos extremos.', coords: [-34.4, -71.0] }
  ],
  coquimbo: [
    { id: 'la-serena', name: 'La Serena', risks: 'Sismos + Tsunami (costa).', coords: [-29.9027, -71.2519] },
    { id: 'coquimbo', name: 'Coquimbo', risks: 'Sismos + Tsunami. Puerto.', coords: [-29.9533, -71.3436] },
    { id: 'ovalle', name: 'Ovalle', risks: 'Sismos. Sequía e inundaciones puntuales.', coords: [-30.6011, -71.1990] },
    { id: 'illapel', name: 'Illapel', risks: 'Sismos (zona del terremoto 2015).', coords: [-31.6320, -71.1680] },
    { id: 'vicuna', name: 'Vicuña', risks: 'Sismos. Valle del Elqui.', coords: [-30.0350, -70.7120] },
    { id: 'andacollo', name: 'Andacollo', risks: 'Sismos. Zona minera.', coords: [-30.2310, -71.0850] },
    { id: 'otra-coquimbo', name: 'Otra comuna Coquimbo', risks: 'Riesgo sísmico y costero.', coords: [-30.0, -71.2] }
  ],
  tarapaca: [
    { id: 'iquique', name: 'Iquique', risks: 'Sismos muy altos + Tsunami. Laguna sísmica histórica.', coords: [-20.2141, -70.1524] },
    { id: 'alto-hospicio', name: 'Alto Hospicio', risks: 'Sismos. Cercanía a Iquique.', coords: [-20.2678, -70.1000] },
    { id: 'pozo-almonte', name: 'Pozo Almonte', risks: 'Sismos. Zona interior.', coords: [-20.2570, -69.7860] },
    { id: 'pica', name: 'Pica', risks: 'Sismos. Oasis y zona interior.', coords: [-20.4890, -69.3290] },
    { id: 'otra-tarapaca', name: 'Otra comuna Tarapacá', risks: 'Alta sismicidad y tsunami en costa.', coords: [-20.2, -69.5] }
  ],
  antofagasta: [
    { id: 'antofagasta', name: 'Antofagasta', risks: 'Sismos + Tsunami. Costa.', coords: [-23.6500, -70.4000] },
    { id: 'calama', name: 'Calama', risks: 'Sismos (interplaca e intraplaca).', coords: [-22.4667, -68.9333] },
    { id: 'tocopilla', name: 'Tocopilla', risks: 'Sismos + Tsunami.', coords: [-22.0920, -70.1980] },
    { id: 'mejillones', name: 'Mejillones', risks: 'Sismos + Tsunami. Zona industrial.', coords: [-23.1000, -70.4500] },
    { id: 'taltal', name: 'Taltal', risks: 'Sismos + Tsunami.', coords: [-25.4000, -70.4830] },
    { id: 'otra-antofagasta', name: 'Otra comuna Antofagasta', risks: 'Alta sismicidad.', coords: [-23.6, -70.4] }
  ],
  atacama: [
    { id: 'copiapo', name: 'Copiapó', risks: 'Sismos. Histórico de aluviones e inundaciones.', coords: [-27.3667, -70.3333] },
    { id: 'caldera', name: 'Caldera', risks: 'Sismos + Tsunami.', coords: [-27.0680, -70.8250] },
    { id: 'vallenar', name: 'Vallenar', risks: 'Sismos. Aluviones posibles.', coords: [-28.5708, -70.7581] },
    { id: 'chanaral', name: 'Chañaral', risks: 'Sismos + Tsunami. Histórico de aluviones.', coords: [-26.3450, -70.6210] },
    { id: 'otra-atacama', name: 'Otra comuna Atacama', risks: 'Sismos y riesgo de aluviones.', coords: [-27.4, -70.3] }
  ],
  arica: [
    { id: 'arica', name: 'Arica', risks: 'Sismos + Tsunami. Frontera norte.', coords: [-18.4783, -70.3126] },
    { id: 'putre', name: 'Putre', risks: 'Sismos. Altiplano y volcanes cercanos.', coords: [-18.1970, -69.5590] },
    { id: 'otra-arica', name: 'Otra comuna', risks: 'Sismos y tsunami en costa.', coords: [-18.5, -69.5] }
  ],
  maule: [
    { id: 'talca', name: 'Talca', risks: 'Sismos (zona 2010). Inundaciones.', coords: [-35.4264, -71.6554] },
    { id: 'curico', name: 'Curicó', risks: 'Sismos. Inundaciones posibles.', coords: [-34.9833, -71.2333] },
    { id: 'linares', name: 'Linares', risks: 'Sismos. Valle central.', coords: [-35.8470, -71.5990] },
    { id: 'constitucion', name: 'Constitución', risks: 'Sismos + Tsunami (costa).', coords: [-35.3330, -72.4160] },
    { id: 'cauquenes', name: 'Cauquenes', risks: 'Sismos.', coords: [-35.9640, -72.3140] },
    { id: 'otra-maule', name: 'Otra comuna Maule', risks: 'Sismos y riesgo hídrico.', coords: [-35.5, -71.5] }
  ],
  rios: [
    { id: 'valdivia', name: 'Valdivia', risks: 'Sismos. Tsunami en costa. Influencia volcánica.', coords: [-39.8142, -73.2459] },
    { id: 'la-union', name: 'La Unión', risks: 'Sismos.', coords: [-40.2930, -73.0820] },
    { id: 'rio-bueno', name: 'Río Bueno', risks: 'Sismos.', coords: [-40.3330, -72.9560] },
    { id: 'otra-rios', name: 'Otra comuna Los Ríos', risks: 'Sismos y volcanes cercanos.', coords: [-39.8, -73.0] }
  ],
  lagos: [
    { id: 'puerto-montt', name: 'Puerto Montt', risks: 'Sismos. Tsunami. Volcanes (Calbuco, Osorno).', coords: [-41.4693, -72.9424] },
    { id: 'osorno', name: 'Osorno', risks: 'Sismos. Influencia volcánica.', coords: [-40.5736, -73.1344] },
    { id: 'castro', name: 'Castro', risks: 'Sismos. Tsunami. Chiloé.', coords: [-42.4720, -73.7730] },
    { id: 'ancud', name: 'Ancud', risks: 'Sismos. Tsunami. Chiloé.', coords: [-41.8700, -73.8280] },
    { id: 'puerto-varas', name: 'Puerto Varas', risks: 'Sismos. Cercanía a volcanes y lagos.', coords: [-41.3190, -72.9850] },
    { id: 'otra-lagos', name: 'Otra comuna Los Lagos', risks: 'Sismos, tsunami y volcanes.', coords: [-41.5, -73.0] }
  ],
  aysen: [
    { id: 'coyhaique', name: 'Coyhaique', risks: 'Sismos moderados. Clima extremo. Aislamiento.', coords: [-45.5752, -72.0662] },
    { id: 'aysen', name: 'Aysén', risks: 'Sismos. Fiordos y clima extremo.', coords: [-45.4030, -72.7020] },
    { id: 'chile-chico', name: 'Chile Chico', risks: 'Sismos. Zona fronteriza.', coords: [-46.5400, -71.7290] },
    { id: 'otra-aysen', name: 'Otra comuna Aysén', risks: 'Clima extremo y sismos.', coords: [-45.5, -72.5] }
  ],
  magallanes: [
    { id: 'punta-arenas', name: 'Punta Arenas', risks: 'Sismos moderados. Vientos extremos y clima.', coords: [-53.1638, -70.9171] },
    { id: 'natales', name: 'Puerto Natales', risks: 'Sismos. Clima extremo. Turismo.', coords: [-51.7300, -72.5070] },
    { id: 'porvenir', name: 'Porvenir', risks: 'Sismos. Tierra del Fuego.', coords: [-53.2960, -70.3680] },
    { id: 'otra-magallanes', name: 'Otra comuna Magallanes', risks: 'Clima extremo y vientos.', coords: [-53.0, -71.0] }
  ]
};

// ===== Guides Content =====
const GUIDES = {
  sismo: {
    title: '🌍 Sismos / Terremotos',
    before: [
      'Identifica lugares de protección sísmica en casa, trabajo y estudio (debajo de mesa firme o junto a muro interior).',
      'Prepara y revisa tu kit de emergencia.',
      'Define puntos de encuentro familiar y formas de comunicación.',
      'Asegura estanterías, cuadros y objetos pesados.',
      'Conoce las rutas de evacuación de tu edificio o sector.'
    ],
    during: [
      'Mantén la calma. No corras.',
      'Protégete y afírmate debajo de un elemento firme. Si no es posible, junto a él.',
      'Aléjate de ventanas, espejos y objetos que puedan caer.',
      'Si estás en la calle: aléjate de edificios, postes y cables eléctricos.',
      'Si estás en un vehículo: detente en un lugar seguro y permanece dentro.',
      'En un evento masivo: quédate en el lugar y protege cabeza y cuello.'
    ],
    after: [
      'Revisa si hay heridos y presta ayuda si es seguro.',
      'Corta gas, agua y electricidad si detectas olor a gas o daños.',
      'Usa el kit de emergencia. No satures las líneas telefónicas.',
      'Sigue las instrucciones de SENAPRED y autoridades.',
      'Prepárate para réplicas. Vuelve a protegerte si hay otro movimiento.',
      'En zona costera: si el sismo fue fuerte y prolongado, evacúa hacia zonas altas (posible tsunami).'
    ]
  },
  volcan: {
    title: '🌋 Volcanes',
    before: [
      'Conoce si vives cerca de un volcán activo y revisa el mapa de peligros de Sernageomin.',
      'Infórmate del nivel de alerta actual (amarilla, naranja, roja o nueva escala 0-5).',
      'Ten mascarillas (N95 o similares) y gafas protectoras en el kit.',
      'Define rutas de evacuación hacia zonas seguras (generalmente en dirección opuesta al viento dominante).',
      'Mantén el kit de emergencia listo y documentos a mano.'
    ],
    during: [
      'Sigue las órdenes de evacuación de inmediato. No esperes.',
      'Cierra puertas y ventanas si debes quedarte temporalmente.',
      'Usa mascarilla y protege los ojos ante caída de ceniza.',
      'Evita cauces de ríos y quebradas (riesgo de lahares – flujos de barro volcánico).',
      'No conduzcas si hay mucha ceniza (reduce la visibilidad y daña el motor).'
    ],
    after: [
      'No regreses hasta que las autoridades lo indiquen.',
      'Limpia la ceniza con cuidado (húmeda, no en seco) para evitar que se disperse.',
      'Protege sistemas de agua y alimentos de la contaminación por ceniza.',
      'Atiende problemas respiratorios, especialmente en niños y adultos mayores.',
      'Sigue los reportes de Sernageomin y SENAPRED.'
    ]
  },
  aluvion: {
    title: '🌊 Aluviones / Remoción en masa',
    before: [
      'Si vives cerca de quebradas o pendientes, conoce las zonas de riesgo.',
      'Mantén canaletas y desagües limpios.',
      'Ten un plan de evacuación hacia zonas altas.',
      'Presta atención a las alertas meteorológicas y de SENAPRED (especialmente tras lluvias intensas).',
      'No construyas ni acumules escombros en cauces.'
    ],
    during: [
      'Si escuchas un ruido fuerte o ves aumento súbito de caudal / agua turbia: evacúa inmediatamente hacia zonas altas.',
      'Nunca intentes cruzar un flujo de barro, agua o escombros.',
      'Aléjate de quebradas, ríos y zonas bajas.',
      'Sigue las alertas SAE del celular y las indicaciones de autoridades.',
      'Si estás en casa y el agua entra: sube a pisos superiores si es seguro; si no, evacúa.'
    ],
    after: [
      'No regreses hasta que sea seguro y las autoridades lo permitan.',
      'Revisa daños estructurales antes de entrar a la vivienda.',
      'Ten cuidado con cables eléctricos caídos y gas.',
      'Documenta daños con fotos para seguros o ayudas estatales.',
      'Ayuda a vecinos si puedes hacerlo con seguridad.'
    ]
  },
  inundacion: {
    title: '💧 Inundaciones',
    before: [
      'Conoce si tu sector se inunda históricamente.',
      'Eleva objetos de valor y documentos.',
      'Ten sacos de arena o barreras si es habitual en tu zona.',
      'Prepara el kit y ten rutas de evacuación identificadas.',
      'Limpia desagües y canaletas antes de las lluvias.'
    ],
    during: [
      'Desconecta electricidad, gas y agua si puedes hacerlo con seguridad.',
      'Evacúa hacia zonas altas si te lo indican o si el agua sube rápidamente.',
      'Nunca camines ni conduzcas por agua en movimiento (30 cm pueden arrastrar un auto).',
      'Evita contactar cables o aparatos eléctricos mojados.',
      'Si quedas atrapado, sube lo más alto posible y llama a emergencias.'
    ],
    after: [
      'No regreses hasta que las autoridades den el visto bueno.',
      'Revisa la estructura y posibles daños eléctricos antes de reconectar.',
      'Desecha alimentos que hayan estado en contacto con agua de inundación.',
      'Limpia y desinfecta superficies.',
      'Ten cuidado con hongos y contaminación del agua.'
    ]
  },
  tornado: {
    title: '🌪️ Vientos fuertes / Tornados',
    before: [
      'Asegura objetos exteriores (maceteros, muebles, antenas).',
      'Revisa el estado de techos y estructuras livianas.',
      'Identifica el lugar más seguro de tu casa: habitación interior, baño o sótano, lejos de ventanas.',
      'Ten el kit accesible.'
    ],
    during: [
      'Ve al nivel más bajo e interior del edificio. Aléjate de ventanas y puertas exteriores.',
      'Protégete debajo de una mesa o en un clóset/baño interior.',
      'Cubre cabeza y cuello con los brazos o un cojín.',
      'Si estás al aire libre y no hay refugio: tírate al suelo en una depresión y protege la cabeza.',
      'Si estás en un vehículo: abandónalo y busca refugio sólido. No te quedes dentro.',
      'Evita gimnasios, galpones o estructuras con techos grandes y livianos.'
    ],
    after: [
      'Ten cuidado con escombros, cables caídos y estructuras dañadas.',
      'No te acerques a zonas afectadas innecesariamente.',
      'Ayuda a heridos si es seguro.',
      'Reporta daños a las autoridades municipales o SENAPRED.',
      'Revisa el estado de tu vivienda antes de volver a usarla normalmente.'
    ]
  },
  clima: {
    title: '🌡️ Cambios de temperatura / Clima extremo',
    before: [
      'Mantén ropa adecuada para frío y calor en el kit o en casa.',
      'Asegura fuentes de calefacción o ventilación seguras.',
      'Ten agua extra en olas de calor y abrigo en olas de frío.',
      'Presta especial atención a niños, adultos mayores y personas con enfermedades crónicas.',
      'Sigue los avisos de la Dirección Meteorológica de Chile (DMC).'
    ],
    during: [
      'Ola de calor: hidrátate, evita el sol en horas pico, usa ropa ligera, nunca dejes personas ni mascotas en vehículos.',
      'Ola de frío / heladas: abrígate por capas, protege extremidades, ventila si usas calefacción a combustión (riesgo de monóxido).',
      'Tormentas eléctricas: aléjate de árboles, postes y agua. No uses aparatos conectados a la red.',
      'Granizo: busca refugio sólido y protege vehículos si es posible.'
    ],
    after: [
      'Revisa posibles daños en techos, cañerías (heladas) o cultivos.',
      'Atiende síntomas de golpe de calor o hipotermia.',
      'Mantén la vigilancia si se anuncian nuevos eventos.',
      'Apoya a vecinos vulnerables (adultos mayores, enfermos).'
    ]
  },
  tsunami: {
    title: '🌊 Tsunami',
    before: [
      'Si vives o visitas la costa, conoce las zonas de evacuación y puntos de encuentro del SHOA / SENAPRED.',
      'Aprende las rutas peatonales hacia zonas altas (generalmente sobre 30 metros de altura).',
      'Ten un plan familiar y el kit listo.',
      'Reconoce las señales naturales: sismo fuerte y prolongado, retroceso súbito del mar, ruido inusual del océano.'
    ],
    during: [
      'Si sientes un sismo fuerte y largo en la costa: evacúa inmediatamente hacia zonas altas. No esperes la alerta oficial.',
      'Camina, no uses el auto si hay congestión.',
      'Aléjate de la costa, ríos y esteros que desembocan en el mar.',
      'Sigue las señaléticas de evacuación y las indicaciones de autoridades.',
      'Permanece en zona segura hasta que se indique el regreso.'
    ],
    after: [
      'No regreses a la costa hasta que SHOA / SENAPRED den el aviso oficial de término de alerta.',
      'Pueden ocurrir varias olas; la primera no siempre es la más grande.',
      'Ten cuidado con escombros, cables y estructuras dañadas.',
      'Ayuda a otras personas solo si es seguro.'
    ]
  }
};

// ===== Region functions =====
function populateComunas(regionId, selectedComunaId) {
  const comunaSelect = document.getElementById('comuna-select');
  if (!comunaSelect) return;

  comunaSelect.innerHTML = '';
  if (!regionId || !COMUNAS[regionId]) {
    comunaSelect.disabled = true;
    comunaSelect.innerHTML = '<option value="">Primero elige una región</option>';
    return;
  }

  comunaSelect.disabled = false;
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Selecciona tu comuna...';
  comunaSelect.appendChild(placeholder);

  COMUNAS[regionId].forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.name;
    comunaSelect.appendChild(opt);
  });

  if (selectedComunaId) {
    comunaSelect.value = selectedComunaId;
  }
}

function setComuna(comunaId) {
  const regionId = document.getElementById('region-select')?.value;
  if (!regionId || !comunaId || !COMUNAS[regionId]) return;

  const comuna = COMUNAS[regionId].find(c => c.id === comunaId);
  if (!comuna) return;

  localStorage.setItem(STORAGE_KEYS.comuna, comunaId);

  // Update region info title with comuna
  const region = REGIONS[regionId];
  document.getElementById('region-title').textContent = '📍 ' + comuna.name + ', ' + region.name;

  // Show comuna-specific risks in tips
  const tipsEl = document.getElementById('region-tips');
  tipsEl.innerHTML = `
    <strong>Riesgos en ${comuna.name}:</strong> ${comuna.risks}
    <br><br>
    <strong>Recomendación regional:</strong> ${region.tips}
  `;

  // Show coordinates if available
  const coordsEl = document.getElementById('coords-display');
  if (coordsEl && comuna.coords) {
    coordsEl.textContent = `Coordenadas ref.: ${comuna.coords[0].toFixed(4)}, ${comuna.coords[1].toFixed(4)}`;
  }

  // Update risks title
  document.getElementById('risks-title-suffix').textContent = `en ${comuna.name}`;
}

function setRegion(regionId, keepComuna) {
  const comunaSelect = document.getElementById('comuna-select');

  if (!regionId || !REGIONS[regionId]) {
    document.getElementById('region-info')?.classList.add('hidden');
    document.getElementById('risks-title-suffix').textContent = 'en Chile';
    document.querySelectorAll('.risk-item').forEach(el => el.classList.remove('priority'));
    populateComunas(null);
    const coordsEl = document.getElementById('coords-display');
    if (coordsEl) coordsEl.textContent = '';
    return;
  }

  const region = REGIONS[regionId];
  localStorage.setItem(STORAGE_KEYS.region, regionId);

  // Update region selector
  const select = document.getElementById('region-select');
  if (select) select.value = regionId;

  // Populate comunas
  const savedComuna = keepComuna ? localStorage.getItem(STORAGE_KEYS.comuna) : null;
  populateComunas(regionId, savedComuna);

  // Show region info card
  const infoCard = document.getElementById('region-info');
  infoCard.classList.remove('hidden');
  document.getElementById('region-title').textContent = '📍 ' + region.name;

  // Risks tags
  const risksEl = document.getElementById('region-risks');
  risksEl.innerHTML = region.risks.map(r =>
    `<span class="region-risk-tag ${r.level}">${r.label}</span>`
  ).join('');

  // Tips (region level; comuna will override if selected)
  document.getElementById('region-tips').innerHTML = `<strong>Recomendación para tu zona:</strong> ${region.tips}`;

  // Volcanoes
  const volEl = document.getElementById('region-volcanoes');
  if (region.volcanoes && region.volcanoes.length) {
    volEl.innerHTML = `<strong>Volcanes relevantes:</strong><ul>${region.volcanoes.map(v => `<li>${v}</li>`).join('')}</ul>`;
  } else {
    volEl.innerHTML = '';
  }

  // Highlight priority risks
  document.getElementById('risks-title-suffix').textContent = `en ${region.name}`;
  document.querySelectorAll('.risk-item').forEach(el => {
    const guide = el.dataset.guide;
    if (region.priority.includes(guide)) {
      el.classList.add('priority');
    } else {
      el.classList.remove('priority');
    }
  });

  // If we restored a comuna, apply it
  if (savedComuna && COMUNAS[regionId]?.some(c => c.id === savedComuna)) {
    setComuna(savedComuna);
  } else {
    localStorage.removeItem(STORAGE_KEYS.comuna);
    const coordsEl = document.getElementById('coords-display');
    if (coordsEl) coordsEl.textContent = '';
  }
}

function detectLocation() {
  const status = document.getElementById('location-status');
  const coordsEl = document.getElementById('coords-display');
  status.textContent = 'Detectando ubicación...';
  if (coordsEl) coordsEl.textContent = '';

  if (!navigator.geolocation) {
    status.textContent = 'Tu navegador no soporta geolocalización. Selecciona región y comuna manualmente.';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;

      // 1. Find closest region
      let closestRegion = null;
      let minRegionDist = Infinity;
      for (const [id, coords] of Object.entries(REGION_COORDS)) {
        const dist = Math.sqrt(
          Math.pow(latitude - coords.lat, 2) + Math.pow(longitude - coords.lon, 2)
        );
        if (dist < minRegionDist) {
          minRegionDist = dist;
          closestRegion = id;
        }
      }

      if (!closestRegion) {
        status.textContent = 'No se pudo determinar la región. Selecciónala manualmente.';
        return;
      }

      // 2. Find closest comuna within that region
      let closestComuna = null;
      let minComunaDist = Infinity;
      const comunas = COMUNAS[closestRegion] || [];
      comunas.forEach(c => {
        if (!c.coords) return;
        const dist = Math.sqrt(
          Math.pow(latitude - c.coords[0], 2) + Math.pow(longitude - c.coords[1], 2)
        );
        if (dist < minComunaDist) {
          minComunaDist = dist;
          closestComuna = c;
        }
      });

      // 3. Apply region + comuna
      setRegion(closestRegion, false);
      if (closestComuna) {
        const comunaSelect = document.getElementById('comuna-select');
        if (comunaSelect) comunaSelect.value = closestComuna.id;
        setComuna(closestComuna.id);
      }

      // 4. Show coordinates and status
      const accText = accuracy ? ` (±${Math.round(accuracy)} m)` : '';
      status.textContent = closestComuna
        ? `Detectado: ${closestComuna.name}, ${REGIONS[closestRegion].name}`
        : `Detectado: ${REGIONS[closestRegion].name}`;
      if (coordsEl) {
        coordsEl.textContent = `GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}${accText}`;
      }
    },
    (err) => {
      let msg = 'No se pudo obtener la ubicación. Selecciona región y comuna manualmente.';
      if (err.code === 1) msg = 'Permiso de ubicación denegado. Actívalo en el navegador o selecciona manualmente.';
      if (err.code === 2) msg = 'Ubicación no disponible. Intenta de nuevo o selecciona manualmente.';
      if (err.code === 3) msg = 'Tiempo de espera agotado. Intenta de nuevo.';
      status.textContent = msg;
      console.warn(err);
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
  );
}

// ===== Navigation =====
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  
  const section = document.getElementById(sectionId);
  if (section) section.classList.add('active');
  
  const btn = document.querySelector(`.nav-btn[data-section="${sectionId}"]`);
  if (btn) btn.classList.add('active');
  
  document.getElementById('guide-content').classList.add('hidden');
  const guideList = document.querySelector('.guide-list');
  if (guideList) guideList.classList.remove('hidden');
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showSection(btn.dataset.section));
});

// Risk items open guides
document.querySelectorAll('.risk-item').forEach(item => {
  item.addEventListener('click', () => {
    showSection('guias');
    setTimeout(() => showGuide(item.dataset.guide), 100);
  });
});

// ===== Kit Checklist =====
function loadKit() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.kit) || '{}');
  document.querySelectorAll('[data-kit]').forEach(cb => {
    cb.checked = !!saved[cb.dataset.kit];
    cb.addEventListener('change', saveKit);
  });
  updateKitProgress();
}

function saveKit() {
  const data = {};
  document.querySelectorAll('[data-kit]').forEach(cb => {
    data[cb.dataset.kit] = cb.checked;
  });
  localStorage.setItem(STORAGE_KEYS.kit, JSON.stringify(data));
  updateKitProgress();
}

function updateKitProgress() {
  const checks = document.querySelectorAll('[data-kit]');
  const total = checks.length;
  const checked = document.querySelectorAll('[data-kit]:checked').length;
  const pct = total ? Math.round((checked / total) * 100) : 0;
  
  const bar = document.getElementById('kit-progress');
  const text = document.getElementById('kit-progress-text');
  if (bar) bar.style.width = pct + '%';
  if (text) text.textContent = `${pct}% completo (${checked}/${total})`;
}

document.getElementById('reset-kit')?.addEventListener('click', () => {
  if (confirm('¿Reiniciar todo el checklist del kit?')) {
    document.querySelectorAll('[data-kit]').forEach(cb => cb.checked = false);
    saveKit();
  }
});

// ===== Guides =====
function showGuide(id) {
  const guide = GUIDES[id];
  if (!guide) return;
  
  const body = document.getElementById('guide-body');
  body.innerHTML = `
    <h2>${guide.title}</h2>
    <h3>Antes</h3>
    <ul>${guide.before.map(i => `<li>${i}</li>`).join('')}</ul>
    <h3>Durante</h3>
    <ul>${guide.during.map(i => `<li>${i}</li>`).join('')}</ul>
    <h3>Después</h3>
    <ul>${guide.after.map(i => `<li>${i}</li>`).join('')}</ul>
  `;
  
  document.getElementById('guide-content').classList.remove('hidden');
  document.querySelector('.guide-list').classList.add('hidden');
}

document.querySelectorAll('.guide-btn').forEach(btn => {
  btn.addEventListener('click', () => showGuide(btn.dataset.guide));
});

document.getElementById('close-guide')?.addEventListener('click', () => {
  document.getElementById('guide-content').classList.add('hidden');
  document.querySelector('.guide-list').classList.remove('hidden');
});

// ===== Family Plan =====
function loadPlan() {
  const plan = JSON.parse(localStorage.getItem(STORAGE_KEYS.plan) || '{}');
  if (plan.punto) document.getElementById('punto-encuentro').value = plan.punto;
  if (plan.alternativo) document.getElementById('punto-alternativo').value = plan.alternativo;
  if (plan.contacto) document.getElementById('contacto-externo').value = plan.contacto;
  if (plan.miembros) document.getElementById('miembros').value = plan.miembros;
  if (plan.notas) document.getElementById('notas-plan').value = plan.notas;
}

document.getElementById('guardar-plan')?.addEventListener('click', () => {
  const plan = {
    punto: document.getElementById('punto-encuentro').value,
    alternativo: document.getElementById('punto-alternativo').value,
    contacto: document.getElementById('contacto-externo').value,
    miembros: document.getElementById('miembros').value,
    notas: document.getElementById('notas-plan').value
  };
  localStorage.setItem(STORAGE_KEYS.plan, JSON.stringify(plan));
  const status = document.getElementById('plan-status');
  status.textContent = '✅ Plan guardado correctamente';
  setTimeout(() => status.textContent = '', 3000);
});

// ===== Documents =====
function loadDocs() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.docs) || '{}');
  document.querySelectorAll('[data-doc]').forEach(cb => {
    cb.checked = !!saved[cb.dataset.doc];
    cb.addEventListener('change', () => {
      const data = {};
      document.querySelectorAll('[data-doc]').forEach(c => data[c.dataset.doc] = c.checked);
      localStorage.setItem(STORAGE_KEYS.docs, JSON.stringify(data));
    });
  });
}

// ===== Notes =====
function loadNotes() {
  const notes = localStorage.getItem(STORAGE_KEYS.notes) || '';
  const area = document.getElementById('notas-rapidas');
  if (area) {
    area.value = notes;
    area.addEventListener('input', () => {
      localStorage.setItem(STORAGE_KEYS.notes, area.value);
    });
  }
}

// ===== Review reminder =====
function loadReview() {
  const last = localStorage.getItem(STORAGE_KEYS.review);
  const el = document.getElementById('last-review');
  if (last && el) {
    el.textContent = `Última revisión: ${last}`;
  }
}

document.getElementById('set-reminder')?.addEventListener('click', () => {
  const today = new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
  localStorage.setItem(STORAGE_KEYS.review, today);
  document.getElementById('last-review').textContent = `Última revisión: ${today}`;
});

// ===== Theme =====
function loadTheme() {
  const theme = localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeButton(theme);
}

function updateThemeButton(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE_KEYS.theme, next);
  updateThemeButton(next);
});

// ===== Export / Import =====
document.getElementById('export-data')?.addEventListener('click', () => {
  const data = {
    kit: JSON.parse(localStorage.getItem(STORAGE_KEYS.kit) || '{}'),
    plan: JSON.parse(localStorage.getItem(STORAGE_KEYS.plan) || '{}'),
    docs: JSON.parse(localStorage.getItem(STORAGE_KEYS.docs) || '{}'),
    notes: localStorage.getItem(STORAGE_KEYS.notes) || '',
    review: localStorage.getItem(STORAGE_KEYS.review) || '',
    region: localStorage.getItem(STORAGE_KEYS.region) || '',
    comuna: localStorage.getItem(STORAGE_KEYS.comuna) || ''
  };
  const str = JSON.stringify(data);
  navigator.clipboard.writeText(str).then(() => {
    alert('Datos copiados al portapapeles. Guárdalos en un lugar seguro.');
  }).catch(() => {
    prompt('Copia estos datos:', str);
  });
});

document.getElementById('import-data')?.addEventListener('click', () => {
  const area = document.getElementById('import-area');
  area.classList.toggle('hidden');
  if (!area.classList.contains('hidden')) {
    area.focus();
  } else if (area.value.trim()) {
    try {
      const data = JSON.parse(area.value.trim());
      if (data.kit) localStorage.setItem(STORAGE_KEYS.kit, JSON.stringify(data.kit));
      if (data.plan) localStorage.setItem(STORAGE_KEYS.plan, JSON.stringify(data.plan));
      if (data.docs) localStorage.setItem(STORAGE_KEYS.docs, JSON.stringify(data.docs));
      if (data.notes !== undefined) localStorage.setItem(STORAGE_KEYS.notes, data.notes);
      if (data.review) localStorage.setItem(STORAGE_KEYS.review, data.review);
      if (data.region) localStorage.setItem(STORAGE_KEYS.region, data.region);
      if (data.comuna) localStorage.setItem(STORAGE_KEYS.comuna, data.comuna);
      alert('Datos importados. Recargando...');
      location.reload();
    } catch (e) {
      alert('Error: datos no válidos.');
    }
  }
});

// ===== Clear all =====
document.getElementById('clear-all')?.addEventListener('click', () => {
  if (confirm('¿Estás seguro de que quieres borrar TODOS los datos guardados en este dispositivo?')) {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    alert('Datos eliminados.');
    location.reload();
  }
});


// ===== Browser Notifications (reminders only) =====
document.getElementById('enable-notifications')?.addEventListener('click', async () => {
  const status = document.getElementById('notif-status');
  if (!('Notification' in window)) {
    status.textContent = 'Tu navegador no soporta notificaciones.';
    return;
  }
  if (Notification.permission === 'granted') {
    status.textContent = '✅ Notificaciones ya están activadas.';
    return;
  }
  try {
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      status.textContent = '✅ Notificaciones activadas. Recuerda: no reemplazan la alerta SAE oficial.';
      new Notification('Chile Preparado', {
        body: 'Notificaciones del navegador activadas. Usa SAE para alertas oficiales de emergencia.',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🇨🇱</text></svg>'
      });
    } else {
      status.textContent = 'Permiso denegado. Puedes activarlo después en la configuración del navegador.';
    }
  } catch (e) {
    status.textContent = 'No se pudo solicitar el permiso.';
  }
});

// ===== Service Worker =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  loadKit();
  loadPlan();
  loadDocs();
  loadNotes();
  loadReview();

  // Region selector
  const select = document.getElementById('region-select');
  if (select) {
    select.addEventListener('change', () => {
      localStorage.removeItem(STORAGE_KEYS.comuna);
      setRegion(select.value, false);
    });
  }

  // Comuna selector
  const comunaSelect = document.getElementById('comuna-select');
  if (comunaSelect) {
    comunaSelect.addEventListener('change', () => {
      if (comunaSelect.value) {
        setComuna(comunaSelect.value);
      }
    });
  }

  // Detect location button
  document.getElementById('detect-location')?.addEventListener('click', detectLocation);

  // Restore saved region + comuna
  const savedRegion = localStorage.getItem(STORAGE_KEYS.region);
  if (savedRegion && REGIONS[savedRegion]) {
    setRegion(savedRegion, true); // true = try to restore comuna
  }
});
