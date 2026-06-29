import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getResources } from "../../api";
import { setResources } from "../../features/resources/resourceSlice";
import { selectFilteredResources } from "../../features/resources/resourceSelectors";

import EmptyState from "../shared/EmptyState";
import ResourceFilters from "./ResourceFilters";
import ResourceListItem from "./ResourceListItem";

function ResourceList() {
  const dispatch = useAppDispatch();

  const resources = useAppSelector(selectFilteredResources);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const data = await getResources();
        dispatch(setResources(data));
      } catch (error) {
        console.error("Failed to load resources:", error);
      }
    };

    loadResources();
  }, [dispatch]);

  return (
    <div className="resource-list-page">
      <ResourceFilters />

      {resources.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="resource-list">
          {resources.map((resource) => (
            <ResourceListItem key={resource.id} resource={resource} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResourceList;