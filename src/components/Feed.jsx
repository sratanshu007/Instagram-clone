import React, { useState } from 'react';
import StoriesTray from './StoriesTray';
import PostCard from './PostCard';
import { CURRENT_USER, USERS } from '../data/mockData';
import { TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Feed({ 
  stories, 
  posts, 
  onSelectStory, 
  onAddStory,
  onOpenProductCheckout,
  onOpenProfile,
  onSharePost,
  onNavigateToDashboard
}) {
  const [suggestedUsers, setSuggestedUsers] = useState(USERS);

  const toggleFollowSuggested = (userId) => {
    setSuggestedUsers(prev => prev.map(user => {
      if (user.id === userId) {
        return { ...user, isFollowing: !user.isFollowing };
      }
      return user;
    }));
  };

  return (
    <div className="main-feed-container">
      {/* Main Feed Column */}
      <div className="feed-column">
        {/* Stories Tray */}
        <StoriesTray 
          stories={stories}
          onSelectStory={onSelectStory}
          onAddStory={onAddStory}
        />

        {/* Posts Stream */}
        <div className="posts-stream">
          {posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post}
              onOpenProductCheckout={onOpenProductCheckout}
              onOpenProfile={onOpenProfile}
              onSharePost={onSharePost}
            />
          ))}
        </div>
      </div>

      {/* Suggested & Creator Rail */}
      <aside className="suggestions-column">
        <div className="suggestions-box">
          {/* Current User Quick Row */}
          <div className="current-user-row">
            <div 
              className="user-snippet" 
              onClick={() => onOpenProfile(CURRENT_USER)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={CURRENT_USER.avatar} 
                alt={CURRENT_USER.username} 
                className="snippet-avatar" 
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className="snippet-username">{CURRENT_USER.username}</span>
                  <CheckCircle2 size={12} fill="#0095f6" color="#fff" />
                </div>
                <div className="snippet-fullname">{CURRENT_USER.fullName}</div>
              </div>
            </div>
            <button 
              className="switch-btn"
              onClick={() => onOpenProfile(CURRENT_USER)}
            >
              Switch
            </button>
          </div>

          {/* Suggestions Header */}
          <div className="suggestions-header">
            <span>Suggested for you</span>
            <button className="see-all-btn">See All</button>
          </div>

          {/* Suggested Creators */}
          <div className="suggested-list">
            {suggestedUsers.slice(0, 4).map(user => (
              <div key={user.id} className="suggested-user-row">
                <div 
                  className="user-snippet"
                  onClick={() => onOpenProfile(user)}
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    src={user.avatar} 
                    alt={user.username} 
                    style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <span className="snippet-username">{user.username}</span>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                      {user.category}
                    </div>
                  </div>
                </div>

                <button 
                  className={`follow-btn ${user.isFollowing ? 'following' : ''}`}
                  onClick={() => toggleFollowSuggested(user.id)}
                >
                  {user.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>

          {/* Quick Creator Studio Card */}
          <div className="creator-quick-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Sparkles size={16} color="#ec4899" />
              <span className="quick-card-title">Creator Commerce Hub</span>
            </div>
            <div className="quick-card-stats">
              <div>
                <div className="quick-card-num">${CURRENT_USER.monetization.monthlyEarnings.toLocaleString()}</div>
                <div className="quick-card-sub">This Month's Payout</div>
              </div>
              <div>
                <div className="quick-card-num" style={{ color: '#0095f6' }}>24.8K</div>
                <div className="quick-card-sub">Store Clicks</div>
              </div>
            </div>
            <button 
              className="quick-dashboard-link"
              onClick={onNavigateToDashboard}
            >
              Open Creator Analytics Studio →
            </button>
          </div>

          {/* Instagram Clone Footer */}
          <footer style={{ marginTop: 24, fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            About • Help • Press • API • Jobs • Privacy • Terms • Locations • Language • Meta Verified<br/>
            © 2026 LUMINA FROM META LABS
          </footer>
        </div>
      </aside>
    </div>
  );
}
