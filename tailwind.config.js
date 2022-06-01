module.exports = {
  content: [
    './client/**/*.{js,jsx,ts,tsx}',
    './client/**/*.{html,js}'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: 'lofi'
  }
};
