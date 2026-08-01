/** @type {import('tailwindcss').Config} */
module.exports = {
  // next-themes nutzt attribute="class" → dark: Varianten müssen über die Klasse greifen
  darkMode: 'class',
  content: [
    // Bewusst das gesamte src/ — Klassennamen stehen nicht nur in Komponenten,
    // sondern auch in Datendateien wie src/data/career.ts.
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'scan-x': 'scan-x 8s linear infinite',
        'scan-x-reverse': 'scan-x 8s linear infinite reverse',
        'scan-y': 'scan-y 8s linear infinite',
        'scan-y-reverse': 'scan-y 8s linear infinite reverse',
        'scroll': 'scroll 40s linear infinite',
        'meteor-effect': 'meteor 5s linear infinite',
        'float': 'float 20s linear infinite',
        'matrix': 'matrix 20s linear infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'status-pulse': 'status-pulse 2s ease-in-out infinite',
        'infinite-scroll': 'infinite-scroll var(--animation-duration) linear infinite',
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'scan-x': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'scan-y': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
          '70%': { opacity: 1 },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: 0,
          },
        },
        'float': {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-200px) translateX(200px)' },
          '100%': { transform: 'translateY(0) translateX(0)' },
        },
        'matrix': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'status-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'infinite-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: 'inherit',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
