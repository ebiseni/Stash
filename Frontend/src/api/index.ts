const BASE_URL = import.meta.env.VITE_API_URL;

// =========================
// COLLECTIONS
// =========================

export const getCollections = async () => {
  const res = await fetch(`${BASE_URL}/collections`);

  if (!res.ok) {
    throw new Error("Failed to fetch collections");
  }

  return res.json();
};

export const createCollection = async (data: {
  name: string;
  description: string;
}) => {
  const res = await fetch(`${BASE_URL}/collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create collection");
  }

  return res.json();
};

export const updateCollection = async (
  id: string,
  data: {
    name: string;
    description: string;
  }
) => {
  const res = await fetch(`${BASE_URL}/collections/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update collection");
  }

  return res.json();
};

export const deleteCollection = async (id: string) => {
  const res = await fetch(`${BASE_URL}/collections/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete collection");
  }

  return res.json();
};

// =========================
// RESOURCES
// =========================

export const getResources = async () => {
  const res = await fetch(`${BASE_URL}/resources`);

  if (!res.ok) {
    throw new Error("Failed to fetch resources");
  }

  return res.json();
};

export const createResource = async (data: {
  title: string;
  url: string;
  type: string;
  collectionId: string | null;
  tags: string[];
  quickNote: string;
}) => {
  const res = await fetch(`${BASE_URL}/resources`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create resource");
  }

  return res.json();
};

export const updateResource = async (
  id: string,
  data: {
    title: string;
    url: string;
    type: string;
    collectionId: string | null;
    tags: string[];
    quickNote: string;
  }
) => {
  const res = await fetch(`${BASE_URL}/resources/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update resource");
  }

  return res.json();
};

export const deleteResource = async (id: string) => {
  const res = await fetch(`${BASE_URL}/resources/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete resource");
  }

  return res.json();
};