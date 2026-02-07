# Flixxit - Project Overview

## 1. Introduction
Flixxit is a full-stack premium OTT (Over-The-Top) streaming platform designed to provide an immersive entertainment experience similar to industry leaders like Netflix and Amazon Prime. It introduces a unique "Midnight Minimal" design language and is built using the MERN stack (MongoDB, Express.js, React, Node.js) with a focus on performance, responsiveness, and a polished user interface.

## 2. Technology Stack

### Frontend
The frontend is built for speed and visual fidelity.
-   **Core**: [React](https://react.dev/) (v18) - Component-based UI library.
-   **Build Tool**: [Vite](https://vitejs.dev/) - fast build tool and dev server.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid custom designs.
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand) - Minimalist state management for auth and content stores.
-   **Routing**: [React Router](https://reactrouter.com/) (v6) - Client-side routing.
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) - Complex animations and layout transitions (e.g., Smart Navbar).
-   **Icons**: [Lucide React](https://lucide.dev/) - Consistent, clean SVG icons.
-   **Video Player**: `react-player` - Handles YouTube video playback.
-   **HTTP Client**: `axios` - Promise-based HTTP client for API requests.

### Backend
The backend provides a robust API for content and authentication.
-   **Runtime**: [Node.js](https://nodejs.org/) - JavaScript runtime environment.
-   **Framework**: [Express.js](https://expressjs.com/) (v5) - Web framework for handling routes and middleware.
-   **Database**: [MongoDB](https://www.mongodb.com/) - NoSQL database for flexible data storage.
-   **ODM**: [Mongoose](https://mongoosejs.com/) - Object Data Modeling library for MongoDB.
-   **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) - Stateless authentication mechanism.
-   **Environment**: `dotenv` - Environment variable management.

## 3. Architecture

### High-Level Overview
Flixxit follows a **Client-Server Architecture**.
1.  **Client (Frontend)**: A Single Page Application (SPA) served by Vite. It consumes the REST API provided by the backend.
2.  **Server (Backend)**: A RESTful API built with Express.js. It connects to MongoDB to persist user data (watch history, search history, profiles) and acts as a proxy to the **TMDB (The Movie Database) API** for movie/TV show metadata.

### Backend Structure (MVC Pattern)
The backend is organized using the **Model-View-Controller (MVC)** pattern (minus the View, as it's an API):
-   **Models** (`/models`): Define the schema for data (e.g., `User.js`).
-   **Controllers** (`/controllers`): Handle the business logic for each route (e.g., `auth.controller.js` handles login/signup).
-   **Routes** (`/routes`): Define the API endpoints and map them to controllers (e.g., `/api/v1/auth`).
-   **Services** (`/services`): Helper functions for external API calls (e.g., `tmdb.service.js`).
-   **Middleware** (`/middleware`): Interceptors for request processing (e.g., `protectRoute.js` for checking JWT).

### Data Flow
1.  User performs an action (e.g., Login).
2.  Frontend sends an HTTP request (`POST /api/v1/auth/login`) to the Backend.
3.  Express router directs the request to `auth.controller.js`.
4.  Controller validates input and interacts with the Database (MongoDB) via Mongoose.
5.  Controller sends a response (JSON + JWT Cookie) back to the Frontend.
6.  Frontend updates the Zustand state (`useAuthStore`) and UI.

## 4. Dependencies Analysis

| Package | Purpose | Why it was chosen |
| :--- | :--- | :--- |
| **bcryptjs** | Password Hashing | Native JS implementation of bcrypt. Essential for securely storing user passwords. |
| **jsonwebtoken** | Authentication | Industry standard for stateless authentication. Allows verifying users without checking the DB on every request. |
| **cookie-parser** | Cookie Handling | Parses `Cookie` header and populates `req.cookies`. Critical for reading the HTTP-only JWT cookie. |
| **axios** | API Requests | Cleaner syntax than `fetch`, automatic JSON transformation, and better error handling. |
| **dotenv** | Configuration | Loads environment variables from `.env` file, keeping secrets (API keys, DB URI) out of the codebase. |
| **framer-motion** | UI Animations | Provides declarative, physics-based animations (used for the floating navbar and page transitions). |
| **zustand** | State Management | Much simpler and less boilerplate than Redux. Perfect for managing global `user` and `content` state. |

## 5. Security Measures

### Authentication
-   **JWT (JSON Web Tokens)**: Used for maintaining user sessions.
-   **HttpOnly Cookies**: The JWT is stored in an `HttpOnly` cookie. This prevents **XSS (Cross-Site Scripting)** attacks because JavaScript running in the browser cannot read the cookie.
-   **Strict Mode**: Cookies are set with `SameSite=Strict` to prevent **CSRF (Cross-Site Request Forgery)** attacks.

### Data Protection
-   **Password Hashing**: Passwords are never stored in plain text. We use `bcryptjs` to hash passwords with a salt before saving to MongoDB.
-   **Route Protection**: The `protectRoute` middleware ensures that sensitive endpoints (e.g., `/api/v1/search`) can only be accessed by authenticated users with a valid token.

### API Security
-   **Environment Variables**: All sensitive keys (TMDB API Key, JWT Secret, Mongo URI) are stored in `.env` and never committed to version control.
-   **Proxying**: Clients do not call TMDB directly. The backend acts as a proxy, keeping the TMDB API key hidden from the frontend code.

## 6. Features & Highlights
-   **Midnight Minimal Design**: Custom dark theme with `Slate-900` backgrounds and friendly blue accents.
-   **Smart Navbar**: Floating navigation that hides on scroll to maximize viewing area.
-   **Responsive Layouts**: Grids that adapt from mobile (2 columns) to desktop (5 columns).
-   **Cinematic Watch Page**: YouTube-style 2-column layout with a distraction-free 16:9 player.
-   **Smart Search**: Unified search page for Movies, TV Shows, and People.
