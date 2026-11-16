---
title: Lohas Pet Cafe
tagline: From making people want to visit to letting them actually book the table
keyword: a pet café
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

Lohas Pet Cafe is a nine-page brand site for a pet-friendly cafe, statically generated with Nuxt 4. Discovering the brand, browsing the menu and booking a table all happen on the same site.

## The problem

Brand sites commonly leave a gap between making people want to visit and letting them actually go: unoptimised images drag down load time, content baked into images can't be searched, and the site never says how to get there, when it's open, or whether a table is available.

This site closes that gap: every step from browsing to booking has its own page and clear feedback.

## What I did

The site is split into nine purpose-built pages:

- **`/reservation` for online booking.** Built with `vee-validate` and `zod`, the form automatically disables closed days and outside-hours slots, so nobody can select a time that would never be accepted.
- **`/contact` carries a full address, map, and opening hours.**
- **`/menu` uses real data.** Prices live in structured HTML, so search engines can read them and they qualify for Menu structured data.
- **Images go entirely through `@nuxt/image`,** emitting multi-size WebP automatically, so pages load fast without losing quality.
- **The component library is shadcn-vue,** built on Reka UI, with the component source copied straight into `app/components/ui`, so customising behaviour or styling means editing code that lives in the project.

## Technical decisions

### Why multi-page instead of a single page

Content like a reservation form, a full menu, or FAQs is something people arrive looking for with clear intent. A dedicated URL that can be bookmarked or shared works better for that than scrolling through a single page. Nuxt lets "multi-page" and "statically generated" coexist: `nuxi generate` emits every route as a static file, so deployment stays simple while the architecture is a proper multi-page app.

### Why shadcn-vue instead of a conventional component library

A conventional component library ships components as an opaque npm package. shadcn-vue instead copies the source into the project. For something like a reservation form, where the validation logic and styling both need precise customisation, owning the source outright is less work than inheriting every default behaviour of a general-purpose component.

### Dark mode has to reach native controls

Besides toggling a class, `@nuxtjs/color-mode` keeps `color-scheme` in sync, so native browser UI that CSS can't reach (form controls, scrollbars) switches along with everything else. Without that, a dark site can end up with a jarringly white input box.

## Outcome

All nine pages shipped and browsable offline (static generation), the reservation form disables invalid slots against the current date in real time, and both light and dark mode are fully supported across every page.
