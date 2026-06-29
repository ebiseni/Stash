import { useAppDispatch } from '../../app/store';
import { openAddModal } from '../../features/resources/resourceSlice';

function EmptyState() {
  const dispatch = useAppDispatch();

  return (
    <div className="empty-state">
      <div className="empty-state__illustration">
        <img src="/empty image.svg" alt="" />
      </div>
      <h2 className="empty-state__heading">Your library is empty</h2>
      <p className="empty-state__text">
        Save your first resource to get started.<br />
        Start by saving an article, PDF, video or website.
      </p>
      <button
        className="btn btn--primary"
        onClick={() => dispatch(openAddModal())}
      >
        + Save Resource
      </button>
    </div>
  );
}

export default EmptyState;