import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { deleteCollection, type Collection } from '../../features/collections/collectionSlice';

interface CollectionCardProps {
  collection: Collection;
  onEdit: (collection: Collection) => void;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return '1d ago';
  return `${days}d ago`;
}

function CollectionCard({ collection, onEdit }: CollectionCardProps) {
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const resourceCount = useAppSelector(state =>
    state.resources.items.filter(r => r.collectionId === collection.id).length
  );

  const handleDelete = () => {
    dispatch(deleteCollection(collection.id));
    setMenuOpen(false);
  };

  const handleEdit = () => {
    onEdit(collection);
    setMenuOpen(false);
  };

  return (
    <div className="col-card">
      <div className="col-card__header">
        <span className="col-card__folder"><img src="/folders-collection.svg" alt="" /></span>
        <div className="col-card__menu-wrapper">
          <button
            className="col-card__menu-btn"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Collection options"
          >
            ⋯
          </button>
          {menuOpen && (
            <div className="col-card__dropdown">
              <button onClick={handleEdit}>✏️ Edit</button>
              <button
                onClick={handleDelete}
                className="col-card__dropdown-delete"
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="col-card__body">
        <h3 className="col-card__name">{collection.name}</h3>
        <p className="col-card__description">
          {collection.description || 'No description added.'}
        </p>
      </div>

      <div className="col-card__footer">
        <span>{resourceCount} resource{resourceCount !== 1 ? 's' : ''}</span>
        <span>Updated {timeAgo(collection.createdAt)}</span>
      </div>
    </div>
  );
}

export default CollectionCard;