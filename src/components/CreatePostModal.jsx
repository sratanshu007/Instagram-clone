import React, { useState } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  Film, 
  MapPin, 
  Tag, 
  Sparkles, 
  Check, 
  Layers,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRENT_USER, PRODUCTS_CATALOG } from '../data/mockData';

const PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1080&q=85",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1080&q=85",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1080&q=85",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1080&q=85",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1080&q=85"
];

const FILTERS = [
  { name: 'Normal', css: 'none' },
  { name: 'Clarendon', css: 'contrast(1.2) saturate(1.25)' },
  { name: 'Juno', css: 'contrast(1.15) saturate(1.4) sepia(0.1)' },
  { name: 'Ludwig', css: 'contrast(1.05) brightness(1.05) saturate(1.1)' },
  { name: 'Valencia', css: 'contrast(1.08) brightness(1.08) sepia(0.15)' },
  { name: 'Moon (B&W)', css: 'grayscale(1) contrast(1.1) brightness(1.1)' }
];

export default function CreatePostModal({ onClose, onPublishPost }) {
  const [contentType, setContentType] = useState('post'); // post, reel, story
  const [selectedImages, setSelectedImages] = useState([PRESET_IMAGES[0]]);
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('Tokyo, Japan');
  const [selectedProductTag, setSelectedProductTag] = useState(PRODUCTS_CATALOG[0]);
  const [customUrl, setCustomUrl] = useState('');

  const handleAddPreset = (url) => {
    if (contentType === 'post') {
      if (selectedImages.includes(url)) {
        if (selectedImages.length > 1) {
          setSelectedImages(selectedImages.filter(img => img !== url));
        }
      } else {
        setSelectedImages([...selectedImages, url]);
      }
    } else {
      setSelectedImages([url]);
    }
  };

  const handleAddCustomUrl = (e) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    setSelectedImages([customUrl.trim()]);
    setCustomUrl('');
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (selectedImages.length === 0) return;

    const newPost = {
      id: `post_user_${Date.now()}`,
      user: CURRENT_USER,
      timestamp: "JUST NOW",
      isCarousel: selectedImages.length > 1,
      images: selectedImages,
      caption: caption || "Exploring new creative frontiers ✨ #lumina #creators",
      likesCount: 1,
      isLiked: true,
      isSaved: false,
      location: location,
      audioTrack: "Original Sound • " + CURRENT_USER.username,
      productTag: selectedProductTag,
      comments: []
    };

    onPublishPost(newPost);
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.5 }
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 760, maxHeight: '90vh' }}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontWeight: 700 }}>Create New</span>
            <div style={{ display: 'flex', gap: 4, background: 'var(--bg-secondary)', padding: 3, borderRadius: 8 }}>
              <button 
                style={{ padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: contentType === 'post' ? 'var(--bg-elevated)' : 'transparent', color: contentType === 'post' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                onClick={() => setContentType('post')}
              >
                Carousel Post
              </button>
              <button 
                style={{ padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: contentType === 'reel' ? 'var(--bg-elevated)' : 'transparent', color: contentType === 'reel' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                onClick={() => setContentType('reel')}
              >
                Reel Video
              </button>
              <button 
                style={{ padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: contentType === 'story' ? 'var(--bg-elevated)' : 'transparent', color: contentType === 'story' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                onClick={() => setContentType('story')}
              >
                Story
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button 
              onClick={handlePublish}
              style={{ color: 'var(--accent-blue)', fontWeight: 800, fontSize: 14 }}
            >
              Share
            </button>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body: Split view */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', flex: 1, minHeight: 440, overflow: 'hidden' }}>
          {/* Media Preview Box */}
          <div style={{ background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <img 
              src={selectedImages[0]} 
              alt="Preview" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: activeFilter.css }}
            />

            {selectedImages.length > 1 && (
              <div className="carousel-counter" style={{ top: 14, right: 14 }}>
                {selectedImages.length} images selected
              </div>
            )}

            {/* Filter preview bar at bottom of preview */}
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%)', 
              padding: '16px 12px 10px', 
              display: 'flex', 
              gap: 8, 
              overflowX: 'auto' 
            }}>
              {FILTERS.map(filter => (
                <button
                  key={filter.name}
                  onClick={() => setActiveFilter(filter)}
                  style={{ 
                    padding: '4px 8px', 
                    borderRadius: 6, 
                    fontSize: 11, 
                    fontWeight: 600, 
                    background: activeFilter.name === filter.name ? '#fff' : 'rgba(255,255,255,0.2)',
                    color: activeFilter.name === filter.name ? '#000' : '#fff',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          {/* Configuration Right Column */}
          <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
            {/* User row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img 
                src={CURRENT_USER.avatar} 
                alt={CURRENT_USER.username} 
                style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
              />
              <span style={{ fontWeight: 700, fontSize: 13 }}>{CURRENT_USER.username}</span>
            </div>

            {/* Caption Area */}
            <div>
              <textarea 
                rows={4}
                placeholder="Write an engaging caption... Add hashtags #lumina #fashion"
                value={caption}
                onChange={e => setCaption(e.target.value)}
                style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: 13.5, color: 'var(--text-primary)' }}
              />
            </div>

            {/* Select from curated stock presets */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>
                CHOOSE OR MULTI-SELECT MEDIA
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                {PRESET_IMAGES.map((url, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleAddPreset(url)}
                    style={{ 
                      aspectRatio: '1/1', 
                      borderRadius: 6, 
                      overflow: 'hidden', 
                      cursor: 'pointer',
                      border: selectedImages.includes(url) ? '2px solid var(--accent-pink)' : '1px solid var(--border-color)',
                      opacity: selectedImages.includes(url) ? 1 : 0.6
                    }}
                  >
                    <img src={url} alt={`Preset ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Or paste custom Image URL */}
            <div>
              <form onSubmit={handleAddCustomUrl} style={{ display: 'flex', gap: 6 }}>
                <input 
                  type="text" 
                  placeholder="Or paste image URL..."
                  value={customUrl}
                  onChange={e => setCustomUrl(e.target.value)}
                  style={{ flex: 1, padding: '6px 10px', fontSize: 12, borderRadius: 6, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                />
                <button type="submit" style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)' }}>Use</button>
              </form>
            </div>

            {/* Location Tag */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                <MapPin size={16} color="var(--text-secondary)" />
                <input 
                  type="text" 
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Add location"
                  style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: 13 }}
                />
              </div>
            </div>

            {/* Shoppable Product Tag */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                <ShoppingBag size={14} color="var(--accent-pink)" />
                <span>TAG SHOPPABLE PRODUCT (CREATOR REVENUE)</span>
              </div>
              <select 
                value={selectedProductTag?.id || ''}
                onChange={e => {
                  const prod = PRODUCTS_CATALOG.find(p => p.id === e.target.value);
                  setSelectedProductTag(prod);
                }}
                style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, fontSize: 12 }}
              >
                <option value="">None (Standard Post)</option>
                {PRODUCTS_CATALOG.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (${p.price}) • {p.creatorCommission} split
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
