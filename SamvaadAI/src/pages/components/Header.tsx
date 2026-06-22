import { useTheme } from "../../context/themeContext";
import { MoonIcon, SunIcon } from "../../icons/SamvaadIcons";
import { EleganceTheme } from "../../theme/theme";
import type { ThemeTokens } from "../../types/registerTypes";


export default function Header() {
    const {isDark, toggleTheme} = useTheme()
    const theme: ThemeTokens = isDark ? EleganceTheme.dark : EleganceTheme.light;
    
  return (
    <header className={`sticky top-0 h-20 w-full flex justify-between items-center px-6 md:px-12 z-50 backdrop-blur-md`}>
      <div className="font-serif text-2xl tracking-wide flex items-center gap-2">
        <span className="hidden sm:block">Samvaad AI</span>
        <div
          className={`w-1.5 h-1.5 rounded-full ${theme.accentBg} mb-1`}
        ></div>
      </div>
      <button
        onClick={() => toggleTheme()}
        className={`p-2.5 rounded-full border-[0.5px] transition-all duration-300 ${theme.border} ${theme.hoverSubtle} focus:outline-none focus:ring-2`}
        style={
          { "--tw-ring-color": theme.hex.focusRing } as React.CSSProperties
        }
        aria-label="Toggle Theme"
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}
