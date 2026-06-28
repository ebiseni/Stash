import { useAppSelector, useAppDispatch } from "../app/store";
import { openAddModal } from "../features/resources/resourceSlice";

import DashboardStats from "../components/dashboard/DashboardStats";
import RecentlySavedList from "../components/dashboard/RecentlySavedList";
import CollectionsPreview from "../components/dashboard/CollectionsPreview";
import TopTags from "../components/dashboard/TopTags";

function DashboardPage() {
  const dispatch = useAppDispatch();

  const allResources = useAppSelector((state) => state.resources.items);
  const isEmpty = allResources.length === 0;

  if (isEmpty) {
    return (
      <div className="dashboard">
        <div className="welcome-card">
          <div className="welcome-card__icon">
            <img src="/stash logo.svg" alt="" />
          </div>

          <div className="welcome-card__text">
            <h3 className="welcome-card__heading">Welcome to Stash</h3>
            <p className="welcome-card__sub">
              Save articles, videos, PDFs, links and notes in one searchable place.
            </p>
          </div>

          <button
            className="btn btn--primary"
            onClick={() => dispatch(openAddModal())}
          >
            + Save your First Resource
          </button>
        </div>

        <div className="empty-state">
          <div className="empty-state__illustration">
            <img src="/empty image.svg" alt="Empty library" />
          </div>

          <h2 className="empty-state__heading">Your library is empty</h2>

          <p className="empty-state__text">
            Save your first resource to get started.
            <br />
            Start by saving an article, PDF, video or website.
          </p>

          <button
            className="btn btn--primary"
            onClick={() => dispatch(openAddModal())}
          >
            + Save Resource
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__greeting">Good Day!</h1>
          <p className="dashboard__subtitle">
            Here's what's happening in your library.
          </p>
        </div>

        <button
          className="btn btn--primary"
          onClick={() => dispatch(openAddModal())}
        >
          + Save Resource
        </button>
      </div>

      <DashboardStats />
      <RecentlySavedList />
      <CollectionsPreview />
      <TopTags />
    </div>
  );
}

export default DashboardPage;