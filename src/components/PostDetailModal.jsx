import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  CheckCircle2, 
  ShoppingBag,
  MoreHorizontal
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRENT_USER } from '../data/mockData';

export default function PostDetailModal({ 
  item, 
  onClose, 
  onOpenProductCheckout, 
  onOpenProfile,
  onSharePost 
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likesCount || 1420);
  const [isSaved, setIsSaved] = useState(false);
  const [comments, setComments] = useState(item.comments || [
    { id: 'cd1', user: { username: 'elena_vogue', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' }, text: 'The composition and lighting here are top tier! ✨' },
    { id: 'cd2', user: { username: 'kai_cyberpunk', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' }, text: 'Incredible texture work 🔥' }
  ]);
  const [newComment, setNewComment] = useState('');

  const imageUrl = item.images ? item.images[0] : (item.url || item.posterUrl);
  const user = item.user || CURRENT_USER;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    if (!isLiked) confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments(prev => [
      ...prev,
      {
        id: `c_${Date.now()}`,
        user: CURRENT_USER,
        text: newComment.trim()
      }
    ]);
    setNewComment('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <button 
        className="modal-close-btn" 
        onClick={onClose}
        style={{ position: 'fixed', top: 20, right: 24, color: '#fff', zIndex: 1100 }}
      >
        <X size={28} />
      </button>

      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()} 
        style={{ maxWidth: 960, height: 600, display: 'grid', gridTemplateColumns: '1.2fr 1fr', padding: 0 }}
      >
        {/* Left Media */}
        <div style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <img 
            src={imageUrl} 
            alt="Post content" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </div>

        {/* Right Info & Comments */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-primary)' }}>
          {/* Header */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img 
                src={user.avatar} 
                alt={user.username} 
                style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                onClick={() => onOpenProfile(user)}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 13.5 }}>{user.username}</span>
                  {user.isVerified && <CheckCircle2 size={13} fill="#0095f6" color="#fff" />}
                </div>
                {item.location && <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{item.location}</span>}
              </div>
            </div>
            <button className="action-btn"><MoreHorizontal size={18} /></button>
          </div>

          {/* Comments List */}
          <div style={{ flex: 1, padding: 18, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {item.caption && (
              <div style={{ display: 'flex', gap: 10, fontSize: 13 }}>
                <img src={user.avatar} alt={user.username} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <span style={{ fontWeight: 700, marginRight: 6 }}>{user.username}</span>
                  <span>{item.caption}</span>
                </div>
              </div>
            )}

            {comments.map(c => (
              <div key={c.id} style={{ display: 'flex', gap: 10, fontSize: 13 }}>
                <img src={c.user.avatar} alt={c.user.username} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <span style={{ fontWeight: 700, marginRight: 6 }}>{c.user.username}</span>
                  <span>{c.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Shoppable Tag in detail */}
          {item.productTag && (
            <div style={{ padding: '8px 18px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                <ShoppingBag size={14} color="var(--accent-pink)" />
                <span>Featured: <strong>{item.productTag.name}</strong></span>
              </div>
              <button 
                onClick={() => onOpenProductCheckout(item.productTag)}
                style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-pink)' }}
              >
                Shop (${item.productTag.price})
              </button>
            </div>
          )}

          {/* Action Row */}
          <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <button className={`action-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
                  <Heart size={24} fill={isLiked ? '#ff3040' : 'none'} color={isLiked ? '#ff3040' : 'currentColor'} />
                </button>
                <button className="action-btn"><MessageCircle size={24} /></button>
                <button className="action-btn" onClick={() => onSharePost(item)}><Send size={24} /></button>
              </div>
              <button className={`action-btn ${isSaved ? 'saved' : ''}`} onClick={() => setIsSaved(!isSaved)}>
                <Bookmark size={24} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div style={{ fontWeight: 700, fontSize: 14 }}>{likesCount.toLocaleString()} likes</div>
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 4 }}>OCTOBER 2026</div>
          </div>

          {/* Add Comment */}
          <form onSubmit={handleAddComment} className="post-add-comment">
            <input 
              type="text" 
              placeholder="Add a comment..."
              className="post-comment-input"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <button 
              type="submit" 
              className="post-submit-comment"
              disabled={!newComment.trim()}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
