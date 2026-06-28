import { useState } from "react";
import { useAppDispatch } from "../../app/store";
import {
  addCollection,
  updateCollection as updateCollectionState,
  type Collection,
} from "../../features/collections/collectionSlice";
import {
  createCollection,
  updateCollection,
} from "../../api";

interface CreateCollectionModalProps {
  onClose: () => void;
  editing?: Collection | null;
}

function CreateCollectionModal({
  onClose,
  editing = null,
}: CreateCollectionModalProps) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState(editing?.name ?? "");
  const [description, setDescription] = useState(
    editing?.description ?? ""
  );
  const [nameError, setNameError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setNameError("Collection name is required.");
      return;
    }

    try {
      setIsSaving(true);

      if (editing) {
        const updated = await updateCollection(editing.id, {
          name: name.trim(),
          description: description.trim(),
        });

        dispatch(updateCollectionState(updated));
      } else {
        const created = await createCollection({
          name: name.trim(),
          description: description.trim(),
        });

        dispatch(addCollection(created));
      }

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to save collection.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-card__heading">
          {editing ? "Edit Collection" : "Create New Collection"}
        </h2>

        <div className="modal-card__field">
          <label className="modal-card__label">
            Name{" "}
            <span className="modal-card__required">*</span>
          </label>

          <input
            type="text"
            className={`modal-card__input ${
              nameError ? "modal-card__input--error" : ""
            }`}
            placeholder="e.g. UX Research"
            value={name}
            onChange={(e) => {
              setName(e.target.value);

              if (nameError) {
                setNameError("");
              }
            }}
          />

          {nameError && (
            <span className="modal-card__error">
              {nameError}
            </span>
          )}
        </div>

        <div className="modal-card__field">
          <label className="modal-card__label">
            Description (optional)
          </label>

          <textarea
            className="modal-card__textarea"
            placeholder="What is this collection for?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="modal-card__actions">
          <button
            className="btn btn--outline"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>

          <button
            className="btn btn--primary"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving
              ? "Saving..."
              : editing
              ? "Save Changes"
              : "Create Collection"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCollectionModal;