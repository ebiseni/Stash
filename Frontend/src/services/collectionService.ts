//You can delete this file

import axios from "axios";

const API = "http://localhost:5000/api/collections";

export const collectionService = {
  getAll: async () => {
    const res = await axios.get(API);
    return res.data;
  },

  create: async (data: { name: string; description: string }) => {
    const res = await axios.post(API, data);
    return res.data;
  },

  update: async (
    id: string,
    data: { name: string; description: string }
  ) => {
    const res = await axios.put(`${API}/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await axios.delete(`${API}/${id}`);
    return res.data;
  },
};