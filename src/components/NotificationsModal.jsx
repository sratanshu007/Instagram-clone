import React from 'react';
import { Heart, MessageCircle, UserPlus, ShoppingBag, AtSign, CheckCircle2 } from 'lucide-react';

export default function NotificationsModal({ notifications, setNotifications, onOpenProfile }) {
  const toggleFollowBack = (id) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        return { ...n, isFollowingBack: !n.isFollowingBack };
      }
      return n;
    }));
  };

  return (
    <div style={{ maxWidth: 640, width: '100%', padding: '24px 20px', margin: '0 auto' }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: 20 }}>
        Notifications &amp; Activity
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {notifications.map(n => (
          <div 
            key={n.id}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: n.isRead ? 'transparent' : 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={n.user.avatar} 
                  alt={n.user.username} 
                  style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                  onClick={() => onOpenProfile(n.user)}
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: -2, 
                  right: -2, 
                  width: 18, 
                  height: 18, 
                  borderRadius: '50%', 
                  background: n.type === 'like' ? '#ff3040' : n.type === 'commerce' ? '#10b981' : '#0095f6',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10
                }}>
                  {n.type === 'like' && <Heart size={10} fill="#fff" />}
                  {n.type === 'comment' && <MessageCircle size={10} fill="#fff" />}
                  {n.type === 'follow' && <UserPlus size={10} />}
                  {n.type === 'commerce' && <ShoppingBag size={10} />}
                  {n.type === 'mention' && <AtSign size={10} />}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 13.5 }}>
                  <strong 
                    style={{ cursor: 'pointer', marginRight: 4 }}
                    onClick={() => onOpenProfile(n.user)}
                  >
                    {n.user.username}
                  </strong>
                  <span>{n.text}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                  {n.time}
                </div>
              </div>
            </div>

            {/* Right action button or media thumb */}
            {n.hasFollowButton && (
              <button 
                onClick={() => toggleFollowBack(n.id)}
                style={{
                  background: n.isFollowingBack ? 'var(--bg-tertiary)' : 'var(--accent-blue)',
                  color: n.isFollowingBack ? 'var(--text-primary)' : '#fff',
                  fontWeight: 700,
                  fontSize: 12,
                  padding: '6px 14px',
                  borderRadius: 6
                }}
              >
                {n.isFollowingBack ? 'Following' : 'Follow'}
              </button>
            )}

            {n.mediaUrl && (
              <img 
                src={n.mediaUrl} 
                alt="Post preview" 
                style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
