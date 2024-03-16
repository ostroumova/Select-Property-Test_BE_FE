import express from "express";
import propertiesRouter from "./routes/properties";

const app = express();
app.use(express.json());
app.use("/properties", propertiesRouter);

export default app;
