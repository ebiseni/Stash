import { useAppSelector } from '../../app/store';
import TagChip from '../shared/TagChip';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

function RecentlySavedList() {
  const resources = useAppSelector(state => state.resources.items);

  const recent = [...resources]
    .filter(() => true)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  if (recent.length === 0) return null;

  return (
    <section className="section">
      <h2 className="section__heading">Recently Saved</h2>
      <ul className="resource-list">
        {recent.map(resource => (
          <li key={resource.id} className="resource-list__item">
            <span className="resource-list__icon"><img src="/file-icon.svg" alt="" /></span>
            <div className="resource-list__body">
              <span className="resource-list__title">{resource.title}</span>
              <span className="resource-list__url">{resource.url}</span>
              <div className="resource-list__tags">
                {resource.tags.map(tag => (
                  <TagChip key={tag} tag={tag} />
                ))}
              </div>
            </div>
            <span className="resource-list__time">{timeAgo(resource.createdAt)}</span>
            <button className="resource-list__menu" aria-label="Options">⋯</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecentlySavedList;