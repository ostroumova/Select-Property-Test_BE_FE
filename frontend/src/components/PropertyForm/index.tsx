import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import "./styles.scss";

export const PropertyForm: React.FC = () => {
  const [property, setProperty] = useState({
    id: 0,
    address: "",
    price: 0,
    rating: 0,
    image: null,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "image") {
      setProperty({
        ...property,
        image: event.target.files[0],
      });
    } else {
      setProperty({
        ...property,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(property).forEach((key) => {
      formData.append(key, property[key]);
    });

    axios
      .post("/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setProperty({
          id: 0,
          address: "",
          price: 0,
          rating: 0,
          image: null,
        });
      });
  };

  return (
    <div className="upload-img-form">
      <h3>Add your property</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          value={property.id}
          onChange={handleChange}
          placeholder="ID"
          required
        />
        <input
          type="text"
          name="address"
          value={property.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          type="number"
          name="price"
          value={property.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="rating"
          value={property.rating}
          onChange={handleChange}
          placeholder="Rating"
          required
        />
        <input type="file" name="image" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
