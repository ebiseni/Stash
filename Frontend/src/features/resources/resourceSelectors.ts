import type { RootState } from "../../app/store";

export const selectFilteredResources = (state: RootState) => {
  const { items, searchQuery, selectedType } = state.resources;

  const query = searchQuery.toLowerCase().trim();

  return items.filter((r) => {
    const matchesType =
      selectedType === "All" || r.type === selectedType;

    const matchesSearch =
      !query ||
      r.title.toLowerCase().includes(query) ||
      r.tags.some((t) => t.toLowerCase().includes(query)) ||
      r.url.toLowerCase().includes(query) ||
      (r.quickNote ?? "").toLowerCase().includes(query);

    return matchesType && matchesSearch;
  });
};