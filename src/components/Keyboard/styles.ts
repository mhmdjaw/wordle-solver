import { styled } from '@mui/system'

export const row = styled('div')({
  display: 'flex',
  marginBottom: 8,
  touchAction: 'manipulation'
})

export const Key = styled('div')(({ theme }) => ({
  fontWeight: 'bold',
  marginRight: 6,
  ':last-of-type': {
    margin: 0
  },
  height: 58,
  borderRadius: 4,
  cursor: 'pointer',
  userSelect: 'none',
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'uppercase',
  fontSize: '0.8rem',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[400],
  '&.one-and-a-half': {
    flex: 1.5
  }
}))

export const HalfSpace = styled('div')({
  flex: 0.5
})
