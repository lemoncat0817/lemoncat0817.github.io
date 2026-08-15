---
title: MAJI Tea POS System
tagline: A complete ordering and operations back office for a bubble tea shop
summary: A full POS system covering login, ordering, discounts, order history and business analytics, with role-based access control and an admin panel. The largest project I have built.
year: 2024
role: Frontend developer (solo)
type: Full web application
stack:
  - Vue 3
  - Vue Router
  - Pinia
  - Element Plus
  - ECharts
  - Tailwind CSS
  - Sass
  - Day.js
  - Vite
demo: https://lemoncat0817.github.io/Vue3-POS
repo: https://github.com/lemoncat0817/Vue3-POS
video: 4ELxt64heEs
cover: ../../../assets/work/maji-pos.jpg
coverAlt: The MAJI Tea POS ordering screen, with drink categories on the left and the current order on the right
order: 1
featured: true
stats:
  - label: Feature modules
    value: '7'
  - label: Roles
    value: Staff / Manager
  - label: Scale
    value: Largest
---

## What it is

MAJI Tea POS is an ordering system for a bubble tea shop. It does more than take orders — it covers the whole operational loop: staff log in, pick drinks and adjust sweetness and ice, apply discounts, check out; managers review order history, adjust settings, and read business charts.

This is the **largest and most modular** project I have built, and the closest to a real commercial requirement.

## The problem

Ordering in a drinks shop differs from typical e-commerce in a few ways:

1. **Speed is everything.** At peak hours a staff member handles several orders a minute. Every unnecessary click is a cost.
2. **Option combinations explode.** One drink multiplies across size, sweetness, ice level and toppings. The UI cannot let staff get lost.
3. **Staff and managers need completely different things.** Staff need the ordering screen. Managers need reports and settings.

So the real challenge was not "building the features" — it was **giving each role exactly the interface they need and nothing more**.

## What I did

I split the system into seven modules:

| Module | Problem it solves |
| --- | --- |
| Login | Identify the user, decide what they see next |
| Ordering | The main workspace — fewest clicks to complete an order |
| Discounts | Promotions and member pricing |
| Order history | Lookups, reconciliation, customer complaints |
| Admin settings | Maintaining items, prices and options |
| Analytics | Business performance visualised with ECharts |
| Access control | Who can reach which modules |

I built the layout on **Element Plus**, because its tables, forms and dialogs are mature and have solid keyboard support — in a high-frequency input context like POS, the keyboard matters more than the mouse. Finer styling came from **Tailwind CSS** and **Sass**.

## Technical decisions

### Why Pinia rather than component-local state

The cart has to be readable by the ordering area, the order summary, and the checkout dialog at the same time. Passing props down layer by layer would mean touching three files to add one feature.

I used **Pinia** to split cart, identity and admin settings into three stores, with `pinia-plugin-persistedstate` writing state to localStorage. That solved a very practical problem: **if a staff member accidentally refreshes the page, the unpaid order does not vanish**.

### Why Element Plus instead of building components myself

I did consider hand-rolling the components. But the value of a POS system is in the business logic, not in reinventing a data table. Element Plus let me spend my time on "how discounts are calculated" rather than "how a dropdown works".

The cost is a larger bundle and fighting CSS specificity when customising. For this project — in-store devices, not a public page, no SEO requirement — that trade was worth it.

### Access control via route guards, not hidden buttons

At first I simply used `v-if` to hide manager-only buttons. Then I realised that only makes them *invisible*, not *unreachable* — typing the URL still got you in.

I moved to a guard in **Vue Router**'s `beforeEach`, deciding access by role. This was the most important lesson of the project: **frontend access control is UX, not security**. Real enforcement has to live on the server; the frontend's job is to stop users walking into dead ends.

<!-- To confirm: if this project talks to a real backend API, this section could describe how the server validates permissions -->

## What went wrong

**Cart option combinations.** Is "pearl milk tea, full sugar, no ice, with pearls" the same line item as "half sugar, less ice, no toppings"? I initially keyed the cart by drink ID, so the second cup overwrote the first. I had to build the key from the item ID *plus every selected option* before same-item-different-customisation priced correctly.

**ECharts sizing inside dialogs.** If a chart initialises while its container is still `display: none`, ECharts measures zero width and height and renders a squashed mess. The fix was calling `resize()` after the dialog's open animation finishes.

## Outcome

All seven modules were completed and shipped. The full flow is in the walkthrough video below.

## What I would change

1. **Add tests.** Discount calculation is the thing that most deserves testing — it directly affects money, and it was the part I verified purely by clicking through manually.
2. **Use TypeScript.** This project is plain JavaScript. The order object travels between many modules, and types would have saved a lot of debugging. I switched to TypeScript on the next project.
3. **Make discount rules configuration, not code.** Adding a discount type currently means changing code; ideally a manager could define rules from the admin panel.
