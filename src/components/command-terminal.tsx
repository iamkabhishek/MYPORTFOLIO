"use client";
import { useState, type FormEvent } from "react";
import { Terminal } from "lucide-react";

const commands: Record<string, string[]> = {
  help: ["Available commands: help, whoami, stack, focus, clear"],
  whoami: ["Abhishek Kumar", "Backend Developer | MERN Stack Engineer", "1+ year production experience with Node.js and the MERN stack"],
  stack: ["Node.js · Express.js · MongoDB · React", "AWS · REST APIs · TypeScript (list only skills you can discuss confidently)"],
  focus: ["Building backend systems, improving API design, and documenting practical engineering decisions."],
};
export function CommandTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(["Welcome to abhishek@dev ” type 'help' to see available commands."]);
  function runCommand(rawCommand: string) {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") setHistory([]);
    else setHistory((old) => [...old, `> ${command}`, ...(commands[command] ?? [ `Command not found: ${command}. Type 'help'.` ])]);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
    setInput("");
  }
  return <div className="terminal-window"><div className="terminal-bar"><div className="window-dots"><i/><i/><i/></div><span><Terminal size={13}/> abhishek@dev:~</span><span className="terminal-live">LOCAL SESSION</span></div><div className="terminal-output" aria-live="polite">{history.map((line, i) => <p key={`${i}-${line}`} className={line.startsWith(">") ? "terminal-command" : ""}>{line}</p>)}</div><div className="terminal-suggestions" aria-label="Try a command">{["help", "whoami", "stack", "focus"].map((command) => <button key={command} type="button" onClick={() => runCommand(command)}>$ {command}</button>)}</div><form className="terminal-form" onSubmit={submit}><label htmlFor="terminal-input">$</label><input id="terminal-input" value={input} onChange={(e) => setInput(e.target.value)} autoComplete="off" spellCheck={false} placeholder="type a command..." aria-label="Terminal command"/><button type="submit">RUN ↵</button></form></div>;
}



