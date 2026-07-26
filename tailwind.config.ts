import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        heart: {
          ink: "#140d16",
          ember: "#9f2d20",
          bone: "#efe6d3",
          brass: "#b98f40"
        }
      }
    }
  },
  plugins: []
};

export default config;
