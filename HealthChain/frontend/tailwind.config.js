/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        // Legacy alias retained for backwards compatibility in existing classes.
        hc: {
          50: '#fff5f5',
          100: '#ffe3e3',
          200: '#ffb8b8',
          400: '#f43f5e',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },

        // Calm neutral foundation for clinical SaaS surfaces.
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
        },

        // Primary red accent scale (CTAs, active states, alerts).
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },

        // Status colors for clinical feedback.
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          700: '#047857',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          700: '#b45309',
        },

        // AI risk-band mapping.
        risk: {
          low: '#059669',
          medium: '#d97706',
          high: '#dc2626',
        },

        // Text contrast levels (trusted readability hierarchy).
        text: {
          strong: '#0f172a',
          default: '#1f2937',
          muted: '#6b7280',
          subtle: '#94a3b8',
          inverse: '#ffffff',
        },
      },
      blur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
