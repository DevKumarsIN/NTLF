# NTLF 2026 React Components

This directory contains the React version of the NASSCOM Technology and Leadership Forum 2026 website.

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
react-components/
├── components/           # React components
│   ├── Header.jsx       # Navigation and fixed round button
│   ├── HeroSection.jsx  # Frame animation / mobile video
│   ├── StatsSection.jsx # Animated counters
│   ├── AboutSection.jsx # About NTLF section
│   ├── PillarsSection.jsx # Feature cards with animations
│   ├── SpeakersSection.jsx # Flip cards for speakers
│   ├── TicketsSection.jsx # Ticket scroll animation
│   └── VenueSection.jsx # Video background venue info
├── styles/
│   └── styles.css       # Main stylesheet (converted from original)
├── App.jsx              # Main App component
├── index.js            # React entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## 🎯 Components Overview

### Header.jsx

- Fixed navbar with navigation links
- Animated rotating "Register Now" button
- Bootstrap collapse functionality
- Mobile-responsive design

### HeroSection.jsx

- Desktop: 244-frame scroll animation
- Mobile: Video background with fallback
- Complex wheel event handling
- GSAP integration for smooth animations

### StatsSection.jsx

- Animated counter numbers
- Intersection Observer for trigger
- Word-by-word text reveals
- Responsive design

### AboutSection.jsx

- Animated text reveals
- Video background
- Scroll-triggered animations

### PillarsSection.jsx

- Complex card stack animation
- Desktop wheel scrolling
- Mobile touch swipe support
- Video backgrounds for each card

### SpeakersSection.jsx

- Flip card animations
- Cursor following text
- Speaker data management
- Responsive grid layout

### TicketsSection.jsx

- Scroll-triggered ticket reveals
- Terms & conditions animations
- Mobile-optimized interactions

### VenueSection.jsx

- Full-screen video background
- Venue information overlay
- Interactive map link

## 🎨 Styling

The `styles.css` file contains all the original styling converted for React:

- Font imports and typography
- Bootstrap customizations
- Animation classes
- Responsive breakpoints
- All original visual effects preserved

## 🛠 Key Features Preserved

✅ **All Animations:** Frame scrolling, counters, text reveals, card flips
✅ **Responsive Design:** Mobile/tablet/desktop breakpoints
✅ **Interactive Elements:** Buttons, links, hover effects
✅ **Video Support:** Background videos with fallbacks
✅ **Bootstrap Integration:** Full Bootstrap 5.3.8 support
✅ **Font Loading:** Google Fonts integration
✅ **Accessibility:** ARIA labels and semantic HTML

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile Safari and Chrome
- Responsive design for all screen sizes

## 🔧 Customization

To modify the website:

1. **Content:** Edit the component files to change text, images, or links
2. **Styling:** Modify `styles/styles.css` or add component-specific CSS
3. **Animation:** Adjust timing and effects in the useEffect hooks
4. **Layout:** Change Bootstrap classes or add custom components

## 📋 Dependencies

- **React 18.2.0:** Core framework
- **Bootstrap 5.3.8:** UI framework
- **Vite:** Build tool and dev server
- **GSAP:** Animation library (loaded via CDN)

## 🚀 Deployment

After running `npm run build`, deploy the `dist/` folder to your web server.

Make sure to:

1. Copy the `images/` folder from the original project
2. Update any absolute paths if needed
3. Configure your server for SPA routing if using React Router

## 📞 Support

This React conversion maintains 100% visual and functional parity with the original HTML website while providing the benefits of component-based architecture and modern React development practices.
