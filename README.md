# Tic-Tac-Toe (XO Game) - Technical Challenge

## 📋 Challenge Implemented

I implemented a **Tic-Tac-Toe (XO) game** with the following advanced features:

### ✅ Core Requirements Met:

- **3x3 game board** using flex layout with proper borders
- **Alternating turns** between X and O players (starts with X, then alternates)
- **Win detection** for all patterns (horizontal, vertical, diagonal)
- **Draw detection** when board is full
- **Game reset** on click after game ends
- **Visual feedback** for winning cells
- **Game statistics** tracking
- **Responsive design** for all screen sizes

### 🚀 Advanced Features Added:

- **Persian (Farsi) language support** - Full UI translation for Iranian users
- **Alternating starting players** - Each new game starts with the opposite player of the winner
- **Winning line highlighting** - Only the winning cells are highlighted (not all cells of the winner)
- **Smooth animations** - No layout jumps, all transitions are animated
- **Persian numbers support** - All numbers automatically converted to Persian numerals
- **Game history tracking** - Complete history of all games played
- **Detailed statistics** - Win rates, starter statistics, pattern analysis

## 🛠️ Tech Stack

### Core Technologies:

- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - Latest React version
- **TypeScript** - Type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework

### Additional Libraries:

- **Zustand 5.0.8** - State management (optional, ready for scale)
- **IDB 8.0.3** - IndexedDB wrapper (prepared for offline persistence)
- **React Loading Skeleton** - Loading state placeholders
- **React Multi Date Picker** - Date selection components (for future features)

### Persian Language Support:

- **Sahel Font** - Persian/Arabic-optimized font
- **CSS font-feature-settings** - Automatic Persian numeral conversion
- **RTL layout** - Full right-to-left support

## 🚀 Installation & Running

### Prerequisites:

- Node.js 18+ (recommended: 20.x)
- npm or yarn package manager

### Quick Start:

```bash
# 1. Clone the repository
git clone <repository-url>
cd <project-folder>

# 2. Install dependencies
npm install
# or
yarn install

# 3. Run the development server
npm run dev
# or
yarn dev
```

### Build for Production:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Access the Application:

- Open your browser and navigate to `http://localhost:3000`
- The game will be running and ready to play

## 📱 How to Play

1. **Start the Game**: First game starts with X player
2. **Take Turns**: Click on any empty cell to place your mark (X or O)
3. **Win Condition**: Get 3 of your marks in a row (horizontal, vertical, or diagonal)
4. **Draw Condition**: If all 9 cells are filled with no winner
5. **Next Game**: After game ends, click anywhere to start a new game
6. **Starter Rotation**: Next game starts with the opposite player

### Game Rules:

- X always goes first in the first game
- After each game, the starting player alternates
- Winning cells are highlighted with animation
- Game statistics are tracked in real-time

## ⚠️ Assumptions & Limitations

### Assumptions:

1. **Single Player Mode**: The game is designed for two players taking turns on the same device
2. **Persian Audience**: UI is fully translated to Persian with RTL layout
3. **Modern Browsers**: Uses modern CSS features (flexbox, CSS grid, CSS animations)
4. **No Backend Required**: All game state is managed in the frontend

### Current Limitations:

1. **No AI Opponent**: Currently only supports two human players
2. **No Online Multiplayer**: Limited to local multiplayer on same device
3. **Limited History Persistence**: Game history is stored in memory (clears on page refresh)
4. **Mobile Gestures**: No swipe gestures for mobile play (click/tap only)

### Known Issues:

- None reported - all bugs from requirements have been fixed:
  - ✓ Fixed: Only winning cells highlighted (not all same-player cells)
  - ✓ Fixed: Smooth status animations without layout jumps
  - ✓ Fixed: Alternating starting players implemented
  - ✓ Fixed: Persian numbers conversion across entire app

## 🔧 Technical Implementation Details

### State Management:

- **React useState/useEffect** for local component state
- **Zustand** store prepared for global state (if needed for scaling)
- **TypeScript interfaces** for type-safe state management

### Performance Optimizations:

- **Memoized calculations** for win detection
- **CSS animations** instead of JavaScript for better performance
- **Virtualized lists** for game history (if many entries)
- **Lazy loading** ready for component expansion

### Code Structure:

```
src/
├── page/                   # Next.js Page Router pages
├── components/             # Reusable React components
│   ├── GameStats.tsx       # Game statistics sidebar
│   └── game.t sx           # Main Game component
├── types/                  # TypeScript type definitions
├── styles/                 # Global styles
├── utils/                  # Utility functions
│   └── persianNumber.ts    # Persian number conversion
└── stores/          # Zustand stores (optional)
```

## 🎯 Future Improvements (With More Time)

### High Priority:

1. **AI Opponent**: Implement minimax algorithm for single-player mode
2. **Online Multiplayer**: Add real-time multiplayer using WebSockets
3. **Persistence**: Save game history to IndexedDB for persistence across sessions
4. **Sound Effects**: Add audio feedback for moves, wins, and draws

### Medium Priority:

5. **Difficulty Levels**: Easy, Medium, Hard AI levels
6. **Game Variations**: Support for 4x4, 5x5 boards
7. **Themes**: Dark mode and custom color themes
8. **Animations**: More sophisticated winning animations

### Low Priority:

9. **Player Profiles**: Create and save player profiles
10. **Tournament Mode**: Best of 3/5/7 series
11. **Replay System**: Watch replays of previous games
12. **Social Features**: Share wins on social media

### Technical Enhancements:

13. **PWA Support**: Install as progressive web app
14. **Offline Play**: Full offline functionality
15. **Accessibility**: ARIA labels and keyboard navigation
16. **Unit Tests**: Comprehensive test coverage

## 📊 Testing

### Manual Testing Performed:

- ✅ All win conditions (8 possible winning lines)
- ✅ Draw condition
- ✅ Game reset functionality
- ✅ Persian number conversion
- ✅ RTL layout correctness
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Browser compatibility (Chrome, Firefox, Safari)

### To Run Tests (if added):

```bash
npm test
```

## 🤝 Contribution

This project was developed as a technical challenge. While it's a complete implementation, the architecture is designed to be:

1. **Extensible**: Easy to add new features
2. **Maintainable**: Clean, commented code with TypeScript
3. **Scalable**: State management ready for complex features
4. **Localized**: Easy to add more language support

## 📞 Support

For any issues running the application:

1. Ensure Node.js version is 18+
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall: `rm -rf node_modules && npm install`
4. Check browser console for errors

**Developed with attention to detail, clean code practices, and user experience.**
