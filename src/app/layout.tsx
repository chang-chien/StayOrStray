import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stay Or Stray",
  description: "Compare financial scenarios between staying abroad and returning home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <header className="border-b border-[var(--border)] bg-[var(--card)]">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
            <a href="/" className="text-lg font-semibold">
              Stay Or Stray
            </a>
            <nav className="flex gap-4 text-sm">
              <a href="/scenarios" className="text-[var(--muted)] hover:text-[var(--foreground)]">
                Scenarios
              </a>
              <a
                href="/scenario/new"
                className="rounded-md bg-[var(--primary)] px-3 py-1.5 text-white hover:bg-[var(--primary-hover)]"
              >
                New Scenario
              </a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
