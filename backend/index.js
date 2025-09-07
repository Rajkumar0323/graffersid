import "dotenv/config";
import express from "express";

import cors from "cors";
import mongoose from "mongoose";

const db = "graffersId";
mongoose
  .connect(`${process.env.MONGO_URI}/${db}`)
  .then(() => console.log("Connected databse"))
  .catch((err) => console.log("Error", err));

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
import companyRoutes from "./routes/routes.js";
app.use("/api", companyRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on the port : ${process.env.PORT}`);
});
