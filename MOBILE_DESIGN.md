# Meri Mobile / PWA Design Specification

**Audience:** Kanab  
**Source of truth:** `origin/main` at `7267af784bc1fc8d7a579e4eb7eff8a81d9e3081`  
**Scope:** frontend presentation and responsive behavior only. This document does not authorize changes to backend contracts, AI behavior, authentication implementation, or Voxide orchestration.

## Product States and Mobile Priority

Meri has two distinct experiences:

- **Unauthenticated web visitor → Landing/Home.** The existing `/` page remains the public product introduction, marketing/demo surface, and desktop discovery entry point. Public navigation may expose sign-in/sign-up entry points when the upcoming authentication flow is wired, but this document does not implement those controls.
- **Authenticated mobile/PWA user → Assistant.** The Assistant is the default authenticated destination and the primary mobile workspace. The user should be able to speak or type immediately rather than first entering the marketing page.

The authenticated mobile shell is intentionally designed for the product's current and near-term architecture. It has four persistent destinations: **Assistant, Dashboard, Home, Settings**. Dashboard and Settings are reserved application surfaces; they must not receive fake data or invented functionality as part of this mobile work.

## A. Current Design Language

### Product surface and evidence

The current Next.js App Router exposes only:

- `/` — the landing page assembled in `src/app/page.tsx`.
- `/assistant` — the assistant workspace in `src/app/assistant/page.tsx`.

There is no `/record`, dashboard, history, inventory, settings, or login route in `src/app`. “Record manually” is a modal state inside `AssistantWorkspace`, not a separate page. The landing page’s active sections are Hero, business ticker, interactive demo, capabilities, CTA, and footer. Several older-looking landing components exist in `src/components/landing` but are not mounted by the current `page.tsx`; they must not be treated as visible product surfaces unless the page is changed deliberately.

### Typography

- `Inter` is the body/UI font and `Space Grotesk` is the display/heading font, loaded in `src/app/layout.tsx` with `next/font/google` and exposed as `--font-inter` and `--font-space`.
- `body` uses Inter; headings use Space Grotesk (`src/app/globals.css`).
- Display text is tight and bold: the landing hero is 42px on mobile, 54px at `sm`, and 64px at `lg`; section headings are 32px on mobile and 38–44px at larger widths (`hero-section.tsx`, `capabilities-section.tsx`, `product-visualization.tsx`).
- Body copy is generally 14–16px with approximately 1.5–1.6 line height. Labels/eyebrows use Space Grotesk, uppercase, semibold, and letter spacing around `0.12em`.
- Assistant feed copy uses Inter; card amounts use Space Grotesk, 22px mobile / 24px from `sm` (`globals.css`).

### Color tokens and themes

The canonical tokens are in `src/app/globals.css`:

- Dark default: `--background: #111111`, `--surface: #181818`, `--surface-subtle: #141414`, `--surface-strong: #222222`, `--foreground: #ffffff`, `--muted: #a3a3a3`, `--faint: #737373`, `--border: #2a2a2a`, `--border-strong: #383838`.
- Light theme: `--background: #ffffff`, `--surface: #f7f7f7`, `--surface-subtle: #fafafa`, `--surface-strong: #eeeeee`, `--foreground: #111111`, `--muted: #6b6b6b`, `--border: #e5e5e5`, `--border-strong: #d4d4d4`.
- Accent/voice: `#FE6904` (`--accent`, `--voice`).
- Status: success `#16A34A`, warning `#CA8A04`, error `#DC2626`.
- Dark-first styling is intentional, but `ThemeToggle` persists either `light` or `dark` in local storage and changes the root data theme. Mobile must support both themes; do not hardcode a new palette.

### Surfaces, borders, radii, shadows, and spacing

- The visual system is predominantly monochrome with restrained orange accents, subtle 1px borders, and limited shadows.
- Landing content uses a `max-w-[1240px]` container, `px-4` on narrow screens and `sm:px-8` at larger widths.
- Landing sections use `py-20` on mobile and approximately `py-[120px]` at `lg`; cards commonly use `rounded-2xl` or `rounded-[16px]`, `p-6`, `border border-border`, and `bg-surface`.
- Shared `Card` uses `rounded-2xl`, `p-5` / `sm:p-6`, `bg-surface`, and `shadow-sm`. The assistant’s structured cards use a 16px radius, `1.125rem 1.25rem` padding, and a border.
- Pills and status badges are fully rounded. Buttons are typically rounded-full on the landing page and rounded-lg in shared UI primitives.
- Preserve `design.md`’s established spacing vocabulary: 4px/8px/16px/24px/40px/64px increments, 24px mobile gutter where appropriate, and 80px mobile section rhythm. Existing implementation classes take precedence where they differ.

### Buttons, inputs, cards, icons, and interaction

- `src/components/ui/button.tsx` provides primary, secondary, accent, and ghost variants with `min-h-11`, 16px horizontal padding, 14px text, and 8px radius.
- `src/components/ui/input.tsx` provides full-width `min-h-11` inputs, 10px radius, border, surface/background fill, accent focus border and ring.
- `src/components/ui/icon-button.tsx` provides a `size-11` bordered icon button with an accessible label.
- `src/components/ui/badge.tsx` provides outlined, rounded status badges. Assistant-specific badges are in `globals.css` and `structured-cards.tsx`.
- Icons are inline SVGs with simple 1.7–2px strokes. There is no icon package; continue using the existing inline SVG style and accessible labels.
- Focus-visible outlines are 2px accent with 3px offset. Tap highlight is disabled. Reduced motion disables the project’s animations.
- Landing primary CTA is an orange pill (“Try Meri”); secondary CTA is a transparent bordered pill. Assistant controls use quiet bordered surfaces and orange only for active voice/send actions.

### Navigation and hierarchy

- Landing desktop navigation is sticky, 64px high, bordered, and centered around `Demo`, `Capabilities`, and `/assistant`, with theme toggle and “Try Meri” on the right (`navbar.tsx`).
- Below `md` (768px), the navbar keeps the logo and opens a full-screen dialog menu from a 40px hamburger control. The menu locks body scroll, closes on Escape, and includes the same links, theme control, and CTA.
- Assistant has its own sticky 56px header: back-to-home link, backend status pill, desktop-only “Record manually” control, and theme toggle.
- The Assistant is a full-height workspace: voice orb/header region, independently scrolling feed, and bottom composer region.

## B. Mobile Design Principles

1. Translate, do not rebrand. Keep the black/white/gray foundation, orange voice accent, Space Grotesk/Inter pairing, 16px cards, pill actions, and restrained motion.
2. Optimize the existing primary job: quickly speak/type an event or ask a business question, see the result, and continue. Reserve future navigation destinations without inventing their data or behavior.
3. Keep one-handed controls reachable. Use full-width or near-full-width actions, 44px minimum interactive boxes, and avoid placing essential actions in the top corners only.
4. Use a single clear vertical hierarchy. Stack desktop grids; do not shrink multi-column content until it becomes unreadable.
5. Preserve context. Keep the current assistant feed, confirmation step, clarification question, and API error message visible rather than hiding them behind generic toasts.
6. Respect both themes and reduced-motion preferences. Do not replace token-based colors with mobile-only values.
7. Prefer responsive variants of existing components over parallel “mobile” pages or duplicated state machines.

## C. Mobile Navigation

### Persistent authenticated bottom navigation

The primary mobile navigation is a fixed bottom navigation bar on authenticated mobile/PWA screens. It is **not** replaced by a hamburger menu merely because the current repository has only `/` and `/assistant`; the shell establishes a scalable product structure for the upcoming authenticated application.

The four destinations, in this order, are:

1. **Assistant** — primary workflow: speak, type, receive answers, confirm records, answer clarifications, and interact with Voxide.
2. **Dashboard** — business overview and insights. This is a reserved/future route; do not invent metrics, charts, or placeholder business data.
3. **Home** — the existing landing/home experience. It remains available from the authenticated shell but is not the default authenticated destination.
4. **Settings** — reserved account/application surface for future profile, session, privacy/data, deletion, and preference controls. Do not invent detailed settings UI or behavior.

Navigation requirements:

- Fixed to the bottom on authenticated mobile screens, with a `z-index` above page content.
- Uses the existing inline SVG icon style and Meri token system; do not add an icon library or use generic third-party navigation styling.
- Each destination has a clear accessible label and at least a 44px touch target. Active state uses existing foreground/accent/border language; inactive state uses muted text/icon color.
- Assistant is the default destination after authenticated app entry and should be visually primary without making the other destinations look disabled.
- The bar must include bottom safe-area padding, and page content must include equivalent bottom clearance. It must never cover the Assistant composer, a modal action row, cards, or focused form controls.
- Transitions between authenticated destinations should preserve the shared shell/header/bottom-navigation geometry and use predictable page scrolling. Do not preserve Assistant feed state by duplicating the workspace; use the existing component/state architecture.
- The navigation is intentionally limited to these four items. Do not add History, Inventory, Record, or other arbitrary tabs.

The current landing `Navbar` and its full-screen hamburger menu remain appropriate for public web discovery and desktop/landing navigation. They are not the primary authenticated mobile navigation. On the public landing page, retain the existing Demo, Capabilities, Assistant, theme, and Try Meri behavior; an authenticated shell may route Home to `/` and Assistant to `/assistant` until auth-aware routing exists.

## D. Authenticated Mobile Application Shell

The future authenticated shell should follow this structure:

```text
Authenticated user
        ↓
Mobile application shell
        ↓
┌────────────┬────────────┬────────────┬────────────┐
│ Assistant  │ Dashboard  │    Home    │  Settings  │
└────────────┴────────────┴────────────┴────────────┘
```

Shell requirements:

- Assistant is the default authenticated route and occupies the primary workspace immediately after app launch.
- Every authenticated screen shares bottom-navigation placement, safe-area handling, theme tokens, transition/layout conventions, and content clearance.
- The shell must have room for future authenticated features without changing the four-item information architecture.
- Dashboard and Settings may be route placeholders only when routing architecture requires them; they must not display fake dashboards, fake account details, or fake settings controls.
- Home is the existing public landing experience, available as a secondary destination. It does not replace Assistant as the authenticated start surface.
- Upcoming Supabase authentication should distinguish public state (landing and auth entry) from authenticated state (Assistant, Dashboard, Home, Settings). Do not implement or redesign Supabase authentication in this task.

## E. Assistant Mobile Experience

The Assistant is implemented in `src/components/assistant/assistant-workspace.tsx` and is the default authenticated mobile destination. Preserve its state and API flow: text is sent to the AI engine `/interpret`; interpretation either opens event review, proceeds to `/api/v1/query`, or produces clarification; confirmed events use `/api/v1/events`. The mobile work changes layout and ergonomics only.

### Header and voice entry

- Keep the 56px sticky header and `max-w-4xl` content alignment, but use horizontal padding that remains usable at 360px (`px-3` or `px-4`). The authenticated shell's persistent bottom navigation remains outside the feed/composer layout.
- Keep the back arrow + Meri wordmark on the left, status on the right, and theme toggle. At 360px, the status pill may reduce to the colored dot with an accessible label; do not remove the status state.
- Keep `VoiceOrb` as the primary voice entry point. Its current outer size is 112px at base and 144px from `sm`; on 360–430px it should remain prominent but not crowd the first message. Keep the orange glow, breathing animation, microphone idle icon, waveform active icon, and “Tap to speak or type below” / processing labels. Respect `prefers-reduced-motion`.
- The orb is a control with `aria-label` “Tap to speak” or “Stop speaking”. Preserve that behavior. Voxide’s global widget remains a separate optional entry point; do not fake a second voice engine in the workspace.

### Feed, messages, and scrolling

- Keep a single vertically scrolling feed (`#assistant-feed`) between the orb region and composer. It currently uses `overflow-y-auto`, `space-y-4`, 16px vertical padding, and horizontal `px-4` (`sm:px-6`).
- User messages remain right-aligned in the existing dark/strong-surface bubble with top-right 4px radius, max 85% width on mobile, word breaking, and Inter text.
- Assistant result cards remain left-aligned and may use up to 95% width on mobile. Keep `assistant-card`, 16px radius, border, badge/timestamp row, and amount hierarchy.
- Sale cards retain orange “Sale Recorded” badge and orange dot; expense cards remain neutral; inventory status retains green stock pill; clarification retains orange “Needs Clarification”.
- Query answers use the existing `Answer` card and may include `query_type`/`result` as supplied by the API. Long responses must wrap naturally, never overflow horizontally, and remain in the feed. Do not truncate business answers without an explicit expansion affordance.
- Empty state remains a quiet centered “Ask a question about your business.” message. It should sit below the orb with enough vertical breathing room, not be mistaken for an error.
- New feed items and the processing card should continue to scroll the feed to the bottom. Do not scroll the whole document when the user is reading older messages.
- Do not auto-scroll if a future implementation detects the user has intentionally scrolled away from the bottom; provide a visible “new response” affordance rather than stealing context.

### Clarification, confirmation, success, and errors

- Clarification remains an inline card with the question and optional choice pills. On narrow screens, pills wrap; each must remain a comfortable touch target. Selecting a pill should populate/focus the composer as it does now.
- Natural-language create-event results continue opening the existing manual review modal. On mobile it is a bottom sheet by default, with the same fields, summary, Edit/Cancel, and Confirm Record actions. It may grow to near-full-height when content requires it, but its intended interaction model remains a dismissible bottom sheet.
- Confirmation must remain explicit. The current Voxide flow uses `window.confirm` for dangerous record capabilities; do not bypass confirmation or imply that a voice action was recorded before the API succeeds.
- Processing keeps the existing “Processing” card and disables composer/suggestion actions. Sending keeps “Sending this record…” in the orb sublabel where applicable.
- Errors remain visible inline with `role="alert"` and the current API message. Distinguish configuration, network, generic API, and clarification failures as the client already does. Do not replace failures with success-shaped empty states.
- Successful event responses append the existing recorded card/note to the feed and close/reset the manual modal.

### Suggestions and composer

- Keep the horizontal, no-scrollbar “Try asking:” suggestion row above the composer. It is intentionally horizontally scrollable on small screens; do not force all four suggestions to wrap into multiple rows.
- Keep the rounded surface composer with transparent text input and circular orange send button. At base the send control is 36px in the current implementation; the mobile variant should provide at least a 44px hit area without changing the visual circular icon.
- Keep the exact placeholder “Ask a question about your business...”. Use a 16px input size on mobile where possible to avoid browser zoom.
- The composer should remain above the fixed bottom navigation and bottom safe area, and above any Voxide floating UI. It should not be covered by the keyboard or browser gesture area.
- The existing mobile “Record manually” link below the composer can become a clearly tappable secondary control with the same muted/underlined treatment. It opens the modal, not a new route.

### Keyboard and long-content behavior

- Keep the assistant shell as a flex column with a constrained scrolling feed; avoid `100vh` assumptions that leave the composer behind mobile browser chrome. Use dynamic viewport units or a measured visual viewport where necessary.
- When the input is focused, keep the composer visible above the keyboard, preserve the current feed scroll position, and scroll the latest submitted/processing item into view after submit.
- Long item names, customer names, questions, and API messages must wrap (`overflow-wrap:anywhere` where needed). Controls and cards must not produce horizontal scrolling.

### Floating controls and collision behavior

- Any floating Assistant/Voxide control must remain inside the usable viewport.
- It must never overlap the fixed bottom navigation, Assistant composer, manual-sheet action row, or focused keyboard area.
- It must respect top/bottom safe-area insets and reposition vertically when the available space changes.
- When the keyboard opens, it must remain reachable or temporarily move to a non-colliding position; it must never become inaccessible behind the keyboard or browser chrome.
- The exact CSS/SDK mechanism is implementation-dependent, but these collision outcomes are mandatory.

## F. Record / Manual Event Experience

There is no standalone Record page. The existing manual experience is the modal in `AssistantWorkspace`, opened from the desktop header or the mobile “Record manually” action. Keep it in that context and preserve the event/API contract.

### Form structure

- On mobile, use a dismissible bottom sheet as the default presentation. It must respect safe areas, support internal scrolling, move appropriately when the keyboard opens, and avoid hiding focused fields or important actions. It may become appropriately sized/near-full-height when the content requires it, while retaining bottom-sheet behavior. Keep the scrim, `role="dialog"`, `aria-modal`, title, close button, bordered `bg-surface` panel, and internal scrolling.
- Keep the current title “Record what happened”, eyebrow “Manual Recording”, and event-type selector.
- The event type options are exactly: Sale, Expense, Purchase, Inventory adjustment, Customer debt.
- Stack all fields into one column at 360–430px. The current sale/purchase/inventory Item + Quantity two-column grid must become stacked below the smallest layout where labels and values remain comfortable; do not make number inputs tiny.
- Preserve conditional fields:
  - Sale: item, positive quantity, amount (ETB), optional customer, optional date.
  - Purchase: item, positive quantity, amount (ETB), optional supplier, optional date.
  - Expense: description, amount (ETB), optional category, optional date.
  - Inventory adjustment: item, non-zero quantity (negative decreases stock), reason, optional date.
  - Customer debt: customer, positive amount (ETB), debt direction, optional date.
- Keep labels above controls, current placeholders, native number/date/select controls, and existing tokenized input treatment. Inputs should use the shared 44px minimum-height pattern and 16px mobile text where browser zoom is a concern.

### Review, validation, and submission

- “Review” validates client-side exactly as current code does: required names/descriptions/reasons, positive amount/quantity rules, non-zero inventory adjustment, and valid debt direction. Show the exact validation message near the form with `role="alert"` and keep the invalid field usable.
- Review changes the modal to the existing pending-event summary: “Review this event before it is sent to the business service”, summary, optional date, “Record this?”, Edit/Cancel, and Confirm Record.
- On mobile, make the two review actions full-width or equal-width stacked/side-by-side only when both fit with at least 8px separation. Confirm must be visually primary; Edit/Cancel remains secondary.
- Keep `manualSubmitting` disabled state and “Recording…” label. Do not allow accidental double submit.
- On API success, append the existing recorded card/note and reset the form. On API failure, keep the modal open, show the message inline, and surface clarification fields/options in the feed as the current implementation does.
- When the keyboard opens, the focused control and the action row must remain scrollable into view. Closing the sheet should restore the assistant context without resetting unrelated feed state.

## G. Public Homepage Mobile Experience

The visible public homepage is assembled in `src/app/page.tsx`. It is a public web/marketing surface, not the primary authenticated mobile application:

1. `Navbar`
2. `SignalField` + `HeroSection`
3. `BusinessTicker`
4. `ProductVisualization` (`#demo`)
5. `CapabilitiesSection` (`#capabilities`)
6. `CtaSection`
7. `Footer`

### Responsive guidance (secondary priority)

- Keep the sticky 64px landing header and existing hamburger full-screen menu for public web discovery. Keep logo, Demo, Capabilities, Assistant, theme, and Try Meri.
- Hero remains centered: orange eyebrow, “Run your business by voice.”, supporting copy, orange “Try Meri”, and bordered “See how it works”. At 360–430px, keep the existing 42px hero scale, allow natural wrapping, and use `px-4`; do not reduce the headline to an unreadable size.
- Keep `SignalField` as decorative and `aria-hidden`; it must never intercept taps or create a horizontal overflow. Reduce density or visual intensity if performance is poor on low-end mobile, but do not turn it into a new interactive feature.
- Keep the business ticker as a single horizontal marquee with the current operations: SALES, EXPENSES, PURCHASES, INVENTORY, CUSTOMER DEBT, BUSINESS INSIGHTS. Preserve its reduced-motion behavior. The existing mobile animation speed is 28s.
- Stack the interactive demo vertically: scenario pills may horizontally scroll or wrap; “You say”, orb/understanding state, and “Meri responds” should be one readable column. Keep scenario selection, Replay demo, and the three-step visual states. Do not connect the demo to fake live business data.
- Stack capability cards one column at a time. Keep all six actual capabilities and their “Try saying” examples. Preserve the card’s icon, title, description, divider, and example; do not hide core capabilities just to shorten the page.
- Keep CTA card content and both links, with full-width or comfortably sized buttons when the viewport is narrow.
- Footer stacks brand, Product links, Experience links, and copyright/Voxide attribution. Keep external GitHub link and current-year behavior.
- Use existing section rhythm (`py-20` mobile), `px-4`, and `gap-4`/`gap-6` patterns. Do not redesign the desktop homepage or introduce a different mobile brand. This public landing responsiveness is lower priority than the authenticated shell, Assistant, bottom navigation, composer/keyboard behavior, Voxide, manual Record, Dashboard shell, Settings shell, and PWA behavior.

## H. Voxide Mobile Experience

Voxide is mounted once in `src/app/layout.tsx` through `AssistantWidget`, which renders nothing unless `NEXT_PUBLIC_VOXIDE_PUBLIC_KEY` is present and `NEXT_PUBLIC_VOXIDE_ENABLED=true`. Its visual props are intentionally not passed; appearance is controlled by the Voxide dashboard (`src/components/voxide/assistant-widget.tsx`).

- Keep Voxide globally mounted across navigation so an active voice call is not interrupted.
- Treat the Voxide widget as an optional floating/global control. It must not cover the assistant composer, manual-record action, feed cards, modal action row, or landing CTA.
- If Voxide’s dashboard supports mobile position/size, configure it to stay inside the left/right safe area and above the composer/bottom inset. Do not hardcode appearance props that override the dashboard.
- Preserve all six registered capability paths in `src/lib/voxide/client.ts`: five dangerous record actions (sale, expense, purchase, inventory adjustment, customer debt) and one read-only business query. Preserve the existing confirmation callback, clarification behavior, shared `createEvent`/`queryBusiness` client, business ID, language, and allowed fields.
- Voxide may be disabled; the text assistant must remain fully usable. The mobile UI must not show a dead voice control when the widget/client is unavailable.
- Do not change voice behavior, capability names, API routing, confirmation semantics, authentication, or backend integration.

## I. Responsive Breakpoints

The project uses Tailwind v4 defaults in practice: base styles, `sm` at 640px, `md` at 768px, and `lg` at 1024px. `design.md` names 768px as the mobile breakpoint and 1024px as tablet. Existing code also uses `sm`, `md`, and `lg`; do not add many custom breakpoints.

Recommended strategy:

- **Base / 360–639px:** one-column layout, 16px page gutters (`px-4`), stacked cards/forms, full-width essential actions, dynamic viewport height for Assistant and modal.
- **`sm` / 640–767px:** retain one-column product flow; allow larger orb, typography, card padding, and the existing `sm` widths. Manual fields may use two columns only if each remains usable.
- **`md` / 768–1023px:** desktop-style landing navigation may return; assistant remains a centered constrained workspace. Use layout changes only where existing `md` classes support them.
- **`lg` / 1024px+:** restore landing multi-column grids and desktop section spacing; preserve `max-w-[1240px]` and assistant `max-w-4xl`.

Explicit viewport checks:

- **360px:** minimum supported narrow layout; no horizontal overflow, no clipped header/status, stacked manual form and demo.
- **375px:** common compact device; verify suggestion row, composer, card badges/timestamps, and modal actions.
- **390px:** common modern device; verify orb/feed/composer vertical balance and long card content.
- **414px:** larger phone; verify that cards do not become awkwardly wide and the modal remains comfortably reachable.
- **430px:** upper phone width; verify landing sections, demo stacking, and optional Voxide placement.
- **Desktop:** at least 1024px and a wide 1240px container; verify existing desktop grids/navigation are not regressed.

## J. Safe Areas / Mobile Browser Behavior

- Set or preserve `viewport-fit=cover` only if required by the chosen safe-area implementation; the current Next viewport declares `device-width` and `initialScale: 1` but no safe-area behavior.
- Add `env(safe-area-inset-top)`/`env(safe-area-inset-bottom)` padding to the fixed bottom navigation, composer region, fixed/sticky headers, and modal sheet where those surfaces touch device edges. Do not use safe-area padding as an arbitrary content margin in the middle of the page.
- The assistant shell currently uses `h-screen max-h-screen`; replace or augment it responsively with dynamic viewport sizing or equivalent browser-safe behavior so Safari/Chrome browser bars do not hide the composer or bottom navigation. The exact `dvh`, Visual Viewport API, resize-observer, or other mechanism may be selected during implementation/testing.
- The fixed bottom navigation requires content clearance equal to its rendered height plus the bottom safe-area inset. The Assistant composer requires its own clearance above the navigation; no message, card, focused field, or modal action may sit beneath either fixed surface.
- The manual dialog and landing menu need their own safe-area-aware padding and internal scrolling. Avoid locking the body in a way that prevents the modal’s focused input from scrolling.
- Keyboard-open state must resize or translate the composer above the keyboard, not leave it behind the IME. Test both iOS Safari and Android Chrome.
- Voxide’s floating surface must be positioned relative to the safe-area, bottom navigation, and composer; if the SDK offers collision/position controls, prefer those dashboard-supported controls.

## K. PWA

PWA infrastructure already present:

- `src/app/layout.tsx` declares `manifest: "/manifest.webmanifest"`, theme color `#111111`, `colorScheme: "dark light"`, device-width viewport, and `/icon.svg`.
- `src/app/manifest.ts` defines name/short name `Meri`, start URL `/assistant`, `display: "standalone"`, background/theme `#111111`, and one SVG icon (`/icon.svg`, `sizes: "any"`, `purpose: "any"`).
- `src/app/icon.svg` is a 192px rounded near-black icon with orange signal bars.

The mobile implementation should deliver a valid installable PWA configuration with an Assistant-first standalone application shell, appropriate Meri app icons, correct theme/background metadata, and correct viewport/safe-area behavior. Preserve the Assistant start URL, standalone display, Meri name, dark/orange identity, and theme metadata. Additional icon variants may be added only if platform/installability testing requires them; the exact icon set is not a product-design decision. There is no service worker, Workbox, cache strategy, offline queue, or offline data support in this repository. Do not promise offline recording or add a fake offline mode. Network/config/API failures must continue to use the existing explicit error states.

## L. Mobile Interaction Standards

- Use at least 44×44 CSS px hit areas for buttons, icon buttons, close controls, send, theme toggle, suggestion pills, and menu controls. Preserve the existing visual size with padding/hit-area wrappers where necessary.
- Keep at least 8px between adjacent controls; use 12–16px between primary/secondary actions where the layout allows.
- Use 16px input text on mobile to avoid automatic browser zoom. Keep visible labels above fields; never rely on placeholder-only labeling.
- Preserve 2px accent focus-visible outlines with offset. Focus must remain visible in both themes and inside the dark scrim/modal.
- Provide pressed/active feedback consistent with existing `active:scale-95`, border-accent, opacity, or surface-strong patterns; do not introduce noisy animations.
- Disabled/loading controls use the existing opacity and cursor treatment, remain non-submit-able, and expose text such as “Processing…” or “Recording…”.
- Errors use inline `role="alert"` content near the affected action/form. Do not rely only on color, transient toasts, or console logging.
- Native scrolling areas must show clear content boundaries, support momentum scrolling on iOS, and avoid nested scroll traps except the intentionally scrollable feed, suggestion row, and modal.
- Prevent accidental taps on destructive/recording actions with the existing explicit review/confirmation step. Do not make a whole card submit when only its button is actionable.
- Keep all fixed/sticky surfaces above content with z-index and padding coordinated; verify that no card, keyboard, modal action, bottom-navigation item, or Voxide control is obscured.

## M. Viewport Test Matrix

| Viewport | Surfaces to check | Acceptance focus |
|---|---|---|
| 360 × typical mobile height (for example 360×800) | Authenticated shell/bottom nav; Assistant header/orb/empty feed/composer; manual sheet | No horizontal overflow; four nav targets fit; 44px controls; keyboard does not hide composer/nav; form actions remain reachable |
| 375 × typical mobile height (for example 375×812) | Assistant with user + assistant cards, clarification, suggestion row; confirmation sheet | Cards wrap; timestamps/badges remain legible; suggestion row scrolls; bottom nav and confirmation actions do not clip |
| 390 × typical mobile height (for example 390×844) | Assistant long response and processing state; Voxide if enabled; theme toggle | Feed auto-scrolls to latest result; long text wraps; optional widget avoids nav/composer/keyboard; light/dark tokens hold |
| 414 × typical mobile height (for example 414×896) | Full manual event variants; authenticated shell; public landing demo | Conditional fields stack correctly; native controls are usable; bottom clearance is correct; public demo remains readable but secondary |
| 430 × typical mobile height (for example 430×932) | Authenticated Assistant shell; future Dashboard/Settings route shell; public landing scroll | Fixed nav, composer, safe areas, menu, and modal remain correct; no content behind fixed UI; future routes show structure only |
| Desktop (at least 1024px; also wide 1240px container) | Public landing navigation/grids/demo; Assistant max-width workspace; manual modal | Existing desktop visual identity, multi-column landing layouts, sticky headers, hover/focus states, and constrained assistant feed are preserved; authenticated shell remains coherent |

For each viewport test both dark and light theme, reduced motion, a disconnected/configuration-error response, and the Voxide-disabled state. On mobile, test iOS Safari and Android Chrome with the keyboard open.

## N. Implementation Guidance

### Reuse

- Reuse `Navbar`, `MeriLogo`, `ThemeToggle`, `VoiceOrb`, `SaleExpenseCard`, `ClarificationCard`, and the existing inline SVG icon conventions.
- Reuse `AssistantWorkspace` state transitions and `src/lib/api/client.ts`; responsive work should not fork the API flow.
- Add one shared authenticated shell/bottom-navigation component when the shell is introduced; do not duplicate four navigation bars in each future route. Use the existing `MeriLogo`, `ThemeToggle`, token classes, and inline SVG conventions.
- Reuse `globals.css` tokens, `assistant-card` classes, badge classes, focus rules, motion/reduced-motion rules, and `design.md` spacing/type guidance.
- Reuse `Button`, `Input`, `Card`, `Badge`, and `IconButton` when their semantics fit. Where the existing assistant form has bespoke classes, align it with shared primitives without changing behavior.

### Where responsive logic belongs

- Keep landing layout changes in the existing landing components and Tailwind responsive classes.
- Keep assistant layout, mobile composer, feed, and modal behavior in `AssistantWorkspace` plus narrowly scoped shared CSS/utilities. Avoid a separate `MobileAssistantWorkspace`.
- Keep visual-only modal sheet sizing and safe-area rules close to the modal or in `globals.css`; keep API/state logic in the existing component.
- Keep Voxide placement/configuration in the existing `AssistantWidget`/dashboard integration. Do not duplicate the widget in individual pages.
- Use CSS media queries for layout whenever possible; use client-side viewport logic only when a browser API is genuinely required (for example keyboard/visual viewport handling).
- Keep route/auth guards and the public-versus-authenticated distinction at the application-shell/routing boundary. Do not make individual feature components infer authentication or redirect themselves.

### Do not duplicate or accidentally change

- Do not duplicate feed rendering, event validation, confirmation, or API calls for mobile.
- Do not add route-specific fake data, local business calculations, a second event schema, an offline queue, or a mobile-only authentication path.
- Do not hide sale/expense/purchase/inventory/debt/query capabilities merely because the screen is narrow.
- Do not treat unused legacy landing components as current UI requirements without verifying a deliberate page change.
- Keep changes surgical and test responsive behavior at the matrix sizes before touching desktop styles.

## O. Explicit Non-Goals

The mobile implementation must **not**:

- Redesign the product from scratch or create a separate mobile brand.
- Change the desktop visual identity, palette, typography, token system, or product hierarchy without a separately approved design change.
- Invent new product functionality, routes, screens, tabs, dashboards, history views, or settings.
- Create fake data or connect the landing demo to live business state.
- Modify AI-engine behavior or the `/interpret` contract/behavior.
- Modify backend event schemas, business logic, calculations, persistence, or API contracts.
- Modify Voxide capabilities, confirmation semantics, voice behavior, orchestration, or integration architecture.
- Implement or redesign Supabase authentication in this documentation task. The upcoming authenticated shell must remain compatible with Supabase authentication, but auth implementation and migration away from the current temporary `MVP_BUSINESS_ID` are separate work.
- Introduce unrelated refactors, package migrations, or a parallel mobile component tree.
- Remove existing functionality merely to simplify mobile.
- Claim or implement offline recording when the repository has no offline infrastructure.
