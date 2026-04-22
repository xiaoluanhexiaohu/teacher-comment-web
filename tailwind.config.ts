import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#3b82f6',
        background: '#f8fafc',
        foreground: '#0f172a',
        primary: '#2563eb',
        secondary: '#f1f5f9',
        muted: '#64748b',
        card: '#ffffff'
      }
    }
  },
  plugins: []
} satisfies Config;
