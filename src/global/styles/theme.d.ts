import 'styled-components';
import theme from './theme';

declare module 'sytled-components' {
  type ThemeType = typeof theme

  export interface DefaultTheme extends ThemeType {}
}