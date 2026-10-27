import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  Music, 
  ShoppingBag, 
  MoreVertical, 
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Play,
  Pause
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRENT_USER } from '../data/mockData';

export default function ReelsView({ 
  reels, 
  onOpenProductCheckout, 
  onOpenProfile, 
  onSharePost 
}) {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [reelsState, setReelsState] = useState(reels);
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [soundToast, setSoundToast] = useState(null); // 'muted' | 'unmuted'
  const [playToast, setPlayToast] = useState(null); // 'playing' | 'paused'
  
  // Touch & Swipe states
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchDeltaY, setTouchDeltaY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const videoRefs = useRef([]);
  const viewportRef = useRef(null);
  const lastWheelTime = useRef(0);

  const currentReel = reelsState[currentReelIndex] || reelsState[0];

  // Control video playback based on active index
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentReelIndex) {
        vid.currentTime = 0;
        vid.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsMuted(true);
        });
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [currentReelIndex]);

  const goToNextReel = useCallback(() => {
    if (currentReelIndex < reelsState.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentReelIndex(prev => prev + 1);
      setTimeout(() => setIsTransitioning(false), 450);
    }
  }, [currentReelIndex, reelsState.length, isTransitioning]);

  const goToPrevReel = useCallback(() => {
    if (currentReelIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentReelIndex(prev => prev - 1);
      setTimeout(() => setIsTransitioning(false), 450);
    }
  }, [currentReelIndex, isTransitioning]);

  // Handle Wheel Scroll (Debounced trackpad / mouse scroll)
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 450) return;

    if (e.deltaY > 20) {
      lastWheelTime.current = now;
      goToNextReel();
    } else if (e.deltaY < -20) {
      lastWheelTime.current = now;
      goToPrevReel();
    }
  };

  // Keyboard navigation (ArrowDown & ArrowUp)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        goToNextReel();
      } else if (e.key === 'ArrowUp') {
        goToPrevReel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextReel, goToPrevReel]);

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
    setTouchDeltaY(0);
  };

  const handleTouchMove = (e) => {
    if (touchStartY !== null) {
      setTouchDeltaY(e.touches[0].clientY - touchStartY);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartY === null) return;
    if (touchDeltaY < -45) {
      goToNextReel();
    } else if (touchDeltaY > 45) {
      goToPrevReel();
    }
    setTouchStartY(null);
    setTouchDeltaY(0);
  };

  const togglePlay = () => {
    const currentVideo = videoRefs.current[currentReelIndex];
    if (!currentVideo) return;

    if (currentVideo.paused) {
      currentVideo.play();
      setIsPlaying(true);
      setPlayToast('playing');
    } else {
      currentVideo.pause();
      setIsPlaying(false);
      setPlayToast('paused');
    }
    setTimeout(() => setPlayToast(null), 700);
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setSoundToast(nextMuted ? 'muted' : 'unmuted');
    setTimeout(() => setSoundToast(null), 750);
  };

  const handleDoubleTap = (e) => {
    e.stopPropagation();
    if (!currentReel.isLiked) {
      handleLikeToggle(currentReel.id);
    }
    setShowHeartPop(true);
    setTimeout(() => setShowHeartPop(false), 850);
  };

  const handleLikeToggle = (reelId) => {
    setReelsState(prev => prev.map(reel => {
      if (reel.id === reelId) {
        const nextLiked = !reel.isLiked;
        if (nextLiked) confetti({ particleCount: 28, spread: 65, origin: { y: 0.6 } });
        return {
          ...reel,
          isLiked: nextLiked,
          likesCount: nextLiked ? reel.likesCount + 1 : Math.max(0, reel.likesCount - 1)
        };
      }
      return reel;
    }));
  };

  const handleSaveToggle = (reelId) => {
    setReelsState(prev => prev.map(reel => {
      if (reel.id === reelId) {
        return { ...reel, isSaved: !reel.isSaved };
      }
      return reel;
    }));
  };

  return (
    <div className="reels-feed-container">
      <div className="reel-item-wrapper">
        {/* Next / Previous Quick Nav Chevrons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginRight: 8 }}>
          <button 
            className="action-btn"
            onClick={goToPrevReel}
            disabled={currentReelIndex === 0}
            style={{ 
              opacity: currentReelIndex === 0 ? 0.3 : 1, 
              padding: 10, 
              background: 'var(--bg-secondary)', 
              borderRadius: '50%',
              border: '1px solid var(--border-color)',
              cursor: currentReelIndex === 0 ? 'not-allowed' : 'pointer'
            }}
            title="Previous Reel (Swipe Up or Arrow Up)"
          >
            <ChevronUp size={22} />
          </button>
          <button 
            className="action-btn"
            onClick={goToNextReel}
            disabled={currentReelIndex === reelsState.length - 1}
            style={{ 
              opacity: currentReelIndex === reelsState.length - 1 ? 0.3 : 1, 
              padding: 10, 
              background: 'var(--bg-secondary)', 
              borderRadius: '50%',
              border: '1px solid var(--border-color)',
              cursor: currentReelIndex === reelsState.length - 1 ? 'not-allowed' : 'pointer'
            }}
            title="Next Reel (Swipe Down or Arrow Down)"
          >
            <ChevronDown size={22} />
          </button>
        </div>

        {/* Vertical Swiping Viewport */}
        <div 
          ref={viewportRef}
          className="reels-vertical-viewport"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={handleDoubleTap}
        >
          {/* Animated Central Sound / Play Toast */}
          {soundToast && (
            <div className="reel-center-toast">
              {soundToast === 'unmuted' ? <Volume2 size={32} /> : <VolumeX size={32} />}
            </div>
          )}

          {playToast && (
            <div className="reel-center-toast">
              {playToast === 'playing' ? <Play size={32} /> : <Pause size={32} />}
            </div>
          )}

          {/* Double-tap Floating Heart */}
          {showHeartPop && (
            <div className="floating-heart">
              <Heart size={92} fill="#ff3040" color="#ff3040" />
            </div>
          )}

          {/* Vertical Slider Track with Smooth Sliding Animation */}
          <div 
            className="reels-slider-track"
            style={{ transform: `translateY(-${currentReelIndex * 100}%)` }}
          >
            {reelsState.map((reel, idx) => (
              <div key={reel.id} className="reel-slide-unit">
                {/* Video element */}
                <video
                  ref={el => videoRefs.current[idx] = el}
                  src={reel.videoUrl}
                  poster={reel.posterUrl}
                  loop
                  playsInline
                  muted={isMuted}
                  className="reel-video-element"
                  onClick={togglePlay}
                />

                {/* Top overlay badge & mute control */}
                <div className="reel-overlay-top">
                  <span className="reel-badge">
                    <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
                    {reel.creatorBadge || "Trending Reel"}
                  </span>

                  <button 
                    className="reel-mute-btn" 
                    onClick={toggleSound}
                    title={isMuted ? "Tap to unmute" : "Tap to mute"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                </div>

                {/* Bottom Overlay with Creator Meta */}
                <div className="reel-overlay-bottom">
                  {/* Creator row */}
                  <div className="reel-creator-row">
                    <img 
                      src={reel.user.avatar} 
                      alt={reel.user.username} 
                      className="reel-avatar"
                      onClick={() => onOpenProfile(reel.user)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span 
                      className="reel-username"
                      onClick={() => onOpenProfile(reel.user)}
                      style={{ cursor: 'pointer' }}
                    >
                      {reel.user.username}
                    </span>
                    {reel.user.isVerified && (
                      <CheckCircle2 size={13} fill="#0095f6" color="#fff" />
                    )}
                    <button className="reel-follow-chip">
                      Follow
                    </button>
                  </div>

                  {/* Caption */}
                  <p className="reel-caption-text">
                    {reel.caption}
                  </p>

                  {/* Shoppable Tag in Reel */}
                  {reel.productTag && (
                    <button 
                      className="product-tag-chip" 
                      style={{ position: 'static', alignSelf: 'flex-start' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProductCheckout(reel.productTag);
                      }}
                    >
                      <ShoppingBag size={13} color="#ec4899" />
                      <span>Shop Featured: {reel.productTag.name} (${reel.productTag.price})</span>
                    </button>
                  )}

                  {/* Audio Bar & Spinning Disc with Floating Note */}
                  <div className="reel-audio-bar">
                    <Music size={14} />
                    <span>{reel.audioTrack}</span>
                    <div style={{ position: 'relative', marginLeft: 'auto' }}>
                      <img 
                        src={reel.user.avatar} 
                        alt="Audio disc" 
                        className="reel-audio-disc"
                      />
                      <span className="floating-music-note">♪</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Action Rail */}
        <div className="reel-actions-rail">
          {/* Like */}
          <button 
            className="reel-action-button"
            onClick={() => handleLikeToggle(currentReel.id)}
          >
            <div className="reel-icon-circle" style={{ color: currentReel.isLiked ? '#ff3040' : 'inherit' }}>
              <Heart 
                size={22} 
                fill={currentReel.isLiked ? '#ff3040' : 'none'} 
                color={currentReel.isLiked ? '#ff3040' : 'currentColor'} 
              />
            </div>
            <span className="reel-action-count">
              {currentReel.likesCount.toLocaleString()}
            </span>
          </button>

          {/* Comments */}
          <button 
            className="reel-action-button"
            onClick={() => onOpenProductCheckout ? onOpenProductCheckout(currentReel.productTag) : null}
          >
            <div className="reel-icon-circle">
              <MessageCircle size={22} />
            </div>
            <span className="reel-action-count">
              {currentReel.commentsCount.toLocaleString()}
            </span>
          </button>

          {/* Share */}
          <button 
            className="reel-action-button"
            onClick={() => onSharePost(currentReel)}
          >
            <div className="reel-icon-circle">
              <Send size={22} />
            </div>
            <span className="reel-action-count">
              {currentReel.sharesCount.toLocaleString()}
            </span>
          </button>

          {/* Bookmark */}
          <button 
            className="reel-action-button"
            onClick={() => handleSaveToggle(currentReel.id)}
          >
            <div className="reel-icon-circle" style={{ color: currentReel.isSaved ? 'var(--text-primary)' : 'inherit' }}>
              <Bookmark size={22} fill={currentReel.isSaved ? 'currentColor' : 'none'} />
            </div>
          </button>

          {/* Shoppable Merch button */}
          {currentReel.productTag && (
            <button 
              className="reel-action-button"
              onClick={() => onOpenProductCheckout(currentReel.productTag)}
              title="Shop item"
            >
              <div className="reel-icon-circle" style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', color: '#fff' }}>
                <ShoppingBag size={20} />
              </div>
              <span className="reel-action-count" style={{ color: '#ec4899' }}>Shop</span>
            </button>
          )}

          {/* More options */}
          <button className="reel-action-button">
            <div className="reel-icon-circle">
              <MoreVertical size={20} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
