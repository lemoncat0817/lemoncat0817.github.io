---
title: Todo List
tagline: A zero-dependency exercise, rewritten into something that holds up under test
summary: A local-first todo system with natural-language quick add, recurring tasks, a command palette, saveable filters and full undo support, plus optional cross-device sync. Unit tests, E2E and accessibility scans all run in CI.
year: 2026
role: Frontend developer (solo)
type: Task management app
stack:
  - Vue 3
  - TypeScript
  - IndexedDB
  - Supabase
  - Pinia
  - Vue Router
  - Tailwind CSS
  - Vite
  - Vitest
  - Playwright
demo: https://lemoncat0817.github.io/todo-list/
repo: https://github.com/lemoncat0817/todo-list
cover: ../../../assets/work/todo-list.png
coverAlt: The Todo List app, showing the Today/Upcoming/Inbox sidebar with projects and tags, the task list, and the quick-add field
order: 2
featured: false
stats:
  - label: Test layers
    value: Unit / E2E / A11y
  - label: Persistence
    value: IndexedDB
  - label: Cross-device sync
    value: Optional
---

## What it is

A todo list — but this time without the deliberate constraint. The previous version used exactly one dependency, Vue itself, to prove I understood the fundamentals. This rewrite is the opposite exercise: build everything a real task manager needs — data that survives, an interface fully operable from the keyboard, undo for every risky action, and quick add through to cross-device sync, all built from scratch.

The interface borrows the shape of mature task tools like Todoist: a Today/Upcoming/Inbox sidebar, projects and tags, saveable filters, a command palette. But the data model and edge cases behind each feature were worked out from first principles, not copied from a template.

## The problem

The previous version left three clear gaps: refreshing the page lost every task, there was no keyboard support, and deletion had no undo. Underneath, those three problems are really one problem — a todo list is a high-frequency, low-tolerance-for-error interface, and what it needs most is not more features but a sense of safety. Users need to be able to type, delete and refresh without hesitation.

So the goal of this rewrite was not to add features for their own sake — it was to make that sense of safety complete: persistence, undo, offline availability, cross-device consistency.

## What I did

The data layer came first; everything else was built on top of it.

- **Local-first.** Everything is written to the browser's IndexedDB (wrapped with `idb`) before anything else happens. No login required, nothing is lost on refresh or offline.
- **Quick add parses natural language.** Typing "tomorrow 3pm submit report p1 #work @office" fills in the due date, priority, project and tag in one line. If the whole string gets consumed by parsing (typing just "tomorrow", say), it falls back to using the raw text as the title rather than producing a nameless task.
- **One command palette for everything.** `Ctrl/Cmd+K` puts views, projects, tags, filters, tasks and actions in a single list, so nothing has to be remembered by location.
- **Undo as a first-class citizen.** Deleting, clearing completed, and bulk rescheduling can all be undone, and each batch counts as exactly one undo step — "postpone everything" is one decision, and `Ctrl/Cmd+Z` reverses it in one press, not twenty.
- **Sync is optional, not required.** Without Supabase environment variables configured, the "account and sync" entry point does not appear at all, and behaviour is identical to the pure local version. Configuring it adds one-click Google/GitHub sign-in and background polling sync.

## Technical decisions

### Why IndexedDB instead of localStorage

localStorage is synchronous, size-limited, and string-only. Task data here has nested subtasks and tag associations, and needs to support a possible offline queue later — IndexedDB's async, structured storage was worth the extra wrapper code.

### Last-write-wins sync instead of real-time collaboration

True real-time multi-user collaboration (CRDTs, operational transforms) would be disproportionate to what this app is — a personal todo list, not a team board. I chose background polling with a per-row `updatedAt` comparison instead. The trade-off is that two devices editing different fields at nearly the same moment can overwrite each other's row, but for single-user, cross-device use that trade-off is entirely acceptable, and it buys an order of magnitude less implementation complexity.

### Three independent test layers

Unit tests (Vitest) cover pure logic like the filter query language and date advancement for recurring tasks. E2E (Playwright) covers real user flows. `@axe-core/playwright` scans for accessibility violations during the same E2E run. Each layer catches a different class of bug; none of them substitutes for the others.

## What went wrong

**Recurring tasks at month end.** A "monthly" task due on Jan 31 would overflow to March 3 if the next date were computed with a naive `setMonth` call, since February has no 31st. The fix is to compute the last day of the target month first, then take the smaller of the two.

**Undo granularity for batch actions.** Undo was originally recorded per row. Rescheduling 20 tasks at once meant pressing `Ctrl+Z` twenty times to fully undo it — a bad experience. Changing the unit of undo from "one data change" to "one user action" made batch operations actually usable.

## Outcome

CI runs type checking, linting, unit tests, and E2E with accessibility scanning on every push, and all four have to pass. The full feature set works offline in the live demo; configuring Supabase adds cross-device sync on top.

## What I would change

1. **Move sync from polling to Realtime.** Cross-device sync currently takes up to 30 seconds or a manual trigger. Supabase already offers Realtime subscriptions, which would make sync close to instant.
2. **Field-level merging instead of whole-row overwrite.** The current last-write-wins approach can, in rare cases, clobber a concurrent edit from another device. Merging at the field level would make that far less likely.
3. **Make due-date reminders an actual push notification.** Reminders currently only fire while the tab is open. Making them work with the tab closed needs Web Push and a small backend.
