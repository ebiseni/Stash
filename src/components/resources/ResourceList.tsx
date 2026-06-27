import { useAppSelector } from '../../app/store';
import EmptyState from '../shared/EmptyState';
import ResourceFilters from './ResourceFilters';
import ResourceListItem from './ResourceListItem';
import SearchResults from './SearchResults';

function ResourceList() {
  const resources = useAppSelector(state => state.resources.items);
  const searchQuery = useAppSelector(state => state.resources.searchQuery);
  const selectedType = useAppSelector(state => state.resources.selectedType);

  const filtered = resources.filter(r => {
    if (selectedType !== 'All' && r.type !== selectedType) return false;
    if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  if (searchQuery) {
    return <SearchResults />;
  }

  if (filtered.length === 0) {
    return (
      <div>
        <ResourceFilters />
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="resource-list-page">
      <ResourceFilters />
      <ul className="resource-list">
        {filtered.map(resource => (
          <ResourceListItem key={resource.id} resource={resource} />
        ))}
      </ul>
    </div>
  );
}

export default ResourceList;