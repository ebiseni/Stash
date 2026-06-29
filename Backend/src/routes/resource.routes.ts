import { Router } from "express";
import {
  createResource,
  getResources,
  getResource,
  updateResource,
  deleteResource,
  searchResources,
} from "../controllers/resource.controller";

const router = Router();

router.get("/", getResources);
router.get("/search", searchResources);
router.get("/:id", getResource);

router.post("/", createResource);
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);

export default router;