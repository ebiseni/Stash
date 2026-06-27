import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import resourceReducer from '../features/resources/resourceSlice';
import collectionReducer from '../features/collections/collectionSlice';

export const store = configureStore({
  reducer: {
    resources: resourceReducer,
    collections: collectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

