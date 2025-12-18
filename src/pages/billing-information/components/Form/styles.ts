import styled from 'styled-components'

const ButtonWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 24px 16px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  /* stylelint-disable-next-line alpha-value-notation */
  box-shadow: 0 8px 40px 0 rgb(152 152 166 / 0.25);
  z-index: 1;

  /* stylelint-disable-next-line media-query-no-invalid */
  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    position: relative;
    padding: 0;
    box-shadow: none;
    margin-top: ${({ theme }) => theme.spacing(8)};
  }
`

export { ButtonWrapper }
