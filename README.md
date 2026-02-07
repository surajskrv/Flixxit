# Flixxit - Midnight Minimal 🎬

<div align="center">


A unique, **MERN Stack** OTT streaming platform designed with a focus on minimalism, performance, and cinematic immersion.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![State](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

</div>

## ✨ Features

### "Midnight Minimal" Design 🌙
A custom design language featuring:
-   **Slate-900** dark theme for better eye comfort.
-   **Friendly Blue** (#3b82f6) accents for a trustworthy feel.
-   **Glassmorphism** for modern, sleek UI elements.

### Cinematic Experience 🍿
-   **Floating Navbar**: Smoothly hides on scroll to maximize screen real estate.
-   **Immersive Watch Page**: YouTube-style layout with a distraction-free 16:9 player and smart recommendations.
-   **Dynamic Hero**: "Feature Card" hero layout with ambient glow effects.

### Smart Interactivity ⚡
-   **Instant Search**: Search for movies, TV shows, and people in one unified interface.
-   **Responsive Grids**: Masonry-style layouts that adapt from mobile (2 cols) to desktop (5 cols).
-   **Avatar System**: Users can customize their profile with curated avatars.

## 🛠️ Tech Stack & Architecture

For a detailed breakdown of the architecture, tech stack, and security measures, please read the **[Project Overview](Project-Overview.md)**.

### **Frontend**
-   **Framework**: [React](https://reactjs.org/) (Create React App / Vite)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Design System
-   **State**: [Zustand](https://github.com/pmndrs/zustand)
-   **Routing**: [React Router v6](https://reactrouter.com/)
-   **Motion**: [Framer Motion](https://www.framer.com/motion/)

### **Backend**
-   **Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
-   **Auth**: [JWT](https://jwt.io/) (HttpOnly Cookie) + [Bcrypt](https://www.npmjs.com/package/bcryptjs)
-   **API**: RESTful API acting as a proxy to TMDB.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
-   Node.js (v18+)
-   npm or yarn
-   MongoDB (Local or Atlas URI)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/flixxit.git
    cd flixxit
    ```

2.  **Install dependencies**
    ```bash
    # Install backend dependencies
    npm install

    # Install frontend dependencies
    cd frontend
    npm install
    cd ..
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    JWT_SECRET=your_jwt_secret_key
    NODE_ENV=development
    TMDB_API_KEY=your_tmdb_api_key
    ```
    *(Note: You can get a free API key from [The Movie Database](https://www.themoviedb.org/).)*

4.  **Run the Application**
    ```bash
    # Run both frontend and backend concurrently
    npm run dev
    
    # Or run backend only
    npm run start
    ```

The app should now be running at `http://localhost:5000`.

## 🔒 Security

We take security seriously. Key measures include:
-   **Password Hashing**: All passwords are hashed with bcrypt before storage.
-   **HttpOnly Cookies**: JWTs are stored in HttpOnly cookies to prevent XSS.
-   **Route Protection**: Middleware ensures unauthorized users cannot access private routes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
<div align="center">
  <sub>Built with ❤️ by the Flixxit Team</sub>
</div>
