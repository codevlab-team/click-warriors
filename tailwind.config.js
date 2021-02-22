module.exports = {
  purge: {
    enabled: false,
    content: ['./src/**/*.{html,scss,ts}']
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      'display': ['Luckiest Guy', 'cursive'],
      'body': ['Montserrat', 'sans-serif'],
     },
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {},
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
