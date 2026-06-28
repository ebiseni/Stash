import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  closeAddModal,
  setResources,
} from "../../features/resources/resourceSlice";
import {
  ResourceType,
  type Resource,
} from "../../features/resources/resourceTypes";
import { createResource, getResources } from "../../api";
import TagChip from "../shared/TagChip";

interface AddResourceModalProps {
  onSaved: (resource: Resource) => void;
}

function AddResourceModal({ onSaved }: AddResourceModalProps) {
  const dispatch = useAppDispatch();
  const collections = useAppSelector((state) => state.collections.items);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [quickNote, setQuickNote] = useState("");

  const [errors, setErrors] = useState<{
    title?: string;
    url?: string;
    collection?: string;
    tags?: string;
  }>({});

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();

      const raw = tagInput.replace(/^#/, "").trim();

      if (raw && !tags.includes(raw)) {
        setTags((prev) => [...prev, raw]);

        if (errors.tags) {
          setErrors((prev) => ({
            ...prev,
            tags: undefined,
          }));
        }
      }

      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    if (!url.trim()) newErrors.url = "Link/URL is required.";
    if (!collectionId)
      newErrors.collection = "Please select a collection.";
    if (tags.length === 0)
      newErrors.tags = "Add at least one tag.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const detectType = (urlStr: string): ResourceType => {
    const lower = urlStr.toLowerCase();

    if (lower.endsWith(".pdf")) return ResourceType.PDF;

    if (lower.includes("youtube") || lower.includes("vimeo")) {
      return ResourceType.Video;
    }

    return ResourceType.Link;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const savedResource = await createResource({
        title: title.trim(),
        url: url.trim(),
        type: detectType(url.trim()),
        collectionId: collectionId || null,
        tags,
        quickNote: quickNote.trim(),
      });

      const resources = await getResources();

      dispatch(setResources(resources));
      dispatch(closeAddModal());

      onSaved(savedResource);
    } catch (error) {
      console.error("Failed to save resource:", error);
      alert("Failed to save resource.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card modal-card--wide">
        <div className="modal-card__topbar">
          <button
            className="modal-card__back"
            onClick={() => dispatch(closeAddModal())}
            aria-label="Close"
          >
            ← Back
          </button>
        </div>

        <h2 className="modal-card__heading">Add New Resources</h2>

        {/* Title */}
        <div className="modal-card__field">
          <label className="modal-card__label">
            Title <span className="modal-card__required">*</span>
          </label>
          <input
            type="text"
            className={`modal-card__input ${errors.title ? "modal-card__input--error" : ""}`}
            placeholder="e.g. UX Research guide"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((p) => ({ ...p, title: undefined }));
            }}
          />
          {errors.title && (
            <span className="modal-card__error">{errors.title}</span>
          )}
        </div>

        {/* URL */}
        <div className="modal-card__field">
          <label className="modal-card__label">
            Link/URL <span className="modal-card__required">*</span>
          </label>
          <input
            type="text"
            className={`modal-card__input ${errors.url ? "modal-card__input--error" : ""}`}
            placeholder="e.g. https://example.com/article"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (errors.url) setErrors((p) => ({ ...p, url: undefined }));
            }}
          />
          {errors.url && (
            <span className="modal-card__error">{errors.url}</span>
          )}
        </div>

        {/* Collection */}
        <div className="modal-card__field">
          <label className="modal-card__label">
            Collection <span className="modal-card__required">*</span>
          </label>
          {collections.length === 0 ? (
            <div className="modal-card__no-collections">
              <span>No collections yet.</span>
              <a href="/collections" className="modal-card__create-link">
                Create one first →
              </a>
            </div>
          ) : (
            <select
              className={`modal-card__input ${errors.collection ? "modal-card__input--error" : ""}`}
              value={collectionId}
              onChange={(e) => {
                setCollectionId(e.target.value);
                if (errors.collection)
                  setErrors((p) => ({ ...p, collection: undefined }));
              }}
            >
              <option value="">Select a collection</option>
              {collections.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>
          )}
          {errors.collection && (
            <span className="modal-card__error">{errors.collection}</span>
          )}
        </div>

        {/* Tags */}
        <div className="modal-card__field">
          <label className="modal-card__label">
            Tags <span className="modal-card__required">*</span>
          </label>
          <div
            className={`modal-card__tag-input ${errors.tags ? "modal-card__input--error" : ""}`}
          >
            {tags.map((tag) => (
              <TagChip key={tag} tag={tag} onClick={() => removeTag(tag)} />
            ))}
            <input
              type="text"
              className="modal-card__tag-inner"
              placeholder={tags.length === 0 ? "e.g. #design, #web" : ""}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
          </div>
          <span className="modal-card__hint">
            Press comma or Enter to add a tag
          </span>
          {errors.tags && (
            <span className="modal-card__error">{errors.tags}</span>
          )}
        </div>

        {/* Quick Note */}
        <div className="modal-card__field">
          <label className="modal-card__label">Quick Note (Optional)</label>
          <textarea
            className="modal-card__textarea"
            placeholder="Why is this useful?"
            value={quickNote}
            maxLength={300}
            rows={4}
            onChange={(e) => setQuickNote(e.target.value)}
          />
          <span className="modal-card__char-count">{quickNote.length}/300</span>
        </div>

        <button className="btn btn--primary btn--full" onClick={handleSubmit}>
          Save Resource
        </button>
      </div>
    </div>
  );
}

export default AddResourceModal;
