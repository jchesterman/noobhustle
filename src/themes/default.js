const {createMuiTheme} = require('@material-ui/core/styles');

module.exports = createMuiTheme({
  typography: {
    useNextVariants: true,
    h1: {
      fontSize: '3rem',
      fontWeight: '400'
    },
    h2: {
      fontFamily: '"Roboto Slab", serif',
      fontWeight: 400
    },
    h3: {
      fontSize: '4rem'
    },
    h4: {
      fontFamily: '"Roboto Slab", serif'
    },
    h6: {
      fontWeight: '400'
    }
  },
  palette: {
    primary: {
      light: '#e53a35',
      main: '#d32f2f'
    },
    secondary: {
      main: '#eeeeee'
    }
  },
  status: {
    success: 'green',
    danger: 'orange'
  }
});
