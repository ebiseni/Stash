import { useAppSelector } from "../../app/store";
import { useNavigate, Link } from "react-router-dom";
// import { openAddModal } from '../../features/resources/resourceSlice';

function CollectionsPreview() {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const collections = useAppSelector((state) => state.collections.items);
  const resources = useAppSelector((state) => state.resources.items);

  const preview = collections.slice(0, 4);

  const countInCollection = (collectionId: string) =>
    resources.filter((r) => r.collectionId === collectionId).length;

  return (
    <section className="section">
      <div className="section__header">
        <h2 className="section__heading">Collections</h2>
        <Link to="/collections" className="section__link">
          View All
        </Link>
      </div>
      <div className="collections-preview">
        {preview.map((col) => (
          <div key={col.id} className="collection-card">
            <span className="collection-card__icon">
              <img src="/collection-preview-icon.svg" alt="" />
            </span>
            <span className="collection-card__name">{col.name}</span>
            <span className="collection-card__count">
              {countInCollection(col.id)} resources
            </span>
          </div>
        ))}
        <button
          className="collection-card collection-card--add"
          onClick={() => navigate("/collections")}
        >
          <span className="collection-card__plus">+</span>
          <span className="collection-card__name">New Collection</span>
        </button>
      </div>
    </section>
  );
}

export default CollectionsPreview;
