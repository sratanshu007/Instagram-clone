import React, { useState } from 'react';
import { Search, Heart, MessageCircle, Film, Copy } from 'lucide-react';
import { EXPLORE_ITEMS } from '../data/mockData';

const CATEGORIES = ["All", "Fashion & Style", "Tech & 3D", "Architecture", "Travel", "Gastronomy", "Art & AI"];

export default function ExploreView({ onOpenPostDetail, onOpenProfile }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = EXPLORE_ITEMS.filter(item => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.user.username.toLowerCase().includes(query) ||
      item.user.fullName?.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
    );
  });

  return (
    <div className="explore-container">
      {/* Search Input */}
      <div className="explore-search-bar">
        <Search size={18} color="var(--text-secondary)" />
        <input 
          type="text" 
          placeholder="Search creators, hashtags, audio, trends..."
          className="explore-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            style={{ fontSize: 12, color: 'var(--text-secondary)' }}
            onClick={() => setSearchQuery('')}
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="explore-filter-chips">
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Staggered Explore Grid */}
      <div className="explore-grid">
        {filteredItems.map(item => (
          <div 
            key={item.id}
            className={`explore-grid-item ${item.span === 'tall' ? 'tall' : ''}`}
            onClick={() => onOpenPostDetail(item)}
          >
            <img 
              src={item.url} 
              alt="Explore content" 
              className="explore-item-img" 
            />

            {/* Type badge (Reel or Carousel) */}
            {item.type === 'reel' && (
              <div className="explore-type-indicator">
                <Film size={18} />
              </div>
            )}
            {item.type === 'carousel' && (
              <div className="explore-type-indicator">
                <Copy size={16} />
              </div>
            )}

            {/* Hover statistics overlay */}
            <div className="explore-item-overlay">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Heart size={18} fill="#fff" />
                <span>{item.likes}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MessageCircle size={18} fill="#fff" />
                <span>{item.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
