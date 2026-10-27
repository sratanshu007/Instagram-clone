import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Heart, 
  Image as ImageIcon, 
  Mic, 
  Phone, 
  Video, 
  Info, 
  CheckCircle2,
  Smile
} from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

export default function DirectMessages({ chats, setChats, activeChatId, setActiveChatId }) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, isTyping]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: `m_${Date.now()}`,
      sender: "u_self",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedChats = chats.map(c => {
      if (c.id === activeChat.id) {
        return {
          ...c,
          lastMessage: userMessage.text,
          lastTime: "Just now",
          messages: [...c.messages, userMessage]
        };
      }
      return c;
    });

    setChats(updatedChats);
    setInputText('');

    // Simulate creator auto-reply after 1.5s
    setIsTyping(true);
    setTimeout(() => {
      const creatorReplies = [
        "Love that! Let's definitely collaborate on this 🙌",
        "That's so fire! Checked out your recent drop, looks incredible.",
        "Got it! Sending the project files over in a minute.",
        "100%! The community is loving the new creator updates.",
        "Appreciate you reaching out! Let me review and get back to you shortly."
      ];
      const randomReply = creatorReplies[Math.floor(Math.random() * creatorReplies.length)];

      const replyMsg = {
        id: `m_rep_${Date.now()}`,
        sender: activeChat.user.id,
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChats(prev => prev.map(c => {
        if (c.id === activeChat.id) {
          return {
            ...c,
            lastMessage: replyMsg.text,
            lastTime: "Just now",
            messages: [...c.messages, replyMsg]
          };
        }
        return c;
      }));
      setIsTyping(false);
    }, 1500);
  };

  const handleSendHeart = () => {
    const heartMessage = {
      id: `m_${Date.now()}`,
      sender: "u_self",
      text: "❤️",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(prev => prev.map(c => {
      if (c.id === activeChat.id) {
        return {
          ...c,
          lastMessage: "❤️",
          lastTime: "Just now",
          messages: [...c.messages, heartMessage]
        };
      }
      return c;
    }));
  };

  return (
    <div className="direct-container">
      {/* Chats List Sidebar */}
      <div className="direct-sidebar">
        <div className="direct-header">
          <div className="direct-my-handle">
            {CURRENT_USER.username}
          </div>
        </div>

        <div className="chat-list">
          {chats.map(chat => (
            <div 
              key={chat.id}
              className={`chat-item ${chat.id === activeChat?.id ? 'active' : ''}`}
              onClick={() => setActiveChatId(chat.id)}
            >
              <div className="chat-avatar-container">
                <img 
                  src={chat.user.avatar} 
                  alt={chat.user.username} 
                  className="chat-avatar"
                />
                {chat.isOnline && <div className="online-dot" />}
              </div>

              <div className="chat-info">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="chat-name">{chat.user.username}</div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{chat.lastTime}</span>
                </div>
                <div className="chat-last-msg">{chat.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Conversation Window */}
      {activeChat ? (
        <div className="direct-main">
          {/* Top Bar */}
          <div className="direct-chat-topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img 
                src={activeChat.user.avatar} 
                alt={activeChat.user.username} 
                style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{activeChat.user.fullName || activeChat.user.username}</span>
                  {activeChat.user.isVerified && (
                    <CheckCircle2 size={13} fill="#0095f6" color="#fff" />
                  )}
                </div>
                <span style={{ fontSize: 11.5, color: activeChat.isOnline ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                  {activeChat.isOnline ? 'Active now' : 'Active 2h ago'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, color: 'var(--text-primary)' }}>
              <button className="action-btn"><Phone size={20} /></button>
              <button className="action-btn"><Video size={20} /></button>
              <button className="action-btn"><Info size={20} /></button>
            </div>
          </div>

          {/* Messages Scroll */}
          <div className="direct-messages-scroll">
            <div style={{ textAlign: 'center', margin: '20px 0', color: 'var(--text-secondary)' }}>
              <img 
                src={activeChat.user.avatar} 
                alt={activeChat.user.username} 
                style={{ width: 72, height: 72, borderRadius: '50%', margin: '0 auto 8px', objectFit: 'cover' }}
              />
              <div style={{ fontWeight: 700, fontSize: 16 }}>{activeChat.user.fullName}</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>{activeChat.user.bio}</div>
            </div>

            {activeChat.messages.map(msg => {
              const isMe = msg.sender === 'u_self';
              return (
                <div 
                  key={msg.id} 
                  className={`message-bubble ${isMe ? 'outgoing' : 'incoming'}`}
                >
                  <p>{msg.text}</p>
                  <span className="message-timestamp">{msg.time}</span>
                </div>
              );
            })}

            {isTyping && (
              <div className="message-bubble incoming" style={{ fontStyle: 'italic', opacity: 0.8 }}>
                {activeChat.user.username} is typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="direct-input-bar">
            <button type="button" className="action-btn">
              <Smile size={22} color="var(--text-secondary)" />
            </button>
            <input 
              type="text" 
              placeholder="Message..."
              className="direct-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            {inputText.trim() ? (
              <button type="submit" style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 14 }}>
                Send
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <button type="button" className="action-btn" title="Simulate voice message">
                  <Mic size={22} color="var(--text-secondary)" />
                </button>
                <button type="button" className="action-btn" title="Send image">
                  <ImageIcon size={22} color="var(--text-secondary)" />
                </button>
                <button 
                  type="button" 
                  className="action-btn"
                  onClick={handleSendHeart}
                  title="Send heart"
                >
                  <Heart size={22} color="#ff3040" fill="#ff3040" />
                </button>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
          Select a chat to begin messaging
        </div>
      )}
    </div>
  );
}
