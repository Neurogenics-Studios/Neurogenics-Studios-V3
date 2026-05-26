import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { LoadingProvider } from "@/components/providers/loading-provider";
import { DockNavigation } from "@/components/layout/dock-navigation";
import { ClickSpark } from "@/components/effects/click-spark";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neurogenics Studios | AI & Web Innovation",
  description: "Premium futuristic fullstack digital agency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <ClickSpark
          sparkColor="rgba(192, 132, 252, 0.8)"
          sparkSize={8}
          sparkRadius={16}
          sparkCount={6}
          duration={500}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <LoadingProvider>
              <SmoothScroll>
                <Navbar />
                <main className="flex-1 pb-28 flex flex-col">
                  <PageTransition>
                    {children}
                  </PageTransition>
                </main>
                <Footer />
                <DockNavigation />
              </SmoothScroll>
            </LoadingProvider>
          </ThemeProvider>
        </ClickSpark>
      </body>
    </html>
  );
}
