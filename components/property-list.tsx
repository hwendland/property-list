import Grid from '@material-ui/core/Grid';
import PropertyListItem from './property-list-item';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSWRConfig } from 'swr';
import { useSortedProperties } from '../hooks/useSortedProperties';
import styles from '../styles/PropertyList.module.css';

export default function PropertyList() {
  const { mutate } = useSWRConfig();
  const { properties, isError, isLoading } = useSortedProperties();

  const handleDelete = async (id: string) => {
    const optimisticData = properties?.filter((property) => property.id !== id);
    const options = { optimisticData, rollbackOnError: true };
    mutate(
      'https://63583d4bc27556d2893a7d6f.mockapi.io/api/properties',
      deleteProperty(id),
      options
    );
  };

  const deleteProperty = async (id: string) => {
    return fetch(
      `https://63583d4bc27556d2893a7d6f.mockapi.io/api/properties/${id}`,
      {
        method: 'DELETE',
        redirect: 'follow',
      }
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Error</div>;

  return (
    <Grid container spacing={2} className={styles.container}>
      {properties?.map((property) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
          <PropertyListItem
            property={property}
            onDelete={() => handleDelete(property.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
