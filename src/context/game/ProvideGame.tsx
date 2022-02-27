import { Snackbar } from '@mui/material'
import React, { createContext, useContext } from 'react'
import useProvideGame, { GameContext } from './ProvideGame.State'

interface ProvideGameProps {
  children: React.ReactNode
}

const gameContext = createContext<GameContext | null>(null)

export const ProvideGame: React.FC<ProvideGameProps> = ({ children }: ProvideGameProps) => {
  const { snackbar, closeSnackbar, ...game } = useProvideGame()

  return (
    <gameContext.Provider value={game}>
      <>
        {children}
        <Snackbar
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          sx={{ bottom: '50% !important' }}
          open={snackbar.open}
          autoHideDuration={1500}
          message={<b>{snackbar.text}</b>}
          onClose={closeSnackbar}
          ClickAwayListenerProps={{
            onClickAway: () => {
              // nothing
            }
          }}
        />
      </>
    </gameContext.Provider>
  )
}

export const useGame = (): GameContext => {
  const context = useContext(gameContext) as GameContext
  if (!context) {
    throw new Error('useGame must be used within a GameContext')
  }
  return context
}
