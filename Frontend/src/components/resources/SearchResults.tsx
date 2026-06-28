import { useAppSelector } from '../../app/store';
import { ResourceType } from '../../features/resources/resourceTypes';
import ResourceFilters from './ResourceFilters';
import ResourceListItem from './ResourceListItem';

function SearchResults() {
  const searchQuery = useAppSelector(state => state.resources.searchQuery);
  const selectedType = useAppSelector(state => state.resources.selectedType);
  const resources = useAppSelector(state => state.resources.items);
  const collections = useAppSelector(state => state.collections.items);

  const getCollectionName = (collectionId: string | null) =>
    collections.find(c => c.id === collectionId)?.name ?? undefined;

  const matchesSearch = (title: string) =>
    title.toLowerCase().includes(searchQuery.toLowerCase());

  const filtered = resources.filter(r =>
  matchesSearch(r.title) &&
  (selectedType === 'All' || r.type === selectedType)
);

  const counts: Record<string, number> = { All: 0 };
  Object.values(ResourceType).forEach(type => { counts[type] = 0; });
  resources.forEach(r => {
    if (matchesSearch(r.title)) {
      counts[r.type] = (counts[r.type] ?? 0) + 1;
      counts['All'] = (counts['All'] ?? 0) + 1;
    }
  });

  return (
    <div className="search-results">
      <div className="search-results__header">
        <h2 className="search-results__heading">Search Results</h2>
        <p className="search-results__subheading">
          Results for "<strong>{searchQuery}</strong>"
        </p>
      </div>

      <ResourceFilters showCounts counts={counts} />

      {filtered.length === 0 ? (
        <div className="search-results__empty">
          No results found for "<strong>{searchQuery}</strong>"
        </div>
      ) : (
        <div className="resource-table-wrapper">
          <table className="resource-table">
            <thead>
              <tr>
                <th className="resource-table__th">Title</th>
                <th className="resource-table__th">Type</th>
                <th className="resource-table__th">Collection</th>
                <th className="resource-table__th">Tags</th>
                <th className="resource-table__th">Date Added</th>
                <th className="resource-table__th"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(resource => (
                <ResourceListItem
                  key={resource.id}
                  resource={resource}
                  tableView
                  collectionName={getCollectionName(resource.collectionId)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SearchResults;