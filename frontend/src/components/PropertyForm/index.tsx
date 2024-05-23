import axios from "axios";
import React, { FormEvent } from "react";
import "./styles.scss";
import { Property } from "../../types";

type PropertyFormProp = {
  addProperty: (property: Property) => void;
};

export const PropertyForm: React.FC<PropertyFormProp> = ({ addProperty }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formElement = event.currentTarget;
    axios
      .post("http://localhost:3000/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        addProperty(response.data);

        formElement.reset();
      })

      .catch(function (response) {
        console.log(response);
      });
  };

  return (
    <div className="upload-img-form">
      <h3>Add your property</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="address" placeholder="Address" required />
        <input type="number" name="price" placeholder="Price" required />
        <input type="number" name="rating" placeholder="Rating" required />
        <input type="file" name="image" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
