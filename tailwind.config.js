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
        // Die Variablen setzt app/layout.tsx über next/font. Im Pages-Router
        // (Blog) existieren sie nicht, deshalb jeweils mit Fallback im var().
        sans: ['var(--font-plex-sans, ui-sans-serif)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono, ui-monospace)', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        // Farbwelt der Startseite: fast schwarz, warmes Weiß, genau ein Akzent
        canvas: '#0a0a0a',
        surface: '#111111',
        fg: '#ecebe8',
        muted: '#8e8d89',
        // hell genug für 4,5:1 Kontrast auf dem Hintergrund (WCAG AA)
        faint: '#83827d',
        line: '#1f1f1f',
        accent: {
          DEFAULT: '#ff6a2b',
          strong: '#ff8a55',
        },
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
        'rise': 'rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'glow': 'glow 7s ease-in-out infinite',
        'toast': 'toast 1.8s ease-out both',
        'marquee': 'marquee var(--marquee-duration, 60s) linear infinite',
        'swing': 'swing 4.5s ease-in-out infinite',
        'draw': 'draw 1.1s cubic-bezier(0.65, 0, 0.35, 1) both',
        'fade': 'fade 0.6s ease-out both',
        'pulse-ring': 'pulse-ring 2.2s ease-out infinite',
      },
      keyframes: {
        'draw': {
          from: { strokeDashoffset: '1' },
          to: { strokeDashoffset: '0' },
        },
        'fade': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.4)', opacity: '0.55' },
          '80%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'swing': {
          '0%, 100%': { transform: 'rotate(-3.5deg)' },
          '50%': { transform: 'rotate(3.5deg)' },
        },
        'rise': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'toast': {
          '0%': { opacity: '0', transform: 'translate(-50%, 6px)' },
          '12%, 75%': { opacity: '1', transform: 'translate(-50%, 0)' },
          '100%': { opacity: '0', transform: 'translate(-50%, -4px)' },
        },
        'glow': {
          '0%, 100%': { opacity: '0.75', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
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
