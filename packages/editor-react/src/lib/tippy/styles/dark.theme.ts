import { createGlobalStyle } from 'styled-components';

export const DarkTheme = createGlobalStyle`
  .tippy-box[data-theme~='editor-react-dark'] {
    --text-color: #fff;
    --background-color: #333;
    --border-color: var(--background-color);
  }
`;
