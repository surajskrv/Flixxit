/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
                colors: {
                    // "Friendly Minimal" Palette
                    surface: {
                        DEFAULT: "#0f172a", // Slate 900 (Rich Dark Blue-Grey)
                        hover: "#1e293b",   // Slate 800
                        active: "#334155",  // Slate 700
                        card: "#020617",    // Slate 950 (Deepest background)
                    },
                    accent: {
                        DEFAULT: "#3b82f6", // Blue 500 (Friendly, Trustworthy)
                        hover: "#2563eb",   // Blue 600
                        teal: "#10b981",    // Emerald 500 (Success/Secondary)
                    },
                    text: {
                        primary: "#ffffff",   // Pure White
                        secondary: "#94a3b8", // Slate 400 (Reader friendly)
                        muted: "#64748b",     // Slate 500
                    }
                },
            fontFamily: {
                display: ["Manrope", "sans-serif"],
                body: ["Inter", "sans-serif"],
            },
            borderRadius: {
                '4xl': '2rem',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-gradient': 'linear-gradient(to bottom, rgba(9,9,11,0) 0%, rgba(9,9,11,1) 100%)',
            },
            animation: {
                "slide-up": "slideUp 0.5s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
        },
	},
	plugins: [require("tailwind-scrollbar-hide")],
};