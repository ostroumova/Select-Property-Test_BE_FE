import { Router, Request, Response } from "express";
import { Property } from "../models/Property";
import Joi from "joi";
import fs from "fs";
import path from "path";
import multer from "multer";

let properties: Property[] = [
  {
    id: 1,
    address: "Manchester",
    price: 500000,
    rating: 3,
    image: "/assets/images/Manchester.jpg",
  },
  {
    id: 2,
    address: "London",
    price: 500000,
    rating: 4,
    image: "/assets/images/London.jpg",
  },
  {
    id: 3,
    address: "Barcelona",
    price: 300000,
    rating: 5,
    image: "/assets/images/Barcelona.jpg",
  },
  {
    id: 4,
    address: "Valencia",
    price: 250000,
    rating: 5,
    image: "/assets/images/Valencia.jpg",
  },
];

const router = Router();

const propertySchema = Joi.object({
  address: Joi.string().required(),
  price: Joi.number().required(),
  rating: Joi.number().required(),
});

router.get("/", (req: Request, res: Response) => {
  const propertiesWithImages = properties.map((property) => {
    const imagePath = path.join(__dirname, "..", "..", property.image);
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString("base64");
    return { ...property, image: `data:image/jpeg;base64,${imageBase64}` };
  });
  res.json(propertiesWithImages);
});
const upload = multer();
router.post("/", upload.any(), (req: Request, res: Response) => {
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
});

export default router;
