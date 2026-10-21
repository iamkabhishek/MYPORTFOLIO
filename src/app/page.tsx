import { ArrowDownRight, ArrowUpRight, Braces, Github, Linkedin, Mail, ExternalLink, ChevronDown } from "lucide-react";
import Image from "next/image";
import ExperienceSection from "@/components/experience-section";
import ExperienceTooling from "@/components/experience-tooling";
import SkillTerminal from "@/components/skill-terminal";

const skillGroups = [
  { name: "Languages", note: "The foundations I build with", skills: ["JavaScript", "TypeScript", "SQL"] },
  { name: "Backend engineering", note: "Services, APIs & application logic", skills: ["Node.js", "Express.js", "REST APIs"] },
  { name: "Frontend", note: "Interfaces that bring products to life", skills: ["React.js", "Next.js", "Tailwind CSS"] },
  { name: "AI & applied AI", note: "Language models, speech APIs & AI development tools", skills: ["LLM", "SLM", "RAG", "Google Gemini", "Google Cloud Speech APIs", "Voice-based AI workflows", "Claude Code", "OpenAI Codex"] },
  { name: "Data & ORMs", note: "Storage, querying & data access", skills: ["MongoDB", "PostgreSQL", "Redis", "Mongoose", "Drizzle ORM"] },
  { name: "Cloud & infrastructure", note: "Deployments, identity & event workflows", skills: ["AWS", "AWS Lambda", "AWS Cognito", "AWS SES", "AWS SNS", "AWS EventBridge", "AWS Secrets Manager"] },
  { name: "Tools & delivery", note: "A dependable development workflow", skills: ["Docker Compose", "Git / GitHub", "GitHub Actions", "Postman"] },
];
const skillLogos: Record<string, { slug?: string; src?: string; color: string; mark: string; symbol?: "llm" | "slm" | "rag" | "codex" }> = {
  "JavaScript": { slug: "javascript", color: "F7DF1E", mark: "JS" },
  "TypeScript": { slug: "typescript", color: "3178C6", mark: "TS" },
  "SQL": { color: "526B8C", mark: "SQL" },
  "Node.js": { slug: "nodedotjs", color: "5FA04E", mark: "N" },
  "Express.js": { slug: "express", color: "24231F", mark: "EX" },
  "REST APIs": { color: "C96B59", mark: "API" },
  "React.js": { slug: "react", color: "61DAFB", mark: "R" },
  "Next.js": { slug: "nextdotjs", color: "000000", mark: "N" },
  "Tailwind CSS": { slug: "tailwindcss", color: "06B6D4", mark: "TW" },
  "Google Gemini": { slug: "googlegemini", color: "8E75B2", mark: "AI" },
  "Google Cloud Speech APIs": { slug: "googlecloud", color: "4285F4", mark: "GCP" },
  "Voice-based AI workflows": { color: "C96B59", mark: "VOICE" },
  "LLM": { color: "668568", mark: "", symbol: "llm" },
  "SLM": { color: "78927b", mark: "", symbol: "slm" },
  "RAG": { color: "C96B59", mark: "", symbol: "rag" },
  "Claude Code": { slug: "anthropic", color: "D97757", mark: "CC" },
  "OpenAI Codex": { color: "668568", mark: "", symbol: "codex" },
  "MongoDB": { slug: "mongodb", color: "47A248", mark: "M" },
  "PostgreSQL": { slug: "postgresql", color: "4169E1", mark: "PG" },
  "Redis": { slug: "redis", color: "FF4438", mark: "R" },
  "Mongoose": { slug: "mongodb", color: "47A248", mark: "MG" },
  "Drizzle ORM": { slug: "drizzle", color: "C5F74F", mark: "D" },
  "AWS": { src: "/logos/aws.svg", color: "232F3E", mark: "AWS" },
  "AWS Lambda": { src: "/logos/aws.svg", color: "232F3E", mark: "AWS" },
  "AWS Cognito": { src: "/logos/aws.svg", color: "232F3E", mark: "AWS" },
  "AWS SES": { src: "/logos/aws.svg", color: "232F3E", mark: "AWS" },
  "AWS SNS": { src: "/logos/aws.svg", color: "232F3E", mark: "AWS" },
  "AWS EventBridge": { src: "/logos/aws.svg", color: "232F3E", mark: "AWS" },
  "AWS Secrets Manager": { src: "/logos/aws.svg", color: "232F3E", mark: "AWS" },
  "Docker Compose": { slug: "docker", color: "2496ED", mark: "D" },
  "Git / GitHub": { slug: "github", color: "181717", mark: "GH" },
  "GitHub Actions": { slug: "githubactions", color: "2088FF", mark: "GH" },
  "Postman": { slug: "postman", color: "FF6C37", mark: "P" },
};
const experience = [
  "Built 50+ scalable REST APIs with Node.js and Express.js for concurrent production users.",
  "Owned backend development for core business modules across the web application and admin dashboard.",
  "Optimized MongoDB queries and indexes, reducing average API response time by 30%.",
  "Implemented AWS Cognito authentication with MFA and role-based access for Admin, Sub-Admin, and Super-Admin roles.",
  "Automated email and SMS workflows with AWS Lambda, SES, and SNS, handling 5,000+ notifications per day.",
  "Added Redis caching to high-traffic endpoints to reduce database load and improve response times.",
  "Designed GitHub Actions CI/CD pipelines for automated testing, linting, and deployment to AWS Lambda.",
  "Modeled transactional data with PostgreSQL and Drizzle ORM where ACID compliance was required.",
  "Managed application secrets with AWS Secrets Manager across environments.",
];
const experienceStories = [
  {
    number: "01",
    title: "Admin Access Control System",
    category: "ACCESS MANAGEMENT · FITNEARN",
    summary: "Specified granular admin access workflows across users, groups, roles, permissions, and action keys.",
    details: [
      "Mapped workflows to create and manage admin users, groups, and roles, including how permissions are assigned.",
      "Defined permission boundaries and least-privilege rules so admins cannot grant access beyond their own scope.",
      "Specified permission and action-key management, with guardrails for protected base permissions and sensitive account actions.",
    ],
    stack: [],
  },
  {
    number: "02",
    title: "Query Management",
    category: "SUPPORT WORKFLOWS · FITNEARN",
    summary: "Defined query triage and response workflows with actions scoped to each admin’s permissions.",
    details: [
      "Specified a searchable, filterable query list and detail view, including status, urgency, and responsible-person updates.",
      "Documented response threads, edit flows, bulk deletion confirmation, and success or failure feedback.",
      "Defined role-specific behavior for full-control, view-and-respond, permission-gated, and read-only access, with protected routes and API actions.",
    ],
    stack: [],
  },
  {
    number: "03",
    title: "Fitnearn Store Module",
    category: "E-COMMERCE · PRODUCT MANAGEMENT",
    summary: "Designed and implemented the backend for a multi-seller fitness and wellness store.",
    details: [
      "Built product discovery with search and filters, variants, recommendations, saved products, ratings, and reviews.",
      "Implemented cart, delivery addresses, coupon and availability checks, plus transactional order processing with inventory updates.",
      "Supported per-product seller fulfilment and payout calculations, order history, fulfilment details, and PDF invoices.",
      "Added customer support tickets with attachments, order-confirmation emails, and in-app notifications.",
    ],
    stack: ["TypeScript", "Node.js", "Express", "MongoDB", "AWS S3", "PDFKit"],
  },
  {
    number: "04",
    title: "Workout and Live Session Module",
    category: "FITNESS EXPERIENCES · FITNEARN",
    summary: "Brought guided workouts and live training sessions together in one fitness experience, supporting both self-paced training and real-time participation.",
    details: [
      "Contributed to the backend experience for workout content and live sessions, giving members ways to train independently or take part in real-time fitness sessions.",
    ],
    stack: [],
  },
];
const projects = [
  {
    number: "01", name: "Avira Interview AI", kind: "AI · INTERVIEW PLATFORM", liveUrl: "https://avira-interview-ai-lemon.vercel.app/", previewUrl: "https://avira-interview-ai-lemon.vercel.app/", repoUrl: "https://github.com/iamkabhishek/Avira-Interview-AI",
    summary: "An AI-powered interview platform that generates contextual questions from resumes and job descriptions, supports voice-based interviewing, and produces structured candidate feedback.",
    stack: ["Google Gemini", "Google Cloud Speech APIs", "AI", "Voice workflows"],
    details: ["Integrated Google Gemini AI for adaptive interview questions and contextual follow-ups.", "Added speech processing with Google Cloud Speech APIs.", "Turns candidate and role context into structured interview feedback."],
  },
    {
    number: "02", name: "NConnect", kind: "NEWSLETTER MANAGEMENT PLATFORM", liveUrl: "https://n-connect-fe.vercel.app/", previewUrl: "https://n-connect-fe.vercel.app/", repoUrl: "",
    summary: "A self-hosted email marketing platform for agencies and businesses to manage client workspaces, create campaigns, automate email workflows, and track performance from one place.",
    stack: ["Multi-workspace management", "Email automation", "Campaign analytics"],
    details: ["Manage multiple client workspaces with isolated data and role-based access.", "Segment contacts, customize templates, and create targeted email campaigns.", "Automate multi-step email sequences and track delivery and campaign analytics."],
  },
];

export default function Home() {
  return (
    <main id="main" className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Abhishek home"><span className="wordmark-mark">ak.</span><span>abhishek kumar</span></a>
        <nav aria-label="Main navigation" className="main-nav">
          <a href="#about">About</a><a href="#experience">Experience</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a>
        </nav>
        <a className="availability" href="#contact"><span className="status-dot"/> Open to opportunities</a>
      </header>

      <section id="home" className="hero section-grid">
        <p className="hero-sanskrit" lang="sa"><span className="hero-sanskrit-greeting">नमस्कारः</span><span>अहं अभिषेकः अस्मि</span></p>
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line"/> BACKEND DEVELOPER · MERN STACK ENGINEER</p>
          <h1>Building the<br/><span className="serif-italic">logic</span> behind<br/>the experience<span className="coral-dot">.</span></h1>
          <p className="hero-intro">I’m Abhishek Kumar ” a backend developer building APIs, cloud-native applications, and dependable product experiences with Node.js, TypeScript, and the MERN stack.</p>
          <div className="hero-actions"><a className="button button-dark" href="#projects">Explore my work <ArrowDownRight size={16}/></a><a className="text-link" href="#contact">Let’s talk <ArrowUpRight size={15}/></a></div>
          <div className="hero-footnote"><span className="tiny-spark">✳</span> Curious by default. Careful with the details.</div>
        </div>
        <div className="hero-art" aria-label="Portrait of Abhishek Kumar">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
          <figure className="portrait-card"><Image src="/abhishek-portrait.png" alt="Abhishek Kumar" fill priority sizes="(max-width: 700px) 75vw, 360px"/><figcaption><span>ABHISHEK KUMAR</span><small>BACKEND DEVELOPER</small></figcaption></figure>
          <div className="paper-note note-top">currently building<br/><strong>useful things</strong></div>
          <div className="floating-chip chip-api">API <span>↔</span></div><div className="floating-chip chip-db">DB <span>⌘</span></div><div className="floating-chip chip-auth">AUTH <span>✓</span></div>
          <svg className="scribble-arrow" viewBox="0 0 130 65" fill="none" aria-hidden="true"><path d="M4 8 C40 0 76 12 81 35 S105 58 122 43 M111 42 L123 43 L120 31" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          <div className="hero-index">FIG. 01 ” SYSTEMS IN MOTION</div>
        </div>
        <div className="hero-bottom"><span>BASED IN INDIA · WORKING EVERYWHERE</span><a href="#about">Scroll to explore <ArrowDownRight size={14}/></a><span className="hero-coordinate">28° N / 77° E</span></div>
      </section>

      <section id="about" className="about-section section-grid section-pad">
        <div className="section-label"><span>01 / ABOUT</span><span className="label-rule"/></div>
        <div className="about-content"><p className="section-kicker">THE PERSON BEHIND THE REQUESTS</p><h2>Building systems that work<br/>beyond the <span className="serif-italic">happy path.</span></h2>
          <div className="about-prose"><p>I’m Abhishek Kumar, a Backend Developer specializing in Node.js, TypeScript, and the MERN stack, with 1+ year of production experience building REST APIs and cloud-native applications.</p>
          <p>At FitnEarn, I worked on backend services, authentication systems, database optimization, notification pipelines, and automated deployment workflows. My focus is on building reliable systems with clean architecture, security, and measurable performance improvements.</p>
          <p>I’ve also built projects ranging from AI-powered interview platforms to real-time cryptocurrency dashboards. I enjoy solving engineering problems and turning ideas into functional products.</p></div>
          
        </div>
      </section>

      <ExperienceSection>
        <div className="section-label"><span>experience.sh</span><span className="label-rule"/></div>
        <div className="section-main"><p className="experience-command"><span>&gt;</span> experience --list</p><h2 className="experience-title">Work Experience</h2><p className="experience-listing">List of work experience:</p>
          <article className="experience-card"><div className="experience-head"><div><h3>FitnEarn</h3><p className="experience-date">MAR 2025 <span>—</span> JUL 2026 <span className="work-mode">REMOTE</span></p><p className="experience-company">Backend Developer <span>(MERN Stack) · Fitness technology</span></p></div><span className="experience-mark" aria-hidden="true"><Braces size={23}/></span></div>
            <div className="metric-row"><div><span className="metric-index">01 / API SURFACE</span><strong>50<span>+</span></strong><span className="metric-description">production REST APIs</span></div><div><span className="metric-index">02 / PERFORMANCE</span><strong>30<span>%</span></strong><span className="metric-description">lower average response time</span></div><div><span className="metric-index">03 / AUTOMATION</span><strong>5,000<span>+</span></strong><span className="metric-description">notifications each day</span></div></div>
            <p className="experience-intro">Owned backend delivery across core product modules, connecting API design, access control, data performance, and cloud operations.</p>
            <div className="experience-stories">
              <div className="experience-stories-heading"><span>SELECTED PRODUCT WORK</span><small>{String(experienceStories.length).padStart(2, "0")} {experienceStories.length === 1 ? "STORY" : "STORIES"}</small></div>
              {experienceStories.map((story) => <details className="experience-story" key={story.title}>
                <summary>
                  <span className="experience-story-number">{story.number}</span>
                  <span className="experience-story-copy"><span className="experience-story-category">{story.category}</span><strong>{story.title}</strong><small>{story.summary}</small></span>
                  <span className="experience-story-toggle">VIEW DETAILS <ChevronDown size={15}/></span>
                </summary>
                <div className="experience-story-details"><p>PROJECT NOTES</p><ul>{story.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>{story.stack.length > 0 ? <div className="experience-story-stack"><span>STACK</span>{story.stack.map((tech) => <span key={tech}>{tech}</span>)}</div> : null}</div>
              </details>)}
            </div>
            <ul className="experience-list">{experience.map((item) => <li key={item}>{item}</li>)}</ul>
            <ExperienceTooling />
          </article>
        </div>
      </ExperienceSection>

      <section id="skills" className="skills-section section-grid section-pad">
        <div className="section-label"><span>02 / TOOLKIT</span><span className="label-rule"/></div>
        <div className="section-main">
          <p className="section-kicker">A PRACTICAL STACK, BUILT IN PRODUCTION</p>
          <h2>Tools for the <span className="serif-italic">whole build.</span></h2>
          <p className="section-description">From shaping an interface to shipping reliable backend services, these are the technologies I use to turn ideas into working products.</p>
          <SkillTerminal groups={skillGroups} logos={skillLogos}/>
        </div>
      </section>

      <section id="projects" className="work-section section-grid section-pad">
        <div className="section-label"><span>03 / SELECTED WORK</span><span className="label-rule"/></div>
        <div className="section-main"><div className="section-heading-row"><div><p className="section-kicker">PROJECTS & PRACTICE</p><h2>Ideas made <span className="serif-italic">functional.</span></h2></div><span className="hand-note">A few things from<br/>the workbench ↙</span></div>
          <div className="project-list">{projects.map((project) => <article className="project-card" key={project.number}><div className="project-top"><span className="project-number">{project.number}</span><span className="project-kind">{project.kind}</span><ArrowUpRight size={19}/></div><div className={`project-art project-art-${project.number}`}>{project.previewUrl ? <iframe src={project.previewUrl} title={`${project.name} live website preview`} loading="lazy" tabIndex={-1} referrerPolicy="strict-origin-when-cross-origin"/> : project.number === "01" ? <><span>INTERVIEW FLOW</span><div className="interview-art"><i/><i/><i/><b/></div><div className="voice-art"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></> : <><span>MARKET SIGNAL</span><svg viewBox="0 0 360 100" preserveAspectRatio="none"><path d="M0 76 C26 70 35 82 61 58 S96 69 121 47 S154 52 177 32 S211 48 235 38 S278 48 300 20 S333 30 360 9"/></svg></>}</div><h3>{project.name}</h3><p>{project.summary}</p><div className="tag-row">{project.stack.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><ul className="project-details">{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><div className="project-actions">{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer"><ExternalLink size={14}/> Live project</a> : <span className="project-link-pending">Live link to add</span>}{project.repoUrl ? <a href={project.repoUrl} target="_blank" rel="noreferrer"><Github size={14}/> Source code</a> : null}{!project.previewUrl ? <span className="project-link-pending">Preview link to add</span> : null}</div></article>)}</div>
        </div>
      </section>

      <section id="contact" className="contact-section section-grid section-pad">
        <div className="section-label"><span>04 / LET’S CONNECT</span><span className="label-rule"/></div>
        <div className="contact-main">
          <p className="section-kicker">OPEN TO BACKEND OPPORTUNITIES</p>
          <h2>Let’s build<br/><span className="serif-italic">something useful.</span></h2>
          <p className="large-copy">I’m interested in building reliable products with thoughtful teams.</p>
          <div className="contact-actions">
            <a className="button button-dark" href="https://github.com/iamkabhishek" target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={14}/></a>
            <a className="text-link" href="https://www.linkedin.com/in/iamkabhishek/" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={14}/></a>
            <a className="text-link contact-email" href="mailto:abhishekk.networks@gmail.com"><Mail size={16}/> abhishekk.networks@gmail.com <ArrowUpRight size={14}/></a>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-brand"><a className="wordmark" href="#home"><span className="wordmark-mark">ak.</span><span>abhishek kumar</span></a><p>Backend developer · Node.js · MERN stack</p></div>
        <nav className="footer-nav" aria-label="Footer navigation"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav>
        <div className="footer-meta"><span><i/> Open to opportunities</span><a href="#home">Back to top ↑</a><small>© {new Date().getFullYear()} Abhishek Kumar</small></div>
      </footer>
    </main>
  );
}


