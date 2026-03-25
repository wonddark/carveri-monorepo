export interface VehicleReport {
  vehiculo: Vehiculo;
  currentImages: string[];
  historial: Historial;
  mercado: Mercado;
}

export interface Vehiculo {
  vin: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  engine: string;
  fuel: string;
  drive: string;
  transmission: string;
  color: string;
  odometro: string;
  titleDetails: string;
  runAndDrive: string;
  precioVenta: string;
  auction: string;
  fechaSubasta: string;
}

// --- Historial ---

export interface SubastaHistorialItem {
  auction: string;
  fechaVenta: string;
  ofertaFinal: string;
  estado: string;
  vendedor: string;
}

export interface SubastaInfo {
  subasta: string;
  fechaVenta: string;
  fechaRealVenta: string;
  vendedor: string;
  finalBid: string;
  odometro: string;
  condicion: string;
  riesgo: string;
  titulo: string;
  precioRango: string;
  precioPromedio: string;
  precioMediano: string;
  valorRetail: string;
  valorReparacion: string;
}

export interface SubastasAnteriores {
  imagenes: string[];
  historialSubastas: SubastaHistorialItem[];
  info: SubastaInfo;
}

export interface AccidenteResumen {
  totalAccidentes: number;
  airbagsActivados: string;
  reparado: string;
  danioEstructural: string;
}

export interface Accident {
  numero: number;
  fecha: string;
  titulo: string;
  severidad: string;
  redFlag: boolean;
  detalles: string[];
  impactAreas: string[];
}

export interface Accidentes {
  resumen: AccidenteResumen;
  eventos: Accident[];
}

export interface Propietario {
  numero: number;
  etiqueta: string;
  anioPurchased: number;
  tipo: string;
  duracion: string;
  estados: string;
  millasPorAnio: string;
  ultimoOdometro: string;
}

export interface RegistroMantenimiento {
  fecha: string;
  odometro: string;
  fuente: string;
  tipo: string;
  detalles: string[];
  redFlag: boolean;
}

export interface Mantenimiento {
  registros: RegistroMantenimiento[];
}

export interface Recalls {
  pendientes: number;
  estado: string;
  detalles: string[];
}

export interface HistorialTituloItem {
  fecha: string;
  tipo: string;
  fuente: string;
  detalles: string[];
}

export interface LecturaOdometro {
  fecha: string;
  tipo: string;
  odometro: string;
}

export interface TituloOdometro {
  titulo: string;
  odometroEstado: string;
  lemonLaw: string;
  recalls: Recalls;
  historialTitulo: HistorialTituloItem[];
  lecturasOdometro: LecturaOdometro[];
}

export interface Historial {
  subastasAnteriores: SubastasAnteriores;
  accidentes: Accidentes;
  propietarios: Propietario[];
  mantenimiento: Mantenimiento;
  tituloOdometro: TituloOdometro;
}

// --- Mercado ---

export interface PriceBookEntry {
  base: string;
  total: string;
  ajuste?: string;
  adj?: string;
}

export interface ManheimHistorico {
  ultimos30Dias: string;
  seisMeses: string;
  ultimoAnio: string;
}

export interface Manheim {
  baseMmr: string;
  ajustadoMmr: string;
  rangoMin: string;
  rangoMax: string;
  promedioOdometro: string;
  condicionPromedio: string;
  proyectadoPromedio: string;
  retailEstimado: string;
  retailRangoMin: string;
  retailRangoMax: string;
  historico: ManheimHistorico;
  pctGauge: number;
  etiquetaPrecio: string;
}

export interface KBB {
  fairPurchasePrice: string;
  rangoMin: string;
  rangoMax: string;
  lending: PriceBookEntry;
  tradeBook: PriceBookEntry;
  privateParty: PriceBookEntry;
  retail: PriceBookEntry;
  auction: PriceBookEntry;
  etiquetaPrecio: string;
}

export interface JDPower {
  tradeClean: PriceBookEntry;
  tradeAvg: PriceBookEntry;
  tradeRough: PriceBookEntry;
  loan: PriceBookEntry;
  retail: PriceBookEntry;
  auctionLow: PriceBookEntry;
  auctionAvg: PriceBookEntry;
  auctionHigh: PriceBookEntry;
  etiquetaPrecio: string;
}

export interface BlackBookGrade {
  xClean?: PriceBookEntry;
  clean?: PriceBookEntry;
  avg?: PriceBookEntry;
  rough?: PriceBookEntry;
}

export interface BlackBook {
  wholesale: BlackBookGrade;
  retail: BlackBookGrade;
  trade: BlackBookGrade;
  finance: { avg: PriceBookEntry };
  etiquetaPrecio: string;
}

export interface Mercado {
  carfaxValor: string;
  manheim: Manheim;
  kbb: KBB;
  jdPower: JDPower;
  blackBook: BlackBook;
}
