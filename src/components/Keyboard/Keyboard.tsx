import React from 'react'
import { Container } from '@mui/material'
import { Box } from '@mui/system'
import * as S from './styles'
import { BackspaceIcon } from 'src/assets'
import { useGame } from 'src/context'

const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
const midRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
const lastRow = ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm']

const Keyboard: React.FC = () => {
  const { screenKeyboardClick } = useGame()

  return (
    <Box height="200px" flexShrink={0} sx={{ userSelect: 'none' }}>
      <Container sx={{ p: '0 8px', maxWidth: '500px' }} maxWidth={false} disableGutters>
        <S.row>
          {firstRow.map((letter) => (
            <S.Key key={letter} onClick={() => screenKeyboardClick(letter)}>
              {letter}
            </S.Key>
          ))}
        </S.row>
        <S.row>
          <S.HalfSpace />
          {midRow.map((letter) => (
            <S.Key sx={letter === 'l' ? { mr: 0 } : undefined} key={letter} onClick={() => screenKeyboardClick(letter)}>
              {letter}
            </S.Key>
          ))}
          <S.HalfSpace />
        </S.row>
        <S.row>
          {lastRow.map((letter, i) => (
            <S.Key className={!i ? 'one-and-a-half' : undefined} key={i} onClick={() => screenKeyboardClick(letter)}>
              {letter}
            </S.Key>
          ))}
          <S.Key className="one-and-a-half" onClick={() => screenKeyboardClick('backspace')}>
            <BackspaceIcon />
          </S.Key>
        </S.row>
      </Container>
    </Box>
  )
}

export default Keyboard
