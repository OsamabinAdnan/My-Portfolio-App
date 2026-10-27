import type { Metadata } from "next";
import { Inter, Space_Grotesk, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PortfolioShell } from "@/components/layout/PortfolioShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  title: "Osama bin Adnan | Agentic AI Developer, Web Developer, Digital Marketer & Textile Engineer",
  description: "Agentic AI Developer & Full Stack Developer building autonomous agent systems and modern web products. Learning and Specializing in agentic workflows, RAG systems, and cloud-native app delivery.",
  keywords: ["FullStack Developer", "Agentic AI Developer", "AI Automation", "Portfolio", "AI Agents", "React", "Next.js", "Python", "FastAPI", "Digital FTEs", "RAG Systems"],
  authors: [{ name: "Osama bin Adnan" }],
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/icon.png?v=2", type: "image/png" },
      { url: "/Neon Cyan Geometric O.webp", type: "image/webp" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-icon.png?v=2",
  },
  openGraph: {
    title: "Osama bin Adnan | Agentic AI Developer, Web Developer, Digital Marketer & Textile Engineer",
    description: "Agentic AI Developer, Web Developer, Digital Marketer & Textile Engineer building autonomous agent systems and modern web products",
    type: "website",
    images: [
      {
        url: "/Neon Cyan Geometric O.webp",
        width: 800,
        height: 800,
        alt: "Osama bin Adnan - Neon Cyan Geometric O",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osama bin Adnan | Agentic AI Developer, Web Developer, Digital Marketer & Textile Engineer",
    description: "Agentic AI Developer, Web Developer, Digital Marketer & Textile Engineer building autonomous agent systems and modern web products",
    images: ["/Neon Cyan Geometric O.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable} ${jetbrainsMono.variable} font-mono antialiased bg-[#07080f] text-white selection:bg-[#00f0ff] selection:text-black`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <PortfolioShell>
            {children}
          </PortfolioShell>
        </ThemeProvider>
      </body>
    </html>
  );
}