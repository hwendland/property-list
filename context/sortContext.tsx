import { createContext } from 'react';
import { PropertySortOption, SortOrder } from '../models/property';

export interface SortContextType {
  order: SortOrder;
  key: PropertySortOption;
}

export const SortContext = createContext({
  sort: { key: 'price', order: 'desc' },
  setSort: (sort: SortContextType) => {},
});
