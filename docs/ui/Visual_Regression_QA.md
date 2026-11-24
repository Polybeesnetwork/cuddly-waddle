# Beacon Ledger visual regression investigation

## Root cause

The production build does include the stylesheet: `index.html` links `/app/style.css`; Vite compiles it to a fingerprinted CSS asset; the asset was served from the public Vercel origin and the local Chromium audit confirmed the stylesheet was loaded. CSS parsed and the core `.sidebar`, `.main-area`, `.hero`, `.metric-card`, and button styles computed as expected. The grid and button styling were not absent in the inspected build.

A responsive constraint was reproducibly wrong at the tablet breakpoint. Between 761–1050px, the hero retained the desktop two-column grid while `.hero-copy` was limited to 64% and artwork overlaid from 33%. At 768px, that combination left the title/CTA area cramped and caused awkward wrapping. The fix makes the tablet hero a single layout layer with a wider text column and controlled decorative art. The condensed type scale also made labels look unstyled at normal viewing distance; minimum sizes were raised while retaining smaller secondary micro-labels.

No Vite build-path failure or class-name mismatch was found. Horizontal overflow did not reproduce at the requested widths. The new layout keeps the RPC, scanner and wallet behavior unchanged.

## Changes

- `app/style.css`: corrected the tablet hero constraint, raised readable text-size floors, retained fixed desktop rail and mobile bottom navigation, controlled the hero image, and kept all decorative motion under reduced-motion preferences.
- `reports/ui-qa/*.png`: real Chromium screenshots from the local Vite build at the requested desktop, laptop, tablet and phone sizes, plus the mobile campaign route.
- `reports/ui-qa/results.json`: computed layout measurements and interaction checks.
- No security modules or financial features were added.

## Browser QA evidence

Headless Chromium (Playwright Core + packaged Chromium; temporary local QA dependencies only) loaded the local Vite app at:

| Viewport | Document width | Horizontal overflow | Sidebar | Hero text/content |
|---|---:|---|---:|---|
| 1440 × 900 | 1440 | No | 248px fixed rail | Desktop split, copy 581px |
| 1280 × 720 | 1280 | No | 248px fixed rail | Desktop split, copy 500px |
| 768 × 1024 | 768 | No | 220px fixed rail | Tablet hero uses a wider copy column; title fits 307px |
| 390 × 844 | 390 | No | 390px mobile bottom bar | Single-column hero, art contained |
| Campaign 390px | 390 | No | Mobile bottom navigation | Campaign cards stack |

All intelligence navigation views activated; the notifications button opened Security Signals; the wallet dialog opened and rejected malformed input accessibly; local notes and saved views worked; with RPC requests deliberately intercepted as offline, the RPC UI changed to **Degraded**. No browser `pageerror` was observed in the viewport run. Local HTTP smoke checks had already returned 200 for `/` and `/campaign.html`.

Screenshots show the deliberately degraded RPC state because the sandbox's browser could not reach BNB RPC endpoints. No mocked chain data was inserted. Real-chain read status is not inferred from these screenshots.

## Files

- `desktop-1440x900.png`
- `laptop-1280x720.png`
- `tablet-768x1024.png`
- `mobile-390x844.png`
- `campaign-mobile-390x844.png`

## Remaining QA boundary

This visual pass is against the current local Vite source, not a phone camera or a production-browser session. It confirms rendered layout at the given viewport dimensions, but does not certify every device/browser/font combination. The screenshots include the offline state. The scanner remains subject to existing RPC coverage, pagination, and local-storage limitations.
