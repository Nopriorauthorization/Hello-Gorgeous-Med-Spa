/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E63E7A',
          50: '#FFEAF3',
          100: '#FFD5E8',
          200: '#FF8FBB',
          300: '#FF6F9F',
          400: '#E63E7A',
          500: '#C01E64',
          600: '#9A154F',
          700: '#73103A',
          800: '#4C0A25',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        },
        accent: {
          teal: '#0EA5A4',
          gold: '#D4AF37'
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      spacing: {
        '9': '2.25rem',
        '72': '18rem'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
