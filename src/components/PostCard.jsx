import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingBag, 
  CheckCircle2, 
  Volume2, 
  Music,
  ExternalLink,
  MoreHorizontal
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRENT_USER } from '../data/mockData';

export default function PostCard({ 
  post, 
  onOpenProductCheckout, 
  onOpenProfile, 
  onSharePost 
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const images = post.images || [];
  const hasMultipleImages = images.length > 1;

  const handleDoubleTap = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 850);
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(prev => Math.max(0, prev - 1));
    } else {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
      confetti({ particleCount: 22, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleNextSlide = (e) => {
    e?.stopPropagation();
    if (currentSlide < images.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrevSlide = (e) => {
    e?.stopPropagation();
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e) => {
    if (touchStartX !== null) {
      setTouchDeltaX(e.touches[0].clientX - touchStartX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX === null) return;
    if (touchDeltaX < -40) {
      handleNextSlide();
    } else if (touchDeltaX > 40) {
      handlePrevSlide();
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setTouchStartX(e.clientX);
    setTouchDeltaX(0);
  };

  const handleMouseMove = (e) => {
    if (isMouseDown && touchStartX !== null) {
      setTouchDeltaX(e.clientX - touchStartX);
    }
  };

  const handleMouseUp = () => {
    if (!isMouseDown) return;
    if (touchDeltaX < -50) {
      handleNextSlide();
    } else if (touchDeltaX > 50) {
      handlePrevSlide();
    }
    setIsMouseDown(false);
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: `c_${Date.now()}`,
      user: CURRENT_USER,
      text: newComment.trim(),
      likes: 0,
      isLiked: false,
      time: 'Just now'
    };

    setComments(prev => [...prev, newCommentObj]);
    setNewComment('');
    setShowAllComments(true);
  };

  return (
    <article className="post-card">
      {/* Header */}
      <div className="post-header">
        <div 
          className="post-user-info"
          onClick={() => onOpenProfile(post.user)}
        >
          <img 
            src={post.user.avatar} 
            alt={post.user.username} 
            className="post-user-avatar"
          />
          <div className="post-user-meta">
            <div className="post-user-handle-row">
              <span className="post-username">{post.user.username}</span>
              {post.user.isVerified && (
                <CheckCircle2 size={13} fill="#0095f6" color="#fff" />
              )}
              {post.isSponsored && (
                <span className="sponsored-pill">Sponsored</span>
              )}
            </div>
            {post.location && (
              <span className="post-location">{post.location}</span>
            )}
          </div>
        </div>

        <button className="action-btn" title="Options">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Media Carousel with Animated Sliding Track & Swipe */}
      <div 
        className="post-media-container"
        onDoubleClick={handleDoubleTap}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((imgUrl, idx) => (
            <div key={idx} className="carousel-slide">
              <img 
                src={imgUrl} 
                alt={`Slide ${idx + 1}`} 
                className="post-image" 
                draggable="false"
              />
            </div>
          ))}
        </div>

        {/* Double-tap floating heart */}
        {showHeartAnim && (
          <div className="floating-heart">
            <Heart size={92} fill="#ff3040" color="#ff3040" />
          </div>
        )}

        {/* Carousel Prev/Next Buttons */}
        {hasMultipleImages && currentSlide > 0 && (
          <button 
            className="carousel-nav-btn carousel-prev" 
            onClick={handlePrevSlide}
          >
            <ChevronLeft size={18} />
          </button>
        )}
        {hasMultipleImages && currentSlide < images.length - 1 && (
          <button 
            className="carousel-nav-btn carousel-next" 
            onClick={handleNextSlide}
          >
            <ChevronRight size={18} />
          </button>
        )}

        {/* Slide Counter e.g. 1/3 */}
        {hasMultipleImages && (
          <div className="carousel-counter">
            {currentSlide + 1}/{images.length}
          </div>
        )}

        {/* Carousel Animated Dots */}
        {hasMultipleImages && (
          <div className="carousel-dots">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`carousel-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(idx);
                }}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        )}

        {/* Shoppable Product Tag Banner */}
        {post.productTag && (
          <button 
            className="product-tag-chip"
            onClick={(e) => {
              e.stopPropagation();
              onOpenProductCheckout(post.productTag);
            }}
          >
            <ShoppingBag size={14} color="#ec4899" />
            <span>View product • ${post.productTag.price.toFixed(2)}</span>
          </button>
        )}
      </div>

      {/* Sponsored Banner CTA */}
      {post.isSponsored && (
        <div className="sponsored-banner">
          <div>
            <div className="sponsored-banner-text">{post.sponsorName}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Limited Time Creator Deal</div>
          </div>
          <button 
            className="sponsored-banner-btn"
            onClick={() => onOpenProductCheckout(post.productTag)}
          >
            {post.ctaText || "Shop Now"}
          </button>
        </div>
      )}

      {/* Action Rail */}
      <div className="post-actions">
        <div className="action-buttons-left">
          <button 
            className={`action-btn ${isLiked ? 'liked' : ''}`} 
            onClick={handleLikeToggle}
          >
            <Heart 
              size={24} 
              fill={isLiked ? '#ff3040' : 'none'} 
              color={isLiked ? '#ff3040' : 'currentColor'} 
            />
          </button>
          <button 
            className="action-btn"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            <MessageCircle size={24} />
          </button>
          <button 
            className="action-btn"
            onClick={() => onSharePost(post)}
          >
            <Send size={24} />
          </button>
        </div>

        <button 
          className={`action-btn ${isSaved ? 'saved' : ''}`} 
          onClick={() => setIsSaved(!isSaved)}
        >
          <Bookmark size={24} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content & Captions */}
      <div className="post-content-section">
        <div className="post-likes-count">
          {likesCount.toLocaleString()} likes
        </div>

        <div className="post-caption-block">
          <span 
            className="caption-username"
            onClick={() => onOpenProfile(post.user)}
          >
            {post.user.username}
          </span>
          <span>{post.caption}</span>
        </div>

        {post.audioTrack && (
          <div className="post-audio-pill">
            <Music size={11} />
            <span>{post.audioTrack}</span>
          </div>
        )}

        {/* Comments summary & list */}
        {comments.length > 0 && (
          <div 
            className="post-comments-summary"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments 
              ? 'Hide comments' 
              : `View all ${comments.length} comments`}
          </div>
        )}

        {showAllComments && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '8px 0' }}>
            {comments.map((comment) => (
              <div key={comment.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <div>
                  <span style={{ fontWeight: 700, marginRight: 6 }}>
                    {comment.user.username}
                  </span>
                  <span>{comment.text}</span>
                </div>
                <button 
                  style={{ color: comment.isLiked ? '#ff3040' : 'var(--text-muted)', cursor: 'pointer' }}
                  onClick={() => {
                    setComments(prev => prev.map(c => 
                      c.id === comment.id 
                        ? { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 }
                        : c
                    ));
                  }}
                >
                  <Heart size={12} fill={comment.isLiked ? '#ff3040' : 'none'} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="post-timestamp">{post.timestamp}</div>
      </div>

      {/* Add comment inline */}
      <form onSubmit={handleAddComment} className="post-add-comment">
        <input 
          type="text" 
          placeholder="Add a comment..."
          className="post-comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button 
          type="submit" 
          className="post-submit-comment"
          disabled={!newComment.trim()}
        >
          Post
        </button>
      </form>
    </article>
  );
}
