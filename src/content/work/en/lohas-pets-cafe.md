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
---

## What it is

Lohas Pet Cafe is a nine-page brand site for a pet-friendly cafe, statically generated with Nuxt 4 — each page does one job, carrying someone from discovering the brand, to browsing the menu, to actually booking a table.

## The problem

Brand sites commonly leave a gap between making people want to visit and letting them actually go: unoptimised images drag down load time, content baked into images can't be searched, and the site never says how to get there, when it's open, or whether a table is available.

This site closes that gap — every step from browsing to booking has a page and clear feedback behind it.

## What I did

The site is split into nine purpose-built pages:

- **`/reservation` for online booking.** Built with `vee-validate` and `zod`, the form automatically disables closed days and outside-hours slots, so nobody can select a time that would never be accepted.
- **`/contact` carries a full address, map, and opening hours.**
- **`/menu` uses real data, not images.** Prices live as structured HTML, not baked into a picture — searchable by search engines, and eligible for Menu structured data.
- **Images go entirely through `@nuxt/image`,** emitting multi-size WebP automatically — fast to load without sacrificing quality.
- **The component library is shadcn-vue,** built on Reka UI, with the component source copied straight into `app/components/ui` rather than pulled in as an opaque dependency — for something like a reservation form that needs precisely customised validation and styling, owning the code outright beats inheriting a generic component's defaults.

## Technical decisions

### Why multi-page instead of a single page

Content like a reservation form, a full menu, or FAQs is something people arrive looking for with clear intent — a single scrolling page is a worse fit than a dedicated URL that can be bookmarked or shared directly. Nuxt lets "multi-page" and "statically generated" coexist: `nuxi generate` emits every route as a static file, so deployment stays simple while the architecture is a proper multi-page app.

### Why shadcn-vue instead of a conventional component library

A library like Element Plus ships components as an opaque npm package. shadcn-vue instead copies the source into the project. For something like a reservation form, where the validation logic and styling both need precise customisation, owning the source outright is less work than inheriting every default behaviour of a general-purpose component. That is the same judgment call from the MAJI POS project, applied again — tools should serve the problem, not the other way round.

### Dark mode had to match native controls, not just CSS

`@nuxtjs/color-mode` doesn't just toggle a class — it keeps `color-scheme` in sync too, so native browser UI that CSS can't reach (form controls, scrollbars) switches along with everything else. Without that, a dark site can end up with a jarringly white input box.

## Outcome

All nine pages shipped and browsable offline (static generation), the reservation form disables invalid slots against the current date in real time, and both light and dark mode are fully supported across every page.
