// To be moved to different file of Theme - Discard this one later
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
  };
}

export interface EleganceThemeConfigLogin {
  light: ThemeTokens;
  dark: ThemeTokens;
}

export interface LoginDataTypes {
  userInp: string;
  password: string;
}