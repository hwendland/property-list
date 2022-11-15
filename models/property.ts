export interface Property {
  createdAt: Date;
  name: string;
  address: string;
  rooms: number;
  plotSize: number;
  price: string;
  id: string;
}

export type PropertyKey = keyof Property;

export enum PropertySortOption {
  PRICE_ASCENDING,
  PRICE_DESCENDING,
  NAME_ASCENDING,
  NAME_DESCENDING,
}