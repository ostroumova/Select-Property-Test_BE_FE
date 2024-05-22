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
  id: Joi.number().required(),
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
  if (Array.isArray(req.files)) {
    const imgObj = req.files.find((file) => file.fieldname === "image");
    if (imgObj) {
      try {
        fs.writeFileSync(
          path.resolve(`assets/images/${imgObj.originalname}`),
          imgObj.buffer
        );
        console.log("file was written succesfully");
        newProperty.image = `/assets/images/${imgObj.originalname}`;
      } catch (err) {
        return res.status(400).send(err);
      }
    }
  }

  properties.push(newProperty);
  console.log(properties);

  res.status(201).json(newProperty);
});

export default router;
