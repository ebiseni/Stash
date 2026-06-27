import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { openAddModal } from '../../features/resources/resourceSlice';
import type { Resource } from '../../features/resources/resourceTypes';
import TagChip from '../shared/TagChip';

interface ResourceSavedModalProps {
  resource: Resource;
  onClose: () => void;
}

function ResourceSavedModal({ resource, onClose }: ResourceSavedModalProps) {
  const dispatch   = useAppDispatch();
  const navigate   = useNavigate();
  const collections = useAppSelector(state => state.collections.items);

  const collectionName = collections.find(c => c.id === resource.collectionId)?.name ?? '—';

  const handleViewResources = () => {
    onClose();
    navigate('/resources');
  };

  const handleAddAnother = () => {
    onClose();
    dispatch(openAddModal());
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card modal-card--wide">

        {/* Checkmark */}
        <div className="saved-modal__check">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="27" stroke="#1a1a1a" strokeWidth="2"/>
            <path
              d="M17 28.5l8 8 14-16"
              stroke="#1a1a1a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="saved-modal__text">
          <h2 className="saved-modal__heading">Resource Saved!</h2>
          <p className="saved-modal__subtext">
            Your resource has been added to your library successfully.
          </p>
        </div>

        {/* Resource preview */}
        <div className="saved-modal__preview">
          <div className="saved-modal__preview-title">
            <span className="saved-modal__doc-icon"><img src="/public/file-icon.svg" alt="" /></span>
            <div>
              <div className="saved-modal__res-title">{resource.title}</div>
              <div className="saved-modal__res-url">{resource.url}</div>
            </div>
          </div>

          <div className="saved-modal__meta">
            <span className="saved-modal__meta-item">
              <span><img src="/public/folders-icon.svg" alt="" /></span>
              <span>Collection: <strong>{collectionName}</strong></span>
            </span>
            <span className="saved-modal__meta-item">
              <span><img src="/public/tags-icon.svg" alt="" /></span>
              <span>Tags:</span>
              {resource.tags.map(tag => (
                <TagChip key={tag} tag={tag} />
              ))}
            </span>
          </div>
        </div>

        {/* Actions */}
        <button className="btn btn--primary btn--full" onClick={handleViewResources}>
          View Resources
        </button>
        <button className="btn btn--outline btn--full" onClick={handleAddAnother}>
          Add Another
        </button>

      </div>
    </div>
  );
}

export default ResourceSavedModal;