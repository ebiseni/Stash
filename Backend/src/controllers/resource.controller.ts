import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { resourceSchema } from "../validators/resource.validator";

const formatResource = (resource: any) => ({
  ...resource,
  tags: resource.tags ? resource.tags.split(",") : [],
  createdAt: resource.createdAt.toISOString(),
});

export const createResource = async (req: Request, res: Response) => {
  try {
    const data = resourceSchema.parse(req.body);

    const resource = await prisma.resource.create({
      data: {
        title: data.title,
        url: data.url,
        type: data.type,
        collectionId: data.collectionId ?? null,
        tags: data.tags.join(","),
        quickNote: data.quickNote,
      },
    });

    res.status(201).json(formatResource(resource));
  } catch (error: any) {
  console.log(error);

  res.status(400).json({
    message: error.message,
    error,
  });
}
};

export const getResources = async (_: Request, res: Response) => {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(resources.map(formatResource));
  } catch {
    res.status(500).json({
      message: "Failed to fetch resources",
    });
  }
};

export const getResource = async (req: Request, res: Response) => {
  try {
    const resource = await prisma.resource.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    res.json(formatResource(resource));
  } catch {
    res.status(500).json({
      message: "Failed to fetch resource",
    });
  }
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    const data = resourceSchema.parse(req.body);

    const resource = await prisma.resource.update({
      where: {
        id: req.params.id,
      },
      data: {
        title: data.title,
        url: data.url,
        type: data.type,
        collectionId: data.collectionId ?? null,
        tags: data.tags.join(","),
        quickNote: data.quickNote,
      },
    });

    res.json(formatResource(resource));
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    await prisma.resource.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Resource deleted successfully",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    res.status(500).json({
      message: "Failed to delete resource",
    });
  }
};

export const searchResources = async (req: Request, res: Response) => {
  try {
    const q = (req.query.q as string)?.trim() || "";

    const resources = await prisma.resource.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q,
            },
          },
          {
            quickNote: {
              contains: q,
            },
          },
          {
            tags: {
              contains: q,
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(resources.map(formatResource));
  } catch {
    res.status(500).json({
      message: "Search failed",
    });
  }
};