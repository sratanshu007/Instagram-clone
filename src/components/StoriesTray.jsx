import React, { useRef, useState } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

export default function StoriesTray({ stories, onSelectStory, onAddStory }) {
  const trayRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (!trayRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trayRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollTray = (direction) => {
    if (!trayRef.current) return;
    const scrollAmount = direction === 'left' ? -260 : 260;
    trayRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="stories-tray-container">
      {/* Scroll Left Button */}
      {canScrollLeft && (
        <button 
          className="stories-scroll-btn left" 
          onClick={() => scrollTray('left')}
          title="Scroll Left"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Stories Tray Scroll */}
      <div 
        ref={trayRef}
        className="stories-tray"
        onScroll={handleScroll}
      >
        {/* Current User Story */}
        <button 
          className="story-bubble"
          onClick={() => {
            const userStory = stories.find(s => s.isUser);
            if (userStory && userStory.slides.length > 0) {
              onSelectStory(userStory);
            } else {
              onAddStory();
            }
          }}
        >
          <div className="story-ring user-story-ring">
            <img 
              src={CURRENT_USER.avatar} 
              alt="Your story" 
              className="story-avatar-inner"
            />
            <div className="user-add-badge">
              <Plus size={12} strokeWidth={3} />
            </div>
          </div>
          <span className="story-username">Your story</span>
        </button>

        {/* Other Stories */}
        {stories
          .filter(s => !s.isUser)
          .map(story => (
            <button 
              key={story.id} 
              className="story-bubble"
              onClick={() => onSelectStory(story)}
            >
              <div className={`story-ring ${!story.hasUnseen ? 'seen' : ''}`}>
                <img 
                  src={story.user.avatar} 
                  alt={story.user.username} 
                  className="story-avatar-inner"
                />
              </div>
              <span className="story-username">{story.user.username}</span>
            </button>
          ))}
      </div>

      {/* Scroll Right Button */}
      {canScrollRight && (
        <button 
          className="stories-scroll-btn right" 
          onClick={() => scrollTray('right')}
          title="Scroll Right"
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
