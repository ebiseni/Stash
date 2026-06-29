import { useAppDispatch, useAppSelector } from '../../app/store';
import { setSelectedType } from '../../features/resources/resourceSlice';
import { ResourceType } from '../../features/resources/resourceTypes';
import FilterChip from '../shared/FilterChip';

const filters: { label: string; value: ResourceType | 'All' }[] = [
  { label: 'All',      value: 'All'                },
  { label: 'Links', value: ResourceType.Link  },
  { label: 'PDFs',     value: ResourceType.PDF      },
  { label: 'Videos',   value: ResourceType.Video    },
];

interface ResourceFiltersProps {
  showCounts?: boolean;
  counts?: Record<string, number>;
}

function ResourceFilters({ showCounts = false, counts = {} }: ResourceFiltersProps) {
  const dispatch = useAppDispatch();
  const selectedType = useAppSelector(state => state.resources.selectedType);

  return (
    <div className="resource-filters">
      {filters.map(filter => {
        const count = counts[filter.value];
        const label = showCounts && count !== undefined
          ? `${filter.label} (${count})`
          : filter.label;

        return (
          <FilterChip
            key={filter.value}
            label={label}
            isActive={selectedType === filter.value}
            onClick={() => dispatch(setSelectedType(filter.value))}
          />
        );
      })}
      <button className="resource-filters__filter-btn">
        Filter <img src="/filter-icon.svg" alt="" />
      </button>
    </div>
  );
}

export default ResourceFilters;