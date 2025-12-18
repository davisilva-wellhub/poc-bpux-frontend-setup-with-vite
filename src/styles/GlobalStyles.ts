import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: var(--lighter-gray);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--medium-gray);
      border-radius: 20px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: var(--gray);
    }
  }

  body,
  html,
  main {
    height: 100%;
  }

  body {
    margin: 0;
    overflow: hidden auto;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;
  }

  button:disabled .file-uploader {
    cursor: default;
  }

  p {
    &.medium {
      font-weight: 500;

      &.gutter {
        margin-bottom: 12px;
      }
    }
  }
`
