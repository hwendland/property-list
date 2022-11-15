import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close"
import Image from 'next/image';
import { Property } from "../models/property";
import styles from "../styles/PropertyListItem.module.css"
import { MouseEventHandler } from "react";

interface PropertyListItemProps {
  property: Property;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

export default function PropertyListItem({ property, onDelete }: PropertyListItemProps) {
  return (
    <Card variant="outlined">
      <CardHeader
        className={styles.cardHeader}
        action={
          <IconButton
            style={{ marginBottom: '-8px' }}
            size="small"
            onClick={onDelete}
          >
            <CloseIcon />
          </IconButton>
        }
        title={property.address}
        disableTypography
      />
      <CardContent className={styles.cardContent}>
        <Image priority src="/visual.png" alt="visual" width={130} height={88}></Image>
        <div className={styles.info}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Rooms</span>
            <span>{property.rooms}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Plot size</span>
            <span>{property.plotSize} &#13217;</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Price</span>
            <span className={styles.price}>{property.price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}