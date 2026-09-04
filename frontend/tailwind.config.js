/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F8F1E5',
          300: '#EFE2CC',
          400: '#E5D3B3',
        },
        beige: {
          DEFAULT: '#EFE2CC',
          light: '#F8F1E5',
          dark: '#DEC7A5',
        },
        caramel: {
          light: '#E6BD7B',
          DEFAULT: '#D6A85F',
          dark: '#B8873E',
        },
        coffee: {
          light: '#B5825C',
          DEFAULT: '#9A6A45',
          dark: '#7A4F30',
        },
        espresso: {
          light: '#5A4030',
          DEFAULT: '#3D281D',
          dark: '#26170F',
          deep: '#1A0E08',
        },
        ocean: {
          light: '#A3BDCB',
          DEFAULT: '#7897A5',
          dark: '#4F6F80',
          deep: '#2F4D5E',
        },
        seafoam: {
          light: '#B7D9C9',
          DEFAULT: '#88B8A1',
          dark: '#5B8C75',
        },
        gold: {
          300: '#F0D18A',
          400: '#E5BF65',
          500: '#D6A85F',
          600: '#B8873E',
          700: '#946526',
        },
      },
      fontFamily: {
        pirate: ['"Cinzel Decorative"', 'serif'],
        display: ['"Cinzel"', 'serif'],
        body: ['"Raleway"', 'sans-serif'],
        accent: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'warm-radial': 'radial-gradient(ellipse at center, rgba(239, 226, 204, 0.45) 0%, rgba(248, 241, 229, 0) 70%)',
        'wood-light': 'linear-gradient(135deg, #F8F1E5 0%, #EFE2CC 100%)',
        'caramel-gradient': 'linear-gradient(135deg, #E6BD7B 0%, #D6A85F 50%, #B8873E 100%)',
        'espresso-gradient': 'linear-gradient(135deg, #5A4030 0%, #3D281D 50%, #26170F 100%)',
        'card-cream': 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 241, 229, 0.95) 100%)',
        'card-dark-coffee': 'linear-gradient(135deg, rgba(61, 40, 29, 0.95) 0%, rgba(38, 23, 15, 0.98) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'steam': 'steam 8s ease-in-out infinite',
        'gentle-wave': 'gentleWave 12s ease-in-out infinite alternate',
        'shimmer-warm': 'shimmerWarm 3s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0' },
          '25%': { opacity: '0.45', transform: 'translateY(-15px) scaleX(1.15) rotate(2deg)' },
          '60%': { opacity: '0.25', transform: 'translateY(-35px) scaleX(1.3) rotate(-2deg)' },
          '100%': { transform: 'translateY(-55px) scaleX(1.5)', opacity: '0' },
        },
        gentleWave: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(-2%) translateY(-4px)' },
          '100%': { transform: 'translateX(2%) translateY(2px)' },
        },
        shimmerWarm: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(61, 40, 29, 0.06)',
        'warm': '0 8px 24px rgba(61, 40, 29, 0.08), 0 2px 6px rgba(214, 168, 95, 0.08)',
        'warm-lg': '0 16px 40px rgba(61, 40, 29, 0.12), 0 4px 12px rgba(214, 168, 95, 0.12)',
        'warm-hover': '0 20px 48px rgba(90, 64, 48, 0.16), 0 6px 16px rgba(214, 168, 95, 0.2)',
        'caramel-glow': '0 0 25px rgba(214, 168, 95, 0.35)',
        'dark-card': '0 12px 36px rgba(26, 14, 8, 0.35)',
      },
    },
  },
  plugins: [],
}
