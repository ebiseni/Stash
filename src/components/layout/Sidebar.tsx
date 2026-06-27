import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const navItems = [
  { to: '/',            label: 'Dashboard',     icon: <img src="/dashboard-icon.svg" alt="" /> },
  { to: '/resources',   label: 'All Resources', icon: <img src="/file-icon.svg" alt="" /> },
  { to: '/collections', label: 'Collections',   icon: <img src="/folders-collection.svg" alt="" /> },
  { to: '/tags',        label: 'Tags',          icon: <img src="/tags-icon.svg" alt="" /> },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isOpen && (
        <div className="sidebar__backdrop" onClick={onClose} />
      )}

      <nav className="sidebar">
        <div className="sidebar__logo">
          <div className="sidebar__logo-left">
            <span className="sidebar__logo-icon"><img src="/stash logo.svg" alt="" /></span>
            <span className="sidebar__logo-text">Stash</span>
          </div>

          {/* Only render close button on mobile */}
          {isMobile && (
            <button
              className="sidebar__close"
              onClick={onClose}
              aria-label="Close menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.1rem',
                color: '#888',
                padding: '0.25rem',
                borderRadius: '4px',
              }}
            >
              ✕
            </button>
          )}
        </div>

        <ul className="sidebar__nav">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
                }
                onClick={onClose}
              >
                <span className="sidebar__link-icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;