import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { Property } from '../models/property';
import styles from '../styles/PropertyForm.module.css';

const initialState: Omit<Property, 'id' | 'createdAt'> = {
  address: '',
  name: '',
  price: '',
  plotSize: Infinity,
  rooms: Infinity
}

interface PropertyFormProps {
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function PropertyForm({ onClose }: PropertyFormProps) {
  const { mutate } = useSWRConfig();

  const [data, setData] = useState(initialState)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    mutate('https://63583d4bc27556d2893a7d6f.mockapi.io/api/properties', createProperty(data));
  };

  const createProperty = (newData: Omit<Property, 'id' | 'createdAt'>) => {
    const body = JSON.stringify({
      id: '500',
      createdAt: new Date().toISOString(),
      ...newData,
    });
    return fetch('https://63583d4bc27556d2893a7d6f.mockapi.io/api/properties', {
      method: 'POST',
      redirect: 'follow',
      body,
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };;

  return (
    <>
      <div className={styles.header}>
        <span>New Property</span>
        <IconButton onClick={onClose}>
          <CloseIcon htmlColor="#fff" />
        </IconButton>
      </div>
      <div className={styles.form}>
        <span className={styles.formTitle}>Property details</span>
        <TextField
          required
          name="address"
          label="Address"
          type="text"
          value={data.address}
          inputProps={{ styles: { fontSize: 14 } }}
          onChange={handleInputChange}
        />
        <TextField
          required
          name="name"
          label="Name"
          type="text"
          value={data.name}
          onChange={handleInputChange}
        />
        <TextField
          required
          name="price"
          label="Price"
          type="text"
          value={data.price}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
        />
        <TextField
          required
          name="plotSize"
          label="Plot size"
          type="number"
          value={data.plotSize}
          onChange={handleInputChange}
        />
        <TextField
          required
          name="rooms"
          label="Rooms"
          type="number"
          value={data.rooms}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.footer}>
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Create Property
        </Button>
      </div>
    </>
  );
}