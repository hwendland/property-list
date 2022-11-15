import { useContext } from 'react';
import { SortContext } from '../context/sortContext';
import { useProperties } from './useProperties';

export function useSortedProperties() {
  const {
    sort: { key, order },
  } = useContext(SortContext);
  const { properties, isLoading, isError } = useProperties();

  if (key === 'address')
    properties?.sort((a, b) =>
      a.address.toLowerCase().localeCompare(b.address.toLowerCase())
    );
  if (key === 'price')
    properties?.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  if (order === 'desc') properties?.reverse();

  return {
    properties,
    isLoading,
    isError,
  };
}
