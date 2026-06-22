// To be moved to different file of Theme
export interface ThemeTokens {
  bg: string;
  panel: string;
  textMain: string;
  textMuted: string;
  border: string;
  accentText: string;
  accentBg: string;
  accentSubtle: string;
  userBubble: string;
  aiBubble: string;
  hoverSubtle: string;
  divider: string;
  gradientFade: string;
  hex: { 
    border: string; 
    bg: string; 
    focusRing: string; 
    chartColors: string[];
  };
}

export interface EleganceThemeConfigRegister {
  light: ThemeTokens;
  dark: ThemeTokens;
}