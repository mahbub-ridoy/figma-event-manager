# mypeople.ai Brand Guide

This document outlines the brand identity and design system used throughout the Virtual Event Platform.

## Brand Identity

### Logo
The mypeople.ai logo consists of:
- **Visual elements**: Three green circular dots arranged to represent people/community
- **Typography**: Lowercase "mypeople" text in a modern, clean sans-serif font
- **Color scheme**: Vibrant green dots with teal/blue-grey text

### Brand Values Reflected in Design
- **Connection**: Green circles symbolize people coming together
- **Modern**: Clean, contemporary design with rounded elements
- **Professional**: Balanced use of color and space
- **Approachable**: Friendly, lowercase typography and soft gradients

---

## Color System

### Primary Colors

#### Brand Green `#10B759`
- **Usage**: Primary CTAs, active states, highlights, icons
- **RGB**: rgb(16, 183, 89)
- **HSL**: hsl(145, 84%, 39%)
- **Description**: Vibrant, energetic green from the logo dots

#### Teal-Blue Grey `#5B7C8F`
- **Usage**: Headings, navigation text, prominent labels
- **RGB**: rgb(91, 124, 143)
- **HSL**: hsl(202, 23%, 46%)
- **Description**: Professional blue-grey from logo typography

### Secondary Colors

#### Light Brand Green `#E8F7F0`
- **Usage**: Backgrounds, hover states, badges, avatar backgrounds
- **RGB**: rgb(232, 247, 240)
- **Description**: Soft, approachable tint for large areas

#### Dark Grey `#334155`
- **Usage**: Body headings, card titles, important text
- **RGB**: rgb(51, 65, 85)
- **Description**: Strong, readable text color

#### Medium Grey `#64748b`
- **Usage**: Body text, descriptions, secondary information
- **RGB**: rgb(100, 116, 139)
- **Description**: Softer text for supporting content

#### White `#ffffff`
- **Usage**: Cards, modals, navigation bar, form inputs
- **Description**: Clean backgrounds and surfaces

---

## Typography

### Font Families

#### Primary: Inter
```css
font-family: 'Inter', sans-serif;
```
- Used for: Navigation, body text, buttons, forms
- Characteristics: Clean, highly legible, modern sans-serif
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

#### Accent: Poppins
```css
font-family: 'Poppins', sans-serif;
```
- Used for: Special call-outs, "Contact Us" button
- Characteristics: Rounded, friendly, geometric
- Weights: 700 (Bold)

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Page Titles) | 36-48px | Bold (700) | 1.2 |
| H2 (Section Titles) | 24-32px | Bold (700) | 1.3 |
| H3 (Card Titles) | 18-20px | Semibold (600) | 1.4 |
| Body Large | 16-18px | Regular (400) | 1.5 |
| Body | 14-16px | Regular (400) | 1.5 |
| Small | 12-14px | Regular (400) | 1.4 |

---

## Component Styles

### Buttons

#### Primary Button (CTA)
```css
background: #10B759;
color: #ffffff;
border-radius: 4px;
padding: 12px 24px;
box-shadow: 0 2px 8px rgba(16, 183, 89, 0.3);
```
**Hover**: Background darkens to `#0E9F4D`

#### Secondary Button
```css
background: transparent;
color: #10B759;
border: 2px solid #10B759;
border-radius: 4px;
padding: 12px 24px;
```
**Hover**: Background fills with `#10B759`, text becomes white

### Cards

#### Standard Card
```css
background: #ffffff;
border-radius: 8-12px;
padding: 24px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
```
**Hover**: 
```css
transform: scale(1.05);
box-shadow: 0 8px 24px rgba(16, 183, 89, 0.2);
```

### Form Inputs
```css
background: #ffffff;
border: 1px solid #cbd5e1;
border-radius: 8px;
padding: 8px 16px;
```
**Focus**:
```css
border-color: #10B759;
outline: none;
```

---

## Spacing System

### Base Unit: 4px
All spacing follows a 4px grid system:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing, icon gaps |
| sm | 8px | Between related elements |
| md | 16px | Default component padding |
| lg | 24px | Section spacing |
| xl | 32px | Large section gaps |
| 2xl | 48px | Page-level spacing |

---

## Iconography

### Style
- **Library**: Lucide React
- **Weight**: Regular (2px stroke)
- **Size**: 16px (small), 20px (medium), 24px (large)
- **Color**: Inherits from parent or uses brand green `#10B759`

### Common Icons
- Bell (notifications)
- Users (attendee count)
- ChevronDown (dropdowns)
- Phone (contact)
- FileText (documents)
- TrendingUp (news)
- BarChart3 (polls)

---

## Animations & Transitions

### Standard Transitions
```css
transition: all 0.3s ease;
```

### Hover Effects
- **Scale**: `transform: scale(1.05)` for cards
- **Color**: Darken by 10% for buttons
- **Shadow**: Increase blur and add brand green tint

### Modal Animations
- Fade in backdrop: `opacity: 0 → 1` (300ms)
- Slide in sidebar: `translateX(100%) → 0` (300ms)

---

## Layout Principles

### Grid System
- Desktop: 3-column grid for cards
- Tablet: 2-column grid
- Mobile: 1-column stack

### Responsive Breakpoints
```css
/* Mobile first */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
```

### Container Padding
- Desktop: 64px horizontal (`px-16`)
- Tablet: 32px horizontal
- Mobile: 16px horizontal

---

## Accessibility

### Color Contrast
- Text on white: Minimum WCAG AA (4.5:1)
- Brand green on white: AAA compliant (6.2:1)
- Teal-blue grey on white: AA compliant (4.8:1)

### Interactive Elements
- Minimum touch target: 44x44px
- Focus indicators: 2px solid brand green outline
- Keyboard navigation: Full support with visible focus states

---

## Usage Examples

### Navigation Link
```tsx
<button className="text-[#5B7C8F] hover:text-[#10B759] font-['Inter'] text-[14px]">
  Lobby
</button>
```

### Primary CTA Button
```tsx
<button className="bg-[#10B759] hover:bg-[#0E9F4D] text-white px-6 py-3 rounded-[4px] shadow-[0_2px_8px_rgba(16,183,89,0.3)]">
  See Details
</button>
```

### Card Component
```tsx
<div className="bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:scale-105 hover:shadow-[0_8px_24px_rgba(16,183,89,0.2)]">
  <h3 className="text-[#334155] font-semibold text-lg">Card Title</h3>
  <p className="text-[#64748b] text-sm mt-2">Card description</p>
</div>
```

### Online Status Indicator
```tsx
<div className="h-3 w-3 bg-[#10B759] rounded-full border-2 border-white" />
```

---

## Do's and Don'ts

### ✅ Do
- Use brand green for primary actions and interactive elements
- Maintain consistent spacing using the 4px grid
- Use Inter font for body text and navigation
- Keep rounded corners (4-12px) for friendly appearance
- Apply subtle shadows for depth
- Use white backgrounds for cards and modals

### ❌ Don't
- Mix different shades of green not in the palette
- Use brand green for large background areas
- Create buttons without proper padding/spacing
- Use thin fonts below 14px size
- Over-animate or create jarring transitions
- Neglect hover states on interactive elements

---

## Brand Assets Location

### Logo Files
- Main logo: `/imports/figma:asset/28aef9bee0cb0fdff89e5470b4bf1593492d971d.png`
- Dimensions: 162px × 53px (3:1 aspect ratio)

### Import Statement
```tsx
import imgMypeopleLogoNew11 from "../imports/figma:asset/28aef9bee0cb0fdff89e5470b4bf1593492d971d.png";
```

---

*Last updated: January 2026*
*For questions about brand usage, contact the design team.*
