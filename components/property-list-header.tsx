import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';
import styles from '../styles/PropertyListHeader.module.css'
import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add"
import Drawer from "@material-ui/core/Drawer";
import PropertyForm from "./property-form";
import { PropertySortOption } from "../models/property";
import { SortContext } from "../context/sortContext";

export default function PropertyListHeader() {
  const { sort, setSort } = useContext(SortContext)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleSortChange = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    setSort(event.target.value as PropertySortOption);
  };

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsDrawerOpen(open);
    };


  return (
    <div className={styles.container}>
      <Select value={sort} onChange={handleSortChange} disableUnderline className={styles.select}>
        <MenuItem value={PropertySortOption.PRICE_DESCENDING}>
          Price descending
        </MenuItem>
        <MenuItem value={PropertySortOption.PRICE_ASCENDING}>
          Price ascending
        </MenuItem>
        <MenuItem value={PropertySortOption.NAME_DESCENDING}>
          Name descending
        </MenuItem>
        <MenuItem value={PropertySortOption.NAME_ASCENDING}>
          Name ascending
        </MenuItem>
      </Select>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={toggleDrawer(!isDrawerOpen)}
      >
        Add Property
      </Button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <PropertyForm onClose={toggleDrawer(false)}/>
      </Drawer>
    </div>
  );
}