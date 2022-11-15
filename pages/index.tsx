import PropertyList from '../components/property-list';
import PropertyListHeader from '../components/property-list-header';
import styles from '../styles/Home.module.css'
import { Property, PropertySortOption } from '../models/property';
import { SWRConfig } from 'swr';
import { useState } from 'react';
import { SortContext } from '../context/sortContext';
interface HomeProps {
  fallback: Property[]
}

export default function Home({ fallback }: HomeProps) {
  const [sort, setSort] = useState({ key: 'price', order: 'desc'})

  return (
    <SWRConfig value={{ fallback }}>
      <SortContext.Provider value={{sort, setSort}}>
        <div className={styles.container}>
          <PropertyListHeader />
          <PropertyList />
        </div>
      </SortContext.Provider>
    </SWRConfig>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    'https://63583d4bc27556d2893a7d6f.mockapi.io/api/properties'
  );
  const properties = await res.json()
  return {
    props: {
      fallback: {
        'https://63583d4bc27556d2893a7d6f.mockapi.io/api/properties': properties
      },
    },
  };
}