module.exports = {
  content: [
    './client/**/*.{js,jsx,ts,tsx}',
    './client/**/*.{html,js}'
  ],
  theme: {
    extend: {},
    width: {
      card: '47.5%',
      '4/5': '80%'
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: 'lofi'
  }
};
