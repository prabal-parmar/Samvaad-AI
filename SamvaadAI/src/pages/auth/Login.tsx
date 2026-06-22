import React, { useState, type JSX } from "react";
import type { ThemeTokens } from "../../types/loginTypes";
import { MoonIcon, SunIcon } from "../../icons/SamvaadIcons";
import { EleganceTheme } from "../../theme/theme";

export default function Login(): JSX.Element {
  const [isDark, setIsDark] = useState<boolean>(false);

  const theme: ThemeTokens = isDark ? EleganceTheme.dark : EleganceTheme.light;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleLoginSubmit = (e: any) => {
    e.preventDefault();
    console.log("Login submitted!");
    // Backend API
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-500 font-sans ${theme.bg} ${theme.textMain}`}
    >
      {}
      <header className="absolute top-0 w-full flex justify-between items-center px-6 py-6 md:px-12 z-10">
        <div className="font-serif text-2xl tracking-wide flex items-center gap-2">
          <span className="hidden sm:block">Samvaad AI</span>
          <div
            className={`w-1.5 h-1.5 rounded-full ${theme.accentBg} mb-1`}
          ></div>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2.5 rounded-full border-[0.5px] transition-all duration-300 ${theme.border} ${theme.hoverSubtle} focus:outline-none focus:ring-2`}
          style={
            { "--tw-ring-color": theme.hex.focusRing } as React.CSSProperties
          }
          aria-label="Toggle Theme"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      {}
      <main className="flex-grow flex items-center justify-center p-4">
        <div
          className={`w-full max-w-[420px] p-8 md:p-10 ${theme.panel} border-[0.5px] ${theme.border} rounded-xl shadow-sm relative overflow-hidden`}
        >
          <div
            className={`absolute top-0 left-0 w-full h-[3px] ${theme.accentBg}`}
          ></div>

          <div className="text-center mb-10 mt-2">
            <span
              className={`block text-[10px] uppercase tracking-widest mb-3 ${theme.textMuted}`}
            >
              Welcome Back
            </span>
            <h1 className="font-serif text-3xl mb-3">Sign In</h1>
            <p className={`text-sm font-light ${theme.textMuted}`}>
              Continue your communication journey.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label
                className={`block text-[10px] uppercase tracking-widest mb-2 ${theme.textMuted}`}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                style={
                  {
                    "--tw-ring-color": theme.hex.focusRing,
                  } as React.CSSProperties
                }
                className={`w-full p-3 text-sm bg-transparent border-[0.5px] ${theme.border} rounded-lg outline-none transition-all duration-300 placeholder-opacity-40 focus:ring-1`}
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <label
                  className={`block text-[10px] uppercase tracking-widest ${theme.textMuted}`}
                >
                  Password
                </label>
                <button
                  type="button"
                  className={`text-xs font-light transition-opacity hover:opacity-70 ${theme.accentText} focus:outline-none`}
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  style={
                    {
                      "--tw-ring-color": theme.hex.focusRing,
                    } as React.CSSProperties
                  }
                  className={`w-full p-3 pr-10 text-sm bg-transparent border-[0.5px] ${theme.border} rounded-lg outline-none transition-all duration-300 placeholder-opacity-40 focus:ring-1`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70 ${theme.textMuted} focus:outline-none`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 mt-2 text-sm tracking-widest uppercase transition-transform active:scale-[0.98] rounded-lg ${theme.userBubble} focus:outline-none focus:ring-2 focus:ring-offset-2`}
              style={
                {
                  "--tw-ring-color": theme.hex.focusRing,
                  "--tw-ring-offset-color": theme.hex.bg,
                } as React.CSSProperties
              }
            >
              Sign In
            </button>
          </form>

          {}
          <div className={`mt-8 pt-6 ${theme.divider}`}>
            <p className={`text-center text-xs font-light ${theme.textMuted}`}>
              Don't have an account?{" "}
              <button
                className={`font-medium ml-1 transition-opacity hover:opacity-70 ${theme.textMain} focus:outline-none`}
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
