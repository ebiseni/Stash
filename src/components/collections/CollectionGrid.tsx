import { useState } from "react";
import { useAppSelector } from "../../app/store";
import { type Collection } from "../../features/collections/collectionSlice";
import CollectionCard from "./CollectionCard";
import CreateCollectionModal from "./CreateCollectionModal";

function CollectionGrid() {
  const collections = useAppSelector((state) => state.collections.items);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null,
  );

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingCollection(null);
  };

  return (
    <div className="col-grid-page">
      <div className="col-grid-page__header">
        <div>
          <h1 className="col-grid-page__heading">Collections</h1>
          <p className="col-grid-page__subtitle">
            Organise your saved resources into collections that make sense to
            you.
          </p>
        </div>
        <button className="btn btn--primary" onClick={() => setModalOpen(true)}>
          + New Collection
        </button>
      </div>

      <p className="col-grid-page__count">
        {collections.length} Collection{collections.length !== 1 ? "s" : ""}
      </p>

      <div className="col-grid">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            onEdit={handleEdit}
          />
        ))}

        {/* Always-last: Create new card */}
        <button
          className="col-card col-card--new"
          onClick={() => setModalOpen(true)}
        >
          <span className="col-card__plus" style={{ color: "#6D5DF6" }}>+</span>
          <span className="col-card__new-label" style={{ color: "#6D5DF6" }}>Create New Collection</span>
        </button>
      </div>

      {modalOpen && (
        <CreateCollectionModal
          onClose={handleClose}
          editing={editingCollection}
        />
      )}
    </div>
  );
}

export default CollectionGrid;
