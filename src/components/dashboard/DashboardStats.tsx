import { useAppSelector } from '../../app/store';

function DashboardStats() {
  const resources = useAppSelector(state => state.resources.items);
  const collections = useAppSelector(state => state.collections.items);

  const activeResources = resources.filter(r => !(r as { isArchived?: boolean }).isArchived);
  const allTags = new Set(resources.flatMap(r => r.tags));

  const stats = [
    { icon:             <span className="resource-list__icon"><img src="/file-icon.svg" alt="" /></span>
, count: activeResources.length, label: 'Saved Resources' },
    { icon:             <span className="resource-list__icon"><img src="/folders-collection.svg" alt="" /></span>
,  count: collections.length,     label: 'Collections'     },
    { icon:             <span className="resource-list__icon"><img src="/tags-icon.svg" alt="" /></span>
,  count: allTags.size,            label: 'Tags'            },
  ];

  return (
    <div className="stats">
      {stats.map(stat => (
        <div key={stat.label} className="stats__card">
          <span className="stats__icon">{stat.icon}</span>
          <span className="stats__count">{stat.count}</span>
          <span className="stats__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;