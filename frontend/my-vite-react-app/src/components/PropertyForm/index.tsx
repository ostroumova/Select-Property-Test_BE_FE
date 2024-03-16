import React, { useState } from "react";
import axios from "axios";

export const PropertyForm: React.FC = () => {
  const [property, setProperty] = useState({
    id: 0,
    address: "",
    price: 0,
    rating: 0,
    image: "",
  });

  const handleChange = (event) => {
    setProperty({
      ...property,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/properties", property).then(() => {
      // Clear the form
      setProperty({
        id: 0,
        address: "",
        price: 0,
        rating: 0,
        image: "",
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add form fields for id, address, price, rating, and image */}
    </form>
  );
};
