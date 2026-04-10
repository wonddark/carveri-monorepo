export type VehicleListItem = {
  id: string;
  vin: string;
  lote: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  auction: string | null;
  odometro: string;
  saleAuctionDate: string | null;
  titleDetails: string;
  runAndDrive: boolean | null;
  engine: string;
  fuel: string;
  drive: string;
  transmission: string;
  color: string;
  imageThumbnail: string;
  retailPrice: number;
  zipCode?: string | null;
  milesCheckRadius?: number;
  isFreeAccess?: boolean;
  dataSources: string | null;
};

export type VehicleList = VehicleListItem[];

export type VehicleListResponse = {
  succeeded: boolean;
  data: VehicleList;
  error: {
    code: string;
    messages: string[];
  };
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  startIndex: number;
  endIndex: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
