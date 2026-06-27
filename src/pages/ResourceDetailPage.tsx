import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { useAppDispatch } from "../app/store";
import { openEditModal } from "../features/resources/resourceSlice";
import TagChip from "../components/shared/TagChip";


function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const resource = useAppSelector((state) =>
    state.resources.items.find((r) => r.id === id),
  );

  const collection = useAppSelector((state) =>
    state.collections.items.find((c) => c.id === resource?.collectionId),
  );

  if (!resource) {
    return (
      <div className="empty-state">
        <h2 className="empty-state__heading">Resource not found</h2>
        <button
          className="btn btn--primary"
          onClick={() => navigate("/resources")}
        >
          Back to Resources
        </button>
      </div>
    );
  }

  const safeUrl = resource.url.startsWith("http")
    ? resource.url
    : `https://${resource.url}`;

  return (
    <div className="resource-detail">
      {/* Back button */}
      <button className="resource-detail__back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Header */}
      <div className="resource-detail__header">
        <div className="resource-detail__icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6D5DF6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <div className="resource-detail__title-group">
  <h1 className="resource-detail__title">{resource.title}</h1>
  {safeUrl.includes('.') && safeUrl.length > 10 ? (
    
     <a href={safeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="resource-detail__url"
    >
      {resource.url}
    </a>
  ) : (
    <span className="resource-detail__url" style={{ color: 'var(--color-error)' }}>
      {resource.url} — invalid URL
    </span>
  )}
</div>
        <button
          className="btn btn--primary"
          onClick={() => dispatch(openEditModal(resource))}
        >
          Edit
        </button>
      </div>

      {/* Meta info */}
      <div className="resource-detail__meta">
        <div className="resource-detail__meta-item">
          <span className="resource-detail__meta-label">Type</span>
          <span className="resource-type-badge">{resource.type}</span>
        </div>

        {collection && (
          <div className="resource-detail__meta-item">
            <span className="resource-detail__meta-label">Collection</span>
            <span className="resource-detail__meta-value">
              {" "}
              {collection.name}
            </span>
          </div>
        )}

        <div className="resource-detail__meta-item">
          <span className="resource-detail__meta-label">Date Added</span>
          <span className="resource-detail__meta-value">
            {new Date(resource.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Tags */}
      {resource.tags.length > 0 && (
        <div className="resource-detail__section">
          <h3 className="resource-detail__section-heading">Tags</h3>
          <div className="resource-detail__tags">
            {resource.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        </div>
      )}

      {/* Quick Note */}
      {resource.quickNote && (
        <div className="resource-detail__section">
          <h3 className="resource-detail__section-heading">Quick Note</h3>
          <p className="resource-detail__note">{resource.quickNote}</p>
        </div>
      )}

      {/* Visit link */}
<div className="resource-detail__section">
  {(() => {
    const isValidUrl = safeUrl.includes('.') && safeUrl.length > 10;
    
    if (!isValidUrl) {
      return (
        <div className="resource-detail__url-error">
          <span>⚠️</span>
          <div>
            <p className="resource-detail__url-error-heading">Invalid URL</p>
            <p className="resource-detail__url-error-text">
              This resource has an invalid link. Edit the resource to fix the URL.
            </p>
            <button
              className="btn btn--outline"
              onClick={() => dispatch(openEditModal(resource))}
            >
              Edit Resource
            </button>
          </div>
        </div>
      );
    }

    return (
      
       <a href={safeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--primary"
        style={{ textDecoration: 'none', display: 'inline-block' }}
      >
        Visit Resource →
      </a>
    );
  })()}
</div>
    </div>
  );
}

export default ResourceDetailPage;
