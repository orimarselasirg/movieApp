# Movie App - Technical Answers

## 1. What does the single responsibility principle consist of? What's its purpose?


The **Single Responsibility Principle** from SOLID principles, ensures that a class or function is focused on doing only one thing. This allows us to modularize functionality and assign clear, unique responsibilities, which over time helps us identify well-defined behaviors within classes across the project.

An example of the Single Responsibility Principle would be creating a class dedicated solely to handling phone calls. This class would contain methods aligned with that single responsibility, such as making a call, leaving a message, answering, and hanging up.

---

## 2. What characteristics, in your opinion, does "good" code or clean code have?

**Clean code** is code that is easy to read, understand, maintain, and extend. The main characteristics are:

### Readability and Clarity
- Descriptive and meaningful names for variables, functions, and components
- Self-explanatory code that minimizes the need for comments
- Logical structure and clear control flow


### Modularity and Organization
- Clear separation of responsibilities (SRP)
- Logical and consistent folder structure
- Small and focused components

### DRY (Don't Repeat Yourself)
- No code duplication
- Reusability through components, hooks, and utility functions
- Extraction of common logic


### Strong Typing (TypeScript)
- Use of explicit types and interfaces
- Avoid `any` in favor of specific types
- Type safety that prevents runtime errors


### Testability
- Code easy to test with unit tests
- Business logic separated from UI
- Injectable or mockable dependencies

### Consistency
- Uniform code style (ESLint, Prettier)
- Consistent design patterns throughout the application
- Coherent naming conventions

### Performance and Optimization
- Appropriate use of `useMemo`, `useCallback`, `React.memo`
- Lazy loading when necessary
- Cache to reduce network calls


### Meaningful Documentation and Comments
- Comments only when code cannot be self-explanatory
- Documentation for complex functions or important business logic
- Clear README with setup and usage instructions

### Maintainability
- Easy to modify without breaking other parts
- Low coupling between modules
- High cohesion within each module

---

## 3. Detail how you would do everything that you have not completed

### Current State Analysis:

The project has approximately **90-95%** of the functional requirements implemented. What's **complete**:

TypeScript/React Native
-TMDB API consumption
-Popular category with horizontal scroll
-Three categories (Now Playing, Upcoming, Top Rated)
-Watch list persisted locally
-Navigation to details
-Option to view trailers
-Search by name
-Watch list screen
-Offline support with cache
-Unit tests
-Good practices and scalable architecture

### What's missing or needs adjustments:

---

### 1. Animations and Transitions

**Status:** Not implemented

**What's missing?**
- Navigation animations between screens
- Smooth transitions when showing/hiding elements
- Scroll and gesture animations
- Animated visual feedback (buttons, favorites)

**How would I complete it?**

**Install React Native Reanimated**

**Implementation of key animations**

**Animation when adding to favorites**

**Shared Element Transitions (image transition between screens)**

**Fade in when loading movies**

**Parallax scroll in Hero**


---

### 2. Greater Test Coverage

**Status:** Partially completed

**What's tested?**
- Hooks: `useFavorites`, `useNetworkStatus`, `useMovieDetail`, `useSearch`, `useWatchList`
- Services: `cache.service`, `favorites.service`

**What's missing?**
- UI component tests
- Integration tests
- Navigation tests
- E2E tests (optional)

**How would I complete it?**

**UI Component Tests**

**Integration Tests**

**E2E Tests with Detox (optional):**

