export interface VehicleImage {
  url: string;
  label: string;
}

export interface BookDetail {
  label: string;
  value: string;
}

export interface Book {
  abbr: string;
  name: string;
  value: number;
  color: string;
  details: BookDetail[];
}

export interface Comparable {
  name: string;
  dealer: string;
  miles: string;
  price: number;
  days: number;
  dist: string;
}

export interface ServiceRecord {
  name: string;
  detail: string;
  date: string;
  icon?: "oil" | "rotate" | "service" | "inspect";
}

export interface OwnerRecord {
  num: number;
  duration: string;
  detail: string;
  miles: string;
  color?: string;
}

export interface Vehicle {
  year: number;
  make: string;
  model: string;
  trim: string;
  package: string;
  price: number;
  mileage: string;
  vin: string;
  color: string;
  interior: string;
  title: string;
  dealer: string;
  location: string;
  daysOnLot: number;
  listingUrl: string;
}
