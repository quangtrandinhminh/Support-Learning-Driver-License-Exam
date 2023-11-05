module.exports = {
  prefix: 'tw-',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'red' : '#ff0000',
    },
  },
  plugins: [],
  corePlugins: {
    // Disable or rename conflicting classes
    container: false,
  }
}