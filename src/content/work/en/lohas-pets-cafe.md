---
title: Lohas Pet Cafe
tagline: From making people want to visit to letting them actually book the table
summary: A nine-page brand site statically generated with Nuxt 4, with a reservation form that blocks closed days automatically, a component system built on shadcn-vue, fully optimised images, Restaurant/Menu/Review structured data, and live light/dark theme switching.
year: 2026
role: Frontend developer (solo)
type: Multi-page brand website
stack:
  - Nuxt
  - TypeScript
  - Tailwind CSS
  - shadcn-vue
  - Zod
  - VueUse
demo: https://lemoncat0817.github.io/lohas-pets-cafe/
repo: https://github.com/lemoncat0817/lohas-pets-cafe
cover: ../../../assets/work/lohas-pets-cafe.png
coverAlt: The Lohas Pet Cafe homepage, a full-bleed close-up of an espresso machine behind the brand tagline and Book Now / View Menu buttons
order: 4
featured: false
stats:
  - label: Pages
    value: '9'
  - label: Component system
    value: shadcn-vue
  - label: Structured data
    value: Restaurant / Menu / Review
---

## What it is

The second version of Lohas Pet Cafe. The original was a single-page brand site with one job: make people want to visit. This version pushes that a step further into a nine-page site that can actually carry someone from "I want to go" to "I have a table booked", statically generated with Nuxt 4.

## The problem

The previous case study named three clear gaps: unoptimised images were dragging down load time, changing a single word of content meant editing code, and the site never told anyone how to get there or when it was open. All three point at the same thing — for a brand site, making people want to visit isn't enough; it has to let them actually go.

## What I did

I split the single-page narrative into nine purpose-built pages and replaced the technical foundation underneath them:

- **`/reservation` for online booking.** Built with `vee-validate` and `zod`, the form automatically disables closed days and outside-hours slots, so nobody can select a time that would never be accepted.
- **`/contact` now has an address, map, and opening hours** — the exact final step the previous case study flagged as missing.
- **`/menu` uses real data, not images.** Prices live as structured HTML, not baked into a picture — searchable by search engines, and eligible for Menu structured data.
- **Images go entirely through `@nuxt/image`,** emitting multi-size WebP automatically — the single change the previous case study called the highest-return fix.
- **The component library is now shadcn-vue,** built on Reka UI, with the component source copied straight into `app/components/ui` rather than pulled in as an opaque dependency — for something like a reservation form that needs precisely customised validation and styling, owning the code outright beats inheriting a generic component's defaults.

## Technical decisions

### Why move from single-page to multi-page

Content like a reservation form, a full menu, or FAQs is something people arrive looking for with clear intent — a single scrolling page is a worse fit than a dedicated URL that can be bookmarked or shared directly. Moving to Nuxt let "multi-page" and "statically generated" coexist: `nuxi generate` emits every route as a static file, so deployment stays exactly as simple as before, while the architecture is now a proper multi-page app.

### Why shadcn-vue instead of a conventional component library

A library like Element Plus ships components as an opaque npm package. shadcn-vue instead copies the source into the project. For something like a reservation form, where the validation logic and styling both need precise customisation, owning the source outright is less work than inheriting every default behaviour of a general-purpose component. That is the same judgment call from the MAJI POS project, applied again — tools should serve the problem, not the other way round.

### Dark mode had to match native controls, not just CSS

`@nuxtjs/color-mode` doesn't just toggle a class — it keeps `color-scheme` in sync too, so native browser UI that CSS can't reach (form controls, scrollbars) switches along with everything else. Without that, a dark site can end up with a jarringly white input box.

## What went wrong

**Closed-day logic had to match between client and server.** The reservation form originally only blocked closed dates in the UI, but submitting with a crafted request still succeeded. The closed-day rule was pulled out into shared logic so both sides run the same check — the UI alone was never enough.

**Page transitions needed a fallback outside Chromium.** `experimental.viewTransition` only gets native transitions in Chromium-based browsers; everywhere else needed verifying that it degrades to a plain swap rather than getting stuck mid-transition.

## Outcome

All nine pages shipped and browsable offline (static generation), the reservation form disables invalid slots against the current date in real time, and both light and dark mode are fully supported across every page.

## What I would change

1. **Wire the reservation form to a real confirmation flow.** Submissions currently just trigger an email; there is no "the cafe has confirmed" state to show the person who booked.
2. **Move menu pricing into lightweight content management.** Prices are no longer baked into images, but changing one still means editing code and regenerating the static site. A small headless CMS would let the owner maintain it directly.
3. **Generate page-specific social preview images.** The OG image is currently one static graphic for the whole site; per-page images (menu, reservation) would make link previews more accurate.
