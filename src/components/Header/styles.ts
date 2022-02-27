import { Link } from '@mui/material'
import { styled } from '@mui/system'

export const OuterContainer = styled('div')(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[800]}`
}))

export const StyledLink = styled(Link)({
  display: 'inline-flex',
  cursor: 'pointer'
})
