import express from "express";
import propertiesRouter from "./routes/properties";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/properties", propertiesRouter);

export default app;
