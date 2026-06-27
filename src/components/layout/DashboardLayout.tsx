import { useState } from 'react';
import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopSearchBar from './TopSearchBar';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <aside className={`layout__sidebar ${sidebarOpen ? 'layout__sidebar--open' : ''}`}>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      <div className="layout__main">
        <header className="layout__topbar">
          <button
            className="layout__hamburger"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
          
          <TopSearchBar />
        </header>
        <main className="layout__content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;