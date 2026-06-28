import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { collectionSchema } from "../validators/collection.validator";

const formatCollection = (collection: any) => ({
  ...collection,
  createdAt: collection.createdAt.toISOString(),
});

export const createCollection = async (req: Request, res: Response) => {
  try {
    const data = collectionSchema.parse(req.body);

    const collection = await prisma.collection.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    res.status(201).json(formatCollection(collection));
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getCollections = async (_: Request, res: Response) => {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(collections.map(formatCollection));
  } catch {
    res.status(500).json({
      message: "Failed to fetch collections",
    });
  }
};

export const updateCollection = async (req: Request, res: Response) => {
  try {
    const data = collectionSchema.parse(req.body);

    const collection = await prisma.collection.update({
      where: {
        id: req.params.id as string,
      },
      data: {
        name: data.name,
        description: data.description,
      },
    });

    res.json(formatCollection(collection));
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Collection not found",
      });
    }

    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteCollection = async (req: Request, res: Response) => {
  try {
    await prisma.collection.delete({
      where: {
        id: req.params.id as string,
      },
    });

    res.json({
      message: "Collection deleted successfully",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Collection not found",
      });
    }

    res.status(500).json({
      message: "Failed to delete collection",
    });
  }
};