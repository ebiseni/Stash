import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from './app/store';
import type { Resource } from './features/resources/resourceTypes';

import DashboardLayout   from './components/layout/DashboardLayout';
import DashboardPage     from './pages/DashboardPage';
import ResourceList      from './components/resources/ResourceList';
import CollectionGrid    from './components/collections/CollectionGrid';
import AddResourceModal  from './components/resources/AddResourceModal';
import EditResourceModal from './components/resources/EditResourceModal';
import ResourceSavedModal from './components/resources/ResourceSavedModal';

import './styles/global.css';
import './styles/layout.css';
import './styles/modals.css';
import './styles/dashboard.css';
import './styles/resources.css';
import './styles/collections.css';
import './styles/components.css';
import TagsPage from './pages/TagsPage';
import ResourceDetailPage from './pages/ResourceDetailPage';

function App() {
  // const dispatch        = useAppDispatch();
  const isAddModalOpen  = useAppSelector(s => s.resources.isAddModalOpen);
  const isEditModalOpen = useAppSelector(s => s.resources.isEditModalOpen);

  const [savedResource, setSavedResource] = useState<Resource | null>(null);

  const handleResourceSaved = (resource: Resource) => {
    setSavedResource(resource);
  };

  const handleCloseSavedModal = () => {
    setSavedResource(null);
  };

  return (
    <>
      <DashboardLayout>
        <Routes>
          <Route path="/"            element={<DashboardPage />}  />
          <Route path="/resources"   element={<ResourceList />}   />
          <Route path="/collections" element={<CollectionGrid />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/resources/:id" element={<ResourceDetailPage />} />
        </Routes>
      </DashboardLayout>

      {isAddModalOpen && (
        <AddResourceModal onSaved={handleResourceSaved} />
      )}

      {isEditModalOpen && (
        <EditResourceModal />
      )}

      {savedResource && (
        <ResourceSavedModal
          resource={savedResource}
          onClose={handleCloseSavedModal}
        />
      )}
    </>
  );
}

export default App;