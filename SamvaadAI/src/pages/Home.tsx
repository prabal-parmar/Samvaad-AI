import React, { useEffect, useState } from "react";
import { EleganceTheme } from "../theme/theme";
import Header from "./components/Header";
import { useTheme } from "../context/themeContext";
import type { ScenarioLibraryType } from "../types/homeTypes";
import { fetchScenarioLibrary } from "../api/staticDataApi/homeData";


const aiPersonas = [
  {
    id: "mentor",
    name: "Executive Mentor",
    role: "Career Growth",
    initial: "M",
  },
  {
    id: "friend",
    name: "Supportive Friend",
    role: "Social Practice",
    initial: "F",
  },
  {
    id: "interviewer",
    name: "Strict Interviewer",
    role: "Pressure Test",
    initial: "I",
  },
  {
    id: "partner",
    name: "Romantic Partner",
    role: "Relationship Skills",
    initial: "P",
  },
];

export default function Home(): React.JSX.Element {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedScenario, setSelectedScenario] = useState<any | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("Intermediate");
  const [scenarioLibrary, setScenarioLibrary] = useState<ScenarioLibraryType[]>([]);
  const theme = isDark ? EleganceTheme.dark : EleganceTheme.light;

  const filteredScenarios =
    activeFilter === "All"
      ? scenarioLibrary
      : scenarioLibrary.filter((s) => s.type === activeFilter);
  useEffect(() => {
    const fetchScenarioLibraryData = async () => {
        const [data, message, error] = await fetchScenarioLibrary();
        if(error) {
            console.log(error);
            alert(error);
        }
        else{
            setScenarioLibrary(data);
            console.log(message);
        }
    };
    fetchScenarioLibraryData();
  }, []);

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-500 font-sans ${theme.bg} ${theme.textMain}`}
    >
      <Header />

      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow py-10">
        <section className="mb-12">
          <span
            className={`block text-[10px] uppercase tracking-widest mb-2 ${theme.accentText}`}
          >
            Simulation Hub
          </span>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
            Where would you like to begin?
          </h1>
          <p className={`text-base font-light max-w-2xl ${theme.textMuted}`}>
            Select a real-world scenario to practice your communication skills.
            The AI will adapt to your choices and provide instant, actionable
            feedback.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content: Scenario Library */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap gap-3 mb-6">
              {["All", "Career", "Social", "Workplace", "Professional"].map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 text-xs font-medium rounded-full border-[0.5px] transition-all ${
                      activeFilter === filter
                        ? `${theme.accentBg} text-white border-transparent`
                        : `bg-transparent ${theme.border} ${theme.textMain} hover:border-opacity-50`
                    }`}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredScenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario)}
                  className={`p-6 rounded-2xl border-[0.5px] ${theme.border} ${theme.panel} hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between h-full`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span
                        className={`text-[9px] uppercase tracking-widest px-2 py-1 rounded-md ${theme.tagBg} ${theme.tagText}`}
                      >
                        {scenario.type}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl mb-2 group-hover:text-opacity-80 transition-colors">
                      {scenario.display_name}
                    </h3>
                    <p
                      className={`text-sm font-light leading-relaxed ${theme.textMuted} mb-6`}
                    >
                      {scenario.description}
                    </p>
                  </div>

                  <div
                    className={`pt-4 border-t-[0.5px] ${theme.border} flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity`}
                  >
                    <span
                      className={`text-[10px] uppercase tracking-widest font-semibold ${theme.textMain}`}
                    >
                      Configure Session
                    </span>
                    <span className="text-sm">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            {/* Quick Resume/History */}
            <div>
              <div className="flex justify-between items-end mb-6">
                <h3 className="font-serif text-xl">Recent Sessions</h3>
                <button
                  className={`text-[10px] uppercase tracking-widest hover:underline ${theme.textMuted}`}
                >
                  View History
                </button>
              </div>

              <div className="space-y-4">
                <div
                  className={`p-5 rounded-xl border-[0.5px] ${theme.border} ${theme.panel} flex justify-between items-center cursor-pointer hover:shadow-sm`}
                >
                  <div>
                    <h4 className="font-serif text-base mb-1">
                      Talking to Parents
                    </h4>
                    <span
                      className={`text-[10px] uppercase tracking-widest ${theme.textMuted}`}
                    >
                      Yesterday • Score: 7.2/10
                    </span>
                  </div>
                  <button className={`text-xs ${theme.accentText}`}>
                    Review ➔
                  </button>
                </div>
              </div>
            </div>

            {/* AI Personas Roster */}
            <div>
              <h3 className="font-serif text-xl mb-6">Your Personalities</h3>
              <div className="grid grid-cols-2 gap-4">
                {aiPersonas.map((persona) => (
                  <div
                    key={persona.id}
                    className={`p-4 rounded-xl border-[0.5px] ${theme.border} ${theme.panel} flex flex-col items-center text-center cursor-pointer hover:shadow-sm`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center font-serif text-xl border-[0.5px] ${theme.border} ${isDark ? "bg-[#21262D]" : "bg-[#FAFAFA]"}`}
                    >
                      {persona.initial}
                    </div>
                    <span
                      className={`block text-sm font-medium mb-1 ${theme.textMain}`}
                    >
                      {persona.name}
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-widest ${theme.textMuted}`}
                    >
                      {persona.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Difficulty Selection Modal */}
      {selectedScenario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div
            className={`w-full max-w-lg p-8 rounded-3xl border-[0.5px] ${theme.border} ${theme.panel} shadow-2xl animate-in fade-in zoom-in duration-300`}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <span
                  className={`block text-[10px] uppercase tracking-widest mb-2 ${theme.accentText}`}
                >
                  Session Setup
                </span>
                <h2 className="font-serif text-3xl">
                  {selectedScenario.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedScenario(null)}
                className={`text-2xl font-light opacity-50 hover:opacity-100 transition-opacity ${theme.textMain}`}
              >
                ×
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <label
                  className={`block text-[10px] uppercase tracking-widest mb-3 ${theme.textMuted}`}
                >
                  1. Select Difficulty
                </label>
                <div className="flex gap-3">
                  {["Beginner", "Intermediate", "Advanced"].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`flex-1 py-3 text-xs font-medium rounded-lg border-[0.5px] transition-all ${
                        selectedDifficulty === diff
                          ? `${theme.accentBg} text-white border-transparent shadow-md`
                          : `bg-transparent ${theme.border} ${theme.textMain} hover:border-opacity-50`
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
                <p
                  className={`text-[11px] mt-3 font-light leading-relaxed ${theme.textMuted}`}
                >
                  {selectedDifficulty === "Beginner" &&
                    "AI provides helpful hints and keeps the tone highly supportive. Best for learning the ropes."}
                  {selectedDifficulty === "Intermediate" &&
                    "A realistic, balanced conversation flow matching everyday interactions."}
                  {selectedDifficulty === "Advanced" &&
                    "Challenging real-world interactions with strict grading and curveball questions."}
                </p>
              </div>

              <button
                className={`w-full py-4 mt-4 text-[11px] tracking-[0.2em] uppercase font-bold rounded-xl transition-transform active:scale-[0.98] ${theme.userBubble} ${theme.userBubbleText} shadow-md`}
              >
                Start Simulation ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
