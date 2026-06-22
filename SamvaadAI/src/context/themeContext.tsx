import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface ThemeContextType {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTheme: () => void;
}

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        setIsDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}