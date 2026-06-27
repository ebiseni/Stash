import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Collection {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface CollectionState {
  items: Collection[];
}

const initialState: CollectionState = {
  items: [],
};

const collectionSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    addCollection(state, action: PayloadAction<Collection>) {
      state.items.push(action.payload);
    },
    deleteCollection(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateCollection(state, action: PayloadAction<Collection>) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const {
  addCollection,
  deleteCollection,
  updateCollection,
} = collectionSlice.actions;

export default collectionSlice.reducer;