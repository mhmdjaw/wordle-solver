import React from 'react'
import { Container, Toolbar, Typography, useTheme } from '@mui/material'
import { HelpOutline, Replay, Brightness4, Brightness7 } from '@mui/icons-material'
import { useColorMode, useGame } from 'src/context'
import * as S from './styles'
import Guide from '../Guide'

const Header: React.FC = () => {
  const { resetGame } = useGame()
  const { toggleColorMode } = useColorMode()
  const theme = useTheme()

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <S.OuterContainer>
        <Container sx={{ p: 0, maxWidth: '500px' }} maxWidth={false} disableGutters>
          <Toolbar variant="dense" sx={{ alignItems: 'center', p: '0 16px' }} disableGutters>
            <S.StyledLink color="inherit" flex={0.2} onClick={handleClickOpen}>
              <HelpOutline />
            </S.StyledLink>
            <Typography variant="h5" fontWeight={700} textAlign="center" flex={1}>
              Wordle Solver
            </Typography>
            <S.StyledLink color="inherit" onClick={resetGame}>
              <Replay />
            </S.StyledLink>
            <S.StyledLink color="inherit" marginLeft="6px" onClick={toggleColorMode}>
              {theme.palette.mode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </S.StyledLink>
          </Toolbar>
        </Container>
      </S.OuterContainer>
      <Guide dialog={{ open, setOpen }} />
    </>
  )
}

export default Header
