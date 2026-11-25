import type { Metadata } from "next";
import {
  Barlow_Condensed,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SkipLink } from "@/components/layout/skip-link";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Asad Bilal — Backend Developer | AI/ML Enthusiast",
    template: "%s | Asad Bilal",
  },
  description:
    "Personal portfolio of Asad Bilal, a Backend Developer and AI/ML Enthusiast based in Islamabad, Pakistan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${barlowCondensed.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full overflow-x-hidden bg-canvas text-ink font-sans antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SkipLink />
            <Navbar />
            <main
              id="main-content"
              tabIndex={-1}
              className="flex-1 focus:outline-none"
            >
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
