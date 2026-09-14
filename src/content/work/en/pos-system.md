---
title: POS System
tagline: A multi-tenant POS system for restaurants and drink shops — ordering, back office and analytics
summary: A full-stack POS system built with Vue 3 and Hono/Cloudflare Workers/D1, with multi-tenant data isolation, offline-first ordering, a three-tier auth model and OAuth admin login. My largest project to date, spanning both frontend and backend.
year: 2026
role: Full-stack developer (solo)
type: Multi-tenant SaaS web application
stack:
  - Vue 3
  - Pinia
  - TanStack Query
  - Tailwind CSS
  - Dexie
  - Hono
  - Cloudflare Workers
  - D1
  - Drizzle ORM
  - Zod
demo: https://lemoncat0817.github.io/pos-system/
repo: https://github.com/lemoncat0817/pos-system
cover: ../../../assets/work/pos-system.png
coverAlt: The pos-system ordering screen, with menu categories on the left and the current cart and checkout button on the right
order: 1
featured: true
---

## What it is

pos-system is a multi-tenant POS system for restaurants and drink shops. Staff log in, take orders, apply member discounts and check out; managers review order history, manage back-office settings, and read business analytics — a complete operational loop, with both frontend and backend built from scratch, not just a frontend demo.

It's the **largest and most modular** project I've built: a real backend, multi-tenant data isolation, and cross-device offline sync, all working together.

## The problem

POS systems for food and drink businesses face a few realities that don't apply to typical back-office software:

1. **The network is unreliable by default.** In-store Wi-Fi drops are routine; checkout can't stop working because of it.
2. **One system serves many tenants** sharing one database, yet their data must stay completely isolated — a single query missing a tenant filter is a security incident.
3. **One device, three different identities.** The device itself, the operator on shift, and the tenant owner each carry a different trust level and can't share one session.

So the real challenge wasn't "build an ordering screen" — it was **making checkout reliable offline, making tenant data leak-proof, and making authorization checks actually block, not just hide a button in the UI**.

## What I did

I split the system into seven modules:

| Module | Problem it solves |
| --- | --- |
| Ordering | The main workspace — keeps working offline, fewest clicks to complete an order |
| Table management | Real-time dine-in table status cards, seating time and notes |
| Membership & marketing | Membership tiers, point accrual, discount coupons |
| Order center | Multi-dimensional filtering, invoice records, refund/void audit trail |
| Access control & shifts | RBAC role permissions, OAuth admin login, end-of-shift cash reconciliation |
| Analytics | Revenue trends and top-seller rankings visualised with ECharts |
| Offline sync engine | Dexie-backed queue with exponential backoff, keeps taking orders offline |

The frontend is a Vue 3 + strict TypeScript PWA, offline-first by design. The backend is Hono running on Cloudflare Workers, with data in D1 accessed through Drizzle ORM. Business logic and API contracts shared by both sides live in their own packages instead of being maintained twice.

## Technical decisions

### Why domain logic and API contracts live in their own packages

If frontend and backend each reimplement pricing, discount rules and API types, a mismatch between the two is an incident waiting to happen. I extracted the pure TypeScript domain logic (pricing, discounts, refunds, shift calculations) and the Zod API contracts into standalone packages that both sides import — not "try to stay in sync," but making inconsistency impossible at the type level. An ESLint boundary rule blocks these packages from ever depending on Vue or a UI framework, keeping them pure logic.

### Why one database for all tenants, instead of one database per tenant

Database-per-tenant feels safer for isolation, but on Cloudflare D1 the number of databases and their cold-start cost scale linearly with tenants — operational complexity spirals fast. I chose a single multi-tenant D1 database instead, at the cost of **every query having to remember its tenant filter**. Rather than rely on memory, I wrapped it in a shared query helper, so forgetting the tenant filter is hard to do at the point of writing the query — not something caught later in code review.

### Why three separate credentials instead of one session for everything

The device, the operator, and the tenant owner represent three genuinely different trust levels: the device credential has to exist before the login screen even loads, identifying which tenant's terminal this is; the operator session is scoped to whoever is on shift and drives fine-grained authorization; the web session is the tenant owner's fallback when an operator forgets their PIN. Early on I merged all three into one token, and the exception handling for any one scenario ended up contaminating the other two. Once split apart, adding a new route only requires answering one question — which identity should this endpoint trust — without risking the existing login flow.

### Why offline-first, instead of blocking orders when disconnected

In-store Wi-Fi is unreliable by default; checkout can't stall because the signal blipped. I used Dexie to write orders to IndexedDB first, with an outbox queue that retries with exponential backoff and jitter, catching up automatically once the connection returns and listening for the `online` event. The cost is that every "submit an order" feature has to account for both the offline queue and the direct-to-server path — the easiest thing in the whole project to miss, and the easiest to only notice after shipping.

It follows the same principle throughout the project: **frontend access control is UX, not security**. The frontend route guard's job is to stop users walking into dead ends; real enforcement always lives in the backend authorization checks.

## Outcome

All seven modules are complete and actually deployed — the frontend on GitHub Pages, the API on Cloudflare Workers, the database on Cloudflare D1. CI applies database migrations and deploys both sides automatically after merging to `master`.
