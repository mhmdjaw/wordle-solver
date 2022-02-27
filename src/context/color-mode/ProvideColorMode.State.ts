import { useMemo, useState } from 'react'
import { createTheme, responsiveFontSizes } from '@mui/material'
import getDesignTokens from 'src/themes'

export interface ColorModeContext {
  toggleColorMode: () => void
}

type Mode = 'light' | 'dark'

const useProvideColorMode = () => {
  const [mode, setMode] = useState<Mode>((localStorage.getItem('mode') as Mode) || 'dark')

  const toggleColorMode = () => {
    setMode((prevMode) => {
      if (prevMode === 'light') {
        localStorage.setItem('mode', 'dark')
        return 'dark'
      } else {
        localStorage.setItem('mode', 'light')
        return 'light'
      }
    })
  }

  const theme = useMemo(() => responsiveFontSizes(createTheme(getDesignTokens(mode))), [mode])

  return { toggleColorMode, theme }
}

export default useProvideColorMode
