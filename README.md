# Abhishek Kushwaha — Portfolio starter

An original portfolio starter inspired by a sketch-paper / terminal-style developer aesthetic. Built with Next.js App Router, TypeScript, React, and plain CSS design tokens.

## Run locally

1. Install Node.js LTS.
2. Extract this folder and open a terminal in it.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Before publishing

- Replace `YOUR_EMAIL@example.com` in `src/app/page.tsx` and `src/components/recruiter-panel.tsx`.
- Replace GitHub and LinkedIn placeholder URLs.
- Add your actual resume PDF at `public/resume.pdf`.
- Verify all project summaries, stack claims, work history, and metrics. The starter deliberately labels claims that need personal verification.
- Update metadata and add a real profile photo only if desired.
- Test on mobile, keyboard-only navigation, and a reduced-motion system setting.

## Structure

```text
src/
  app/
    globals.css          Design system + responsive styles
    layout.tsx           Metadata and global shell
    page.tsx              Portfolio sections
  components/
    particle-cursor.tsx  Lightweight canvas trail
    architecture-map.tsx Conceptual request flow diagram
    command-terminal.tsx Interactive local command palette
    recruiter-panel.tsx  Recruiter snapshot and resume link
```

## Design / implementation notes

- The cursor trail is non-interactive and does not replace the system cursor.
- It only activates for fine pointers and respects `prefers-reduced-motion`.
- The architecture map is explicitly conceptual; update it to match the project you're presenting.
- No contact form backend or analytics are included in this starter.
