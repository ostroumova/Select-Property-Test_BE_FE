import React, { useEffect, useState } from "react";
import axios from "axios";
import { Property } from "../../types";

export const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/properties")
      .then((response) => {
        console.log(response.data);
        setProperties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching properties", error);
      });
  }, []);

  return (
    <div>
      {properties.map((property: Property) => (
        <div key={property.id}>
          <img src={property.image} alt={property.address} />
          <h2>{property.address}</h2>
          <p>Price: {property.price}</p>
          <p>Rating: {property.rating}</p>
        </div>
      ))}
    </div>
  );
};
