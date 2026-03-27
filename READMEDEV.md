# Movie App - Technical Documentation

A mobile application to explore movies, built with React Native and TypeScript, consuming The Movie Database (TMDB) API.

## 📱 Implemented Features

- ✅ Main "Popular" category with horizontal scroll
- ✅ Three categories with grid: Now Playing, Upcoming, Top Rated (with infinite pagination)
- ✅ Watch list persisted locally with AsyncStorage
- ✅ Navigation to movie detail screen
- ✅ Trailer viewing (YouTube app/web)
- ✅ Movie search by name
- ✅ Offline support with robust cache system
- ✅ Unit tests for hooks and services
- ✅ Offline status indicator
- ✅ Scalable architecture with custom hooks and services
- ✅ TypeScript with strong typing
- ✅ Error handling with cache fallback

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.11.0
- React Native development environment configured ([official guide](https://reactnative.dev/docs/environment-setup))
- TMDB API Key ([get it here](https://www.themoviedb.org/settings/api))
- For iOS: Xcode and CocoaPods installed
- For Android: Android Studio and SDK configured

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd movieApp
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables:**

Create a `.env` file in the project root:

```env
TMDB_API_KEY=your_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
```

### Run the Application

#### iOS

```bash
# Install Ruby bundler (first time)
bundle install

# Install pods
bundle exec pod install

# Run the app
npm run ios
# or
yarn ios
```

#### Android

```bash
npm run android
# or
yarn android
```

### Available Commands

```bash
# Start Metro Bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run linter
npm run lint

# Run tests
npm test

# Tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🧪 Testing

The project includes unit tests for critical hooks and services:

```bash
# Run all tests
npm test

# Tests with watch mode (recommended for development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Implemented Tests

**Hooks:**
- ✅ `useFavorites.test.ts` - Favorites management
- ✅ `useNetworkStatus.test.ts` - Connectivity detection
- ✅ `useMovieDetail.test.ts` - Movie details with cache
- ✅ `useSearch.test.ts` - Search with cache
- ✅ `useWatchList.test.ts` - Favorites list

**Services:**
- ✅ `cache.service.test.ts` - Cache system
- ✅ `favorites.service.test.ts` - Favorites persistence

## 📁 Project Structure

```
src/
├── api/                          # HTTP client configuration
│   └── axios.ts                 # Configured Axios instance
│
├── components/                   # Reusable components
│   ├── cachedimage/             # Image with cache support
│   │   ├── CachedImage.tsx
│   │   └── index.ts
│   ├── loading/                 # Loading indicator
│   │   ├── Loading.tsx
│   │   └── styles/
│   ├── offlineindicator/        # Offline status banner
│   │   ├── OfflineIndicator.tsx
│   │   └── index.ts
│   ├── searchBar/               # Search bar
│   │   ├── SearchBar.tsx
│   │   ├── styles/
│   │   └── types/
│   ├── svgicon/                 # Vector icon system
│   │   ├── SvgIcon.tsx
│   │   ├── constants/
│   │   └── types/
│   └── Title/                   # Title component
│       └── Title.tsx
│
├── containers/                   # Main screens
│   ├── home/                    # Home screen
│   │   ├── Index.tsx
│   │   ├── hooks/
│   │   │   └── useHome.tsx     # Home business logic
│   │   ├── components/
│   │   │   ├── featuredmoviecard/
│   │   │   ├── homeheader/
│   │   │   ├── loadingfooter/
│   │   │   ├── moviepostercard/
│   │   │   └── tabselector/
│   │   ├── styles/
│   │   └── types/
│   │
│   ├── detailScreen/            # Movie details
│   │   ├── Index.tsx
│   │   ├── hooks/
│   │   │   ├── useMovieDetail.ts
│   │   │   └── __tests__/
│   │   ├── components/
│   │   │   ├── moviedetailheader/
│   │   │   └── moviehero/
│   │   └── styles/
│   │
│   ├── searchScreen/            # Movie search
│   │   ├── Index.tsx
│   │   ├── hooks/
│   │   │   ├── useSearch.ts
│   │   │   └── __tests__/
│   │   ├── components/
│   │   │   ├── emptystate/
│   │   │   ├── moviesearchcard/
│   │   │   └── searchheader/
│   │   └── styles/
│   │
│   └── watchScreen/             # Favorites list
│       ├── Index.tsx
│       ├── hooks/
│       │   ├── useWatchList.ts
│       │   └── __tests__/
│       ├── components/
│       │   ├── watchemptystate/
│       │   ├── watchheader/
│       │   └── watchmoviecard/
│       └── styles/
│
├── hooks/                        # Global custom hooks
│   ├── useFavorites.ts          # Favorites management
│   ├── useNetworkStatus.ts      # Connectivity status
│   └── __tests__/
│
├── navigation/                   # Navigation configuration
│   ├── AppNavigator.tsx         # Stack and Tab navigators
│   ├── index.ts
│   └── types/
│       └── navigation.types.ts  # Navigation types
│
├── services/                     # Application services
│   ├── cache.service.ts         # Cache system with AsyncStorage
│   ├── favorites.service.ts     # Favorites persistence
│   └── __tests__/
│
├── theme/                        # Design system
│   └── colors.ts                # Centralized color palette
│
├── types/                        # Global types
│   └── env.d.ts                 # Environment variable types
│
├── constants/                    # Global constants
│   └── genres.ts                # Movie genre mapping
│
└── config/                       # Configuration
    └── env.ts                   # Environment variables
```

## 🏗️ Architecture

### Implemented Design Patterns

#### 1. **Custom Hooks Pattern**
Business logic is encapsulated in reusable custom hooks:

```typescript
// Example: useMovieDetail hook
export const useMovieDetail = (movieId: number) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { isOnline } = useNetworkStatus();

  // Fetching logic with cache
  useEffect(() => {
    fetchMovieDetail();
  }, [movieId]);

  return { movie, loading, error, trailerKey };
};
```

#### 2. **Service Layer Pattern**
Separate services for specific operations:

```typescript
// cache.service.ts
export const cacheService = {
  get: async (key: string) => { /* ... */ },
  set: async (key: string, value: any) => { /* ... */ },
  remove: async (key: string) => { /* ... */ },
  clear: async () => { /* ... */ }
};
```

#### 3. **Component Composition**
Small and focused components that compose to form screens:

```typescript
<HomeHeader
  title="What do you want to watch?"
  popularMovies={popularMovies}
  tabs={TABS}
  selectedTab={selectedTab}
  onSelectTab={setSelectedTab}
/>
```

#### 4. **Separation of Concerns**
- **Containers**: Business logic and state
- **Components**: Pure and presentational UI
- **Hooks**: Reusable logic
- **Services**: Data operations
- **Styles**: Isolated styles

### Cache System

The project implements a robust cache system for offline support:

```typescript
// Strategy: Cache-first with network fallback
const getData = async () => {
  if (!isOnline) {
    // If no connection, use cache
    const cached = await cacheService.get(key);
    if (cached) return cached;
  }

  try {
    // Try network fetch
    const response = await api.get(endpoint);
    // Save to cache for later use
    await cacheService.set(key, response.data);
    return response.data;
  } catch (error) {
    // If network fails, use cache as fallback
    const cached = await cacheService.get(key);
    if (cached) return cached;
    throw error;
  }
};
```

## 🛠️ Technologies and Libraries

### Core
- **React Native 0.84.1** - Mobile development framework
- **TypeScript 5.8.3** - JavaScript superset with static typing
- **React 19.2.3** - UI library

### Navigation
- **@react-navigation/native 7.2.0** - Main navigation
- **@react-navigation/native-stack 7.14.8** - Stack navigator
- **@react-navigation/bottom-tabs 7.15.7** - Tab navigator

### State and Data
- **Axios 1.13.6** - HTTP client
- **@react-native-async-storage/async-storage 3.0.1** - Local persistence
- **@react-native-community/netinfo 12.0.1** - Connectivity status

### UI
- **react-native-svg 15.15.4** - Vector icons
- **react-native-linear-gradient 2.8.3** - Gradients
- **react-native-fast-image 8.6.3** - Image optimization
- **react-native-safe-area-context 5.7.0** - Safe area handling

### Testing
- **Jest 29.6.3** - Testing framework
- **@testing-library/react-native 13.3.3** - Testing utilities
- **@testing-library/react-hooks 8.0.1** - Hook testing

### Development
- **ESLint 8.19.0** - Linter
- **Prettier 2.8.8** - Code formatter
- **react-native-dotenv 3.4.11** - Environment variables

## 🎨 Design System

### Color Palette

The project uses a centralized color system in `src/theme/colors.ts`:

```typescript
export const colors = {
  background: {
    primary: '#242A32',
    secondary: '#67686D',
    tertiary: '#0296E5',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#92929D',
    inactive: '#67686D',
  },
  accent: {
    primary: '#0296E5',
    rating: '#FF8700',
  },
  // ...
};
```

### Reusable Components

- **SvgIcon**: SVG icon system with centralized paths
- **CachedImage**: Image wrapper with automatic cache
- **Loading**: Consistent loading indicator
- **SearchBar**: Search bar with debounce
- **OfflineIndicator**: Offline status banner

## 🔑 Environment Variables

Create a `.env` file in the root:

```env
# TMDB API
TMDB_API_KEY=your_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
```

Variables are typed in `src/types/env.d.ts` and accessed via:

```typescript
import { TMDB_API_KEY, TMDB_BASE_URL } from '@/config/env';
```

## 📊 TMDB API

### Used Endpoints

```typescript
// Popular movies
GET /movie/popular

// Now playing movies
GET /movie/now_playing?page={page}

// Upcoming releases
GET /movie/upcoming?page={page}

// Top rated
GET /movie/top_rated?page={page}

// Movie details
GET /movie/{movie_id}

// Videos/Trailers
GET /movie/{movie_id}/videos

// Search
GET /search/movie?query={query}&page={page}
```

### Authentication

```typescript
// Axios configuration with API key
const axiosInstance = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});
```

## 🔄 Data Flow

### Data Loading Flow with Cache

```
┌─────────────┐
│   Screen    │
└──────┬──────┘
       │
       │ uses hook
       ▼
┌─────────────┐
│    Hook     │
└──────┬──────┘
       │
       │ checks connectivity
       ▼
    Online?
       │
   ┌───┴───┐
   │       │
  Yes     No
   │       │
   │       └────► Cache Service ────► AsyncStorage
   │                                        │
   │ ◄──────────────────────────────────────┘
   │ (fallback if error)
   │
   │ makes request
   ▼
API Service ────► Axios ────► TMDB API
   │
   │ saves to cache
   ▼
Cache Service ────► AsyncStorage
   │
   │ returns data
   ▼
Hook updates state
   │
   ▼
Screen renders
```

## 🐛 Troubleshooting

### Error: Unable to resolve module

```bash
# Clear Metro cache
npm start -- --reset-cache
```

### Error: CocoaPods not installed

```bash
# Install CocoaPods
sudo gem install cocoapods
```

### Error: Invalid API key

Verify that the `.env` file is in the root and contains:
```env
TMDB_API_KEY=your_actual_key_here
```

### Error: No connection

If "No Internet Connection" banner appears persistently:
- Verify that simulator/device has connection
- For Android emulator, connection must be active on host machine

## 📈 Next Steps

See [README.md](./README.md) section 3 for:
- Pending animations
- Greater test coverage
- Optional adjustments to 6-movie requirement
- Recommended improvements

## 📄 License

This project was developed as part of a technical challenge.

## 👨‍💻 Author

Developed following React Native best practices, SOLID principles, and clean code.
