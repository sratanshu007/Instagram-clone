# Lumina (Instagram Clone) — Social & Creator Commerce Platform

A web-first Instagram clone built with modern React 19, Vite, and Vanilla CSS design system. Designed specifically for social networking, viral content discovery, and creator monetization.

## 🚀 Key Features

### 1. Feed & Multi-Image Carousels
- **Multi-Image Carousels**: Swipeable/clickable slides with dot indicators and slide counter (e.g. `1/3`).
- **Double-Tap / Double-Click to Like**: Heart pop animation with real-time counter increment and canvas confetti.
- **Interactive Comments**: View all comments, like comments, and post new comments inline.
- **Audio Track Tags & Location Pills**: Authentic Instagram media metadata.
- **Save / Bookmark & Share Link**: Instant link copy with visual feedback toast.

### 2. Stories Tray & Fullscreen Story Viewer
- **Instagram Gradient Rings**: Active unviewed stories with authentic Instagram rainbow gradient, and grey ring for viewed stories.
- **Segmented Progress Timers**: Automatic 4.5s slide timer with auto-advance to next creator story.
- **Pause & Hold**: Tap or hold mouse/touch to pause story progress.
- **Story Reactions & DMs**: Quick emoji responses (`🔥`, `❤️`, `👏`) and direct text replies automatically linked to the Direct Messaging inbox.

### 3. Vertical Video Reels
- **Short Video Feed**: Native HTML5 vertical video player with high quality royalty-free footage.
- **Audio Toggle**: Mute/unmute button with persistent audio state.
- **Spinning Vinyl Disc**: Displays creator's audio track with animated rotation.
- **Reel Actions Rail**: Like, comment count, share, bookmark, and direct product checkout link.
- **Creator Badge**: Displays trending badges like "Top Creator Bonus" and "Staff Pick".

### 4. Direct Messages (DMs)
- **Split-Screen Direct Inbox**: Active conversations list on left with online status indicator and active thread on right.
- **Real-Time Interactive Messaging**: Send messages with simulated auto-replies from creators after 1.5 seconds.
- **Quick Heart Reaction & Media Tools**: Simulated voice notes, photo uploads, and emojis.

### 5. Explore Grid & Instant Search
- **Staggered 3x3 Layout**: Alternating 2x2 featured tall reels and 1x1 post squares.
- **Real-Time Search**: Instant filtering across creators, usernames, and content categories.
- **Category Filter Chips**: *For You, Fashion & Style, Tech & 3D, Architecture, Travel, Gastronomy, Art & AI*.
- **Post Detail Modal**: Full-screen split view with media on left, author & scrollable comments on right.

### 6. Creator Studio & Professional Analytics
- **KPI Metrics**:
  - Accounts Reached (348,920 • +24.8%)
  - Accounts Engaged (52,410 • +18.2%)
  - Total Followers (142,800 • +3,240/mo)
  - Estimated Revenue ($8,420.50 • +31.5%)
- **Monetization Breakdown**:
  - Creator Storefront Sales (38%)
  - Brand Partnerships & Sponsored (34%)
  - Reels Play Creator Bonus (19%)
  - Tips & Viewer Badges (9%)
- **Audience Demographics**: Gender breakdown, age bracket distribution bars, and top global cities.
- **Cash Out Payout Action**: 1-click bank cash out simulation with celebratory confetti.

### 7. Advertising & Creator Commerce (Shop)
- **Sponsored Feed Posts**: Badged with "Sponsored" and custom call-to-actions (e.g., "Shop Now").
- **Shoppable Tags**: Integrated product chips on posts and reels (*"View product • $88.00"*).
- **Creator Storefront Catalog**: Curated merchandise, presets, and hardware with transparent creator affiliate commission splits (up to 35%).
- **Quick In-App Checkout Drawer**: Option selection (sizes, colors), commission guarantee, and 1-Click Meta Pay with animated celebration confetti.

### 8. Profiles & Edit Profile
- **Full Creator Profile**: Avatar with story ring, bio, category ("Digital Creator"), website link, post/follower/following stats.
- **Highlights Tray**: Circular story highlights (*Tokyo, Studio, Merch, Milan*).
- **Tabbed Views**: Posts grid, Reels grid, Saved items, Tagged photos, and Shop Storefront.
- **Edit Profile Modal**: Modify full name, username, bio, and external links with real-time profile updates.

### 9. Post & Reel Creation Modal
- Create **Carousel Posts**, **Vertical Reels**, or **Stories**.
- Instagram filter presets: *Normal, Clarendon, Juno, Ludwig, Valencia, Moon (B&W)*.
- Curated stock photo picker + custom image URL input.
- Caption writer, location tagging, and shoppable product tagging for revenue generation.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + Vite 6
- **Icons**: Lucide React
- **Animations & FX**: Vanilla CSS keyframes + Canvas Confetti
- **Typography**: Google Fonts (*Plus Jakarta Sans, Outfit, Playfair Display*)
- **Theme**: Dark Mode by default (`#000000` pitch black) with toggleable Light Mode

## 🏃‍♂️ How to Run Locally

```bash
cd instagram-clone
npm install
npm run dev
```

Visit `http://localhost:5174/` in your browser.
