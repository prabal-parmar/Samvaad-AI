import React, { useState, type JSX } from "react";
import type { LoginDataTypes, ThemeTokens } from "../../types/loginTypes";
import { EleganceTheme } from "../../theme/theme";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useTheme } from "../../context/themeContext";
import { loginUser } from "../../api/auth/authApis";
import { storeToken } from "../../api/auth/axiosInterseptor";

export default function Login(): JSX.Element {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const theme: ThemeTokens = isDark ? EleganceTheme.dark : EleganceTheme.light;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loginInput, setLoginInput] = useState<LoginDataTypes>({
    userInp: "",
    password: "",
  });

  const handleLoginSubmit = async () => {
    if(loginInput.userInp == "") {
      console.log("No Username or Email.");
      setErrorMsg("No Username or Email")
      return;
    }
    if(loginInput.password == "") {
      console.log("No Password.")
      setErrorMsg("No Password")
      return;
    }
    const [token, username, err] = await loginUser(loginInput);
    if(token && username){
      storeToken(token);
      navigate("/");
      setLoginInput({userInp:"", password:""})
    }
    else {
      setErrorMsg(err);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-500 font-sans ${theme.bg} ${theme.textMain}`}
    >
      <Header />
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

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label
                className={`block text-[10px] uppercase tracking-widest mb-2 ${theme.textMuted}`}
              >
                Username or Email Address
              </label>
              <input
                type="email"
                placeholder="Input here"
                style={
                  {
                    "--tw-ring-color": theme.hex.focusRing,
                  } as React.CSSProperties
                }
                onChange={(e) => setLoginInput(prev => ({...prev, userInp: e.target.value}))}
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
                  onChange={e => setLoginInput(prev => ({...prev, password: e.target.value}))}
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
            
            {errorMsg && (
              <p className="text-red-500 text-xs text-center mt-2">
                {errorMsg}
              </p>
            )}
            
            <button
              type="submit"
              className={`w-full py-3.5 mt-2 text-sm tracking-widest uppercase transition-transform active:scale-[0.98] rounded-lg ${theme.userBubble} focus:outline-none focus:ring-2 focus:ring-offset-2`}
              style={
                {
                  "--tw-ring-color": theme.hex.focusRing,
                  "--tw-ring-offset-color": theme.hex.bg,
                } as React.CSSProperties
              }
              onClick={handleLoginSubmit}
            >
              Sign In
            </button>
          </form>

          {}
          <div
            className={`mt-8 pt-6 ${theme.divider}`}
            onClick={() => navigate("/register")}
          >
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
