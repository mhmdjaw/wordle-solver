import React from 'react'
import { CssBaseline } from '@mui/material'
import { ProvideColorMode, ProvideGame } from 'src/context'
import Board from '../Board'
import Header from '../Header'
import Keyboard from '../Keyboard'

const App: React.FC = () => {
  return (
    <ProvideColorMode>
      <ProvideGame>
        <CssBaseline />
        <Header />
        <Board />
        <Keyboard />
      </ProvideGame>
    </ProvideColorMode>
  )
}

export default App
