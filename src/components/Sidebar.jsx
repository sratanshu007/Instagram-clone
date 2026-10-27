import React from 'react';
import { 
  Home, 
  Search, 
  Compass, 
  Film, 
  Send, 
  Heart, 
  PlusSquare, 
  ShoppingBag, 
  BarChart3, 
  Sun, 
  Moon, 
  Menu
} from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  theme, 
  toggleTheme, 
  unreadDMs = 1, 
  unreadNotifications = 2,
  onOpenCreate
}) {
  return (
    <>
      {/* Desktop Main Sidebar */}
      <aside className="main-sidebar">
        <div>
          <div className="logo-container" onClick={() => setCurrentTab('home')}>
            <div className="logo-brand-mark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </div>
            <span className="logo-text">Lumina</span>
          </div>

          <nav className="nav-links">
            <button 
              className={`nav-item ${currentTab === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentTab('home')}
            >
              <span className="nav-icon"><Home size={24} /></span>
              <span>Home</span>
            </button>

            <button 
              className={`nav-item ${currentTab === 'explore' ? 'active' : ''}`}
              onClick={() => setCurrentTab('explore')}
            >
              <span className="nav-icon"><Compass size={24} /></span>
              <span>Explore</span>
            </button>

            <button 
              className={`nav-item ${currentTab === 'reels' ? 'active' : ''}`}
              onClick={() => setCurrentTab('reels')}
            >
              <span className="nav-icon"><Film size={24} /></span>
              <span>Reels</span>
            </button>

            <button 
              className={`nav-item ${currentTab === 'messages' ? 'active' : ''}`}
              onClick={() => setCurrentTab('messages')}
            >
              <span className="nav-icon"><Send size={24} /></span>
              <span>Messages</span>
              {unreadDMs > 0 && <span className="nav-badge">{unreadDMs}</span>}
            </button>

            <button 
              className={`nav-item ${currentTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setCurrentTab('notifications')}
            >
              <span className="nav-icon"><Heart size={24} /></span>
              <span>Notifications</span>
              {unreadNotifications > 0 && <span className="nav-badge">{unreadNotifications}</span>}
            </button>

            <button 
              className="nav-item"
              onClick={onOpenCreate}
            >
              <span className="nav-icon"><PlusSquare size={24} /></span>
              <span>Create</span>
            </button>

            <button 
              className={`nav-item ${currentTab === 'shop' ? 'active' : ''}`}
              onClick={() => setCurrentTab('shop')}
            >
              <span className="nav-icon"><ShoppingBag size={24} /></span>
              <span>Shop &amp; Collabs</span>
            </button>

            <button 
              className={`nav-item ${currentTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentTab('dashboard')}
            >
              <span className="nav-icon"><BarChart3 size={24} /></span>
              <span>Creator Studio</span>
              <span className="creator-pro-badge">PRO</span>
            </button>

            <button 
              className={`nav-item ${currentTab === 'profile' ? 'active' : ''}`}
              onClick={() => setCurrentTab('profile')}
            >
              <img 
                src={CURRENT_USER.avatar} 
                alt="Profile" 
                className="nav-avatar"
              />
              <span>Profile</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <button className="nav-item" onClick={toggleTheme}>
            <span className="nav-icon">
              {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
            </span>
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Navigation */}
      <header className="mobile-top-nav">
        <div className="logo-container" style={{ padding: 0 }} onClick={() => setCurrentTab('home')}>
          <div className="logo-brand-mark" style={{ width: 28, height: 28 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            </svg>
          </div>
          <span className="logo-text" style={{ fontSize: 20 }}>Lumina</span>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <button onClick={() => setCurrentTab('notifications')} style={{ position: 'relative' }}>
            <Heart size={22} />
            {unreadNotifications > 0 && <span className="nav-badge" style={{ top: -4, left: 14 }}>{unreadNotifications}</span>}
          </button>
          <button onClick={() => setCurrentTab('messages')} style={{ position: 'relative' }}>
            <Send size={22} />
            {unreadDMs > 0 && <span className="nav-badge" style={{ top: -4, left: 14 }}>{unreadDMs}</span>}
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <button className={`nav-item ${currentTab === 'home' ? 'active' : ''}`} onClick={() => setCurrentTab('home')}>
          <Home size={24} />
        </button>
        <button className={`nav-item ${currentTab === 'explore' ? 'active' : ''}`} onClick={() => setCurrentTab('explore')}>
          <Compass size={24} />
        </button>
        <button className={`nav-item ${currentTab === 'reels' ? 'active' : ''}`} onClick={() => setCurrentTab('reels')}>
          <Film size={24} />
        </button>
        <button className="nav-item" onClick={onOpenCreate}>
          <PlusSquare size={24} />
        </button>
        <button className={`nav-item ${currentTab === 'shop' ? 'active' : ''}`} onClick={() => setCurrentTab('shop')}>
          <ShoppingBag size={24} />
        </button>
        <button className={`nav-item ${currentTab === 'profile' ? 'active' : ''}`} onClick={() => setCurrentTab('profile')}>
          <img src={CURRENT_USER.avatar} alt="Profile" className="nav-avatar" />
        </button>
      </nav>
    </>
  );
}
