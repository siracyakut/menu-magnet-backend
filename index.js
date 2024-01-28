import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import authRoutes from "./routes/auth.js";
import businessRoutes from "./routes/business.js";
import categoryRoutes from "./routes/category.js";
import menuRoutes from "./routes/menu.js";
import statsRoutes from "./routes/stats.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/business", businessRoutes);
app.use("/category", categoryRoutes);
app.use("/menu", menuRoutes);
app.use("/stats", statsRoutes);

app.get("/", (req, res) =>
  res.status(200).json({ success: true, data: "API is OK." }),
);

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.CONN_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server ${PORT} portu uzerinde aktif edildi!`),
    ),
  )
  .catch((err) => {
    throw err;
  });
