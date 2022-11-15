import useSWR, { Fetcher } from 'swr';
import { Property } from '../models/property';

const fetcher: Fetcher<Property[], string> = (...args) =>
  fetch(...args).then((res) => res.json());

export function useProperties() {
  const { data, error } = useSWR(
    'https://63583d4bc27556d2893a7d6f.mockapi.io/api/properties',
    fetcher
  );

  return {
    properties: data,
    isLoading: !error && !data,
    isError: error,
  };
}
