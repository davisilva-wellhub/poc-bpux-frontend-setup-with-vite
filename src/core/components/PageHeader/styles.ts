import styled from 'styled-components'

const Header = styled.header`
  width: 100%;
  height: ${({ theme }) => theme.spacing(9)};
  padding: 0 ${({ theme }) => theme.spacing(4)};
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  max-width: ${580}px;
  margin: 0 auto;
`

export { Header }
