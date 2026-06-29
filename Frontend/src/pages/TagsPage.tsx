import { useAppSelector, useAppDispatch } from "../app/store";
import {
  setSearchQuery,
  setSelectedType,
} from "../features/resources/resourceSlice";
import { useNavigate } from "react-router-dom";
import TagChip from "../components/shared/TagChip";
import { selectFilteredResources } from "../features/resources/resourceSelectors";

function TagsPage() {
  const resources = useAppSelector(selectFilteredResources);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const tagMap: Record<string, number> = {};

  resources.forEach((r) => {
    r.tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] ?? 0) + 1;
    });
  });

  const allTags = Object.entries(tagMap).sort((a, b) => b[1] - a[1]);

  const handleTagClick = (tag: string) => {
    dispatch(setSearchQuery(tag));
    dispatch(setSelectedType("All"));
    navigate("/resources");
  };

  return (
    <div className="tags-page">
      <div className="tags-page__header">
        <h1 className="tags-page__heading">Tags</h1>
        <p className="tags-page__subtitle">
          Browse all tags across your saved resources.
        </p>
      </div>

      {allTags.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__illustration">
            <img src="/tags-empty.svg" alt="" />
          </div>
          <h2 className="empty-state__heading">No tags yet</h2>
          <p className="empty-state__text">
            Tags are added when you save a resource.
          </p>
        </div>
      ) : (
        <>
          <p className="tags-page__count">
            {allTags.length} tag{allTags.length !== 1 ? "s" : ""}
          </p>

          <div className="tags-page__grid">
            {allTags.map(([tag, count]) => (
              <div
                key={tag}
                className="tags-page__card"
                onClick={() => handleTagClick(tag)}
              >
                <TagChip tag={tag} />
                <span className="tags-page__card-count">
                  {count} resource{count !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TagsPage;