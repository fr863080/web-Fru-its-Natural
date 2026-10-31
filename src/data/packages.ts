import { SpecialPackage } from '../types';

export const SPECIAL_PACKAGES: SpecialPackage[] = [
  {
    id: 'pack-15',
    name: 'Paquete Mayoreo Inicial (15 Botellas)',
    categoryBadge: 'Mínimo de Mayoreo (15 pzas)',
    description: '¡El paquete ideal para activar la tarifa de mayoreo a partir de 15 botellas! Perfecto para reuniones familiares, comidas con amigos o surtir tu refrigerador con precio preferencial y entrega a domicilio gratis en Cocula.',
    features: [
      '15 botellas a tu elección (1/2L o 1L)',
      'Aplica Tarifa de Mayoreo (a partir de 15 botellas)',
      'Envío local GRATIS incluido en Cocula',
      'Garantía de frescura y cadena de frío inmediata',
    ],
    startingPrice: 195,
    buttonLabel: 'Cargar 15 Botellas (Mínimo Mayoreo)',
    defaultAssortment: [
      { flavorId: 'horchata', size: '500ml', quantity: 3 },
      { flavorId: 'jamaica', size: '500ml', quantity: 3 },
      { flavorId: 'limon', size: '500ml', quantity: 3 },
      { flavorId: 'tamarindo', size: '500ml', quantity: 3 },
      { flavorId: 'taro', size: '500ml', quantity: 3 },
    ],
  },
  {
    id: 'pack-50',
    name: 'Paquete Mayoreo Fiestas (50 Botellas)',
    categoryBadge: 'Mayoreo Fiestas & Cumpleaños',
    isRecommended: true,
    description: 'El preferido de eventos sociales en Cocula. Cumple holgadamente con el mayoreo a partir de 15 botellas. Olvídate de preparar jarras y despacha a tus invitados con botellas frías individuales listas para beber.',
    features: [
      '50 botellas surtidas (combinación de tus sabores)',
      'Precio de Mayoreo preferencial garantizado (a partir de 15 botellas)',
      'Entrega directa en hieleras térmicas para conservar el frío',
      'Prioridad de entrega en el horario pactado',
    ],
    startingPrice: 650,
    buttonLabel: 'Cargar Paquete 50 Botellas (Mayoreo)',
    defaultAssortment: [
      { flavorId: 'horchata', size: '500ml', quantity: 15 },
      { flavorId: 'jamaica', size: '500ml', quantity: 15 },
      { flavorId: 'limon', size: '500ml', quantity: 10 },
      { flavorId: 'tamarindo', size: '500ml', quantity: 5 },
      { flavorId: 'taro', size: '500ml', quantity: 5 },
    ],
  },
  {
    id: 'pack-100',
    name: 'Paquete Gran Mayoreo (100 Botellas)',
    categoryBadge: 'Gran Mayoreo Negocios & Banquetes',
    description: 'Especialmente diseñado para taquerías, marisquerías, restaurantes, bodas y banquetes. Abastecimiento programado con atención personalizada y el mayor ahorro al mayoreo (a partir de 15 botellas).',
    features: [
      '100 botellas con sabores a tu medida',
      'Tarifa de Gran Mayoreo con máximo beneficio',
      'Atención prioritaria por WhatsApp directo',
      'Entrega programada puntual para el inicio de tu servicio',
    ],
    startingPrice: 1250,
    buttonLabel: 'Cargar Paquete 100 Botellas (Gran Mayoreo)',
    defaultAssortment: [
      { flavorId: 'horchata', size: '500ml', quantity: 30 },
      { flavorId: 'jamaica', size: '500ml', quantity: 30 },
      { flavorId: 'limon', size: '500ml', quantity: 20 },
      { flavorId: 'tamarindo', size: '500ml', quantity: 10 },
      { flavorId: 'taro', size: '500ml', quantity: 10 },
    ],
  },
];
