import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Heart, 
  Send, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StoryViewerModal({ 
  story, 
  allStories = [], 
  onClose, 
  onSendStoryReply, 
  onViewStory 
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState([]); // [{ id, emoji, left }]

  // Touch Swipe states
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);

  const timerRef = useRef(null);

  const currentIndex = allStories.findIndex(s => s.id === story?.id);
  const prevStory = currentIndex > 0 ? allStories[currentIndex - 1] : null;
  const nextStory = currentIndex < allStories.length - 1 ? allStories[currentIndex + 1] : null;

  const currentSlide = story?.slides[currentSlideIndex] || story?.slides[0];
  const totalSlides = story?.slides?.length || 1;

  useEffect(() => {
    if (story) {
      onViewStory(story.id);
      setCurrentSlideIndex(0);
      setProgress(0);
    }
  }, [story?.id]);

  // Progress Bar timer
  useEffect(() => {
    if (isPaused || !story) return;

    const intervalMs = 40;
    const step = 100 / (4200 / intervalMs);

    timerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNextSlide();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timerRef.current);
  }, [currentSlideIndex, isPaused, story, currentIndex]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNextSlide();
      if (e.key === 'ArrowLeft') handlePrevSlide();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, currentIndex, allStories]);

  const handleNextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      setProgress(0);
    } else {
      // Transition to next story
      if (nextStory) {
        onViewStory(nextStory.id);
        setCurrentSlideIndex(0);
        setProgress(0);
      } else {
        onClose();
      }
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
      setProgress(0);
    } else {
      // Transition to previous story
      if (prevStory) {
        onViewStory(prevStory.id);
        setCurrentSlideIndex(0);
        setProgress(0);
      }
    }
  };

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (touchStartX !== null) {
      setTouchDeltaX(e.touches[0].clientX - touchStartX);
    }
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartX === null) return;
    if (touchDeltaX < -50) {
      handleNextSlide();
    } else if (touchDeltaX > 50) {
      handlePrevSlide();
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  const handleSendReply = (e) => {
    e?.preventDefault();
    if (!replyText.trim()) return;
    onSendStoryReply(story.user, `Replied to your story: "${replyText}"`);
    setReplyText('');
    confetti({ particleCount: 35, spread: 70, origin: { y: 0.8 } });
  };

  const triggerFloatingEmoji = (emoji) => {
    const id = Date.now() + Math.random();
    const left = 20 + Math.random() * 60; // 20% to 80% horizontal range
    setFloatingEmojis(prev => [...prev, { id, emoji, left }]);
    
    onSendStoryReply(story.user, `Reacted ${emoji} to your story`);

    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(item => item.id !== id));
    }, 1600);
  };

  if (!story || !currentSlide) return null;

  return (
    <div className="story-viewer-overlay">
      {/* Top Close Button */}
      <button 
        className="modal-close-btn" 
        onClick={onClose}
        style={{ position: 'absolute', top: 24, right: 32, color: '#fff', zIndex: 120 }}
        title="Close (Esc)"
      >
        <X size={32} />
      </button>

      {/* Multi-story 3D Stage (Desktop Side Peeking Cards) */}
      <div className="story-viewer-stage">
        {/* Previous Story Card Preview (Left) */}
        {prevStory && (
          <div 
            className="story-card-side"
            onClick={() => {
              onViewStory(prevStory.id);
              setCurrentSlideIndex(0);
              setProgress(0);
            }}
            title={`View ${prevStory.user.username}'s story`}
          >
            <img src={prevStory.slides[0]?.url} alt={prevStory.user.username} />
            <div className="story-side-preview-info">
              <img src={prevStory.user.avatar} alt="avatar" className="story-side-avatar" />
              <span style={{ fontSize: 13, fontWeight: 700 }}>{prevStory.user.username}</span>
            </div>
          </div>
        )}

        {/* Previous Nav Chevron */}
        {(prevStory || currentSlideIndex > 0) && (
          <button 
            className="story-nav-chevron prev"
            onClick={handlePrevSlide}
            title="Previous (Arrow Left)"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Center Active Story Card */}
        <div 
          className="story-card-center"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Segmented Progress Bars */}
          <div className="story-progress-container">
            {story.slides.map((slide, idx) => (
              <div key={slide.id} className="story-progress-segment">
                <div 
                  className="story-progress-fill"
                  style={{ 
                    width: idx < currentSlideIndex 
                      ? '100%' 
                      : idx === currentSlideIndex 
                        ? `${progress}%` 
                        : '0%' 
                  }}
                />
              </div>
            ))}
          </div>

          {/* Top Bar with Creator Meta */}
          <div className="story-viewer-topbar">
            <div className="story-viewer-user">
              <div style={{ 
                width: 38, 
                height: 38, 
                borderRadius: '50%', 
                padding: 2, 
                background: 'var(--accent-gradient)' 
              }}>
                <img 
                  src={story.user.avatar} 
                  alt={story.user.username} 
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>
                    {story.user.username}
                  </span>
                  {story.user.isVerified && (
                    <CheckCircle2 size={13} fill="#0095f6" color="#fff" />
                  )}
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginLeft: 4 }}>
                    {currentSlide.timestamp}
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsPaused(!isPaused);
              }}
              style={{ color: '#fff', padding: 4 }}
              title={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? <Play size={18} /> : <Pause size={18} />}
            </button>
          </div>

          {/* Media Image */}
          <img 
            src={currentSlide.url} 
            alt="Story slide" 
            className="story-viewer-media" 
            draggable="false"
          />

          {/* Slide Caption */}
          {currentSlide.caption && (
            <div className="story-viewer-caption">
              {currentSlide.caption}
            </div>
          )}

          {/* Floating Reaction Emojis Burst */}
          {floatingEmojis.map(item => (
            <div 
              key={item.id} 
              className="floating-reaction-emoji"
              style={{ left: `${item.left}%` }}
            >
              {item.emoji}
            </div>
          ))}

          {/* Navigation Hotspots (Left: Prev, Right: Next) */}
          <div className="story-nav-hotspot story-nav-prev" onClick={handlePrevSlide} />
          <div className="story-nav-hotspot story-nav-next" onClick={handleNextSlide} />

          {/* Bottom Reply Bar & Quick Emojis */}
          <div className="story-viewer-bottom">
            <form onSubmit={handleSendReply} style={{ display: 'flex', flex: 1, gap: 8 }}>
              <input 
                type="text" 
                className="story-reply-input"
                placeholder={`Reply to ${story.user.username}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
              />
              {replyText && (
                <button type="submit" style={{ color: '#fff', padding: '0 6px' }}>
                  <Send size={18} />
                </button>
              )}
            </form>

            <button 
              className="story-quick-emoji" 
              onClick={() => triggerFloatingEmoji('🔥')}
              title="React Fire"
            >
              🔥
            </button>
            <button 
              className="story-quick-emoji" 
              onClick={() => triggerFloatingEmoji('❤️')}
              title="React Love"
            >
              ❤️
            </button>
            <button 
              className="story-quick-emoji" 
              onClick={() => triggerFloatingEmoji('👏')}
              title="React Clap"
            >
              👏
            </button>
            <button 
              className="story-quick-emoji" 
              onClick={() => triggerFloatingEmoji('😂')}
              title="React Laugh"
            >
              😂
            </button>

            <button 
              style={{ color: liked ? '#ff3040' : '#fff', cursor: 'pointer', padding: '0 4px' }}
              onClick={() => {
                setLiked(!liked);
                if (!liked) triggerFloatingEmoji('❤️');
              }}
            >
              <Heart size={24} fill={liked ? '#ff3040' : 'none'} color={liked ? '#ff3040' : '#fff'} />
            </button>
          </div>
        </div>

        {/* Next Nav Chevron */}
        {(nextStory || currentSlideIndex < totalSlides - 1) && (
          <button 
            className="story-nav-chevron next"
            onClick={handleNextSlide}
            title="Next (Arrow Right)"
          >
            <ChevronRight size={28} />
          </button>
        )}

        {/* Next Story Card Preview (Right) */}
        {nextStory && (
          <div 
            className="story-card-side"
            onClick={() => {
              onViewStory(nextStory.id);
              setCurrentSlideIndex(0);
              setProgress(0);
            }}
            title={`View ${nextStory.user.username}'s story`}
          >
            <img src={nextStory.slides[0]?.url} alt={nextStory.user.username} />
            <div className="story-side-preview-info">
              <img src={nextStory.user.avatar} alt="avatar" className="story-side-avatar" />
              <span style={{ fontSize: 13, fontWeight: 700 }}>{nextStory.user.username}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
