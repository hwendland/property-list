export interface Property {
  createdAt: Date;
  name: string;
  address: string;
  rooms: number;
  plotSize: number;
  price: string;
  id: string;
}

export type PropertySortOption = 'price' | 'address';
export type SortOrder = 'asc' | 'desc';
