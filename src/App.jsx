import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import ReelsView from './components/ReelsView';
import ExploreView from './components/ExploreView';
import DirectMessages from './components/DirectMessages';
import ProfileView from './components/ProfileView';
import CreatorDashboard from './components/CreatorDashboard';
import ShopStorefront from './components/ShopStorefront';
import NotificationsModal from './components/NotificationsModal';
import StoryViewerModal from './components/StoryViewerModal';
import CreatePostModal from './components/CreatePostModal';
import PostDetailModal from './components/PostDetailModal';

import { 
  CURRENT_USER, 
  STORIES_DATA, 
  FEED_POSTS, 
  REELS_DATA, 
  DIRECT_CHATS, 
  NOTIFICATIONS_DATA 
} from './data/mockData';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [currentTab, setCurrentTab] = useState('home');
  const [stories, setStories] = useState(STORIES_DATA);
  const [posts, setPosts] = useState(FEED_POSTS);
  const [reels, setReels] = useState(REELS_DATA);
  const [chats, setChats] = useState(DIRECT_CHATS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);

  // Modals & Active items
  const [activeStory, setActiveStory] = useState(null);
  const [activePostDetail, setActivePostDetail] = useState(null);
  const [selectedProductCheckout, setSelectedProductCheckout] = useState(null);
  const [viewingProfileUser, setViewingProfileUser] = useState(CURRENT_USER);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState('dm_elena');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSelectStory = (story) => {
    setActiveStory(story);
  };

  const handleViewStory = (storyId) => {
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, hasUnseen: false } : s));
  };

  const handleSendStoryReply = (user, message) => {
    showToast(`Reply sent to ${user.username}!`);
    // Find or create chat with user
    const existingChat = chats.find(c => c.user.username === user.username);
    if (existingChat) {
      setChats(prev => prev.map(c => {
        if (c.id === existingChat.id) {
          return {
            ...c,
            lastMessage: message,
            lastTime: "Just now",
            messages: [
              ...c.messages,
              {
                id: `m_${Date.now()}`,
                sender: "u_self",
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]
          };
        }
        return c;
      }));
    }
  };

  const handleOpenProductCheckout = (product) => {
    setSelectedProductCheckout(product);
    setCurrentTab('shop');
  };

  const handleOpenProfile = (user) => {
    setViewingProfileUser(user || currentUser);
    setCurrentTab('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartChatWithUser = (user) => {
    const existingChat = chats.find(c => c.user.username === user.username);
    if (existingChat) {
      setActiveChatId(existingChat.id);
    } else {
      const newChat = {
        id: `dm_${user.username}`,
        user: user,
        lastMessage: "Say hi!",
        lastTime: "Just now",
        unreadCount: 0,
        isOnline: true,
        messages: []
      };
      setChats([newChat, ...chats]);
      setActiveChatId(newChat.id);
    }
    setCurrentTab('messages');
  };

  const handleSharePost = (post) => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Link copied to clipboard! Share on Lumina 🚀`);
  };

  const handlePublishPost = (newPost) => {
    setPosts([newPost, ...posts]);
    showToast(`Post published to feed & your profile! ✨`);
  };

  const handleUpdateCurrentUser = (updatedData) => {
    setCurrentUser(prev => ({ ...prev, ...updatedData }));
    showToast(`Profile updated successfully!`);
  };

  return (
    <div className="app-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(20, 20, 20, 0.95)',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: 24,
          fontSize: 13.5,
          fontWeight: 600,
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.15)',
          zIndex: 3000,
          animation: 'slideUp 0.25s ease'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Main Sidebar Navigation */}
      <Sidebar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        theme={theme}
        toggleTheme={toggleTheme}
        unreadDMs={chats.reduce((acc, c) => acc + (c.unreadCount || 0), 0)}
        unreadNotifications={notifications.filter(n => !n.isRead).length}
        onOpenCreate={() => setIsCreateModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="content-area">
        {currentTab === 'home' && (
          <Feed 
            stories={stories}
            posts={posts}
            onSelectStory={handleSelectStory}
            onAddStory={() => setIsCreateModalOpen(true)}
            onOpenProductCheckout={handleOpenProductCheckout}
            onOpenProfile={handleOpenProfile}
            onSharePost={handleSharePost}
            onNavigateToDashboard={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'reels' && (
          <ReelsView 
            reels={reels}
            onOpenProductCheckout={handleOpenProductCheckout}
            onOpenProfile={handleOpenProfile}
            onSharePost={handleSharePost}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreView 
            onOpenPostDetail={(item) => setActivePostDetail(item)}
            onOpenProfile={handleOpenProfile}
          />
        )}

        {currentTab === 'messages' && (
          <DirectMessages 
            chats={chats}
            setChats={setChats}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
          />
        )}

        {currentTab === 'notifications' && (
          <NotificationsModal 
            notifications={notifications}
            setNotifications={setNotifications}
            onOpenProfile={handleOpenProfile}
          />
        )}

        {currentTab === 'shop' && (
          <ShopStorefront 
            selectedProduct={selectedProductCheckout}
            setSelectedProduct={setSelectedProductCheckout}
            onPurchaseComplete={(product) => {
              showToast(`Purchase confirmed! Added to orders.`);
            }}
          />
        )}

        {currentTab === 'dashboard' && (
          <CreatorDashboard 
            onOpenShop={() => setCurrentTab('shop')}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView 
            user={viewingProfileUser}
            posts={posts}
            reels={reels}
            onOpenDashboard={() => setCurrentTab('dashboard')}
            onOpenShop={() => setCurrentTab('shop')}
            onOpenPostDetail={(post) => setActivePostDetail(post)}
            onStartChatWithUser={handleStartChatWithUser}
            onUpdateCurrentUser={handleUpdateCurrentUser}
          />
        )}
      </main>

      {/* Fullscreen Story Viewer Modal */}
      {activeStory && (
        <StoryViewerModal 
          story={activeStory}
          allStories={stories}
          onClose={() => setActiveStory(null)}
          onSendStoryReply={handleSendStoryReply}
          onViewStory={handleViewStory}
        />
      )}

      {/* Create Post / Reel / Story Modal */}
      {isCreateModalOpen && (
        <CreatePostModal 
          onClose={() => setIsCreateModalOpen(false)}
          onPublishPost={handlePublishPost}
        />
      )}

      {/* Post Detail Modal */}
      {activePostDetail && (
        <PostDetailModal 
          item={activePostDetail}
          onClose={() => setActivePostDetail(null)}
          onOpenProductCheckout={handleOpenProductCheckout}
          onOpenProfile={handleOpenProfile}
          onSharePost={handleSharePost}
        />
      )}
    </div>
  );
}
