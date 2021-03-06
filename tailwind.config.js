module.exports = {
  content: [
    './client/**/*.{js,jsx,ts,tsx}',
    './client/**/*.{html,js}'
  ],
  theme: {
    extend: {
      width: {
        card: '47.5%',
        '19/20': '95%',
        '9/10': '90%'
      },
      maxWidth: {
        custom: '25%'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: false
  }
};
