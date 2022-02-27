import { Box, Typography } from '@mui/material'
import { BoxProps, styled } from '@mui/system'

export const OuterContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  overflow: 'hidden'
})

export const InnerContainer = styled('div')({
  height: 420,
  maxWidth: '100%',
  aspectRatio: '5 / 6',
  flexShrink: 1,
  padding: 10,
  display: 'grid',
  gridTemplateRows: 'repeat(6, 1fr)',
  gridGap: 5
})

export const Row = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridGap: 5
})

interface CellProps extends BoxProps {
  state: 'empty' | 'filled' | 'notInWord' | 'inWord' | 'rightSpot'
  enabled?: boolean
}

export const Cell = styled(Box)<CellProps>(({ theme, state, enabled }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 0,
  minWidth: 0,
  padding: 0,
  width: '100%',
  userSelect: 'none',
  ...(state === 'empty' && {
    border: `2px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400]}`
  }),
  ...(state === 'filled' && {
    border: `2px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[600]}`
  }),
  ...(state === 'notInWord' && {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[600],
    color: theme.palette.primary.contrastText
  }),
  ...(state === 'inWord' && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText
  }),
  ...(state === 'rightSpot' && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  }),
  ...(enabled && {
    cursor: 'pointer'
  })
}))

export const Letter = styled(Typography)({
  '@media (max-height: 550px)': {
    fontSize: '1rem'
  }
})
