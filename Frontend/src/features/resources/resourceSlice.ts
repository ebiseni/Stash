import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Resource, ResourceType } from "./resourceTypes";

interface ResourceState {
  items: Resource[];
  searchQuery: string;
  selectedType: ResourceType | "All";
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  editingResource: Resource | null;
}

const initialState: ResourceState = {
  items: [],
  searchQuery: "",
  selectedType: "All",
  isAddModalOpen: false,
  isEditModalOpen: false,
  editingResource: null,
};

const resourceSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    setResources(state, action: PayloadAction<Resource[]>) {
      state.items = action.payload;
    },

    addResource(state, action: PayloadAction<Resource>) {
      state.items.push(action.payload);
    },

    deleteResource(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    updateResource(state, action: PayloadAction<Resource>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },

    setSelectedType(
      state,
      action: PayloadAction<ResourceType | "All">
    ) {
      state.selectedType = action.payload;
    },

    openAddModal(state) {
      state.isAddModalOpen = true;
    },

    closeAddModal(state) {
      state.isAddModalOpen = false;
    },

    openEditModal(state, action: PayloadAction<Resource>) {
      state.isEditModalOpen = true;
      state.editingResource = action.payload;
    },

    closeEditModal(state) {
      state.isEditModalOpen = false;
      state.editingResource = null;
    },
  },
});

export const {
  setResources,
  addResource,
  deleteResource,
  updateResource,
  setSearchQuery,
  setSelectedType,
  openAddModal,
  closeAddModal,
  openEditModal,
  closeEditModal,
} = resourceSlice.actions;

export default resourceSlice.reducer;