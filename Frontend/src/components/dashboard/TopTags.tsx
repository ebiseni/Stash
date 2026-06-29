import { useAppSelector } from '../../app/store';
import TagChip from '../shared/TagChip';
import { Link } from "react-router-dom";


function TopTags() {
  const resources = useAppSelector(state => state.resources.items);

  const allTags = Array.from(new Set(resources.flatMap(r => r.tags)));

  if (allTags.length === 0) return null;

  return (
    <section className="section">
      <div className="section__header">
        <h2 className="section__heading">Top Tags</h2>
        <Link to="/tags" className="section__link">View All</Link>
      </div>
      <div className="top-tags">
        {allTags.map(tag => (
          <TagChip key={tag} tag={tag} />
        ))}
      </div>
    </section>
  );
}

export default TopTags;