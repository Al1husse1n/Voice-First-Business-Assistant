import Link from "next/link";
import { MeriLogo } from "@/components/landing/meri-logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface-subtle text-foreground transition-colors duration-200">
      <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand & Core Message */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-sm py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Meri homepage"
            >
              <MeriLogo />
            </Link>
            <p className="font-sans mt-3 text-sm leading-relaxed text-muted">
              Run your business by voice. Voice-first operational assistant
              for small businesses and retail shops.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-8 text-sm text-muted sm:gap-12">
            <div className="flex flex-col gap-3">
              <span className="font-display text-xs font-semibold uppercase tracking-wider text-foreground">
                Product
              </span>
              <a
                href="#demo"
                className="rounded-sm transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Demo
              </a>
              <a
                href="#capabilities"
                className="rounded-sm transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Capabilities
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-display text-xs font-semibold uppercase tracking-wider text-foreground">
                Experience
              </span>
              <Link
                href="/assistant"
                className="rounded-sm transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Assistant
              </Link>
              <a
                href="https://github.com/Fraol-D/Voice-First-Business-Assistant"
                target="_blank"
                rel="noreferrer"
                className="rounded-sm transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Meri. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Voice integration powered by</span>
            <span className="font-medium text-foreground">Voxide</span>
            <span className="size-1.5 rounded-full bg-[#FE6904]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </footer>
  );
}
