import styled from 'styled-components'

const HiddenSpan = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0); /* stylelint-disable-line property-no-deprecated */
  border: 0;
  white-space: nowrap;
`

export { HiddenSpan }
