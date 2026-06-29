import { Router } from "express";
import {
  createCollection,
  getCollections,
  updateCollection,
  deleteCollection,
} from "../controllers/collection.controller";

const router = Router();

router.get("/", getCollections);

router.post("/", createCollection);

router.put("/:id", updateCollection);

router.delete("/:id", deleteCollection);

export default router;