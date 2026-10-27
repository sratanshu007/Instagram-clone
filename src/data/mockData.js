// Mock Data for Lumina Social & Creator Platform

export const CURRENT_USER = {
  id: "u_self",
  username: "lumina.creator",
  fullName: "Lumina Studios ✨",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  bio: "Visual storyteller & digital creator 🎨 | Capturing futuristic aesthetics & everyday wonders 🚀 | Shop our exclusive merch below 👇",
  category: "Digital Creator",
  website: "lumina.studio/shop",
  followersCount: 142800,
  followingCount: 428,
  postsCount: 54,
  isVerified: true,
  isCurrent: true,
  monetization: {
    monthlyEarnings: 8420.50,
    growthRate: "+22.4%",
    activeBrandDeals: 4,
    shopSales: 3180.00
  }
};

export const USERS = [
  {
    id: "u_elena",
    username: "elena_vogue",
    fullName: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    bio: "High fashion editorial & Tokyo streetstyle 🖤 | Paris Fashion Week 2026",
    category: "Fashion Model & Stylist",
    followersCount: 685000,
    followingCount: 312,
    postsCount: 342,
    isVerified: true,
    isFollowing: true
  },
  {
    id: "u_kai",
    username: "kai_cyberpunk",
    fullName: "Kai Tanaka",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    bio: "Generative AI Artist & Neon Architect ⚡ | Building visual realms in Blender & Unreal 5",
    category: "3D Visual Artist",
    followersCount: 389000,
    followingCount: 184,
    postsCount: 198,
    isVerified: true,
    isFollowing: false
  },
  {
    id: "u_maya",
    username: "maya_nomad",
    fullName: "Maya Lin",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    bio: "Full-time explorer 🌍 | 64 countries & counting | Van life in the Swiss Alps 🏔️",
    category: "Travel & Adventure",
    followersCount: 512000,
    followingCount: 580,
    postsCount: 489,
    isVerified: true,
    isFollowing: true
  },
  {
    id: "u_marcus",
    username: "marcus_culinary",
    fullName: "Chef Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    bio: "Michelin star inspired gastronomy made at home 🍳 | Author of 'Flavor Matrix'",
    category: "Culinary Artist",
    followersCount: 890000,
    followingCount: 210,
    postsCount: 612,
    isVerified: true,
    isFollowing: false
  },
  {
    id: "u_zara",
    username: "zara_fitlife",
    fullName: "Zara Thorne",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
    bio: "Holistic fitness & mindset coaching 💪 | Clean nutrition + athletic conditioning",
    category: "Health & Fitness",
    followersCount: 275000,
    followingCount: 410,
    postsCount: 310,
    isVerified: false,
    isFollowing: true
  }
];

export const STORIES_DATA = [
  {
    id: "story_self",
    user: CURRENT_USER,
    hasUnseen: false,
    isUser: true,
    slides: [
      {
        id: "slide_s1",
        type: "image",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        timestamp: "2h ago",
        caption: "Studio night sessions 🎨 working on the new drops"
      }
    ]
  },
  {
    id: "story_1",
    user: USERS[0], // Elena
    hasUnseen: true,
    slides: [
      {
        id: "slide_1_1",
        type: "image",
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        timestamp: "45m ago",
        caption: "Golden hour in Milan backstage ✨"
      },
      {
        id: "slide_1_2",
        type: "image",
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        timestamp: "30m ago",
        caption: "Sneak peek of the autumn couture collection 🖤"
      }
    ]
  },
  {
    id: "story_2",
    user: USERS[1], // Kai
    hasUnseen: true,
    slides: [
      {
        id: "slide_2_1",
        type: "image",
        url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        timestamp: "1h ago",
        caption: "New neon shader compiling... wait for it ⚡"
      },
      {
        id: "slide_2_2",
        type: "image",
        url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
        timestamp: "15m ago",
        caption: "Cyberpunk rooftop render completed! Drops tomorrow 🌆"
      }
    ]
  },
  {
    id: "story_3",
    user: USERS[2], // Maya
    hasUnseen: true,
    slides: [
      {
        id: "slide_3_1",
        type: "image",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        timestamp: "3h ago",
        caption: "Waking up above the cloudline in Yosemite 🏔️"
      }
    ]
  },
  {
    id: "story_4",
    user: USERS[3], // Marcus
    hasUnseen: true,
    slides: [
      {
        id: "slide_4_1",
        type: "image",
        url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        timestamp: "4h ago",
        caption: "Tasting menu prep: Truffle infused handmade agnolotti 🤌"
      }
    ]
  },
  {
    id: "story_5",
    user: USERS[4], // Zara
    hasUnseen: false,
    slides: [
      {
        id: "slide_5_1",
        type: "image",
        url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
        timestamp: "6h ago",
        caption: "Morning mobility drills. Start your day with intention 🧘‍♀️"
      }
    ]
  }
];

export const PRODUCTS_CATALOG = [
  {
    id: "prod_1",
    name: "Cyber-Glow Oversized Hoodie",
    brand: "Lumina Studio Drop 04",
    price: 88.00,
    originalPrice: 110.00,
    creatorCommission: "15% ($13.20)",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 384,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#111111", "#4f46e5", "#ec4899"],
    description: "Heavyweight 450 GSM French Terry cotton hoodie with custom reflective iridescent Lumina insignia. Limited batch."
  },
  {
    id: "prod_2",
    name: "Analog Mood Preset Pack (Desktop + Mobile)",
    brand: "Elena Rostova Collab",
    price: 34.99,
    originalPrice: 49.99,
    creatorCommission: "35% ($12.25)",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 1240,
    sizes: ["Instant Download"],
    colors: ["#22c55e"],
    description: "14 cinematic film presets engineered for Lightroom & Photoshop. Gives that nostalgic 35mm Portra 400 warmth."
  },
  {
    id: "prod_3",
    name: "Titanium Content Creator Tripod & Ringlight",
    brand: "Lumina Hardware",
    price: 129.00,
    originalPrice: 159.00,
    creatorCommission: "12% ($15.48)",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
    rating: 4.95,
    reviewsCount: 650,
    sizes: ["Compact 1.8m"],
    colors: ["#000000", "#94a3b8"],
    description: "Aerospace aluminum tripod with MagSafe magnetic phone mount and bi-color 3000K-6500K dimmable LED."
  },
  {
    id: "prod_4",
    name: "Artisan Ceramic Matcha Set",
    brand: "Zen Craft x Lumina",
    price: 58.00,
    originalPrice: 70.00,
    creatorCommission: "18% ($10.44)",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviewsCount: 182,
    sizes: ["Standard"],
    colors: ["#3f6212", "#fafaf9"],
    description: "Handmade speckled stoneware bowl, bamboo whisk (chasen), and ceramic stand crafted in Kyoto."
  }
];

export const FEED_POSTS = [
  {
    id: "post_1",
    user: USERS[0], // Elena
    timestamp: "2 HOURS AGO",
    isCarousel: true,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1080&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1080&q=85",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1080&q=85"
    ],
    caption: "Autumn hues & architectural silhouettes in Milan. Which fit is your favorite 1, 2, or 3? 🍂✨ Shot with the new Analog Mood Presets.",
    likesCount: 24890,
    isLiked: false,
    isSaved: false,
    location: "Milan, Italy",
    audioTrack: "Elena Rostova • Original Audio",
    productTag: PRODUCTS_CATALOG[1], // Preset pack
    comments: [
      { id: "c1", user: USERS[1], text: "Slide 2 color grading is unmatched! 🔥", likes: 42, isLiked: false, time: "1h ago" },
      { id: "c2", user: CURRENT_USER, text: "The architectural framing here is so cinematic 👏", likes: 18, isLiked: true, time: "45m ago" },
      { id: "c3", user: USERS[3], text: "Milan is pure magic this time of year!", likes: 9, isLiked: false, time: "20m ago" }
    ]
  },
  {
    id: "post_sponsored",
    isSponsored: true,
    sponsorName: "Cyberpunk Gear Co.",
    sponsorTagline: "Sponsored • Shop Now",
    ctaText: "Shop Now",
    user: {
      username: "cyberpunkgear.official",
      fullName: "Cyberpunk Gear",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80",
      isVerified: true
    },
    timestamp: "SPONSORED",
    isCarousel: false,
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1080&q=85"
    ],
    caption: "Level up your battle station with Lumina RGB Smart Ambient Bars. Syncs with music, games & studio audio in real-time. ⚡ Get 25% off this week only with code LUMINA25.",
    likesCount: 15420,
    isLiked: false,
    isSaved: false,
    location: "Global Free Shipping",
    audioTrack: "Cyberpunk Gear • Sponsored Track",
    productTag: PRODUCTS_CATALOG[2],
    comments: [
      { id: "cs1", user: USERS[1], text: "Already using these in my renders! Quality is insane.", likes: 31, isLiked: false, time: "3h ago" }
    ]
  },
  {
    id: "post_2",
    user: CURRENT_USER,
    timestamp: "5 HOURS AGO",
    isCarousel: true,
    images: [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1080&q=85",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1080&q=85",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1080&q=85"
    ],
    caption: "Midnight studio experiments in hyper-vibrant illumination 🔮 Exploring holographic refractions & neon textures for our creator collective. Dropping new hoodie collab soon!",
    likesCount: 8940,
    isLiked: true,
    isSaved: true,
    location: "Lumina Labs, Tokyo",
    audioTrack: "Lumina Collective • Synthwave Reverie",
    productTag: PRODUCTS_CATALOG[0], // Hoodie
    comments: [
      { id: "c4", user: USERS[2], text: "Obsessed with these color gradients! Need this hoodie ASAP 🔥", likes: 52, isLiked: true, time: "3h ago" },
      { id: "c5", user: USERS[4], text: "Cleanest aesthetic on the feed 🙌", likes: 14, isLiked: false, time: "2h ago" }
    ]
  },
  {
    id: "post_3",
    user: USERS[2], // Maya
    timestamp: "8 HOURS AGO",
    isCarousel: true,
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1080&q=85",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1080&q=85"
    ],
    caption: "There is something sacred about dawn in the high Sierra. When the mist rises and the valley goes dead silent. Where is your peaceful place? 🌲⛰️",
    likesCount: 38200,
    isLiked: false,
    isSaved: false,
    location: "Yosemite National Park, California",
    audioTrack: "Ambient Nature Sounds • Sierra Sunrise",
    productTag: null,
    comments: [
      { id: "c6", user: USERS[0], text: "Breathtaking view Maya! The second slide is postcard material ❤️", likes: 27, isLiked: false, time: "6h ago" }
    ]
  },
  {
    id: "post_4",
    user: USERS[3], // Chef Marcus
    timestamp: "12 HOURS AGO",
    isCarousel: false,
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1080&q=85"
    ],
    caption: "Dry-aged Wagyu ribeye with smoked bone marrow butter and charred rosemary. Plated with precision. Recipe dropping in tomorrow's newsletter! 🥩🔥",
    likesCount: 45210,
    isLiked: false,
    isSaved: false,
    location: "Osteria Luminosa, San Francisco",
    audioTrack: "Marcus Vance • Kitchen Beats Vol. 3",
    productTag: PRODUCTS_CATALOG[3],
    comments: [
      { id: "c7", user: USERS[1], text: "Chef, you're making me hungry at 2am 😭🤤", likes: 64, isLiked: false, time: "10h ago" }
    ]
  }
];

export const REELS_DATA = [
  {
    id: "reel_1",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-tunnel-with-neon-lights-42512-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    user: USERS[1], // Kai
    caption: "Creating a neon hyper-tunnel in 45 seconds using geometry nodes ⚡ Watch till the end for render result!",
    audioTrack: "Kai Tanaka • Neon Pulse (Original Mix)",
    likesCount: 184500,
    isLiked: false,
    commentsCount: 2340,
    sharesCount: 15600,
    isSaved: false,
    productTag: PRODUCTS_CATALOG[0],
    creatorBadge: "Top Creator Bonus"
  },
  {
    id: "reel_2",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-walking-through-a-neon-illuminated-street-42521-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    user: USERS[0], // Elena
    caption: "Midnight Tokyo thrift run & styling vintage Japanese streetwear 🖤 Which combination goes hardest?",
    audioTrack: "Tokyo Lofi Beats • Shibuya Rain",
    likesCount: 312000,
    isLiked: true,
    commentsCount: 4180,
    sharesCount: 28900,
    isSaved: true,
    productTag: PRODUCTS_CATALOG[1],
    creatorBadge: "Trending Sound"
  },
  {
    id: "reel_3",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-waves-crashing-on-a-rocky-shore-43098-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    user: USERS[2], // Maya
    caption: "Iceland's black sand coast from 300 meters above. The Atlantic raw power is humbling. 🌊🇮🇸",
    audioTrack: "Maya Lin • Nordic Whispers",
    likesCount: 94500,
    isLiked: false,
    commentsCount: 980,
    sharesCount: 11200,
    isSaved: false,
    productTag: null,
    creatorBadge: "Staff Pick"
  },
  {
    id: "reel_4",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-and-operating-a-smartphone-41484-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    user: CURRENT_USER,
    caption: "How we track $10k/mo creator revenue using Lumina analytics dashboard. Build your brand with data 📊💡",
    audioTrack: "Lumina Creator • Growth Mindset Audio",
    likesCount: 68400,
    isLiked: true,
    commentsCount: 1120,
    sharesCount: 8400,
    isSaved: true,
    productTag: PRODUCTS_CATALOG[2],
    creatorBadge: "Creator Academy"
  }
];

export const EXPLORE_ITEMS = [
  { id: "exp_1", type: "reel", span: "tall", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80", likes: "142K", comments: "1.2K", user: USERS[0] },
  { id: "exp_2", type: "post", span: "normal", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80", likes: "58K", comments: "420", user: USERS[1] },
  { id: "exp_3", type: "post", span: "normal", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", likes: "98K", comments: "890", user: USERS[2] },
  { id: "exp_4", type: "post", span: "normal", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80", likes: "33K", comments: "210", user: USERS[3] },
  { id: "exp_5", type: "post", span: "normal", url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80", likes: "47K", comments: "390", user: USERS[4] },
  { id: "exp_6", type: "reel", span: "tall", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80", likes: "280K", comments: "3.4K", user: USERS[1] },
  { id: "exp_7", type: "post", span: "normal", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80", likes: "89K", comments: "670", user: CURRENT_USER },
  { id: "exp_8", type: "post", span: "normal", url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80", likes: "72K", comments: "510", user: USERS[0] },
  { id: "exp_9", type: "post", span: "normal", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80", likes: "115K", comments: "1.1K", user: USERS[2] },
  { id: "exp_10", type: "post", span: "normal", url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80", likes: "64K", comments: "480", user: USERS[3] },
  { id: "exp_11", type: "reel", span: "tall", url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80", likes: "192K", comments: "1.8K", user: USERS[1] },
  { id: "exp_12", type: "post", span: "normal", url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80", likes: "41K", comments: "280", user: CURRENT_USER }
];

export const DIRECT_CHATS = [
  {
    id: "dm_elena",
    user: USERS[0],
    lastMessage: "Sent you the final high-res renders for the Milan campaign!",
    lastTime: "12m ago",
    unreadCount: 1,
    isOnline: true,
    messages: [
      { id: "m1", sender: "u_elena", text: "Hey! Loved your latest carousel breakdown 🔥", time: "10:30 AM" },
      { id: "m2", sender: "u_self", text: "Thanks Elena! The Milan shots looked completely surreal.", time: "10:32 AM" },
      { id: "m3", sender: "u_elena", text: "Are we still doing the collaborative live stream this Friday?", time: "10:45 AM" },
      { id: "m4", sender: "u_self", text: "Definitely! 6 PM EST works best for my audience.", time: "10:47 AM" },
      { id: "m5", sender: "u_elena", text: "Sent you the final high-res renders for the Milan campaign!", time: "11:15 AM" }
    ]
  },
  {
    id: "dm_kai",
    user: USERS[1],
    lastMessage: "The new Blender plugin dropped today, test it out!",
    lastTime: "1h ago",
    unreadCount: 0,
    isOnline: true,
    messages: [
      { id: "m20", sender: "u_kai", text: "Yo, did you see the algorithm update?", time: "Yesterday" },
      { id: "m21", sender: "u_self", text: "Yeah, prioritizing creator commerce tags big time.", time: "Yesterday" },
      { id: "m22", sender: "u_kai", text: "The new Blender plugin dropped today, test it out!", time: "10:05 AM" }
    ]
  },
  {
    id: "dm_maya",
    user: USERS[2],
    lastMessage: "Sending postcard energy from the Alps! 🏔️",
    lastTime: "3h ago",
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: "m30", sender: "u_maya", text: "Sending postcard energy from the Alps! 🏔️", time: "8:20 AM" }
    ]
  },
  {
    id: "dm_marcus",
    user: USERS[3],
    lastMessage: "Next time you're in SF, dinner is on me!",
    lastTime: "1d ago",
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: "m40", sender: "u_marcus", text: "Next time you're in SF, dinner is on me!", time: "Yesterday" }
    ]
  }
];

export const NOTIFICATIONS_DATA = [
  {
    id: "n_1",
    user: USERS[0],
    type: "like",
    text: "liked your photo.",
    time: "2m ago",
    mediaUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=150&q=80",
    isRead: false
  },
  {
    id: "n_2",
    user: USERS[1],
    type: "comment",
    text: 'commented: "Slide 2 color grading is unmatched! 🔥"',
    time: "15m ago",
    mediaUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=150&q=80",
    isRead: false
  },
  {
    id: "n_3",
    user: USERS[3],
    type: "follow",
    text: "started following you.",
    time: "1h ago",
    isRead: false,
    hasFollowButton: true
  },
  {
    id: "n_4",
    user: {
      username: "lumina_shop",
      avatar: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=150&q=80"
    },
    type: "commerce",
    text: "You earned $13.20 affiliate commission on Cyber-Glow Hoodie sale!",
    time: "2h ago",
    isRead: true
  },
  {
    id: "n_5",
    user: USERS[2],
    type: "mention",
    text: "mentioned you in a reel: \"Lumina Studios inspired workflow...\"",
    time: "5h ago",
    mediaUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80",
    isRead: true
  }
];

export const CREATOR_ANALYTICS = {
  overview: {
    accountsReached: { value: "348,920", growth: "+24.8%", isPositive: true },
    accountsEngaged: { value: "52,410", growth: "+18.2%", isPositive: true },
    totalFollowers: { value: "142,800", growth: "+3,240 this month", isPositive: true },
    totalEarnings: { value: "$8,420.50", growth: "+31.5%", isPositive: true }
  },
  revenueStreams: [
    { title: "Creator Storefront Sales", amount: "$3,180.00", percentage: "38%", color: "#ec4899" },
    { title: "Brand Partnerships & Sponsored", amount: "$2,850.00", percentage: "34%", color: "#8b5cf6" },
    { title: "Reels Play Creator Bonus", amount: "$1,640.50", percentage: "19%", color: "#3b82f6" },
    { title: "Tips & Viewer Badges", amount: "$750.00", percentage: "9%", color: "#10b981" }
  ],
  topContent: [
    {
      title: "How we track $10k/mo creator revenue",
      type: "Reel",
      views: "184.5K",
      reach: "210.2K",
      engagement: "14.2%",
      earned: "$420.00"
    },
    {
      title: "Midnight studio experiments in hyper-vibrant illumination",
      type: "Carousel",
      views: "92.1K",
      reach: "115.0K",
      engagement: "11.8%",
      earned: "$280.00"
    },
    {
      title: "Color grading masterclass preset breakdown",
      type: "Post",
      views: "64.3K",
      reach: "78.4K",
      engagement: "9.5%",
      earned: "$195.00"
    }
  ],
  audienceMetrics: {
    gender: [
      { label: "Women", percentage: 54 },
      { label: "Men", percentage: 42 },
      { label: "Non-binary", percentage: 4 }
    ],
    ageGroups: [
      { range: "18-24", pct: 38 },
      { range: "25-34", pct: 44 },
      { range: "35-44", pct: 14 },
      { range: "45+", pct: 4 }
    ],
    topCities: ["Tokyo (28%)", "New York (22%)", "London (18%)", "Seoul (14%)", "Paris (10%)"]
  }
};
