import express from "express";
import cors from "cors";
import morgan from "morgan";

import resourceRoutes from "./routes/resource.routes";
import collectionRoutes from "./routes/collection.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_, res) => {
  res.json({
    success: true,
    message: "Stash API is running",
  });
});

app.use("/api/resources", resourceRoutes);
app.use("/api/collections", collectionRoutes);

export default app;