/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark minimalist color palette
        primary: {
          50: '#f5f5f6',
          100: '#e6e6e8',
          200: '#cfcfd3',
          300: '#adaeb4',
          400: '#84858e',
          500: '#6a6b73',
          600: '#5a5b61',
          700: '#4d4e52',
          800: '#414a4c',
          900: '#3b444b',
        },
        dark: {
          50: '#6b7071',
          100: '#5a5e5f',
          200: '#4a4d4e',
          300: '#414a4c',
          400: '#3b444b',
          500: '#353839',
          600: '#2f3233',
          700: '#232b2b',
          800: '#1a1f1f',
          900: '#0e1111',
        },
        accent: {
          500: '#6366f1',
          600: '#4f46e5',
        },
        success: {
          500: '#22C55E',
          600: '#16a34a',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
        background: {
          light: '#f8f9fa',
          dark: '#0e1111',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#232b2b',
        },
        border: {
          light: '#e5e7eb',
          dark: '#353839',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.12)',
        'dark': '0 4px 16px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        'card': '12px',
      }
    },
  },
  plugins: [],
}
