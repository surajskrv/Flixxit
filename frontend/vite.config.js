import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "https://flixxit-00r6.onrender.com",
			},
		},
	},
});
