---
title: Lohas Pet Cafe
tagline: Making people like the place before they walk through the door
summary: A brand site for a pet cafe, using a single-page narrative to introduce the story, menu, resident animals and merchandise. Fully responsive, with the emphasis on atmosphere and trust.
year: 2024
role: Frontend developer (solo)
type: Brand website
stack:
  - Vue 3
  - Pinia
  - Element Plus
  - VueUse
  - Sass
  - Vite
demo: https://lemoncat0817.github.io/Vue3-PetCafe/
repo: https://github.com/lemoncat0817/Vue3-PetCafe
cover: ../../../assets/work/pet-cafe.png
coverAlt: The Lohas Pet Cafe homepage, showing the interior and photographs of the resident pets
order: 3
featured: false
stats:
  - label: Content sections
    value: '6'
  - label: Structure
    value: Single page
  - label: Responsive
    value: Site-wide
---

## What it is

Lohas Pet Cafe is a brand site. It handles no transactions and has no login. Its only job is to **make someone who has never been want to go**.

The site uses a single-page narrative across six sections: the story behind the cafe, the food menu, the resident pet "managers", pet treats for sale, five-star reviews, and photos of the space.

## The problem

A brand site and a functional app are completely different problems.

A POS system succeeds if staff complete orders faster — that is measurable. A brand site succeeds if people want to visit afterwards — that is atmosphere, trust and feeling.

Customers of a pet cafe care about very specific things: **is it clean, do the animals look well cared for, and is the food made with any effort**. If the site does not answer those three questions, no amount of visual polish helps.

So the content order is deliberate: story first (what motivated this) → menu (the food is serious) → the resident pets (the animals are the point) → merchandise → reviews and interior photos (third-party endorsement).

## What I did

**Photography first, restrained copy.** Persuasion in this category comes from the visuals. Text fills in what the photographs cannot say; it is not the lead.

**The pets get their own section.** That is the single biggest difference between this and any other cafe, and the most memorable part. Introducing them as "managers" rather than "we have some cats" gives the brand a personality.

**Reviews and interior photos come last.** Once a visitor is interested, the final nudge they need is other people saying it is good.

## Technical decisions

### Why Vue but no Vue Router

This is a single-page narrative — everything scrolls in one view. Adding routing would only have added complexity.

I used Vue for componentisation: menu items, pet cards and review cards are all repeating structures, and rendering components from a data array is far more maintainable than hand-writing dozens of near-identical HTML blocks. **The reason to use a framework is componentisation, not the fact that it is a framework.**

### VueUse for scroll interaction

I brought in `@vueuse/core` here. Scroll position tracking and viewport size listening require registering and cleaning up event listeners, and forgetting the cleanup is a memory leak. VueUse's composables handle the lifecycle already.

This was where I first appreciated that **choosing the right utility library means writing less error-prone boilerplate**.

### Breakpoints driven by content, not devices

I did not adopt a framework's default breakpoints. I set them where the content **starts to look wrong**. The point where the menu drops from three columns to two is determined by how wide item names get before they wrap — not by some canonical device width.

## What went wrong

**Images were too large and hurt load time.** This is a photography-driven site, and unprocessed photos run to several megabytes. I only did basic compression at the time. Looking back, this is the clearest thing to fix — it needed modern formats and responsive sizes.

(Fittingly: while rebuilding this portfolio, it was this project's 1.4 MB cover image that reminded me how much image optimisation matters.)

## Outcome

All six content sections shipped, with layouts handled from desktop down to mobile.

## What I would change

1. **Optimise every image.** Convert to AVIF/WebP, add responsive `srcset`, and lazy-load anything below the fold. For a site like this it is by far the highest-return change.
2. **Make the content manageable.** Changing one menu price currently means editing code and redeploying. The owner should be able to do it themselves.
3. **Add opening hours and a map.** The ultimate conversion for a brand site is a visit, but the site never tells you how to get there or when it opens. That is a missing final step.
