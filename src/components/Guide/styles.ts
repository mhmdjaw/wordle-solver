import { Dialog, Divider, Link } from '@mui/material'
import { styled } from '@mui/system'
import { Cell } from '../Board/styles'

export const StyledDialog = styled(Dialog)({
  '& .MuiPaper-root': { backgroundImage: 'none' }
})

export const Header = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 0'
})

export const StyledDivider = styled(Divider)({
  backgroundColor: 'grey.800',
  margin: '14px 0'
})

export const StyledLink = styled(Link)({
  display: 'inline-flex',
  cursor: 'pointer'
})

export const HintContainer = styled('div')({
  display: 'flex',
  maxWidth: '220px',
  height: '62px',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  margin: '24px 0'
})

export const Tile = styled(Cell)({
  width: '62px'
})
