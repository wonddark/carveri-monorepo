import type {
  Book,
  Comparable,
  OwnerRecord,
  ServiceRecord,
  Vehicle,
  VehicleImage,
} from "@/types/vehicle-detail";

export const vehicleImages: VehicleImage[] = [
  {
    url: "https://private-us-east-1.manuscdn.com/sessionFile/F4sc8gp6VPmCPTmJvhtjfL/sandbox/zGdD0IO830XIy5nEyiBfl6-img-1_1770501372000_na1fn_aGVyby1jYXI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRjRzYzhncDZWUG1DUFRtSnZodGpmTC9zYW5kYm94L3pHZEQwSU84MzBYSXk1bkV5aUJmbDYtaW1nLTFfMTc3MDUwMTM3MjAwMF9uYTFmbl9hR1Z5YnkxallYSS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=c-cDOIAJJmIXNNXyQTarfOkFfVcY1KulQsj6k5QjxlM0ZMN8CqndQvM5nqrhyRlF8i7HndO07uuN-jUS-VeE3SwLzStaIZ54fUt731yFfTKyK8yEIID4VMrsX6F01SoSqVGd3EvfLyG0fKeyI0mVELgLtwY~bu0nAfPqftUH0zcnWgCgBIk6pfj6GflNRvkVwZpPSpJqgv8Og0RCoY3~DHo1WT2Iv2-Jh4MDMGrKMMqYF0y8igXhB9f~ZUO3JzodqFVQz9aHI5~sKvMI6OiTy3Y8OyI1RKhr6Hcg06StPLX9W2x0WNlQeEsA-si7MA9HQTtmLTkTIZoGdvIS5NQumQ__",
    label: "Vista Frontal",
  },
  {
    url: "https://private-us-east-1.manuscdn.com/sessionFile/F4sc8gp6VPmCPTmJvhtjfL/sandbox/zGdD0IO830XIy5nEyiBfl6-img-2_1770501371000_na1fn_Y2FyLXJlYXI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRjRzYzhncDZWUG1DUFRtSnZodGpmTC9zYW5kYm94L3pHZEQwSU84MzBYSXk1bkV5aUJmbDYtaW1nLTJfMTc3MDUwMTM3MTAwMF9uYTFmbl9ZMkZ5TFhKbFlYSS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=g0Ug6H1pREQa-kxNTsAAzL5Kaopn1Zi6DJSkyB3sfRc8B-UJFdarnPjyPqPA~5mwUyVVTofCOwrrG13fBSduoIqH5C3-QWF7k4CFTYdPY99belKIdU0F7byCaIAmOiCGCHhmGv2cJ-SG8DHqkGs53eHVvkAVl~596QqjsllNFxcDJcAGl2E6Ir6jeIJ4YLnYdJmSizipAklLgvxi0-d2YcICYMaZEgeK~7Z1NDY-x8jnQz-b69wDeAi~GgcGHSbB8D8dnJfJsMM~8z5SITmDL5v7NydXx-YIc4Yx9wPul1yLwTrjQXXdtNLDMi1rKThjiATlU4BIvbOvj33eQJNWig__",
    label: "Vista Trasera",
  },
  {
    url: "https://private-us-east-1.manuscdn.com/sessionFile/F4sc8gp6VPmCPTmJvhtjfL/sandbox/zGdD0IO830XIy5nEyiBfl6-img-3_1770501369000_na1fn_Y2FyLWRldGFpbC13aGVlbA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRjRzYzhncDZWUG1DUFRtSnZodGpmTC9zYW5kYm94L3pHZEQwSU84MzBYSXk1bkV5aUJmbDYtaW1nLTNfMTc3MDUwMTM2OTAwMF9uYTFmbl9ZMkZ5TFdSbGRHRnBiQzEzYUdWbGJBLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=DL6SOOkezjWFtZrJyQKxGeY6slmV~7UZZ44oK~9bTkun5aYCg6~SN1fJFDpRc2z1WtkWXARRiFPJiDrZdwYbKWrnBet8PWWPhGl5~hPBt0WZROilsGU9TwHWyWJHltdGl5LOA5XcTVbDjq6U6dE-E0dwS82DoCNn0Y2ezR47WZgV43uqZ9iLOMGocMlskKibjzGurMMQh176IohXjgwJMaEXeFotl0Qtz6zImt01w-uccgF2ae6QuUyUFy8sl67Q45eZtUbABY~N0rz1WzA0CROwxG7GqBUU4fHE2OFffTDTf6YSaNG7v-QkWnXWysZ6PD~etSnnhp8zBwrin4xOmA__",
    label: "Detalle Rines",
  },
  {
    url: "https://private-us-east-1.manuscdn.com/sessionFile/F4sc8gp6VPmCPTmJvhtjfL/sandbox/zGdD0IO830XIy5nEyiBfl6-img-4_1770501366000_na1fn_Y2FyLWludGVyaW9yLWRldGFpbA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRjRzYzhncDZWUG1DUFRtSnZodGpmTC9zYW5kYm94L3pHZEQwSU84MzBYSXk1bkV5aUJmbDYtaW1nLTRfMTc3MDUwMTM2NjAwMF9uYTFmbl9ZMkZ5TFdsdWRHVnlhVzl5TFdSbGRHRnBiQS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=V75BU3WKhg004s0-1iqIXO0CF5l8a~bblu2bYj85vqkMtzUB8~ZLLh0BhMTuiYE2IdhsTe8ITd8pxWNXhm6WUffcteM0zFSeLTJkLhI2PjnuDTTLeV~Y3tfenPe0myY7MIh6Vgsw5WLxNsJSJRvdJRhxa1gBmFaqu1LIM7zYhzn6Yzr~m4FTlx9jVnJkIHDL3mUvwDns2OkOwT1o0N-tJ3SQmNJQ8PsIpiqbc-64RFyE2j4OdhPHhu8CZ3PoTZLUyJ4McaKCjAh60InhvKBh9~jobM~z1bcXDm6maagAGvCdYDt0~l68FcLE6ajyHH3EqgvNvXFqr1ao28Gssfqb7g__",
    label: "Interior",
  },
];

export const vehicleData: Vehicle = {
  year: 2024,
  make: "BMW",
  model: "X5",
  trim: "xDrive40i",
  package: "M Sport Package",
  price: 52500,
  mileage: "18,420",
  vin: "5UXCR6C09R9S12345",
  color: "Alpine White",
  interior: "Cognac Vernasca Leather",
  title: "Clean Title",
  dealer: "AutoNation BMW Miami",
  location: "Miami, FL",
  daysOnLot: 34,
  listingUrl: "#",
};

export const booksData: Book[] = [
  {
    abbr: "MMR",
    name: "Manheim Market Report",
    value: 49800,
    color: "#E85D04",
    details: [
      { label: "Avg Wholesale", value: "$49,800" },
      { label: "Adjusted MMR", value: "$50,200" },
      { label: "Wholesale Range", value: "$47,500 – $52,100" },
      { label: "Retention %", value: "82.4%" },
      { label: "Last Updated", value: "Feb 20, 2026" },
    ],
  },
  {
    abbr: "KBB",
    name: "Kelley Blue Book",
    value: 52800,
    color: "#0369A1",
    details: [
      { label: "Fair Purchase Price", value: "$52,800" },
      { label: "Trade-In (Good)", value: "$48,200" },
      { label: "Trade-In (Excellent)", value: "$50,600" },
      { label: "Private Party", value: "$51,400" },
      { label: "Certified Pre-Owned", value: "$54,900" },
    ],
  },
  {
    abbr: "JDP",
    name: "J.D. Power",
    value: 51200,
    color: "#1E40AF",
    details: [
      { label: "Retail Value", value: "$51,200" },
      { label: "Trade-In (Clean)", value: "$47,800" },
      { label: "Trade-In (Average)", value: "$46,100" },
      { label: "Wholesale", value: "$48,900" },
      { label: "Condition Adj.", value: "+$1,200 (Excellent)" },
    ],
  },
  {
    abbr: "BB",
    name: "Black Book",
    value: 50500,
    color: "#1F2937",
    details: [
      { label: "Retail Clean", value: "$50,500" },
      { label: "Retail Average", value: "$48,800" },
      { label: "Wholesale Clean", value: "$47,200" },
      { label: "Wholesale Average", value: "$45,900" },
      { label: "Market Trend", value: "↘ Declining (-1.8%/mo)" },
    ],
  },
];

export const comparablesData: Comparable[] = [
  {
    name: "2024 BMW X5 xDrive40i",
    dealer: "Off Lease Only",
    miles: "21,400",
    price: 49900,
    days: 18,
    dist: "12 mi",
  },
  {
    name: "2024 BMW X5 xDrive40i",
    dealer: "AutoNation BMW Pembroke Pines",
    miles: "15,200",
    price: 54500,
    days: 8,
    dist: "24 mi",
  },
  {
    name: "2024 BMW X5 xDrive40i M Sport",
    dealer: "Braman BMW",
    miles: "19,800",
    price: 51900,
    days: 42,
    dist: "6 mi",
  },
  {
    name: "2023 BMW X5 xDrive40i",
    dealer: "Vista BMW Coconut Creek",
    miles: "28,100",
    price: 47200,
    days: 55,
    dist: "38 mi",
  },
  {
    name: "2024 BMW X5 xDrive40i",
    dealer: "Private Seller — FB Marketplace",
    miles: "22,600",
    price: 50500,
    days: 12,
    dist: "15 mi",
  },
];

export const serviceRecords: ServiceRecord[] = [
  {
    name: "Cambio de Aceite y Filtros",
    detail: "BMW of Miami — 5,000 mi",
    date: "Jun 2024",
    icon: "oil",
  },
  {
    name: "Rotación de Llantas",
    detail: "BMW of Miami — 10,000 mi",
    date: "Dic 2024",
    icon: "rotate",
  },
  {
    name: "Servicio de 15,000 mi",
    detail: "BMW of Miami — Frenos, filtros, fluidos",
    date: "Jun 2025",
    icon: "service",
  },
  {
    name: "Inspección Pre-Venta",
    detail: "AutoNation BMW Miami — 18,200 mi",
    date: "Feb 2026",
    icon: "inspect",
  },
];

export const ownerRecords: OwnerRecord[] = [
  {
    num: 1,
    duration: "Ene 2024 — Ago 2025 (1 año, 7 meses)",
    detail: "Uso personal · Florida · Comprado nuevo en dealer",
    miles: "Millas al inicio: 12 · Millas al final: 16,800",
  },
  {
    num: 2,
    duration: "Nov 2025 — Presente (3 meses)",
    detail: "Dealer · Florida · Comprado en subasta Copart",
    miles: "Millas al inicio: 16,800 · Millas actuales: 18,420",
    color: "#F97316",
  },
];
