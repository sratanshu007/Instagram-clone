import React, { useState } from 'react';
import { 
  Grid, 
  Film, 
  Bookmark, 
  Tag, 
  ShoppingBag, 
  CheckCircle2, 
  Settings, 
  ExternalLink,
  Edit3,
  Heart,
  MessageCircle,
  Copy
} from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

const HIGHLIGHTS = [
  { id: "h1", title: "Tokyo ⚡", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
  { id: "h2", title: "Studio 🎨", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80" },
  { id: "h3", title: "Merch 🛒", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80" },
  { id: "h4", title: "Milan 🍂", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&q=80" }
];

export default function ProfileView({ 
  user = CURRENT_USER, 
  posts = [], 
  reels = [], 
  onOpenDashboard,
  onOpenShop,
  onOpenPostDetail,
  onStartChatWithUser,
  onUpdateCurrentUser
}) {
  const isMe = user.id === CURRENT_USER.id || user.isCurrent;
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);
  const [followersCount, setFollowersCount] = useState(user.followersCount);
  const [showEditModal, setShowEditModal] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState(user.fullName);
  const [editUsername, setEditUsername] = useState(user.username);
  const [editBio, setEditBio] = useState(user.bio);
  const [editWebsite, setEditWebsite] = useState(user.website || '');

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount(prev => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowersCount(prev => prev + 1);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (onUpdateCurrentUser) {
      onUpdateCurrentUser({
        fullName: editName,
        username: editUsername,
        bio: editBio,
        website: editWebsite
      });
    }
    setShowEditModal(false);
  };

  // Filter posts related to this user
  const userPosts = posts.filter(p => p.user?.username === user.username);
  const displayPosts = userPosts.length > 0 ? userPosts : posts.slice(0, 6);

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar-wrapper">
          <img 
            src={user.avatar} 
            alt={user.username} 
            className="profile-avatar has-story" 
          />
        </div>

        <div className="profile-info">
          {/* Handle & Buttons Row */}
          <div className="profile-handle-row">
            <span className="profile-username">{user.username}</span>
            {user.isVerified && (
              <CheckCircle2 size={18} fill="#0095f6" color="#fff" />
            )}

            {isMe ? (
              <>
                <button 
                  className="profile-btn" 
                  onClick={() => setShowEditModal(true)}
                >
                  Edit Profile
                </button>
                <button 
                  className="profile-btn" 
                  onClick={onOpenDashboard}
                  style={{ background: 'var(--accent-gradient)', color: '#fff', border: 'none' }}
                >
                  Professional Dashboard
                </button>
                <button className="action-btn">
                  <Settings size={20} />
                </button>
              </>
            ) : (
              <>
                <button 
                  className={`profile-btn ${!isFollowing ? 'primary' : ''}`}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button 
                  className="profile-btn"
                  onClick={() => onStartChatWithUser(user)}
                >
                  Message
                </button>
              </>
            )}
          </div>

          {/* Stats Row */}
          <div className="profile-stats-row">
            <div className="stat-item">
              <strong>{user.postsCount || displayPosts.length}</strong> posts
            </div>
            <div className="stat-item">
              <strong>{followersCount.toLocaleString()}</strong> followers
            </div>
            <div className="stat-item">
              <strong>{user.followingCount}</strong> following
            </div>
          </div>

          {/* Bio Section */}
          <div className="profile-bio-section">
            <div style={{ fontWeight: 700, fontSize: 14 }}>{user.fullName}</div>
            {user.category && (
              <div className="profile-bio-category">{user.category}</div>
            )}
            <p style={{ whiteSpace: 'pre-line', margin: '4px 0' }}>{user.bio}</p>
            {user.website && (
              <a 
                href={`https://${user.website}`} 
                target="_blank" 
                rel="noreferrer" 
                className="profile-bio-link"
              >
                <ExternalLink size={13} />
                {user.website}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Highlights Tray */}
      <div className="highlights-tray">
        {HIGHLIGHTS.map(hl => (
          <div key={hl.id} className="highlight-item">
            <div className="highlight-ring">
              <img src={hl.img} alt={hl.title} className="highlight-img" />
            </div>
            <span className="highlight-title">{hl.title}</span>
          </div>
        ))}
      </div>

      {/* Profile Tabs */}
      <div className="profile-tabs">
        <button 
          className={`profile-tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <Grid size={15} />
          <span>Posts</span>
        </button>
        <button 
          className={`profile-tab ${activeTab === 'reels' ? 'active' : ''}`}
          onClick={() => setActiveTab('reels')}
        >
          <Film size={15} />
          <span>Reels</span>
        </button>
        <button 
          className={`profile-tab ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <Bookmark size={15} />
          <span>Saved</span>
        </button>
        <button 
          className={`profile-tab ${activeTab === 'shop' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('shop');
            onOpenShop();
          }}
        >
          <ShoppingBag size={15} />
          <span>Shop Storefront</span>
        </button>
        <button 
          className={`profile-tab ${activeTab === 'tagged' ? 'active' : ''}`}
          onClick={() => setActiveTab('tagged')}
        >
          <Tag size={15} />
          <span>Tagged</span>
        </button>
      </div>

      {/* Posts Grid */}
      {activeTab === 'posts' && (
        <div className="profile-posts-grid">
          {displayPosts.map(post => (
            <div 
              key={post.id} 
              className="profile-post-card"
              onClick={() => onOpenPostDetail(post)}
            >
              <img 
                src={post.images ? post.images[0] : post.url} 
                alt="Post" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              {post.isCarousel && (
                <div className="explore-type-indicator">
                  <Copy size={16} />
                </div>
              )}
              <div className="explore-item-overlay">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Heart size={18} fill="#fff" />
                  <span>{(post.likesCount || 1240).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MessageCircle size={18} fill="#fff" />
                  <span>{post.comments?.length || 8}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reels Grid */}
      {activeTab === 'reels' && (
        <div className="profile-posts-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {reels.map(reel => (
            <div 
              key={reel.id} 
              className="profile-post-card"
              style={{ aspectRatio: '9 / 16' }}
              onClick={() => onOpenPostDetail(reel)}
            >
              <img 
                src={reel.posterUrl} 
                alt="Reel poster" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div className="explore-type-indicator">
                <Film size={18} />
              </div>
              <div className="explore-item-overlay">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Heart size={18} fill="#fff" />
                  <span>{reel.likesCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <span>Edit Profile</span>
              <button onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveProfile} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Full Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', marginTop: 6 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Username</label>
                <input 
                  type="text" 
                  value={editUsername}
                  onChange={e => setEditUsername(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', marginTop: 6 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Bio</label>
                <textarea 
                  rows={3}
                  value={editBio}
                  onChange={e => setEditBio(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', marginTop: 6 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Website / Store URL</label>
                <input 
                  type="text" 
                  value={editWebsite}
                  onChange={e => setEditWebsite(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', marginTop: 6 }}
                />
              </div>
              <button 
                type="submit"
                style={{ background: 'var(--accent-blue)', color: '#fff', fontWeight: 700, padding: '12px', borderRadius: 8, border: 'none', cursor: 'pointer', marginTop: 8 }}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
