import type { EleganceThemeConfig } from "../types/loginTypes";

export const EleganceTheme: EleganceThemeConfig = {
  light: {
    bg: 'bg-[#FAFAFA]',
    panel: 'bg-white',
    textMain: 'text-[#1A1A1A]',
    textMuted: 'text-[#666666]',
    border: 'border-[#E5E5E5]',
    accentText: 'text-[#9E8B75]',
    accentBg: 'bg-[#9E8B75]',
    accentSubtle: 'bg-[#FDFBF9] border-[#EAE3DB]',
    userBubble: 'bg-[#1A1A1A] text-white',
    aiBubble: 'bg-white border-[#E5E5E5]',
    hoverSubtle: 'hover:bg-[#F0F0F0]',
    divider: 'border-t-[#E5E5E5]',
    gradientFade: 'from-[#FAFAFA] via-[#FAFAFA]',
    hex: { border: '#E5E5E5', bg: '#FAFAFA', focusRing: '#9E8B75' }
  },
  dark: {
    bg: 'bg-[#0f0f0f]',
    panel: 'bg-[#171717]',
    textMain: 'text-[#F5F5F5]',
    textMuted: 'text-[#888888]',
    border: 'border-[#262626]',
    accentText: 'text-[#D4C4B7]',
    accentBg: 'bg-[#D4C4B7]',
    accentSubtle: 'bg-[#231F1D] border-[#3D332D]',
    userBubble: 'bg-[#262626] text-white',
    aiBubble: 'bg-[#171717] border-[#262626]',
    hoverSubtle: 'hover:bg-[#262626]',
    divider: 'border-t-[#262626]',
    gradientFade: 'from-[#0f0f0f] via-[#0f0f0f]',
    hex: { border: '#262626', bg: '#0f0f0f', focusRing: '#D4C4B7' }
  }
};