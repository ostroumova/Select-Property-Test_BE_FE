import path from "path";
import { properties } from "../data";
import { Request, Response } from "express";
import Joi from "joi";

import fs from "fs";
import { Property } from "../models/Property";
const propertySchema = Joi.object({
  address: Joi.string().required(),
  price: Joi.number().required(),
  rating: Joi.number().required(),
});

export const getProperties = (req: Request, res: Response) => {
  const propertiesWithImages = properties.map((property) => {
    const imagePath = path.join(__dirname, "..", "..", property.image);
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString("base64");
    return { ...property, image: `data:image/jpeg;base64,${imageBase64}` };
  });
  return res.json(propertiesWithImages);
};

export const postProperty = (req: Request, res: Response) => {
  const { error } = propertySchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const newProperty: Property = req.body;
  let imgBuffer = "";
  if (Array.isArray(req.files)) {
    const imgObj = req.files.find((file) => file.fieldname === "image");

    if (imgObj) {
      try {
        fs.writeFileSync(
          path.resolve(`assets/images/${newProperty.address}.jpg`),
          imgObj.buffer
        );
        console.log("file was written succesfully");
        imgBuffer = imgObj.buffer.toString("base64");
        newProperty.image = `/assets/images/${newProperty.address}.jpg`;
      } catch (err) {
        return res.status(400).send(err);
      }
    }
  }
  const id = Math.max(
    ...properties.map((property) => {
      return property.id;
    })
  );
  newProperty.id = id + 1;
  properties.push(newProperty);

  res
    .status(201)
    .json({ ...newProperty, image: `data:image/jpeg;base64,${imgBuffer}` });
};
