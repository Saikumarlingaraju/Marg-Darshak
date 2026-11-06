import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors - EXACT from Figma
        primary: {
          DEFAULT: '#17293d',
          dark: '#0f1c2e',
          light: '#1e3a5f',
        },
        success: {
          DEFAULT: '#16856b',
          bg: '#e7f5ef',
          text: '#16856b',
        },
        info: {
          DEFAULT: '#246beb',
          bg: '#eaf0f2',
          text: '#246beb',
        },
        warning: {
          DEFAULT: '#d68b17',
          bg: '#fff4dc',
          text: '#d68b17',
        },
        error: {
          DEFAULT: '#d94e50',
          bg: '#fdebec',
          text: '#d94e50',
        },
        // Neutral grays - EXACT from Figma
        neutral: {
          50: '#f3f6f9',
          100: '#eaf0f2',
          200: '#dde5ed',
          300: '#c8d4dd',
          400: '#94a5b6',
          500: '#82959f',
          600: '#67788b',
          700: '#4a5d6e',
          800: '#2d3e4f',
          900: '#17293d',
        },
        // Chart colors - EXACT from Figma issue distribution
        chart: {
          series1: '#246beb',
          series2: '#4984d2',
          series3: '#659dba',
          series4: '#7eb2c2',
          series5: '#a1c4cd',
          area1: 'rgba(73, 132, 210, 0.15)',
          grid: '#dde5ed',
        },
        overlay: {
          white75: 'rgba(255, 255, 255, 0.75)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['27px', { lineHeight: '1', letterSpacing: '-0.8px', fontWeight: '400' }],
        'heading-lg': ['29px', { lineHeight: '1', letterSpacing: '-1px', fontWeight: '600' }],
        'heading-md': ['24px', { lineHeight: '1', fontWeight: '700' }],
        'heading-sm': ['15px', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-base': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['11px', { lineHeight: '1', fontWeight: '400' }],
        'body-xs': ['10px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['9px', { lineHeight: '1', letterSpacing: '1px', fontWeight: '400', textTransform: 'uppercase' }],
        'caption-xs': ['8px', { lineHeight: '1', fontWeight: '400' }],
        'table-header': ['9px', { lineHeight: '1', letterSpacing: '0.7px', fontWeight: '400', textTransform: 'uppercase' }],
        'metric-value': ['29px', { lineHeight: '1', letterSpacing: '-1px', fontWeight: '600' }],
        'metric-trend': ['10px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        'header-h': '70px',
        'content-pad-x': '28px',
        'content-pad-y': '25px',
        'content-pad-y-b': '24px',
        'card-pad': '20px',
        'card-pad-lg': '21px',
        'panel-pad': '18px',
        'gap-section': '20px',
        'gap-card': '16px',
        'gap-metric': '8px',
        'gap-inline-sm': '6px',
        'gap-inline': '10px',
        'gap-inline-lg': '22px',
      },
      borderRadius: {
        'xs': '3px',
        'sm': '4px',
        'md': '5px',
        'lg': '6px',
        'xl': '10px',
        '2xl': '22px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
        'panel': '0 2px 8px rgba(0,0,0,0.06)',
        'dropdown': '0 4px 16px rgba(0,0,0,0.08)',
        'map-control': '0 2px 8px rgba(0,0,0,0.1)',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'dashboard-sm': '1100px',
        'dashboard-lg': '1440px',
      },
    },
  },
  plugins: [],
};

export default config;