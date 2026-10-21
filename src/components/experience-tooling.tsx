"use client";

import { useState } from "react";

const tools = [
  { name: "Node.js", detail: "Powered backend services and production REST APIs." },
  { name: "Express.js", detail: "Structured API routes and server-side application logic." },
  { name: "MongoDB", detail: "Stored product and operational data, with tuned queries and indexes." },
  { name: "PostgreSQL", detail: "Handled relational data where transactional consistency mattered." },
  { name: "Redis", detail: "Cached high-traffic responses to reduce database load." },
  { name: "AWS", detail: "Ran cloud workflows for authentication, messaging, and deployment." },
  { name: "GitHub Actions", detail: "Automated checks and deployment steps in the delivery pipeline." },
];

export default function ExperienceTooling() {
  const [activeTool, setActiveTool] = useState(0);
  const selected = tools[activeTool];

  return (
    <div className="experience-stack" aria-label="Core tooling explorer">
      <div className="tooling-heading">
        <span className="tooling-live-dot" aria-hidden="true" />
        <span className="tooling-label">CORE TOOLING</span>
        <span className="tooling-hint">SELECT A TOOL TO SEE IT IN CONTEXT</span>
      </div>
      <div className="tooling-options" role="group" aria-label="Select a technology">
        {tools.map((tool, index) => (
          <button
            className={`stack-pill${activeTool === index ? " is-active" : ""}`}
            type="button"
            key={tool.name}
            aria-pressed={activeTool === index}
            onClick={() => setActiveTool(index)}
          >
            <span className="tooling-index">0{index + 1}</span>{tool.name}
          </button>
        ))}
      </div>
      <div className="tooling-detail" aria-live="polite" aria-atomic="true">
        <span className="tooling-detail-mark" aria-hidden="true">↳</span>
        <span className="tooling-detail-name" key={selected.name}>{selected.name}</span>
        <span className="tooling-detail-copy" key={selected.detail}>{selected.detail}</span>
        <span className="tooling-detail-count">{String(activeTool + 1).padStart(2, "0")} / {String(tools.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
