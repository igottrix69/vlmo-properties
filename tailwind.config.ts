import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0f2a56',
          navyDark: '#091b3a',
          gold: '#d4a434',
          goldDark: '#b78a22',
          green: '#2a8f4e',
          cream: '#f7f5f0',
        },
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
