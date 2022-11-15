import { createContext, useContext } from "react";
import { useProperties } from "../hooks/useProperties";
import { Property, PropertySortOption } from "../models/property";

export const SortContext = createContext({
  sort: PropertySortOption.PRICE_DESCENDING,
  setSort: (sort: PropertySortOption) => {},
});

export function useSortedProperties() {
  const { sort } = useContext(SortContext);
  const { properties, isLoading, isError } = useProperties();
  let key = 'price';
  let reverse = false;

  switch (sort) {
    case PropertySortOption.PRICE_DESCENDING:
      reverse = true;
    case PropertySortOption.NAME_DESCENDING:
      reverse = true;
      key = 'name';
    case PropertySortOption.PRICE_ASCENDING:
      key = 'name';
    case PropertySortOption.PRICE_ASCENDING:
    default:
      break;
  }

  if (key = 'name') properties?.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
  if (key = 'price') properties?.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
  if (reverse) properties?.reverse()

  return {
    properties,
    isLoading,
    isError
  }
}