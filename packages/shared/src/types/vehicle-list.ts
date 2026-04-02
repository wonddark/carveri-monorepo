type ShortInfo = {
  id: string;
  vin: string;
  lote: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  auction: string;
  odometro: string;
  saleAuctionDate: string;
  titleDetails: string;
  runAndDrive: true;
  engine: string;
  fuel: string;
  drive: string;
  transmission: string;
  color: string;
  imageThumbnail: string;
  retailPrice: number;
  dataSources: string;
};

export type VehicleList = ShortInfo[];
