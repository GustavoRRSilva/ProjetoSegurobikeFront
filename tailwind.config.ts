import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#272727",
        foreground: "#008080",
        button:"#000080"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Define Poppins como uma família de fontes
      },
    },
  },
  plugins: [],
};
export default config;
