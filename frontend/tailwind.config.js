/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          500: '#102a43',
          900: '#0b1320',
        },
        accent: {
          blue: '#2563eb',
          cyan: '#06b6d4',
          amber: '#f59e0b',
        }
      },
    },
  },
  plugins: [],
}
