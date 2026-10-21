import { ArrowUpRight, Download, Mail } from "lucide-react";
export function RecruiterPanel() {
  return (
    <div className="recruiter-card">
      <div className="recruiter-card-head">
        <span className="eyebrow">CANDIDATE SNAPSHOT</span>
        <span className="recruiter-badge">
          <i /> OPEN TO WORK
        </span>
      </div>
      <h3>Abhishek Kumar</h3>
      <p className="recruiter-role">Backend Developer · MERN Stack Engineer</p>
      <div className="recruiter-facts">
        <div>
          <span>FOCUS</span>
          <strong>Backend systems</strong>
        </div>
        <div>
          <span>EXPERIENCE</span>
          <strong>1+ year</strong>
        </div>
        <div>
          <span>CORE STACK</span>
          <strong>Node.js · Express · MongoDB</strong>
        </div>
      </div>
      <p className="recruiter-disclaimer">
        This summary is a quick introduction, not a substitute for verified
        employment details or project evidence.
      </p>
      <div className="recruiter-actions">
        <a className="button button-dark" href="mailto:YOUR_EMAIL@example.com">
          <Mail size={15} /> Contact me <ArrowUpRight size={14} />
        </a>
        <a className="button button-outline" href="/resume.pdf">
          <Download size={15} /> Resume PDF
        </a>
      </div>
    </div>
  );
}
