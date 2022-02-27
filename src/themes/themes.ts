import { PaletteMode } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: '#538d4e'
    },
    secondary: {
      main: '#b59f3b'
    }
  },
  shape: {
    borderRadius: 6
  },
  typography: {
    button: {
      fontWeight: 600
    },
    fontFamily: '"Montserrat", sans-serif'
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%'
        },
        body: {
          height: '100%',
          '& > #root': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }
        },
        a: {
          WebkitTapHighlightColor: 'rgba(0,0,0,0.3)'
        },
        div: {
          WebkitTapHighlightColor: 'rgba(0,0,0,0.3)'
        }
      }
    }
  }
})

export default getDesignTokens
