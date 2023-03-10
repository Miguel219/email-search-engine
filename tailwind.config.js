const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['BrandonText', 'sans-serif']
      },
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.5xl') },
        'h2': { fontSize: theme('fontSize.4xl') },
        'h3': { fontSize: theme('fontSize.3xl') },
        'h4': { fontSize: theme('fontSize.2xl') },
        'h5': { fontSize: theme('fontSize.xl') },
        'h6': { fontSize: theme('fontSize.lg') },
      })
    })
  ],
}
