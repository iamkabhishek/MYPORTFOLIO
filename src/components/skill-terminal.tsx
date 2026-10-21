"use client";

import { useState } from "react";

type SkillGroup = { name: string; note: string; skills: string[] };
type SkillLogo = { slug?: string; src?: string; color: string; mark: string; symbol?: "llm" | "slm" | "rag" | "codex" };
type Tab = { label: string; command: string; file: string; note: string; groups: string[] };

const tabs: Tab[] = [
  { label: "Tech", command: "toolkit --show tech", file: "stack/tech.ts", note: "Languages and interface tools I use to shape product experiences.", groups: ["Languages", "Frontend"] },
  { label: "AI", command: "toolkit --show ai", file: "stack/ai.ts", note: "AI features and developer tools, including the voice interview flow in Avira Interview AI.", groups: ["AI & applied AI"] },
  { label: "Backend", command: "toolkit --show backend", file: "stack/backend.ts", note: "The services and API foundations behind production features.", groups: ["Backend engineering"] },
  { label: "Data", command: "toolkit --show data", file: "stack/data.ts", note: "Databases and data access tools chosen for the job at hand.", groups: ["Data & ORMs"] },
  { label: "Infra", command: "toolkit --show infra", file: "stack/infra.ts", note: "Cloud services and infrastructure used to ship dependable workflows.", groups: ["Cloud & infrastructure"] },
  { label: "Tooling", command: "toolkit --show tooling", file: "stack/tooling.ts", note: "Everyday tools that support a reliable development and delivery loop.", groups: ["Tools & delivery"] },
];

export default function SkillTerminal({ groups, logos }: { groups: SkillGroup[]; logos: Record<string, SkillLogo> }) {
  const [activeTab, setActiveTab] = useState(0);
  const tab = tabs[activeTab];
  const skills = groups.filter((group) => tab.groups.includes(group.name)).flatMap((group) => group.skills);

  return (
    <div className="skill-terminal">
      <div className="skill-terminal-bar">
        <span className="skill-terminal-brand"><b>ak.</b><span>toolkit<span className="terminal-brand-dot">.</span>index</span></span>
        <span className="skill-terminal-meta"><i /> BACKEND DEVELOPMENT <span>01—05</span></span>
      </div>
      <div className="skill-terminal-body">
        <p className="skill-terminal-command"><span>›</span> stack --browse</p>
        <p className="skill-terminal-intro">A practical toolkit, shaped through production work.<small>Select a discipline to explore the stack.</small></p>
        <div className="skill-terminal-tabs" role="tablist" aria-label="Skill categories">
          {tabs.map((item, index) => <button
            className={`skill-terminal-tab${activeTab === index ? " is-active" : ""}`}
            type="button"
            role="tab"
            id={`skill-tab-${index}`}
            aria-selected={activeTab === index}
            aria-controls="skill-terminal-panel"
            tabIndex={activeTab === index ? 0 : -1}
            key={item.label}
            onClick={() => setActiveTab(index)}
            onKeyDown={(event) => {
              const next = event.key === "ArrowRight" ? (index + 1) % tabs.length : event.key === "ArrowLeft" ? (index - 1 + tabs.length) % tabs.length : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : -1;
              if (next >= 0) {
                event.preventDefault();
                setActiveTab(next);
                document.getElementById(`skill-tab-${next}`)?.focus();
              }
            }}
          >{item.label}</button>)}
        </div>
        <div className="skill-terminal-panel" role="tabpanel" id="skill-terminal-panel" aria-labelledby={`skill-tab-${activeTab}`} key={tab.label}>
          <p className="skill-terminal-list-command"><span>›</span> {tab.command}</p>
          <div className="skill-terminal-file"><span>└──</span> <b>{tab.file}</b></div>
          <p className="skill-terminal-summary">{skills.join(", ")}<i aria-hidden="true" /></p>
          <p className="skill-terminal-note">{tab.note}</p>
          <p className="skill-badges-label">Skill badges <span>{String(skills.length).padStart(2, "0")} TOOLS</span></p>
          <div className="skill-terminal-badges">
            {skills.map((skill) => {
              const logo = logos[skill];
              return <span className="skill-terminal-badge" key={skill}>
                <span className="skill-terminal-badge-icon" aria-hidden="true">
                  {logo?.symbol ? <svg viewBox="0 0 18 18" className={`skill-concept-logo skill-concept-logo-${logo.symbol}`} focusable="false">
                    {logo.symbol === "llm" ? <><circle cx="4" cy="9" r="2.2"/><circle cx="9" cy="4" r="2.2"/><circle cx="14" cy="9" r="2.2"/><circle cx="9" cy="14" r="2.2"/><path d="M5.7 7.4 7.3 5.7m3.4 0 1.6 1.7m0 3.2-1.6 1.7m-3.4 0-1.6-1.7"/></> : null}
                    {logo.symbol === "slm" ? <><rect x="4" y="4" width="10" height="10" rx="3"/><path d="M7 9h4M9 7v4"/></> : null}
                    {logo.symbol === "rag" ? <><circle cx="4" cy="4" r="1.7"/><circle cx="14" cy="4" r="1.7"/><circle cx="9" cy="14" r="1.7"/><path d="M5.5 5.1 8.2 12m4.3-6.9L9.8 12M5.8 4h6.4"/></> : null}
                    {logo.symbol === "codex" ? <><path d="M9 1.7 10.8 7.2 16.3 9l-5.5 1.8L9 16.3l-1.8-5.5L1.7 9l5.5-1.8L9 1.7Z"/><circle cx="9" cy="9" r="1.25"/></> : null}
                  </svg> : !logo?.src && !logo?.slug && logo?.mark ? <span className="skill-terminal-badge-mark">{logo.mark}</span> : null}
                  {logo?.src ? <img className="skill-logo-aws" src={logo.src} alt=""/> : logo?.slug ? <img src={`https://cdn.simpleicons.org/${logo.slug}/${logo.color}`} alt="" loading="lazy"/> : null}
                </span>
                {skill}
              </span>;
            })}
          </div>
        </div>
        <div className="skill-terminal-footer"><span>↳</span> {String(skills.length).padStart(2, "0")} technologies <b>·</b> hands-on across shipped products</div>
      </div>
    </div>
  );
}
