module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html, ts}",
  "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      animation: {
        'spin': 'spin .4s linear infinite',
        'pulse': 'pulse .9s linear infinite',
        'ping': 'ping .5s linear',

      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
 };
