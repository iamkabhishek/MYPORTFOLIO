import type { Metadata } from "next";
import "./globals.css";
import ParticleCursor from "@/components/particle-cursor";

export const metadata: Metadata = {
  title: "Abhishek Kumar — Backend Developer",
  description:
    "Portfolio of Abhishek Kumar, a Backend Developer specializing in Node.js, TypeScript, the MERN stack, APIs, and cloud-native applications.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <ParticleCursor />
        {children}
      </body>
    </html>
  );
}
