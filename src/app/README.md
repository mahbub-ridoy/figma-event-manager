# Virtual Event Platform - mypeople

A comprehensive, high-fidelity virtual event platform built with React, TypeScript, and Tailwind CSS, featuring mypeople.ai's official brand colors and design language.

## Features

### 🏢 Global Navigation Header
- Sticky top bar with mypeople logo
- Navigation links: Lobby, Exhibit Hall, Auditorium, Lounge, Booths, Engagement, More
- Live online user counter
- Notification bell
- Dropdown menus for enhanced navigation

### 🎯 Environment Selection Grids
Three distinct environment selection pages with 3x2 grid layouts:
- **Lobbies** - Choose from 6 different lobby environments
- **Auditoriums** - Select from 6 theater and presentation halls
- **Networking Lounges** - Pick from 6 networking and social spaces

Each card features:
- High-quality preview images
- Rounded corners with hover effects
- Shadow effects with green accent on hover
- Option labels (Option 1-6)

### 🏛️ 3D Exhibit Hall
- Immersive 3D isometric lobby view
- Green placeholder billboards for advertisements
- Information desk with avatars
- "Start Watching" call-to-action
- Interactive hotspots:
  - Click on "Auditorium" entrance to navigate
  - Click on "Networking Lounge" to navigate
- Floating "Contact Us" button with modal form

### 🎭 Interactive Auditorium
- Theater-style view facing the stage
- Massive "Content Placeholder" screen
- Green ambient neon lighting effects
- Professional conference atmosphere
- Video playback capability

### 🏪 Booth Marketplace
- Responsive grid layout (1-3 columns based on screen size)
- 6 exhibitor booth cards featuring:
  - Booth title and company name
  - Professional ecommerce platform descriptions
  - Green "See Details" buttons with shadow effects
- Detailed booth overlay with:
  - Feature lists
  - "Schedule Meeting" and "Download Brochure" actions
  - Smooth modal animations

### 💬 Engagement Sidebar
Slide-out panel from the right side with four tabs:

1. **Polls** - Interactive voting with visual progress bars
2. **Recent News** - Event announcements and updates
3. **Documents** - Downloadable PDFs and resources
4. **Attendees** - Live participant list with:
   - Avatars with online status indicators
   - Names: Md Rayhan, Salman Khan, and others
   - Professional roles

## Design System

### Color Palette
- **Primary Brand Green**: `#10B759` (vibrant green from mypeople logo)
- **Teal/Blue-Grey**: `#5B7C8F` (brand text color from logo)
- **Light Brand Green**: `#E8F7F0` (backgrounds and accents)
- **Dark Grey**: `#334155` (headings and primary text)
- **Medium Grey**: `#64748b` (body text and secondary elements)
- **White**: `#ffffff` (cards and backgrounds)

### Brand Guidelines
The design system is built around the mypeople.ai brand identity:
- Logo features bright green circular elements representing people/connections
- Clean, modern lowercase typography
- Rounded, friendly design language
- Professional yet approachable aesthetic

### Typography
- **Font Family**: Inter (primary), Poppins (accents)
- **Font Sizes**: Responsive scaling from 14px to 48px
- **Font Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Visual Effects
- **Border Radius**: 4px for buttons, 8-12px for cards, 35px for special elements
- **Shadows**: 
  - Buttons: `0 2px 8px rgba(0,168,45,0.3)`
  - Cards: `0 4px 12px rgba(0,0,0,0.1)`
  - Hover: `0 8px 24px rgba(0,168,45,0.2)`
- **Gradients**: Linear gradient from `#A3E4D7` at 0% to white

### Responsive Design
- Mobile-first approach
- Grid layouts adapt from 1 to 3 columns
- Touch-friendly interactive elements
- Optimized images for all screen sizes

## Navigation Flow

```
Lobby Selection → Exhibit Hall → [Auditorium | Networking Lounge | Booths]
                ↓                        ↓
        Auditorium Selection    Lounge Selection
                ↓                        ↓
        Auditorium View          Lounge View
```

## Interactive Features

### Hotspots
- Clickable areas in the Exhibit Hall navigate to different sections
- Hover effects provide visual feedback
- Transparent overlay zones for intuitive interaction

### Modals & Overlays
- Booth detail overlays
- Contact form modal
- Engagement sidebar
- All with smooth animations and backdrop blur

### Real-time Elements
- Online user counter (simulated at 142 users)
- Live attendee status indicators
- Dynamic poll results
- News feed with timestamps

## Technical Implementation

### Components Structure
```
/components
  ├── Navigation.tsx           # Global header
  ├── EnvironmentGrid.tsx      # Reusable grid for lobby/auditorium/lounge selection
  ├── ExhibitHallView.tsx      # Exhibit hall wrapper with interactions
  ├── AuditoriumView.tsx       # Auditorium wrapper
  ├── BoothMarketplace.tsx     # Booth grid and modals
  └── EngagementSidebar.tsx    # Slide-out engagement panel

/imports
  ├── ExhibitHall.tsx          # Figma-imported 3D hall design
  ├── Auditorium.tsx           # Figma-imported auditorium design
  └── [SVG and asset files]

/App.tsx                       # Main application with routing
```

### State Management
- React hooks for local component state
- Page navigation through centralized routing
- Modal and sidebar visibility toggles
- Selection tracking for environment options

### Accessibility
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Focus management for modals
- Color contrast ratios meet WCAG AA standards

## Usage

### Navigation
1. **Select an Environment**: Choose from Lobby, Auditorium, or Lounge options
2. **Explore the Exhibit Hall**: Click on interactive hotspots to navigate
3. **Visit Booths**: Browse the marketplace and view detailed information
4. **Engage**: Open the sidebar to participate in polls, read news, or connect with attendees

### Key Interactions
- Click navigation links to switch between sections
- Hover over cards to see lift animations
- Click "See Details" to open booth information
- Use the "Engagement" button to open the sidebar
- Click the "Contact Us" floating button for support

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations
- Lazy loading for images
- Optimized SVG graphics
- Minimal re-renders with React hooks
- CSS transforms for smooth animations
- Efficient event handling

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Figma imports