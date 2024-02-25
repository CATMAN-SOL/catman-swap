import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#030303',
          yellow: '#E1D33E',
        },
        navlinks: {
          hover: '#E1D33E',
        },
        primary: {
          default: '#E1D33E',
          DEFAULT: '#E1D33E',
        },
        'theme-yellow': {
          2: '#E1A712',
        },
        'theme-white': {
          1: '#E2E4E9',
          2: '#A3A5B6',
        },
        'theme-green': '#74D172',
        'theme-red': '#D17272',
        'theme-dark-gray': {
          1: '#030303',
          2: '#090A0B',
          3: '#16191D',
          4: '#21262C',
          5: '#2D353F',
        },
      },
      fontFamily: {
        primary: ['Urbanist', 'system-ui', 'sans-serif', 'serif'],
        secondary: ['Poppins', 'system-ui', 'sans-serif', 'serif'],
        dmSans: ['DM Sans', 'system-ui', 'sans-serif', 'serif'],
        inter: ['Inter', 'system-ui', 'sans-serif', 'serif'],
      },
      height: {
        header: '100px',
      },
      backgroundImage: {
        'header-gradient':
          'linear-gradient(90deg, #0D0F12 -10.89%, rgba(13, 15, 18, 0.53) 179.28%)',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      const colorsValues = flattenObject(theme('colors'))

      matchUtilities(
        {
          'icon-fill': (value) => ({
            '--iconColor': value.DEFAULT ?? value,
          }),
        },
        {
          values: colorsValues,
        }
      )
    }),
  ],
}

// (C) ChatGPT 4
function flattenObject(obj, parentKey = '', result = {}) {
  for (const key in obj) {
    // Check if the property is an own property of the object
    const newKey = parentKey ? `${parentKey}-${key}` : key

    // Check if the property is an object itself and is not null
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenObject(obj[key], newKey, result)
    } else {
      result[newKey] = obj[key]
    }
  }
  return result
}
