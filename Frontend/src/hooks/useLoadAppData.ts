import { useEffect } from "react";
import { useAppDispatch } from "../app/store";
import { setResources } from "../features/resources/resourceSlice";
import { setCollections } from "../features/collections/collectionSlice";
import { getResources, getCollections } from "../api";

export function useLoadAppData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const load = async () => {
      try {
        const [resources, collections] = await Promise.all([
          getResources(),
          getCollections(),
        ]);

        dispatch(setResources(resources));
        dispatch(setCollections(collections));
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [dispatch]);
}