import React, { useEffect, useState } from "react";
import axios from "axios";
import { Property } from "../../types";
import "./styles.scss";

export const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/properties")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching properties", error);
      });
  }, []);

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
