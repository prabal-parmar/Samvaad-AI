import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import type { ThemeTokens } from "../../types/registerTypes";
import { EleganceTheme } from "../../theme/theme";
import { EyeIcon, EyeOffIcon } from "../../icons/SamvaadIcons";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useTheme } from "../../context/themeContext";

// Currently Hardcoded need to change later and caluclated from backend
const goalData = [
  { name: 'Career Prep', value: 30 },
  { name: 'Social Confidence', value: 20 },
  { name: 'Dating Skills', value: 15 },
  { name: 'Conflict Res.', value: 15 },
  { name: 'Speaking', value: 10 },
  { name: 'Leadership', value: 10 }
];

export default function Register(): React.JSX.Element {
  const { isDark } = useTheme()
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const navigate = useNavigate();

  const theme: ThemeTokens = isDark ? EleganceTheme.dark : EleganceTheme.light;

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Type casting to access form elements
    const target = e.target as typeof e.target & {
      password: { value: string };
      confirmPassword: { value: string };
    };

    if (target.password.value !== target.confirmPassword.value) {
      setErrorMsg("Passwords do not match. Please refine your input.");
      return;
    }

    setErrorMsg("");
    setSuccessMsg(true);
    console.log("Registration payload ready for Backend API");
  };

  return (
    <div className={`min-h-screen w-full flex flex-col transition-colors duration-500 font-sans ${theme.bg} ${theme.textMain}`}>
      <Header />

      <main className="w-full max-w-7xl mx-auto px-8 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12 py-10 items-center">
        
        {}
        <section className="lg:col-span-5 space-y-10">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
              Master the Art of <span className="italic">Dialogue.</span>
            </h1>
            <p className={`leading-relaxed max-w-md ${theme.textMuted}`}>
              Join an elite circle of professionals refining their communication through AI-driven simulation and behavioral analysis.
            </p>
          </div>

          <div className={`border-[0.5px] ${theme.border} ${theme.panel} p-8 rounded-2xl shadow-sm backdrop-blur-sm`}>
            <h3 className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-6 ${theme.accentText}`}>
              Community Focus Distribution
            </h3>
            
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={goalData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {goalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={theme.hex.chartColors[index % theme.hex.chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: theme.hex.bg, borderColor: theme.hex.border, borderRadius: '8px', color: theme.hex.focusRing }}
                    itemStyle={{ color: isDark ? '#FFF' : '#000' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    wrapperStyle={{ fontSize: '12px', paddingTop: '20px', color: isDark ? '#FFF' : '#000' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <p className={`text-[11px] text-center mt-6 italic ${theme.textMuted}`}>
              Visualizing the primary objectives of current Samvaad members.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-2">
            <div>
              <span className="block text-2xl font-serif">14k+</span>
              <span className={`text-[10px] uppercase tracking-widest ${theme.textMuted}`}>Simulations Run</span>
            </div>
            <div>
              <span className="block text-2xl font-serif">92%</span>
              <span className={`text-[10px] uppercase tracking-widest ${theme.textMuted}`}>Success Rate</span>
            </div>
          </div>
        </section>

        {}
        <section className={`lg:col-span-7 ${theme.panel} border-[0.5px] ${theme.border} rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden`}>
          <div className={`absolute top-0 left-0 w-full h-[3px] ${theme.accentBg}`}></div>

          {!successMsg ? (
            <>
              <header className="mb-10">
                <span className={`block text-[10px] uppercase tracking-widest mb-3 ${theme.textMuted}`}>
                  Start Your Journey
                </span>
                <h2 className="font-serif text-3xl mb-2">Create your profile</h2>
                <p className={`text-sm font-light ${theme.textMuted}`}>
                  Complete the fields below to begin your training.
                </p>
              </header>

              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                
                {/* First and Last Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-[10px] uppercase tracking-widest mb-2 ${theme.textMuted}`}>First Name</label>
                    <input
                      type="text"
                      placeholder="Prabal"
                      style={{ "--tw-ring-color": theme.hex.focusRing } as React.CSSProperties}
                      className={`w-full p-3 text-sm bg-transparent border-[0.5px] ${theme.border} rounded-lg outline-none transition-all duration-300 placeholder-opacity-40 focus:ring-1`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-[10px] uppercase tracking-widest mb-2 ${theme.textMuted}`}>Last Name</label>
                    <input
                      type="text"
                      placeholder="Parmar"
                      style={{ "--tw-ring-color": theme.hex.focusRing } as React.CSSProperties}
                      className={`w-full p-3 text-sm bg-transparent border-[0.5px] ${theme.border} rounded-lg outline-none transition-all duration-300 placeholder-opacity-40 focus:ring-1`}
                      required
                    />
                  </div>
                </div>

                {/* Contact & Goals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-[10px] uppercase tracking-widest mb-2 ${theme.textMuted}`}>Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="(+91) 9090909090"
                      style={{ "--tw-ring-color": theme.hex.focusRing } as React.CSSProperties}
                      className={`w-full p-3 text-sm bg-transparent border-[0.5px] ${theme.border} rounded-lg outline-none transition-all duration-300 placeholder-opacity-40 focus:ring-1`}
                    />
                  </div>
                  <div>
                    <label className={`block text-[10px] uppercase tracking-widest mb-2 ${theme.textMuted}`}>Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      style={{ "--tw-ring-color": theme.hex.focusRing } as React.CSSProperties}
                      className={`w-full p-3 text-sm bg-transparent border-[0.5px] ${theme.border} rounded-lg outline-none transition-all duration-300 placeholder-opacity-40 focus:ring-1`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-[10px] uppercase tracking-widest mb-2 ${theme.textMuted}`}>Primary Goal</label>
                  <div className="relative">
                    {/* Currently hardcoded need to connect to DB later */}
                    <select
                      style={{ "--tw-ring-color": theme.hex.focusRing } as React.CSSProperties}
                      className={`w-full p-3 text-sm bg-transparent border-[0.5px] ${theme.border} rounded-lg outline-none transition-all duration-300 appearance-none focus:ring-1 cursor-pointer`}
                      required
                      defaultValue=""
                    >
                      <option value="" disabled className="text-gray-400">Select your primary objective...</option>
                      <option value="career" className="text-black">Career & Interview Prep</option>
                      <option value="dating" className="text-black">Dating & Relationship Skills</option>
                      <option value="social" className="text-black">Social Confidence & Friendships</option>
                      <option value="conflict" className="text-black">Conflict Resolution & Empathy</option>
                      <option value="speaking" className="text-black">Public Speaking Mastery</option>
                      <option value="leadership" className="text-black">Leadership & Assertiveness</option>
                      <option value="sales" className="text-black">Sales & Negotiation</option>
                    </select>
                    <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${theme.textMuted}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className={`block text-[10px] uppercase tracking-widest mb-2 ${theme.textMuted}`}>Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      style={{ "--tw-ring-color": theme.hex.focusRing } as React.CSSProperties}
                      className={`w-full p-3 pr-10 text-sm bg-transparent border-[0.5px] ${theme.border} rounded-lg outline-none transition-all duration-300 placeholder-opacity-40 focus:ring-1`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-[34px] transition-opacity hover:opacity-70 ${theme.textMuted} focus:outline-none`}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                 {/* Confirm Password */}
                  <div className="relative">
                    <label className={`block text-[10px] uppercase tracking-widest mb-2 ${theme.textMuted}`}>Confirm Password</label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="••••••••"
                      style={{ "--tw-ring-color": theme.hex.focusRing } as React.CSSProperties}
                      className={`w-full p-3 pr-10 text-sm bg-transparent border-[0.5px] ${theme.border} rounded-lg outline-none transition-all duration-300 placeholder-opacity-40 focus:ring-1`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`absolute right-3 top-[34px] transition-opacity hover:opacity-70 ${theme.textMuted} focus:outline-none`}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-red-500 text-xs text-center mt-2">{errorMsg}</p>
                )}

                {}
                <div className="pt-4">
                  <button
                    type="submit"
                    className={`w-full py-4 text-[11px] tracking-[0.2em] uppercase font-semibold transition-transform active:scale-[0.98] rounded-xl ${theme.userBubble} focus:outline-none focus:ring-2 focus:ring-offset-2`}
                    style={{ "--tw-ring-color": theme.hex.focusRing, "--tw-ring-offset-color": theme.hex.bg } as React.CSSProperties}
                  >
                    Initialize Training ➔
                  </button>
                </div>
                
                <p className={`text-center text-[10px] uppercase tracking-wider ${theme.textMuted}`}>
                  By registering, you agree to our <span className={`underline cursor-pointer transition-colors hover:${theme.textMain}`}>Terms of Dialogue</span>.
                </p>
              </form>

              <div className={`mt-8 pt-6 ${theme.divider}`}
                   onClick={() => navigate('/login')}>
                <p className={`text-center text-xs font-light ${theme.textMuted}`}>
                  Already have an account?{" "}
                  <button className={`font-medium ml-1 transition-opacity hover:opacity-70 ${theme.textMain} focus:outline-none`}>
                    Sign In
                  </button>
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-700">
              <div className={`text-5xl mb-6 ${theme.accentText}`}>✦</div>
              <h3 className="font-serif text-3xl mb-4">Profile Synchronized</h3>
              <p className={`text-sm max-w-sm leading-relaxed mb-8 ${theme.textMuted}`}>
                Your communication journey is being prepared. Welcome to the elite tier of Samvaad AI.
              </p>
              <button 
                onClick={() => setSuccessMsg(false)} 
                className={`text-[10px] uppercase tracking-[0.2em] font-bold ${theme.accentText} hover:opacity-70 transition-opacity`}
              >
                Return to entrance
              </button>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}