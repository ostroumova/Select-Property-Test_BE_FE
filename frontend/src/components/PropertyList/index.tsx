import axios from "axios";
import React, { useEffect } from "react";
import { Property } from "../../types";
import "./styles.scss";

type PropertyListPrors = {
  properties: Property[];
  setProperties: (properties: Property[]) => void;
};

export const PropertyList: React.FC<PropertyListPrors> = ({
  properties,
  setProperties,
}) => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/properties")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching properties", error);
      });
  }, [setProperties]);

  return (
    <div className="properties-container" data-testid="properties-container">
      {properties.map((property: Property) => (
        <div className="properties-container__item" key={property.id}>
          <img
            className="properties-container__item-img"
            src={property.image}
            alt={property.address}
          />
          <h2>{property.address}</h2>
          <p>Price: £ {property.price}</p>
          <p>Rating: {property.rating}</p>
        </div>
      ))}
    </div>
  );
};
