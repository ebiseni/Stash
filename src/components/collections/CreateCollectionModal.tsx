import { useState } from 'react';
import { useAppDispatch } from '../../app/store';
import { addCollection, updateCollection, type Collection } from '../../features/collections/collectionSlice';

interface CreateCollectionModalProps {
  onClose: () => void;
  editing?: Collection | null;
}

function CreateCollectionModal({ onClose, editing = null }: CreateCollectionModalProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(editing?.name ?? '');
  const [description, setDescription] = useState(editing?.description ?? '');
  const [nameError, setNameError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError('Collection name is required.');
      return;
    }

    if (editing) {
      dispatch(updateCollection({
        ...editing,
        name: name.trim(),
        description: description.trim(),
      }));
    } else {
      dispatch(addCollection({
        id: crypto.randomUUID(),
        name: name.trim(),
        description: description.trim(),
        createdAt: new Date().toISOString(),
      }));
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <h2 className="modal-card__heading">
          {editing ? 'Edit Collection' : 'Create New Collection'}
        </h2>

        <div className="modal-card__field">
          <label className="modal-card__label">
            Name <span className="modal-card__required">*</span>
          </label>
          <input
            type="text"
            className={`modal-card__input ${nameError ? 'modal-card__input--error' : ''}`}
            placeholder="e.g. UX Research"
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (nameError) setNameError('');
            }}
          />
          {nameError && (
            <span className="modal-card__error">{nameError}</span>
          )}
        </div>

        <div className="modal-card__field">
          <label className="modal-card__label">Description (optional)</label>
          <textarea
            className="modal-card__textarea"
            placeholder="What is this collection for?"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="modal-card__actions">
          <button className="btn btn--outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn--primary" onClick={handleSubmit}>
            {editing ? 'Save Changes' : 'Create Collection'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCollectionModal;