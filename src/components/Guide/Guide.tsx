import React from 'react'
import { Close } from '@mui/icons-material'
import { Container, Link, Slide, Typography } from '@mui/material'
import * as S from './styles'
import { Letter } from '../Board/styles'
import { TransitionProps } from '@mui/material/transitions'

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
)

Transition.displayName = 'Transition'

interface GuideProps {
  dialog: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }
}

const Guide: React.FC<GuideProps> = ({ dialog: { open, setOpen } }: GuideProps) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <S.StyledDialog fullScreen open={open} onClose={handleClose}>
      <Container sx={{ maxWidth: '500px' }} maxWidth={false}>
        <S.Header>
          <Typography variant="h6" flexGrow={1} textAlign="center">
            GUIDE
          </Typography>
          <S.StyledLink color="inherit" onClick={handleClose}>
            <Close />
          </S.StyledLink>
        </S.Header>
        <Typography my="14px">
          <b>Wordle Solver</b> solves <b>Wordle</b> in the most optimal way.
        </Typography>
        <Typography>It uses the Scrabble dictionary for generating 5-letter words.</Typography>
        <S.StyledDivider />
        <Typography>Click on a tile to switch between different hints.</Typography>
        <S.HintContainer>
          <S.Tile state="filled">
            <Letter variant="h4" fontWeight="600">
              w
            </Letter>
          </S.Tile>
          <S.Tile state="inWord">
            <Letter variant="h4" fontWeight="600">
              w
            </Letter>
          </S.Tile>
          <S.Tile state="rightSpot">
            <Letter variant="h4" fontWeight="600">
              w
            </Letter>
          </S.Tile>
        </S.HintContainer>
        <Typography mb="14px">Hit the enter button to submit and generate the next word.</Typography>
        <Typography>Repeat until you find the word or run out of tries.</Typography>
        <S.StyledDivider />
        <Typography mb="16px">
          Made with ❤️ |{' '}
          <Link href="https://github.com/mhmdjaw" target="_blank" rel="noopener" color="text.primary">
            Mohamad Jawhar
          </Link>
          .
        </Typography>
      </Container>
    </S.StyledDialog>
  )
}

export default Guide
